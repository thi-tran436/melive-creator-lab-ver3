import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validations";
import { appendWaitlist, checkDuplicateWaitlist } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Silent dedupe — just return success regardless
    const isDuplicate = await checkDuplicateWaitlist(email);
    if (!isDuplicate) {
      await appendWaitlist(email, req.headers.get("referer") ?? "website");
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[API /waitlist] Error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
