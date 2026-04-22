"use client";

import { heroContent, mosaicCategories } from "@/lib/config";

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        padding: "90px 40px 80px",
        overflow: "hidden",
        background: "#FBF7F0",
      }}
    >
      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left: copy */}
        <div>
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#0F0F12",
              color: "#FBF7F0",
              padding: "8px 16px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.02em",
              marginBottom: 26,
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#08D9D6",
                display: "inline-block",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            {heroContent.eyebrow}
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(44px, 6.5vw, 88px)",
              marginBottom: 26,
              lineHeight: 1.05,
            }}
          >
            {heroContent.headline.line1}
            <span style={{ color: "#FF2E63" }}>
              {heroContent.headline.accent1}
            </span>
            <br />
            {heroContent.headline.line2}
            <br />
            {heroContent.headline.line3}
            <span
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, #FFD369 60%)",
                padding: "0 6px",
              }}
            >
              {heroContent.headline.accent2}
            </span>
            {heroContent.headline.end}
          </h1>

          {/* Lede */}
          <p
            style={{
              fontSize: 19,
              color: "#353540",
              maxWidth: 540,
              marginBottom: 34,
              lineHeight: 1.6,
            }}
          >
            {heroContent.lede}
          </p>

          {/* CTA row */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="#apply"
              aria-label="Apply for Melive Creator Lab Class of 2026"
              style={{
                background: "#FF2E63",
                color: "#fff",
                padding: "17px 32px",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(255,46,99,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "0 14px 40px rgba(255,46,99,0.45)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 10px 30px rgba(255,46,99,0.3)";
              }}
            >
              {heroContent.cta.primary}
            </a>
            <a
              href="#benefits"
              style={{
                background: "transparent",
                color: "#0F0F12",
                padding: "17px 32px",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                border: "2px solid #0F0F12",
                transition: "background 0.2s, color 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "#0F0F12";
                el.style.color = "#FBF7F0";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "transparent";
                el.style.color = "#0F0F12";
              }}
            >
              {heroContent.cta.secondary}
            </a>
          </div>

          {/* Social proof */}
          <p
            style={{
              marginTop: 28,
              fontSize: 13,
              color: "#666",
            }}
          >
            Only{" "}
            <strong style={{ color: "#0F0F12" }}>20 creators</strong>{" "}
            selected · Application closes{" "}
            <strong style={{ color: "#0F0F12" }}>May 31, 2026</strong> · No
            cost to join
          </p>
        </div>

        {/* Right: creator mosaic — abstract categories, NO fake handles */}
        <div
          className="creator-mosaic"
          aria-hidden="true"
          style={{ position: "relative", height: 560 }}
        >
          {mosaicCategories.map((cat, i) => {
            type CardPos = {
              top?: number; bottom?: number;
              left?: string | number; right?: string | number;
              width: number; height: number; rotate: number; bg: string;
            };
            const positions: CardPos[] = [
              { top: 0,   left: "20%", width: 210, height: 280, rotate: -3, bg: "linear-gradient(135deg,#FF9A8B 0%,#FF2E63 100%)" },
              { top: 60,  right: 0,    width: 230, height: 300, rotate:  4, bg: "linear-gradient(135deg,#7B2FF7 0%,#08D9D6 100%)" },
              { bottom: 80, left: 0,   width: 200, height: 270, rotate: -5, bg: "linear-gradient(135deg,#FFD369 0%,#FF6B9D 100%)" },
              { bottom: 0, right: "25%",width: 220, height: 280, rotate:  3, bg: "linear-gradient(135deg,#2F80ED 0%,#7B2FF7 100%)" },
            ];
            const pos = positions[i];

            return (
              <div
                key={cat.label}
                style={{
                  position: "absolute",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                  transition: "transform 0.4s",
                  width: pos.width,
                  height: pos.height,
                  background: pos.bg,
                  transform: `rotate(${pos.rotate}deg)`,
                  top: pos.top,
                  bottom: pos.bottom,
                  left: pos.left,
                  right: pos.right,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform =
                    "translateY(-6px) rotate(0deg)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform =
                    `rotate(${pos.rotate}deg)`)
                }
              >
                <span style={{ fontSize: 56, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}>
                  {cat.icon}
                </span>
                <span
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    textAlign: "center",
                    padding: "0 16px",
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  {cat.label}
                </span>
              </div>
            );
          })}

          {/* Disclaimer */}
          <p
            style={{
              position: "absolute",
              bottom: -28,
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: 11,
              color: "#999",
            }}
          >
            Illustrative categories only.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .creator-mosaic {
            height: 340px !important;
            margin-top: 40px;
          }
          .hero-section {
            padding: 60px 20px 80px !important;
          }
        }
      `}</style>
    </section>
  );
}
