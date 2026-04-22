import { roadmapMonths } from "@/lib/config";

export default function RoadmapSection() {
  return (
    <section
      id="roadmap"
      style={{ padding: "100px 40px", background: "#F3EEE5" }}
    >
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
          The Path
        </div>

        <h2 style={{ fontSize: "clamp(36px, 4.5vw, 60px)", marginBottom: 20 }}>
          6 months. Tactical milestones every step.
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
          No generic advice. Every month has a concrete deliverable, a tracked
          metric, and a hard unlock to move forward. Here&apos;s exactly how the
          program runs.
        </p>

        <div
          className="roadmap-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 22,
          }}
        >
          {roadmapMonths.map((month) => (
            <div
              key={month.tag}
              style={{
                background: month.milestone ? "#FFD369" : "#fff",
                border: "2px solid #0F0F12",
                borderRadius: 22,
                padding: "28px 26px",
                position: "relative",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  background: month.milestone ? "#FF2E63" : "#0F0F12",
                  color: "#FBF7F0",
                  padding: "5px 12px",
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  marginBottom: 14,
                }}
              >
                {month.tag}
              </span>

              <h4
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 22,
                  marginBottom: 14,
                  lineHeight: 1.2,
                }}
              >
                {month.title}
              </h4>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                {month.actions.map((action, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "6px 0",
                      fontSize: 13.5,
                      color: "#333",
                      lineHeight: 1.4,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{ color: "#FF2E63", fontWeight: 700, flexShrink: 0 }}
                    >
                      ▸
                    </span>
                    {action}
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: "1px dashed rgba(0,0,0,0.2)",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  fontWeight: 700,
                  fontSize: 12.5,
                  color: month.milestone ? "#0F0F12" : "#FF2E63",
                }}
              >
                {month.metric.map((m) => (
                  <span key={m.label}>{m.label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .roadmap-grid { grid-template-columns: 1fr !important; }
          #roadmap { padding: 60px 20px !important; }
        }
      `}</style>
    </section>
  );
}
