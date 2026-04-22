import { Resend } from "resend";
import type { ApplicationFormValues } from "@/lib/validations";
import { siteConfig } from "@/lib/config";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_CREATOR =
  process.env.RESEND_FROM_CREATOR ??
  "Melive Creator Lab <creators@melive.co>";
const FROM_SYSTEM =
  process.env.RESEND_FROM_SYSTEM ?? "Melive System <system@melive.co>";
const ADMIN_EMAIL =
  process.env.ADMIN_NOTIFY_EMAIL ?? "creators@melive.co";

// ---- Creator confirmation email ----
export async function sendCreatorConfirmation({
  to,
  firstName,
}: {
  to: string;
  firstName: string;
}) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Melive Creator Lab application is in ✓</title>
</head>
<body style="font-family:'Inter',system-ui,sans-serif;background:#FBF7F0;margin:0;padding:0;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    
    <!-- Header -->
    <div style="text-align:center;margin-bottom:40px;">
      <div style="font-size:32px;font-weight:900;letter-spacing:-0.02em;color:#0F0F12;">
        me<span style="color:#FF2E63">live</span>
      </div>
      <div style="font-size:13px;color:#666;margin-top:4px;">Creator Lab NYC</div>
    </div>

    <!-- Card -->
    <div style="background:#fff;border-radius:24px;padding:48px;border:1px solid rgba(0,0,0,0.08);">
      <div style="font-size:40px;text-align:center;margin-bottom:20px;">🎬</div>
      <h1 style="font-size:28px;font-weight:800;color:#0F0F12;margin:0 0 16px;text-align:center;">
        You&apos;re in the queue, ${firstName}!
      </h1>
      <p style="color:#444;font-size:15px;line-height:1.7;margin:0 0 28px;">
        Your application for <strong>Melive Creator Lab NYC — Class of ${siteConfig.cohort.year}</strong>
        has been received. Our team reviews every application personally — no bots,
        no auto-rejections.
      </p>

      <!-- Timeline -->
      <div style="background:#FBF7F0;border-radius:16px;padding:24px;margin:0 0 28px;">
        <div style="font-weight:700;font-size:14px;color:#0F0F12;margin-bottom:16px;">What happens next:</div>
        ${[
          ["📋", "Application review", "We read every pitch personally"],
          ["📅", "Shortlist interviews", `${siteConfig.programDates.shortlistStart}–${siteConfig.programDates.shortlistEnd}, ${siteConfig.cohort.year}`],
          ["🎯", "Final 20 announced", siteConfig.programDates.announce],
          ["🚀", "Class kicks off", siteConfig.programDates.start],
        ]
          .map(
            ([icon, title, detail]) => `
          <div style="display:flex;gap:12px;margin-bottom:12px;align-items:flex-start;">
            <span style="font-size:18px;flex-shrink:0;">${icon}</span>
            <div>
              <div style="font-weight:600;font-size:14px;color:#0F0F12;">${title}</div>
              <div style="font-size:13px;color:#666;">${detail}</div>
            </div>
          </div>`
          )
          .join("")}
      </div>

      <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 28px;">
        You&apos;ll hear from us either way before <strong>${siteConfig.programDates.announce}</strong>.
        If you have questions, just reply to this email — it goes straight to our creator team.
      </p>

      <div style="text-align:center;">
        <a href="${siteConfig.url}"
           style="display:inline-block;background:#FF2E63;color:#fff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;">
          Back to melive.co →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:32px;font-size:12px;color:#999;line-height:1.8;">
      <div>Melive, a Metub Company · New York &amp; Ho Chi Minh City</div>
      <div style="margin-top:6px;">
        <a href="${siteConfig.url}/privacy" style="color:#999;">Privacy Policy</a>
        &nbsp;·&nbsp;
        <a href="${siteConfig.url}/terms" style="color:#999;">Terms</a>
      </div>
      <div style="margin-top:6px;">
        Questions? Email <a href="mailto:${siteConfig.email.creator}" style="color:#FF2E63;">${siteConfig.email.creator}</a>
      </div>
    </div>

  </div>
</body>
</html>`;

  const text = `
Hi ${firstName},

Your application for Melive Creator Lab NYC — Class of ${siteConfig.cohort.year} has been received.

WHAT HAPPENS NEXT:
- Application review: We read every pitch personally
- Shortlist interviews: ${siteConfig.programDates.shortlistStart}–${siteConfig.programDates.shortlistEnd}
- Final 20 announced: ${siteConfig.programDates.announce}  
- Class kicks off: ${siteConfig.programDates.start}

You'll hear from us either way before ${siteConfig.programDates.announce}.

Questions? Just reply to this email.

— The Melive Team
${siteConfig.email.creator}

