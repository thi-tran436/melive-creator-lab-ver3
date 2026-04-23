export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { applicationSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/ratelimit";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { appendApplication, checkDuplicateEmail } from "@/lib/sheets";
import { sendCreatorConfirmation, sendAdminNotification } from "@/lib/emails";

function getIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function clean(s: string) {
  return sanitizeHtml(s, { allowedTags: [], allowedAttributes: {} }).trim();
}

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try { body = await req.json(); }
    catch { return NextResponse.json({ success: false, error: "INVALID_JSON", message: "Invalid request body." }, { status: 400 }); }

    // reCAPTCHA
    const token = (body as Record<string, unknown>)?.recaptchaToken as string | undefined;
    const captcha = await verifyRecaptcha(token ?? "");
    if (!captcha.success) {
      return NextResponse.json({ success: false, error: "CAPTCHA_FAILED", message: "Verification failed. Please try again." }, { status: 422 });
    }

    // Rate limit
    const ip = getIp(req);
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json({ success: false, error: "RATE_LIMITED", message: `Too many submissions. Try again in ${Math.ceil((rl.resetAt - Date.now()) / 60000)} minute(s).` }, { status: 429 });
    }

    // Validate
    const parsed = applicationSchema.safeParse(body);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      parsed.error.errors.forEach(e => { if (e.path[0]) fields[String(e.path[0])] = e.message; });
      return NextResponse.json({ success: false, error: "VALIDATION_ERROR", message: "Please fix the errors.", fields }, { status: 400 });
    }
    const data = parsed.data;

    // Deadline
    const deadline = process.env.NEXT_PUBLIC_APPLICATION_DEADLINE;
    if (deadline && new Date() > new Date(deadline)) {
      return NextResponse.json({ success: false, error: "APPLICATIONS_CLOSED", message: "Applications are now closed." }, { status: 410 });
    }

    // Duplicate
    const isDupe = await checkDuplicateEmail(data.email);
    if (isDupe) {
      return NextResponse.json({ success: false, error: "DUPLICATE_EMAIL", message: "This email has already submitted an application." }, { status: 409 });
    }

    // Save
    const applicationId = await appendApplication({
      firstName: data.firstName, lastName: data.lastName, email: data.email,
      phone: data.phone, cityState: clean(data.cityState),
      platform: data.platform, handle: data.handle, followers: data.followers,
      categories: data.categories, currentGmv: data.currentGmv,
      fulltime: data.fulltime as "Yes, full-time" | "Part-time, transitioning" | "Side hustle",
      pitch: clean(data.pitch), links: clean(data.links),
      utmSource: data.utmSource, utmMedium: data.utmMedium, utmCampaign: data.utmCampaign,
      ipAddress: ip, recaptchaScore: captcha.score,
    });

    // Emails (non-blocking)
    try {
      await Promise.all([
        sendCreatorConfirmation({ to: data.email, firstName: data.firstName }),
        sendAdminNotification({ applicationId, data: data as unknown as Record<string, unknown> }),
      ]);
    } catch (e) { console.error("[Email] Failed:", e); }

    return NextResponse.json({ success: true, applicationId }, { status: 201 });
  } catch (e) {
    console.error("[POST /api/applications]", e);
    return NextResponse.json({ success: false, error: "SERVER_ERROR", message: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
