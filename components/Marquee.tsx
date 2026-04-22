import { marqueeItems } from "@/lib/config";

export default function Marquee() {
  // Duplicate items for seamless infinite loop
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div
      aria-hidden="true"
      style={{
        background: "#0F0F12",
        color: "#FBF7F0",
        overflow: "hidden",
        padding: "22px 0",
        whiteSpace: "nowrap",
        borderTop: "3px solid #FFD369",
        borderBottom: "3px solid #08D9D6",
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: "inline-block",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: "-0.01em",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              margin: "0 40px",
              color: item === "●" ? "#FF2E63" : "#FBF7F0",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
