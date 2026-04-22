import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Program Terms",
  description: "Melive Creator Lab partnership terms — revenue share, exclusivity, ownership, and program details.",
};

const section = (title: string, content: React.ReactNode) => (
  <section style={{ marginBottom: 40 }}>
    <h2 style={{ fontSize: 22, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, marginBottom: 16, color: "#0F0F12" }}>
      {title}
    </h2>
    <div style={{ color: "#444", fontSize: 15, lineHeight: 1.8 }}>{content}</div>
  </section>
);

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FBF7F0" }}>
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
            Creator Partnership Terms
          </h1>
          <p style={{ color: "#666", fontSize: 14 }}>
            Last updated: April 2026 · Applies to Melive Creator Lab NYC — Class of {siteConfig.cohort.year}
          </p>
          <div style={{ background: "#fff5f8", border: "2px solid #FF2E63", borderRadius: 12, padding: "14px 20px", marginTop: 20, fontSize: 14, color: "#444" }}>
            <strong>Note:</strong> These terms are a summary overview. Accepted creators will receive a full, legally binding partnership agreement before program start. These terms do not constitute a binding contract until both parties sign the formal agreement.
          </div>
        </div>

        {section("What the Program Is", (
          <p>
            Melive Creator Lab is a live commerce incubator — not an employment arrangement, staffing agency, or talent acquisition. Creators participate as independent contractors. Nothing in this program creates an employer-employee relationship between Melive and any creator.
          </p>
        ))}

        {section("What Melive Provides", (
          <ul style={{ paddingLeft: 24 }}>
            {[
              "Studio equipment (lighting, camera, microphone, accessories) shipped to your home",
              "Product samples for live commerce content, coordinated with brand partners",
              "A dedicated growth manager for the duration of the program",
              "TikTok Ads budget and campaign management",
              "Brand deal introductions and negotiation support",
              "Live commerce training, bootcamp, and on-demand resource library",
              "Weekly performance metrics and analytics dashboard access",
              "Optional NYC in-person meetups (2x during the program; travel reimbursed for accepted creators)",
            ].map((item) => (
              <li key={item} style={{ marginBottom: 8 }}>{item}</li>
            ))}
          </ul>
        ))}

        {section("Revenue Share Structure", (
          <>
            <p style={{ marginBottom: 12 }}>
              Melive earns <strong>20% of your TikTok Shop affiliate commissions</strong> for a period of{" "}
              <strong>24 months</strong> from the program start date.
            </p>
            <ul style={{ paddingLeft: 24 }}>
              <li style={{ marginBottom: 8 }}>You receive <strong>80%</strong> of all TikTok Shop affiliate commissions you earn.</li>
              <li style={{ marginBottom: 8 }}>There is <strong>zero upfront cost</strong> to join the program.</li>
              <li style={{ marginBottom: 8 }}>There are <strong>no monthly fees</strong> or subscription charges.</li>
              <li style={{ marginBottom: 8 }}>If your commissions are $0, Melive earns $0.</li>
              <li style={{ marginBottom: 8 }}>Commission tracking and payments follow TikTok Shop&apos;s standard payout schedule.</li>
            </ul>
          </>
        ))}

        {section("Exclusivity", (
          <>
            <p style={{ marginBottom: 12 }}>
              During the 24-month partnership period, you agree to partner <strong>exclusively with Melive</strong> for{" "}
              <strong>TikTok Shop live commerce</strong> activities. This means:
            </p>
            <ul style={{ paddingLeft: 24 }}>
              <li style={{ marginBottom: 8 }}>You will not join another MCN or live commerce program that involves TikTok Shop during the 24 months.</li>
              <li style={{ marginBottom: 8 }}>You will not participate in TikTok Shop affiliate programs for a different manager during this period.</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              This exclusivity does <strong>not</strong> apply to:
            </p>
            <ul style={{ paddingLeft: 24, marginTop: 8 }}>
              <li style={{ marginBottom: 8 }}>Sponsored brand deals for Instagram posts, YouTube videos, or content outside live commerce.</li>
              <li style={{ marginBottom: 8 }}>Traditional influencer marketing campaigns (flat-fee, gifted, etc.) outside TikTok Shop.</li>
              <li style={{ marginBottom: 8 }}>Any content or platforms not related to TikTok Shop affiliate/live commerce.</li>
            </ul>
          </>
        ))}

        {section("Channel & Content Ownership", (
          <p>
            Your channel, your content, your followers — <strong>100% yours</strong>. Melive does not acquire any ownership stake in your social media accounts, channel, content library, or audience. We are a business partner, not an acquirer. You may close the partnership at any time per the exit terms below.
          </p>
        ))}

        {section("Equipment Ownership", (
          <p>
            Equipment provided by Melive (lighting, camera, microphone, etc.) is yours to keep upon program completion or upon mutual agreement to end the partnership, regardless of outcome. If you voluntarily exit before Month 3, a pro-rated equipment cost may apply per the formal agreement.
          </p>
        ))}

        {section("Program Goals & Outcomes", (
          <>
            <p style={{ marginBottom: 12 }}>
              The $100K GMV/month target is a <strong>goal, not a guarantee</strong>. Results depend on your content quality, audience engagement, product-market fit, and consistency of effort. Melive commits to providing the resources and support outlined above; we cannot guarantee any specific revenue outcome.
            </p>
            <p>
              If you are tracking toward the $100K goal at Month 6 but have not yet achieved it, Melive may extend support for up to 3 additional months at no cost.
            </p>
          </>
        ))}

        {section("Ending the Partnership", (
          <ul style={{ paddingLeft: 24 }}>
            <li style={{ marginBottom: 8 }}>Either party may end the partnership with 30 days written notice.</li>
            <li style={{ marginBottom: 8 }}>If Melive ends the partnership, you keep all earned commissions, equipment, and content.</li>
            <li style={{ marginBottom: 8 }}>If you end the partnership early, revenue share obligations for commissions already earned continue through the agreed 24-month window unless mutually waived in writing.</li>
            <li style={{ marginBottom: 8 }}>There are no financial penalties for exit beyond any pro-rated equipment cost (if applicable per the formal agreement).</li>
          </ul>
        ))}

        {section("Limitation of Liability", (
          <p>
            To the fullest extent permitted by law, Melive&apos;s total liability to you shall not exceed the total commissions paid to Melive from your TikTok Shop activities in the 3 months preceding any claim. Melive is not liable for indirect, consequential, or punitive damages.
          </p>
        ))}

        {section("Governing Law", (
          <p>
            These terms and any formal partnership agreement are governed by the laws of the State of New York, USA. Any disputes shall be resolved in the courts of New York County, NY.
          </p>
        ))}

        {section("Questions", (
          <p>
            For questions about these terms, email{" "}
            <a href={`mailto:${siteConfig.email.creator}`} style={{ color: "#FF2E63" }}>
              {siteConfig.email.creator}
            </a>. Please include &quot;Partnership Terms&quot; in the subject line.
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
