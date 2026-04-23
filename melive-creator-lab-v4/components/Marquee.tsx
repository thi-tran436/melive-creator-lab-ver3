const items = [
  "TIKTOK SHOP IS HERE", "●", "$100K/MO IS THE NEW NORMAL", "●",
  "WE BUILD CHANNELS, NOT POSTS", "●", "20 SIGNED · 10 SCALED", "●",
  "TIKTOK SHOP IS HERE", "●", "$100K/MO IS THE NEW NORMAL", "●",
  "WE BUILD CHANNELS, NOT POSTS", "●", "20 SIGNED · 10 SCALED", "●",
];

export default function Marquee() {
  return (
    <div aria-hidden="true" style={{ background: "#0F0F12", overflow: "hidden", padding: "22px 0", whiteSpace: "nowrap", borderTop: "3px solid #FFD369", borderBottom: "3px solid #08D9D6" }}>
      <div className="marquee-track" style={{ display: "inline-block", fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "-0.01em" }}>
        {items.map((item, i) => (
          <span key={i} style={{ margin: "0 40px", color: item === "●" ? "#FF2E63" : "#FBF7F0" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}