---
Melive, a Metub Company · New York & Ho Chi Minh City
Privacy Policy: ${siteConfig.url}/privacy
`;

  return resend.emails.send({
    from: FROM_CREATOR,
    to,
    subject: "Your Melive Creator Lab application is in ✓",
    html,
    text,
  });
}

// ---- Admin notification email ----
export async function sendAdminNotification({
  applicationId,
  data,
}: {
  applicationId: string;
  data: ApplicationFormValues;
}) {
  const adminUrl = `${siteConfig.url}/admin`;

  const rows = [
    ["Application ID", applicationId],
    ["Name", `${data.firstName} ${data.lastName}`],
    ["Email", data.email],
    ["Phone", data.phone ?? "—"],
    ["City / State", data.cityState],
    ["Platform", data.platform],
    ["Handle", data.handle],
    ["Followers", data.followers],
    ["Categories", data.categories.join(", ")],
    ["Current GMV", data.currentGmv ?? "—"],
    ["Full-time?", data.fulltime],
    ["UTM Source", data.utmSource ?? "—"],
    ["UTM Medium", data.utmMedium ?? "—"],
    ["UTM Campaign", data.utmCampaign ?? "—"],
  ];

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="font-family:'Inter',system-ui,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:680px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
    <div style="background:#0F0F12;padding:24px 32px;">
      <div style="color:#FBF7F0;font-size:20px;font-weight:800;">
        🎬 New Creator Application
      </div>
      <div style="color:#aaa;font-size:14px;margin-top:4px;">
        ${data.firstName} ${data.lastName} — @${data.handle} on ${data.platform}
      </div>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        ${rows
          .map(
            ([label, value]) => `
          <tr style="border-bottom:1px solid #f0f0f0;">
            <td style="padding:10px 12px;font-size:13px;font-weight:600;color:#666;width:40%;">${label}</td>
            <td style="padding:10px 12px;font-size:14px;color:#0F0F12;">${value}</td>
          </tr>`
          )
          .join("")}
      </table>

      <div style="margin-top:24px;background:#FBF7F0;border-radius:12px;padding:20px;">
        <div style="font-size:13px;font-weight:600;color:#666;margin-bottom:8px;">PITCH</div>
        <div style="font-size:14px;color:#0F0F12;line-height:1.7;">${data.pitch}</div>
      </div>

      <div style="margin-top:16px;background:#FBF7F0;border-radius:12px;padding:20px;">
        <div style="font-size:13px;font-weight:600;color:#666;margin-bottom:8px;">LINKS</div>
        <div style="font-size:14px;color:#0F0F12;line-height:1.9;white-space:pre-line;">${data.links}</div>
      </div>

      <div style="margin-top:28px;text-align:center;">
        <a href="${adminUrl}"
           style="display:inline-block;background:#FF2E63;color:#fff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;">
          View in Admin Dashboard →
        </a>
      </div>
    </div>
  </div>
</body>
</html>`;

  return resend.emails.send({
    from: FROM_SYSTEM,
    to: ADMIN_EMAIL,
    subject: `New application: ${data.firstName} ${data.lastName} — @${data.handle} on ${data.platform}`,
    html,
  });
}

// ---- Status update email ----
export async function sendStatusUpdateEmail({
  to,
  firstName,
  status,
}: {
  to: string;
  firstName: string;
  status: string;
}) {
  const subjects: Record<string, string> = {
    reviewing: "We're reviewing your Melive Creator Lab application",
    shortlisted: "You've been shortlisted — Melive Creator Lab NYC 🎬",
    rejected: "Melive Creator Lab — Application Update",
    approved: `Welcome to Melive Creator Lab NYC — Class of ${siteConfig.cohort.year} 🎉`,
  };

  const bodies: Record<string, string> = {
    reviewing: `Hi ${firstName},<br><br>Your Melive Creator Lab application is now under active review. Our team will be in touch with next steps. We appreciate your patience.<br><br>— The Melive Team`,
    shortlisted: `Hi ${firstName},<br><br>🎉 Great news — you've been <strong>shortlisted</strong> for Melive Creator Lab NYC! We'll be reaching out within the next 48 hours to schedule a brief interview. Keep an eye on your inbox.<br><br>— The Melive Team`,
    rejected: `Hi ${firstName},<br><br>Thank you for applying to Melive Creator Lab NYC. After careful review, we're not moving forward with your application for this cohort.<br><br>This doesn't reflect your talent — it's about fit and timing. We encourage you to apply again for the next cohort.<br><br>— The Melive Team`,
    approved: `Hi ${firstName},<br><br>🚀 You've been selected for <strong>Melive Creator Lab NYC — Class of ${siteConfig.cohort.year}</strong>! Welcome to the team. Our producer will reach out within 24 hours with onboarding details.<br><br>— The Melive Team`,
  };

  const subject = subjects[status];
  const bodyHtml = bodies[status];
  if (!subject || !bodyHtml) return;

  const html = `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"/></head>
<body style="font-family:'Inter',system-ui,sans-serif;background:#FBF7F0;margin:0;padding:40px 20px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:20px;padding:40px;border:1px solid rgba(0,0,0,0.08);">
    <div style="font-size:26px;font-weight:900;color:#0F0F12;margin-bottom:28px;">
      me<span style="color:#FF2E63">live</span>
    </div>
    <div style="font-size:15px;color:#444;line-height:1.8;">
      ${bodyHtml}
    </div>
    <div style="margin-top:32px;padding-top:20px;border-top:1px solid #f0f0f0;font-size:12px;color:#999;">
      Questions? Email <a href="mailto:${siteConfig.email.creator}" style="color:#FF2E63;">${siteConfig.email.creator}</a>
    </div>
  </div>
</body>
</html>`;

  return resend.emails.send({
    from: FROM_CREATOR,
    to,
    subject,
    html,
  });
}
