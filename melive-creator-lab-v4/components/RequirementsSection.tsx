const items = [
  "<strong>50K+ followers</strong> on TikTok, Instagram, or YouTube (TikTok primary preferred)",
  "<strong>Based in the US</strong> with a stable home setup (room + power + good Wi-Fi). Any city.",
  "<strong>Authentic voice</strong> in beauty, skincare, personal care, home appliances, wellness, or lifestyle",
  "<strong>Full-time or transitioning full-time</strong> — minimum 20 hrs/week commitment to the program",
  "<strong>Coachable &amp; data-curious</strong> — you want to learn the playbook, not just freestyle",
  "<strong>Open to a 24-month live commerce partnership</strong> with Melive (you keep ownership of channel + content)",
];

export default function RequirementsSection() {
  return (
    <section id="requirements" style={{ padding: "100px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ color: "#FF2E63", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>Who we&apos;re looking for</div>
        <h2 style={{ fontSize: "clamp(36px,4.5vw,60px)", marginBottom: 20 }}>Is this you?</h2>
        <div className="req-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 50, alignItems: "start" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", fontSize: 16, lineHeight: 1.5, alignItems: "flex-start" }}>
                <span aria-hidden="true" style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "#08D9D6", color: "#0F0F12", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, marginTop: 2 }}>✓</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
          <div style={{ background: "linear-gradient(135deg,#FF2E63 0%,#7B2FF7 100%)", color: "#fff", padding: 40, borderRadius: 28 }}>
            <div style={{ color: "#fff", opacity: 0.8, fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Class Size</div>
            <h3 style={{ fontSize: 26, marginBottom: 14, color: "#fff" }}>20 creators selected. 10 reach $100K.</h3>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 64, fontWeight: 800, lineHeight: 1, margin: "20px 0 6px" }}>20</div>
            <p style={{ opacity: 0.9, fontSize: 14, lineHeight: 1.6 }}>We sign 20 because not every creator-format fit clicks in 6 months. The top 10 hit $100K GMV/mo — the rest still graduate with a working channel.</p>
            <p style={{ fontSize: 12, opacity: 0.75, marginTop: 8, fontStyle: "italic" }}>*Results target, not a guarantee.</p>
            <div style={{ marginTop: 30, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Diversity we actively seek</div>
              <div style={{ fontSize: 14, opacity: 0.95, lineHeight: 1.6 }}>Black, Latino, AAPI, LGBTQ+ creators, plus-size, millennial-mom, dad-creator, Gen-Z male beauty — we want the full US tapestry.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
