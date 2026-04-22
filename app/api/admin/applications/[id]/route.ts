import { NextRequest, NextResponse } from "next/server";
import { updateApplicationStatus, getApplicationById } from "@/lib/sheets";
import { sendStatusUpdateEmail } from "@/lib/emails";
import type { ApplicationStatus } from "@/types";

const VALID_STATUSES: ApplicationStatus[] = [
  "new", "reviewing", "shortlisted", "approved", "rejected", "contacted",
];

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status, notes, sendEmail } = body as {
      status: ApplicationStatus;
      notes?: string;
      sendEmail?: boolean;
    };

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value." },
        { status: 400 }
      );
    }

    // Get application for email sending
    const result = await getApplicationById(id);
    if (!result) {
      return NextResponse.json(
        { error: "Application not found." },
        { status: 404 }
      );
    }

    // Update in sheets
    const updated = await updateApplicationStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json(
        { error: "Failed to update status." },
        { status: 500 }
      );
    }

    // Send email if requested and status warrants it
    const emailableStatuses = ["reviewing", "shortlisted", "rejected", "approved"];
    if (sendEmail && emailableStatuses.includes(status)) {
      try {
        await sendStatusUpdateEmail({
          to: result.application.email,
          firstName: result.application.firstName,
          status,
        });
      } catch (emailErr) {
        console.error("[Admin] Status email failed:", emailErr);
        // Don't fail the status update
      }
    }

    return NextResponse.json({
      success: true,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[Admin] Status update error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
