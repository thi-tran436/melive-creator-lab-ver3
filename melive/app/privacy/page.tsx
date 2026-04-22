import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Melive Creator Lab collects, uses, and protects your personal information.",
};

const section = (title: string, content: React.ReactNode) => (
  <section style={{ marginBottom: 40 }}>
    <h2 style={{ fontSize: 22, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, marginBottom: 16, color: "#0F0F12" }}>
      {title}
    </h2>
    <div style={{ color: "#444", fontSize: 15, lineHeight: 1.8 }}>{content}</div>
  </section>
);

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FBF7F0" }}>
      {/* Header */}
      <header style={{ background: "#0F0F12", padding: "20px 40px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 22, color: "#FBF7F0" }}>
            me<span style={{ color: "#FF2E63" }}>live</span>
          </span>
        </Link>
      </header>

      <main style={{ maxWidth: 780, margin: "0 auto", padding: "60px 40px 80px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ color: "#FF2E63", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
            Legal
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, marginBottom: 16 }}>
            Privacy Policy
          </h1>
          <p style={{ color: "#666", fontSize: 14 }}>
            Last updated: April 2026 · Applies to creatorlab.melive.co
          </p>
        </div>

        {section("Overview", (
          <p>
            Melive, a Metub Company (&quot;Melive,&quot; &quot;we,&quot; &quot;us&quot;) operates this website to recruit creators for our live commerce incubator program. This policy explains what personal information we collect, why, and how we protect it.
          </p>
        ))}

        {section("What We Collect", (
          <>
            <p>When you submit a creator application, we collect:</p>
            <ul style={{ paddingLeft: 24, marginTop: 12 }}>
              {[
                "Full name and email address",
                "Phone number (optional)",
                "City and state of residence",
                "Primary social media platform and @handle",
                "Follower count range",
                "Content categories",
                "Current monthly GMV (optional)",
                "Full-time status",
                "Pitch/bio text (your written answers)",
                "Links to your content (video, live replays, portfolio)",
                "IP address and browser user-agent (for spam protection)",
                "reCAPTCHA score (spam/bot detection)",
                "UTM parameters (to understand how you found us)",
              ].map((item) => (
                <li key={item} style={{ marginBottom: 6 }}>{item}</li>
              ))}
            </ul>
          </>
        ))}

        {section("Why We Collect It", (
          <ul style={{ paddingLeft: 24 }}>
            {[
              ["Application evaluation", "To review your qualifications and fit for the Creator Lab program."],
              ["Communication", "To send you application confirmation, status updates, and program information."],
              ["Spam & fraud prevention", "IP address, reCAPTCHA scores, and duplicate detection protect our process."],
              ["Program marketing (with consent)", "If accepted and with your permission, we may feature your results."],
            ].map(([title, desc]) => (
              <li key={title as string} style={{ marginBottom: 10 }}>
                <strong>{title}</strong>: {desc}
              </li>
            ))}
          </ul>
        ))}

        {section("How Long We Keep Your Data", (
          <ul style={{ paddingLeft: 24 }}>
            <li style={{ marginBottom: 8 }}>Approved creators: data retained for the duration of the partnership + 2 years.</li>
            <li style={{ marginBottom: 8 }}>Rejected applications: deleted 12 months after the decision.</li>
            <li style={{ marginBottom: 8 }}>Other applications: deleted 24 months after submission.</li>
            <li style={{ marginBottom: 8 }}>Waitlist emails: deleted 18 months after collection, or when notified for the next cohort.</li>
          </ul>
        ))}

        {section("Who Has Access", (
          <p>
            Your data is accessible only to Melive staff involved in the creator recruitment process. We do not sell, rent, or share your personal data with third parties for marketing purposes.
          </p>
        ))}

        {section("Third-Party Processors", (
          <>
            <p style={{ marginBottom: 12 }}>We use the following third-party services that process your data on our behalf:</p>
            <ul style={{ paddingLeft: 24 }}>
              {[
                ["Google Sheets & Google Cloud", "Application data storage. Governed by Google's Privacy Policy."],
                ["Resend", "Email delivery service. Your email address is transmitted to send confirmations."],
                ["Google reCAPTCHA v3", "Spam/bot protection. Google processes your IP and browser data to generate a risk score."],
                ["Google Analytics 4", "Anonymous usage analytics. IP anonymized. You can opt out via browser extensions."],
                ["Vercel", "Hosting platform. Your IP is logged for request routing and security."],
              ].map(([name, desc]) => (
                <li key={name as string} style={{ marginBottom: 8 }}>
                  <strong>{name}</strong>: {desc}
                </li>
              ))}
            </ul>
          </>
        ))}

        {section("Your Rights", (
          <>
            <p style={{ marginBottom: 12 }}>
              Depending on your location, you may have rights including:
            </p>
            <ul style={{ paddingLeft: 24 }}>
              <li style={{ marginBottom: 8 }}><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li style={{ marginBottom: 8 }}><strong>Correction:</strong> Request correction of inaccurate data.</li>
              <li style={{ marginBottom: 8 }}><strong>Deletion:</strong> Request deletion of your application data.</li>
              <li style={{ marginBottom: 8 }}><strong>Objection:</strong> Object to our processing of your data.</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              To exercise these rights, email us at{" "}
              <a href={`mailto:${siteConfig.email.creator}`} style={{ color: "#FF2E63" }}>
                {siteConfig.email.creator}
              </a>{" "}
              with subject line &quot;Privacy Request.&quot; We will respond within 30 days.
            </p>
          </>
        ))}

        {section("GDPR (EU Residents)", (
          <p>
            If you are located in the European Economic Area, our legal basis for processing your application data is <strong>legitimate interest</strong> (evaluating your application) and <strong>contractual necessity</strong> (if you are accepted). You have the right to lodge a complaint with your local data protection authority.
          </p>
        ))}

        {section("CCPA (California Residents)", (
          <p>
            California residents may request disclosure of personal information collected, sold, or disclosed, and may request deletion under the California Consumer Privacy Act. We do not sell personal information. To submit a request, contact{" "}
            <a href={`mailto:${siteConfig.email.creator}`} style={{ color: "#FF2E63" }}>
              {siteConfig.email.creator}
            </a>.
          </p>
        ))}

        {section("Security", (
          <p>
            We use HTTPS encryption, access controls, and industry-standard security practices to protect your data. No system is 100% secure; we encourage you to use strong, unique passwords and report any security concerns to us immediately.
          </p>
        ))}

        {section("Contact Us", (
          <p>
            Privacy questions? Email{" "}
            <a href={`mailto:${siteConfig.email.creator}`} style={{ color: "#FF2E63" }}>
              {siteConfig.email.creator}
            </a>
            . We aim to respond within 5 business days.
          </p>
        ))}

        <div style={{ marginTop: 60, paddingTop: 32, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
          <Link href="/" style={{ color: "#FF2E63", fontSize: 14 }}>
            ← Back to Melive Creator Lab
          </Link>
        </div>
      </main>
    </div>
  );
}
