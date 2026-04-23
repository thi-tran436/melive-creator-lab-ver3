export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { updateApplicationStatus, getApplicationById } from "@/lib/sheets";
import { sendStatusUpdateEmail } from "@/lib/emails";
import type { ApplicationStatus } from "@/types";

const VALID: ApplicationStatus[] = ["new","reviewing","shortlisted","approved","rejected","contacted"];

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { status, notes, sendEmail } = await req.json() as { status: ApplicationStatus; notes?: string; sendEmail?: boolean };
    if (!VALID.includes(status)) return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    const result = await getApplicationById(id);
    if (!result) return NextResponse.json({ error: "Application not found." }, { status: 404 });
    const updated = await updateApplicationStatus(id, status, notes);
    if (!updated) return NextResponse.json({ error: "Update failed." }, { status: 500 });
    if (sendEmail && ["reviewing","shortlisted","rejected","approved"].includes(status)) {
      try { await sendStatusUpdateEmail({ to: result.application.email, firstName: result.application.firstName, status }); }
      catch (e) { console.error("[Admin] Email failed:", e); }
    }
    return NextResponse.json({ success: true, updatedAt: new Date().toISOString() });
  } catch (e) {
    console.error("[Admin PATCH status]", e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
