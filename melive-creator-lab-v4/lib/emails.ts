import { Resend } from "resend";

// Lazy init — do NOT call new Resend() at module level (blocks static build)
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM_CREATOR = process.env.RESEND_FROM_CREATOR ?? "Melive Creator Lab <creators@melive.co>";
const FROM_SYSTEM = process.env.RESEND_FROM_SYSTEM ?? "Melive System <system@melive.co>";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL ?? "creators@melive.co";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://creatorlab.melive.co";

export async function sendCreatorConfirmation({ to, firstName }: { to: string; firstName: string }) {
  const resend = getResend();
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/></head>
<body style="font-family:Inter,system-ui,sans-serif;background:#FBF7F0;margin:0;padding:40px 20px;">
<div style="max-width:600px;margin:0 auto;">
  <div style="text-align:center;margin-bottom:32px;">
    <div style="font-size:28px;font-weight:900;color:#0F0F12;">me<span style="color:#FF2E63">live</span></div>
    <div style="font-size:12px;color:#888;margin-top:4px;">Creator Lab NYC</div>
  </div>
  <div style="background:#fff;border-radius:20px;padding:40px;border:1px solid #e5e7eb;">
    <div style="font-size:40px;text-align:center;margin-bottom:16px;">🎬</div>
    <h1 style="font-size:24px;font-weight:800;text-align:center;color:#0F0F12;margin:0 0 16px;">You're in the queue, ${firstName}!</h1>
    <p style="color:#444;font-size:15px;line-height:1.7;margin:0 0 24px;">Your application for <strong>Melive Creator Lab NYC — Class of 2026</strong> has been received. Our team reviews every application personally.</p>
    <div style="background:#FBF7F0;border-radius:12px;padding:20px;margin-bottom:24px;">
      <div style="font-weight:700;font-size:14px;color:#0F0F12;margin-bottom:12px;">What happens next:</div>
      <div style="font-size:14px;color:#444;line-height:2;">📋 Application review — we read every pitch<br/>📅 Shortlist interviews: June 1–10, 2026<br/>🎯 Final 20 announced: June 15<br/>🚀 Class kicks off: July 1</div>
    </div>
    <p style="color:#444;font-size:14px;line-height:1.7;">You'll hear from us either way before June 20. Questions? Just reply to this email.</p>
    <div style="text-align:center;margin-top:28px;">
      <a href="${SITE_URL}" style="display:inline-block;background:#FF2E63;color:#fff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;">Back to Melive →</a>
    </div>
  </div>
  <div style="text-align:center;margin-top:24px;font-size:12px;color:#aaa;">
    Melive, a Metub Company · New York &amp; Ho Chi Minh City<br/>
    <a href="${SITE_URL}/privacy" style="color:#aaa;">Privacy</a> · <a href="${SITE_URL}/terms" style="color:#aaa;">Terms</a>
  </div>
</div>
</body></html>`;

  return resend.emails.send({
    from: FROM_CREATOR, to,
    subject: "Your Melive Creator Lab application is in ✓",
    html,
  });
}

export async function sendAdminNotification({ applicationId, data }: { applicationId: string; data: Record<string, unknown> }) {
  const resend = getResend();
  const rows = [
    ["ID", applicationId], ["Name", `${data.firstName} ${data.lastName}`],
    ["Email", data.email as string], ["Phone", data.phone as string || "—"],
    ["City/State", data.cityState as string], ["Platform", data.platform as string],
    ["Handle", data.handle as string], ["Followers", data.followers as string],
    ["Categories", Array.isArray(data.categories) ? data.categories.join(", ") : ""],
    ["GMV", data.currentGmv as string || "—"], ["Full-time", data.fulltime as string],
    ["UTM Source", data.utmSource as string || "—"],
  ];
  const tableRows = rows.map(([k, v]) =>
    `<tr><td style="padding:8px 12px;font-size:13px;color:#888;width:35%;border-bottom:1px solid #f0f0f0;">${k}</td><td style="padding:8px 12px;font-size:14px;color:#0F0F12;border-bottom:1px solid #f0f0f0;">${v}</td></tr>`
  ).join("");

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="font-family:Inter,system-ui,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
<div style="max-width:680px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:#0F0F12;padding:24px 32px;">
    <div style="color:#FBF7F0;font-size:20px;font-weight:800;">🎬 New Creator Application</div>
    <div style="color:#aaa;font-size:14px;margin-top:4px;">${data.firstName} ${data.lastName} — @${data.handle} on ${data.platform}</div>
  </div>
  <div style="padding:28px;">
    <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
    <div style="margin-top:20px;background:#FBF7F0;border-radius:10px;padding:16px;">
      <div style="font-size:12px;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:8px;">Pitch</div>
      <div style="font-size:14px;color:#0F0F12;line-height:1.7;">${data.pitch}</div>
    </div>
    <div style="margin-top:12px;background:#FBF7F0;border-radius:10px;padding:16px;">
      <div style="font-size:12px;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:8px;">Links</div>
      <div style="font-size:14px;color:#0F0F12;white-space:pre-line;">${data.links}</div>
    </div>
    <div style="text-align:center;margin-top:24px;">
      <a href="${SITE_URL}/admin" style="display:inline-block;background:#FF2E63;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:700;font-size:14px;">View in Dashboard →</a>
    </div>
  </div>
</div>
</body></html>`;

  return resend.emails.send({
    from: FROM_SYSTEM,
    to: ADMIN_EMAIL,
    subject: `New application: ${data.firstName} ${data.lastName} — @${data.handle} on ${data.platform}`,
    html,
  });
}

export async function sendStatusUpdateEmail({ to, firstName, status }: { to: string; firstName: string; status: string }) {
  const resend = getResend();
  const subjects: Record<string, string> = {
    reviewing: "We're reviewing your Melive Creator Lab application",
    shortlisted: "You've been shortlisted — Melive Creator Lab NYC 🎬",
    rejected: "Melive Creator Lab — Application Update",
    approved: "Welcome to Melive Creator Lab NYC — Class of 2026 🎉",
  };
  const bodies: Record<string, string> = {
    reviewing: `Hi ${firstName}, your application is now under active review. We'll be in touch with next steps.`,
    shortlisted: `Hi ${firstName}, great news — you've been shortlisted! We'll reach out within 48 hours to schedule a brief interview.`,
    rejected: `Hi ${firstName}, thank you for applying. After careful review, we're not moving forward for this cohort. We encourage you to apply again next time.`,
    approved: `Hi ${firstName}, you've been selected for Melive Creator Lab NYC — Class of 2026! Welcome. Our producer will reach out within 24 hours.`,
  };
  const subject = subjects[status];
  const body = bodies[status];
  if (!subject || !body) return;

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="font-family:Inter,system-ui,sans-serif;background:#FBF7F0;margin:0;padding:40px 20px;">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:20px;padding:40px;border:1px solid #e5e7eb;">
  <div style="font-size:26px;font-weight:900;color:#0F0F12;margin-bottom:24px;">me<span style="color:#FF2E63">live</span></div>
  <p style="font-size:15px;color:#444;line-height:1.8;">${body}</p>
  <p style="font-size:13px;color:#888;margin-top:24px;">Questions? <a href="mailto:${ADMIN_EMAIL}" style="color:#FF2E63;">Email us</a>.</p>
</div>
</body></html>`;

  return resend.emails.send({ from: FROM_CREATOR, to, subject, html });
}
