export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const adminPw = process.env.ADMIN_PASSWORD;
    if (!adminPw) return NextResponse.json({ error: "Admin password not configured." }, { status: 500 });
    if (password !== adminPw) return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_session", adminPw, {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch { return NextResponse.json({ error: "Server error." }, { status: 500 }); }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("admin_session");
  return res;
}
