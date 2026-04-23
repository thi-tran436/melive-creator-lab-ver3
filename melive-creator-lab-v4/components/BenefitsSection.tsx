const benefits = [
  { icon: "🎥", bg: "#FF2E63", tc: "#fff", title: "Studio-grade home setup", body: "Pro lighting kit, 4K camera, lav mic, ring & key lights, backdrop, teleprompter. Shipped to your door in week 1, plus a 1:1 install call.", value: "$3,500–5,000 value · yours to keep" },
  { icon: "📦", bg: "#08D9D6", tc: "#0F0F12", title: "Sample sourcing & logistics", body: "Samples from our anchor brand partners arrive 5–7 days before each live. We handle procurement, returns, and tracking. You make the content.", value: "$2,000+/month sample flow" },
  { icon: "👤", bg: "#FFD369", tc: "#0F0F12", title: "Dedicated growth manager", body: "One person. Your person. Reviews your weekly metrics, fixes your funnel, books your brand deals, and is reachable when you need them.", value: "Full-time resource per creator" },
  { icon: "📈", bg: "#7B2FF7", tc: "#fff", title: "Channel optimization", body: "Bio + link-tree audit, content calendar lock, thumbnail A/B testing, hook formula library, cadence planning, algorithm signal tuning.", value: "Weekly 1:1 + dashboard" },
  { icon: "💰", bg: "#FF2E63", tc: "#fff", title: "Ad sponsorship", body: "TikTok Ads Manager + GMV Max budget on us. Our performance team scales your top videos & lives. You only see the results in your GMV.", value: "$1,500+/month/creator" },
  { icon: "🤝", bg: "#08D9D6", tc: "#0F0F12", title: "Brand deal pipeline", body: "Direct access to our anchor brand roster — beauty, personal care, home appliances. Paid partnerships and exclusive product launches reserved for the cohort.", value: "3–5 deals/mo by month 4" },
  { icon: "🎓", bg: "#FFD369", tc: "#0F0F12", title: "Live & ecom training", body: "2-day virtual bootcamp + weekly live workshops. Hook scripts, conversion frameworks, objection handling, mega-live planning, and a private resource library.", value: "Curriculum + on-demand library" },
  { icon: "📡", bg: "#7B2FF7", tc: "#fff", title: "Tech stack & analytics", body: "Streaming software, multi-cam switching plugin, comment overlays, real-time GMV dashboard, repeat-buyer tracking. Preconfigured for you.", value: "Software + setup included" },
  { icon: "⭐", bg: "#fff", tc: "#FF2E63", title: "Aligned partnership", body: "Melive earns 20% of your TikTok Shop affiliate commissions for 24 months. You keep 80%. Zero upfront cost. We win only when you win.", value: "Aligned, not extractive", highlight: true },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" style={{ padding: 0 }}>
      <div className="benefits-wrap" style={{ background: "#0F0F12", color: "#FBF7F0", borderRadius: 40, margin: "0 40px", padding: "100px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ color: "#FFD369", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>What You Get</div>
          <h2 style={{ fontSize: "clamp(36px,4.5vw,60px)", marginBottom: 20, color: "#FBF7F0" }}>
            Everything you need to go from <span style={{ color: "#FFD369" }}>$10K to $100K</span> GMV.
          </h2>
          <p style={{ fontSize: 18, color: "#aaa", maxWidth: 680, lineHeight: 1.6 }}>
            Nine pillars of support. All included. All on us. You bring the talent — we build the operating system around you.
          </p>
          <div className="benefits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22, marginTop: 50 }}>
            {benefits.map((b) => (
              <div key={b.title} className={`benefit-card${b.highlight ? " highlight" : ""}`}>
                <div aria-hidden="true" style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20, background: b.bg }}>
                  <span style={{ color: b.tc }}>{b.icon}</span>
                </div>
                <h3 style={{ fontSize: 20, marginBottom: 10, color: "#fff" }}>{b.title}</h3>
                <p style={{ color: b.highlight ? "rgba(255,255,255,0.95)" : "#bbb", fontSize: 14, lineHeight: 1.6 }}>{b.body}</p>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${b.highlight ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`, color: b.highlight ? "#fff" : "#FFD369", fontWeight: 700, fontSize: 13 }}>{b.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
