const months = [
  { tag: "MONTH 1 · ACTIVATE", title: "Home studio install + channel reset", actions: ["Equipment ships day 3; live 1:1 install call (lighting, audio, camera angle)", "2-day virtual bootcamp: TikTok Shop algorithm, live commerce 101, conversion frameworks", "Channel audit: bio rewrite, link-tree, pinned video swap, niche positioning lock", "Baseline GMV + view-through-rate captured for benchmark", "First 4 short-form videos shipped under new format"], metrics: ["Goal: 1 test live", "Baseline GMV captured"], milestone: false },
  { tag: "MONTH 2 · DISCOVER", title: "Format sprint — find your winning hook", actions: ["Test 4 live formats (try-on / GRWM / demo+Q&A / mini-haul) — 1 per week, 60 min each", "Ship 12 short-form videos; identify top 2 hook formulas via watch-time data", "Sample-of-the-week starts: 1 anchor product reviewed live + 3 short-form supports", "First weekly metrics dashboard delivered (CTR, AVT, AOV, conversion)"], metrics: ["Cadence: 4 lives/mo", "$10K GMV target"], milestone: false },
  { tag: "MONTH 3 · LOCK CADENCE", title: "3 lives/week + first co-hosted brand live", actions: ["Lock weekly schedule: 3 lives × 75 min each (2 solo + 1 co-hosted with anchor brand)", "Conversion script library complete: 8 hook scripts, 12 objection-handling responses", "SOPs locked: pre-live checklist, run-of-show template, post-live recap", "Funnel built: live → bio → product collection → repeat-buyer SMS via TikTok Shop CRM"], metrics: ["Cadence: 12 lives/mo", "$30K GMV target"], milestone: false },
  { tag: "MONTH 4 · AMPLIFY", title: "Paid media turn-on + thumbnail engine", actions: ["Top 5 organic videos boosted via TikTok Ads ($300–500 each, ROAS-tracked)", "GMV Max enabled on top 3 product SKUs; daily ad-spend pacing review", "Live retargeting setup: viewers who watched 30s+ get a 24-hour ad reminder", "Weekly thumbnail A/B test (2 variants per live), daily caption A/B test"], metrics: ["3 active ad sets", "$55K GMV target"], milestone: false },
  { tag: "MONTH 5 · SCALE", title: "Multi-brand portfolio + monthly mega live", actions: ["Add 2 secondary brand partnerships (3 active brand SKUs in rotation)", "One mega live per month (3+ hours, 8+ products, multi-creator collab option)", "Repeat-buyer flow live: SMS + email re-engagement post-purchase", "Cross-creator collab live with 1 cohort peer (audience exchange)"], metrics: ["5+ active SKUs", "$80K GMV target"], milestone: false },
  { tag: "MONTH 6 · GRADUATE", title: "$100K/mo locked + cohort mentor track", actions: ["Sustained 4+ lives/week; one mega live every 3 weeks", "5+ active brand deals at any moment; 30%+ repeat-buyer rate", "Ad spend self-funding via commissions (positive ROAS at scale)", "Eligible to mentor next cohort + earn additional rev share"], metrics: ["4+ lives/wk locked", "$100K+ GMV achieved"], milestone: true },
];

export default function RoadmapSection() {
  return (
    <section id="roadmap" style={{ padding: "100px 40px", background: "#F3EEE5" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ color: "#FF2E63", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>The Path</div>
        <h2 style={{ fontSize: "clamp(36px,4.5vw,60px)", marginBottom: 20 }}>6 months. Tactical milestones every step.</h2>
        <p style={{ fontSize: 18, color: "#555", maxWidth: 680, marginBottom: 60, lineHeight: 1.6 }}>No generic advice. Every month has a concrete deliverable, a tracked metric, and a hard unlock. Here&apos;s exactly how the program runs.</p>
        <div className="roadmap-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 22 }}>
          {months.map(m => (
            <div key={m.tag} style={{ background: m.milestone ? "#FFD369" : "#fff", border: "2px solid #0F0F12", borderRadius: 22, padding: "28px 26px" }}>
              <span style={{ display: "inline-block", background: m.milestone ? "#FF2E63" : "#0F0F12", color: "#FBF7F0", padding: "5px 12px", borderRadius: 999, fontWeight: 700, fontSize: 12, letterSpacing: "0.04em", marginBottom: 14 }}>{m.tag}</span>
              <h4 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, marginBottom: 14, lineHeight: 1.2 }}>{m.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                {m.actions.map((a, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, padding: "6px 0", fontSize: 13.5, color: "#333", lineHeight: 1.4 }}>
                    <span aria-hidden="true" style={{ color: "#FF2E63", fontWeight: 700, flexShrink: 0 }}>▸</span>{a}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px dashed rgba(0,0,0,0.2)", display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 12.5, color: m.milestone ? "#0F0F12" : "#FF2E63" }}>
                {m.metrics.map(mt => <span key={mt}>{mt}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
