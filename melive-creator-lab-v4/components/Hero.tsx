"use client";

export default function Hero() {
  return (
    <section className="hero-section" style={{ position: "relative", padding: "90px 40px 80px", background: "#FBF7F0", overflow: "hidden" }}>
      <div className="hero-grid" style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, alignItems: "center" }}>

        {/* LEFT: Copy */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0F0F12", color: "#FBF7F0", padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, letterSpacing: "0.02em", marginBottom: 26 }}>
            <span className="pulse-dot" aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: "#08D9D6", display: "inline-block", flexShrink: 0 }} />
            Class of 2026 — Applications Open
          </div>

          <h1 style={{ fontSize: "clamp(44px,6.5vw,88px)", marginBottom: 26 }}>
            Get <span style={{ color: "#FF2E63" }}>signed.</span><br />
            Get funded.<br />
            Scale to <span style={{ background: "linear-gradient(180deg,transparent 60%,#FFD369 60%)", padding: "0 6px" }}>$100K GMV/mo</span>.
          </h1>

          <p style={{ fontSize: 19, color: "#353540", maxWidth: 540, marginBottom: 34, lineHeight: 1.6 }}>
            Melive Creator Lab NYC is a 6-month live commerce incubator for serious TikTok Shop creators. We invest equipment, samples, ad dollars, brand deals, and a dedicated growth team into 20 creators per cohort — so 10 of you scale past $100K/month. You bring the talent. We build the channel with you.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#apply" className="btn-primary">Apply for Class of 2026</a>
            <a href="#benefits" className="btn-secondary">See what&apos;s included →</a>
          </div>

          <p style={{ marginTop: 28, fontSize: 13, color: "#666" }}>
            Only <strong style={{ color: "#0F0F12" }}>20 creators</strong> selected · Application closes <strong style={{ color: "#0F0F12" }}>May 31, 2026</strong> · No cost to join
          </p>
        </div>

        {/* RIGHT: Mosaic — abstract categories, NO fake handles */}
        <div className="creator-mosaic" aria-hidden="true" style={{ position: "relative", height: 560 }}>
          {([
            { icon: "💄", label: "Beauty & Makeup", w: 210, h: 280, rotate: -3, bg: "linear-gradient(135deg,#FF9A8B,#FF2E63)", top: 0, left: "20%" },
            { icon: "🏠", label: "Home & Living",   w: 230, h: 300, rotate:  4, bg: "linear-gradient(135deg,#7B2FF7,#08D9D6)", top: 60, right: 0 },
            { icon: "💪", label: "Wellness",         w: 200, h: 270, rotate: -5, bg: "linear-gradient(135deg,#FFD369,#FF6B9D)", bottom: 80, left: 0 },
            { icon: "👗", label: "Fashion",           w: 220, h: 280, rotate:  3, bg: "linear-gradient(135deg,#2F80ED,#7B2FF7)", bottom: 0, right: "25%" },
          ] as const).map((c) => (
            <div key={c.label} className="creator-card" style={{
              width: c.w, height: c.h, background: c.bg,
              transform: `rotate(${c.rotate}deg)`,
              top: (c as { top?: number | string }).top as number | string | undefined,
              bottom: (c as { bottom?: number }).bottom as number | undefined,
              left: (c as { left?: number | string }).left as string | undefined,
              right: (c as { right?: number | string }).right as string | undefined,
            }}>
              <span style={{ fontSize: 52, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}>{c.icon}</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14, textAlign: "center", padding: "0 16px", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>{c.label}</span>
            </div>
          ))}
          <p style={{ position: "absolute", bottom: -28, left: 0, right: 0, textAlign: "center", fontSize: 11, color: "#999" }}>
            Illustrative categories only.
          </p>
        </div>
      </div>
    </section>
  );
}
