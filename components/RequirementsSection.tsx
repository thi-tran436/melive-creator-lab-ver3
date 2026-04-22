import { requirementItems, siteConfig } from "@/lib/config";

export default function RequirementsSection() {
  return (
    <section id="requirements" style={{ padding: "100px 40px" }}>
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
          Who we&apos;re looking for
        </div>

        <h2 style={{ fontSize: "clamp(36px, 4.5vw, 60px)", marginBottom: 20 }}>
          Is this you?
        </h2>

        <div
          className="req-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            marginTop: 50,
            alignItems: "start",
          }}
        >
          {/* Checklist */}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {requirementItems.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  fontSize: 16,
                  lineHeight: 1.5,
                  alignItems: "flex-start",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#08D9D6",
                    color: "#0F0F12",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 14,
                    marginTop: 2,
                  }}
                >
                  ✓
                </span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>

          {/* Panel */}
          <div
            style={{
              background: "linear-gradient(135deg, #FF2E63 0%, #7B2FF7 100%)",
              color: "#fff",
              padding: 40,
              borderRadius: 28,
            }}
          >
            <div
              style={{
                color: "#fff",
                opacity: 0.8,
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Class Size
            </div>

            <h3 style={{ fontSize: 26, marginBottom: 14, color: "#fff" }}>
              {siteConfig.cohort.totalSelected} creators selected.{" "}
              {siteConfig.cohort.targetHits100K} reach $100K.
            </h3>

            <div
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1,
                margin: "20px 0 6px",
              }}
            >
              {siteConfig.cohort.totalSelected}
            </div>

            <p style={{ opacity: 0.9, fontSize: 14, lineHeight: 1.6 }}>
              We sign {siteConfig.cohort.totalSelected} because not every
              creator-format fit clicks in 6 months. We over-invest so the top{" "}
              {siteConfig.cohort.targetHits100K} hit $100K GMV/mo — the rest
              still graduate with a working channel.
            </p>

            <p
              style={{
                fontSize: 12,
                opacity: 0.75,
                marginTop: 8,
                fontStyle: "italic",
              }}
            >
              *Results target, not a guarantee.
            </p>

            <div
              style={{
                marginTop: 30,
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                Diversity we actively seek
              </div>
              <div style={{ fontSize: 14, opacity: 0.95, lineHeight: 1.6 }}>
                Black, Latino, AAPI, LGBTQ+ creators, plus-size,
                millennial-mom, dad-creator, Gen-Z male beauty — we want the
                full US tapestry, not a monoculture.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .req-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          #requirements { padding: 60px 20px !important; }
        }
      `}</style>
    </section>
  );
}
