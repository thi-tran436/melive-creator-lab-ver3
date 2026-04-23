import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy Policy — Melive Creator Lab", description: "How Melive collects and protects your personal information." };

export default function PrivacyPage() {
  const S = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section style={{ marginBottom:40 }}>
      <h2 style={{ fontSize:22, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, marginBottom:14, color:"#0F0F12" }}>{title}</h2>
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
          <h1 style={{ fontSize:"clamp(32px,5vw,52px)", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, marginBottom:12 }}>Privacy Policy</h1>
          <p style={{ color:"#666", fontSize:14 }}>Last updated: April 2026 · Applies to creatorlab.melive.co</p>
        </div>
        <S title="Overview"><p>Melive, a Metub Company (&quot;Melive,&quot; &quot;we,&quot; &quot;us&quot;) operates this website to recruit creators for our live commerce incubator program. This policy explains what personal information we collect, why, and how we protect it.</p></S>
        <S title="What We Collect">
          <p style={{ marginBottom:12 }}>When you submit a creator application, we collect:</p>
          <ul style={{ paddingLeft:24 }}>
            {["Full name and email address","Phone number (optional)","City and state of residence","Social media platform and handle","Follower count range","Content categories","Current monthly GMV (optional)","Full-time status","Pitch text and links","IP address and browser user-agent (spam protection)","reCAPTCHA score","UTM parameters (how you found us)"].map(i => <li key={i} style={{ marginBottom:6 }}>{i}</li>)}
          </ul>
        </S>
        <S title="Why We Collect It">
          <ul style={{ paddingLeft:24 }}>
            <li style={{ marginBottom:8 }}><strong>Application evaluation:</strong> To review your qualifications and fit for the Creator Lab program.</li>
            <li style={{ marginBottom:8 }}><strong>Communication:</strong> To send application confirmation and status updates.</li>
            <li style={{ marginBottom:8 }}><strong>Spam prevention:</strong> IP address and reCAPTCHA scores protect our process.</li>
          </ul>
        </S>
        <S title="Data Retention">
          <ul style={{ paddingLeft:24 }}>
            <li style={{ marginBottom:8 }}>Approved creators: retained for the duration of the partnership + 2 years.</li>
            <li style={{ marginBottom:8 }}>Rejected applications: deleted 12 months after the decision.</li>
            <li style={{ marginBottom:8 }}>Other applications: deleted 24 months after submission.</li>
            <li style={{ marginBottom:8 }}>Waitlist emails: deleted 18 months after collection.</li>
          </ul>
        </S>
        <S title="Third-Party Processors">
          <ul style={{ paddingLeft:24 }}>
            <li style={{ marginBottom:8 }}><strong>Google Sheets & Google Cloud:</strong> Data storage.</li>
            <li style={{ marginBottom:8 }}><strong>Resend:</strong> Email delivery.</li>
            <li style={{ marginBottom:8 }}><strong>Google reCAPTCHA v3:</strong> Spam protection.</li>
            <li style={{ marginBottom:8 }}><strong>Google Analytics 4:</strong> Anonymous usage analytics.</li>
            <li style={{ marginBottom:8 }}><strong>Vercel:</strong> Hosting platform.</li>
          </ul>
        </S>
        <S title="Your Rights"><p>You may request access to, correction of, or deletion of your data by emailing <a href="mailto:creators@melive.co" style={{ color:"#FF2E63" }}>creators@melive.co</a> with subject &quot;Privacy Request.&quot; We will respond within 30 days. California residents may exercise CCPA rights. EU residents may exercise GDPR rights including lodging a complaint with your local data protection authority.</p></S>
        <S title="Security"><p>We use HTTPS encryption, access controls, and industry-standard security practices. No system is 100% secure. Please report security concerns immediately.</p></S>
        <S title="Contact"><p>Questions? Email <a href="mailto:creators@melive.co" style={{ color:"#FF2E63" }}>creators@melive.co</a>. We aim to respond within 5 business days.</p></S>
        <div style={{ marginTop:60, paddingTop:32, borderTop:"1px solid rgba(0,0,0,0.1)" }}>
          <Link href="/" style={{ color:"#FF2E63", fontSize:14 }}>← Back to Melive Creator Lab</Link>
        </div>
      </main>
    </div>
  );
}
