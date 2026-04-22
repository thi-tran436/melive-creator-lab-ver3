import { whyCards } from "@/lib/config";

export default function WhySection() {
  return (
    <section id="why" style={{ padding: "100px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-block",
            color: "#FF2E63",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          Why Melive
        </div>

        <h2
          style={{
            fontSize: "clamp(36px, 4.5vw, 60px)",
            marginBottom: 20,
          }}
        >
          You&apos;re a creator. We make you a business.
        </h2>

        <p
          style={{
            fontSize: 18,
            color: "#555",
            maxWidth: 680,
            marginBottom: 60,
            lineHeight: 1.6,
          }}
        >
          Most creators plateau at $5–15K GMV because nobody teaches them the
          live commerce playbook. We&apos;ve built one — proven across 300+
          creators across Vietnam, Southeast Asia, and partnering with the
          operators who pioneered live commerce in Asia. Now we&apos;re bringing
          it to NYC.
        </p>

        <div
          className="why-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {whyCards.map((card) => (
            <div
              key={card.num}
              style={{
                background: "#fff",
                borderRadius: 24,
                padding: 34,
                border: "2px solid #0F0F12",
                position: "relative",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.transform =
                  "translateY(-6px)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)")
              }
            >
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 52,
                  fontWeight: 800,
                  color: "#FF2E63",
                  lineHeight: 1,
                  marginBottom: 14,
                }}
              >
                {card.num}
              </div>
              <h3 style={{ fontSize: 22, marginBottom: 12 }}>{card.title}</h3>
              <p style={{ color: "#444", fontSize: 15, lineHeight: 1.6 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr !important; }
          #why { padding: 60px 20px !important; }
        }
      `}</style>
    </section>
  );
}
