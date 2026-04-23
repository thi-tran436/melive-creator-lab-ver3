export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validations";
import { appendWaitlist, checkDuplicateWaitlist } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = waitlistSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, message: "Enter a valid email." }, { status: 400 });
    const { email } = parsed.data;
    const dupe = await checkDuplicateWaitlist(email);
    if (!dupe) await appendWaitlist(email, req.headers.get("referer") ?? "website");
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    console.error("[POST /api/waitlist]", e);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
