import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Program Terms — Melive Creator Lab" };

export default function TermsPage() {
  const S = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section style={{ marginBottom:40 }}>
      <h2 style={{ fontSize:22, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, marginBottom:14 }}>{title}</h2>
      <div style={{ color:"#444", fontSize:15, lineHeight:1.8 }}>{children}</div>
    </section>
  );
  return (
    <div style={{ minHeight:"100vh", background:"#FBF7F0" }}>
      <header style={{ background:"#0F0F12", padding:"20px 40px" }}>
        <Link href="/" style={{ textDecoration:"none", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:22, color:"#FBF7F0" }}>me<span style={{ color:"#FF2E63" }}>live</span></Link>
      </header>
      <main style={{ maxWidth:780, margin:"0 auto", padding:"60px 40px 80px" }}>
        <div style={{ marginBottom:48 }}>
          <div style={{ color:"#FF2E63", fontWeight:700, fontSize:13, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Legal</div>
          <h1 style={{ fontSize:"clamp(32px,5vw,52px)", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, marginBottom:12 }}>Creator Partnership Terms</h1>
          <p style={{ color:"#666", fontSize:14 }}>Last updated: April 2026 · Class of 2026</p>
          <div style={{ background:"#fff5f8", border:"2px solid #FF2E63", borderRadius:12, padding:"14px 20px", marginTop:16, fontSize:14, color:"#444" }}>
            <strong>Note:</strong> These are summary terms. Accepted creators will receive a full legally binding agreement before program start.
          </div>
        </div>
        <S title="What the Program Is"><p>Melive Creator Lab is a live commerce incubator — not an employment arrangement. Creators participate as independent contractors. Nothing creates an employer-employee relationship.</p></S>
        <S title="Revenue Share">
          <p style={{ marginBottom:12 }}>Melive earns <strong>20% of your TikTok Shop affiliate commissions</strong> for <strong>24 months</strong> from program start.</p>
          <ul style={{ paddingLeft:24 }}>
            <li style={{ marginBottom:6 }}>You receive <strong>80%</strong> of all commissions.</li>
            <li style={{ marginBottom:6 }}><strong>Zero upfront cost.</strong> No monthly fees.</li>
            <li style={{ marginBottom:6 }}>If your commissions are $0, Melive earns $0.</li>
          </ul>
        </S>
        <S title="Exclusivity"><p>During the 24-month period, you partner exclusively with Melive for <strong>TikTok Shop live commerce</strong>. This does <em>not</em> restrict Instagram posts, YouTube videos, or brand deals outside TikTok Shop live commerce.</p></S>
        <S title="Ownership"><p>Your channel, content, and followers are <strong>100% yours</strong>. Melive does not acquire ownership of your social media accounts, content library, or audience. We are a partner, not an acquirer.</p></S>
        <S title="Equipment"><p>Equipment provided by Melive is yours to keep upon program completion. If you exit before Month 3, a pro-rated equipment cost may apply per the formal agreement.</p></S>
        <S title="Goals & Outcomes"><p>The $100K GMV/month target is a goal, not a guarantee. If you are tracking toward the goal at Month 6 but have not yet achieved it, Melive may extend support 3 additional months at no cost.</p></S>
        <S title="Ending the Partnership">
          <ul style={{ paddingLeft:24 }}>
            <li style={{ marginBottom:6 }}>Either party may end the partnership with 30 days written notice.</li>
            <li style={{ marginBottom:6 }}>You keep all earned commissions, equipment, and content regardless of exit timing.</li>
          </ul>
        </S>
        <S title="Governing Law"><p>These terms are governed by the laws of the State of New York, USA. Disputes shall be resolved in the courts of New York County, NY.</p></S>
        <S title="Questions"><p>Email <a href="mailto:creators@melive.co" style={{ color:"#FF2E63" }}>creators@melive.co</a> with subject &quot;Partnership Terms.&quot;</p></S>
        <div style={{ marginTop:60, paddingTop:32, borderTop:"1px solid rgba(0,0,0,0.1)" }}>
          <Link href="/" style={{ color:"#FF2E63", fontSize:14 }}>← Back to Melive Creator Lab</Link>
        </div>
      </main>
    </div>
  );
}
