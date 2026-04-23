const cards = [
  { num: "01", title: "We've done this at scale", body: "Melive is the US arm of The Metub Company — Vietnam's largest MCN with 300+ creators and $40M+ in group revenue (2024). Live commerce is what we do every day. You're not the experiment." },
  { num: "02", title: "You keep your voice", body: "We don't rebrand you. We don't script you. We hand you the playbook, the gear, the samples, the ads, and a growth manager — then we get out of your way." },
  { num: "03", title: "We put money in. Period.", body: "$8–15K of equipment, sample logistics, ad budget, and hands-on support per creator. No fees. No subscriptions. We earn only when you earn." },
];

export default function WhySection() {
  return (
    <section id="why" style={{ padding: "100px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ color: "#FF2E63", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>Why Melive</div>
        <h2 style={{ fontSize: "clamp(36px,4.5vw,60px)", marginBottom: 20 }}>You&apos;re a creator. We make you a business.</h2>
        <p style={{ fontSize: 18, color: "#555", maxWidth: 680, marginBottom: 60, lineHeight: 1.6 }}>
          Most creators plateau at $5–15K GMV because nobody teaches them the live commerce playbook. We&apos;ve built one — proven across 300+ creators in Vietnam and Southeast Asia. Now we&apos;re bringing it to NYC.
        </p>
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {cards.map(c => (
            <div key={c.num} className="why-card">
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 52, fontWeight: 800, color: "#FF2E63", lineHeight: 1, marginBottom: 14 }}>{c.num}</div>
              <h3 style={{ fontSize: 22, marginBottom: 12 }}>{c.title}</h3>
              <p style={{ color: "#444", fontSize: 15, lineHeight: 1.6 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
