export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { applicationSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/ratelimit";
import { verifyRecaptcha } from "@/lib/recaptcha";
import {
  appendApplication,
  checkDuplicateEmail,
} from "@/lib/sheets";
import { sendCreatorConfirmation, sendAdminNotification } from "@/lib/emails";

// ---- Helper: get real IP from request ----
function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// ---- Sanitize free-text fields ----
function sanitize(str: string): string {
  return sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} }).trim();
}

// ---- Check application deadline ----
function isDeadlinePassed(): boolean {
  const deadline = process.env.NEXT_PUBLIC_APPLICATION_DEADLINE;
  if (!deadline) return false;
  return new Date() > new Date(deadline);
}

export async function POST(req: NextRequest) {
  try {
    // 1. Parse body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "INVALID_JSON", message: "Invalid request body." },
        { status: 400 }
      );
    }

    // 2. reCAPTCHA verification
    const token = (body as Record<string, unknown>)?.recaptchaToken as string | undefined;
    const captcha = await verifyRecaptcha(token ?? "");
    if (!captcha.success) {
      return NextResponse.json(
        { success: false, error: "CAPTCHA_FAILED", message: "reCAPTCHA verification failed. Please try again." },
        { status: 422 }
      );
    }

    // 3. Rate limiting
    const ip = getIp(req);
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "RATE_LIMITED",
          message: `Too many submissions. Please try again in ${Math.ceil((rateLimit.resetAt - Date.now()) / 60000)} minute(s).`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          },
        }
      );
    }

    // 4. Validate body with Zod
    const parsed = applicationSchema.safeParse(body);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        const field = err.path.join(".");
        if (field) fields[field] = err.message;
      });
      return NextResponse.json(
        { success: false, error: "VALIDATION_ERROR", message: "Please fix the errors below.", fields },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 5. Check deadline
    if (isDeadlinePassed()) {
      return NextResponse.json(
        { success: false, error: "APPLICATIONS_CLOSED", message: "Applications are now closed for this cohort." },
        { status: 410 }
      );
    }

    // 6. Duplicate email check
    const isDuplicate = await checkDuplicateEmail(data.email);
    if (isDuplicate) {
      return NextResponse.json(
        {
          success: false,
          error: "DUPLICATE_EMAIL",
          message: "This email has already submitted an application. Check your inbox for a confirmation email.",
        },
        { status: 409 }
      );
    }

    // 7. Sanitize free-text fields
    const sanitizedData = {
      ...data,
      pitch: sanitize(data.pitch),
      links: sanitize(data.links),
      cityState: sanitize(data.cityState),
    };

    // 8. Append to Google Sheets
    const applicationId = await appendApplication({
      firstName: sanitizedData.firstName,
      lastName: sanitizedData.lastName,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      cityState: sanitizedData.cityState,
      platform: sanitizedData.platform,
      handle: sanitizedData.handle,
      followers: sanitizedData.followers,
      categories: sanitizedData.categories,
      currentGmv: sanitizedData.currentGmv as string | undefined,
      fulltime: sanitizedData.fulltime as "Yes, full-time" | "Part-time, transitioning" | "Side hustle",
      pitch: sanitizedData.pitch,
      links: sanitizedData.links,
      utmSource: sanitizedData.utmSource,
      utmMedium: sanitizedData.utmMedium,
      utmCampaign: sanitizedData.utmCampaign,
      ipAddress: ip,
      recaptchaScore: captcha.score,
    });

    // 9. Send emails (errors here should NOT fail the submission)
    try {
      await Promise.all([
        sendCreatorConfirmation({
          to: sanitizedData.email,
          firstName: sanitizedData.firstName,
        }),
        sendAdminNotification({
          applicationId,
          data: sanitizedData,
        }),
      ]);
    } catch (emailErr) {
      console.error("[Email] Failed to send emails:", emailErr);
      // Don't return error — data is already saved
    }

    // 10. Return success
    return NextResponse.json({ success: true, applicationId }, { status: 201 });
  } catch (err) {
    console.error("[API /applications] Unhandled error:", err);
    return NextResponse.json(
      { success: false, error: "SERVER_ERROR", message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// Only allow POST
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
