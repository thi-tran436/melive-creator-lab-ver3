"use client";

import { benefitCards } from "@/lib/config";

export default function BenefitsSection() {
  return (
    <section id="benefits" style={{ padding: 0 }}>
      <div
        className="benefits-wrap"
        style={{
          background: "#0F0F12",
          color: "#FBF7F0",
          borderRadius: 40,
          margin: "0 40px",
          padding: "100px 60px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              color: "#FFD369",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            What You Get
          </div>

          <h2 style={{ fontSize: "clamp(36px, 4.5vw, 60px)", marginBottom: 20, color: "#FBF7F0" }}>
            Everything you need to go from{" "}
            <span style={{ color: "#FFD369" }}>$10K to $100K</span> GMV.
          </h2>

          <p style={{ fontSize: 18, color: "#aaa", maxWidth: 680, marginBottom: 0, lineHeight: 1.6 }}>
            Nine pillars of support. All included. All on us. You bring the
            talent — we build the operating system around you.
          </p>

          <div
            className="benefits-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 22,
              marginTop: 50,
            }}
          >
            {benefitCards.map((card, i) => (
              <div
                key={i}
                style={{
                  background: card.highlight ? "#FF2E63" : "rgba(255,255,255,0.04)",
                  borderRadius: 20,
                  padding: 30,
                  border: card.highlight ? "none" : "1px solid rgba(255,255,255,0.08)",
                  transition: "background 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (!card.highlight) el.style.background = "rgba(255,255,255,0.08)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (!card.highlight) el.style.background = "rgba(255,255,255,0.04)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    marginBottom: 20,
                    background: card.iconBgColor,
                  }}
                >
                  <span style={{ color: card.iconTextColor ?? "#fff" }}>{card.icon}</span>
                </div>

                <h3
                  style={{
                    fontSize: 20,
                    marginBottom: 10,
                    color: "#fff",
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    color: card.highlight ? "rgba(255,255,255,0.95)" : "#bbb",
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  {card.body}
                </p>

                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: card.highlight
                      ? "1px solid rgba(255,255,255,0.3)"
                      : "1px solid rgba(255,255,255,0.1)",
                    color: card.highlight ? "#fff" : "#FFD369",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {card.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .benefits-wrap {
            margin: 0 16px !important;
            padding: 60px 24px !important;
            border-radius: 24px !important;
          }
          .benefits-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
