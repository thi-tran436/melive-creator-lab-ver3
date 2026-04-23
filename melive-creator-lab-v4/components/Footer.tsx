"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0F0F12", color: "#888", padding: "60px 40px 40px", borderTop: "3px solid #FF2E63" }}>
      <div className="footer-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40 }}>
        <div>
          <div style={{ color: "#FBF7F0", fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 28, marginBottom: 14 }}>me<span style={{ color: "#FF2E63" }}>live</span></div>
          <p style={{ color: "#aaa", maxWidth: 320, fontSize: 14, lineHeight: 1.6 }}>The US live commerce arm of The Metub Company. Building the next generation of TikTok Shop creators.</p>
        </div>

        {[
          { title: "Program", links: [{ l: "What You Get", h: "#benefits" }, { l: "Roadmap", h: "#roadmap" }, { l: "Requirements", h: "#requirements" }, { l: "Apply", h: "#apply" }] },
          { title: "Company", links: [{ l: "About Metub", h: "https://metub.net", ext: true }, { l: "For Brands", h: "/brands" }, { l: "Press", h: "/press" }, { l: "Careers", h: "/careers" }] },
          { title: "Legal", links: [{ l: "creators@melive.co", h: "mailto:creators@melive.co" }, { l: "brands@melive.co", h: "mailto:brands@melive.co" }, { l: "Privacy Policy", h: "/privacy" }, { l: "Terms", h: "/terms" }] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ color: "#FBF7F0", fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, marginBottom: 16, fontWeight: 700 }}>{col.title}</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {col.links.map(lk => (
                <li key={lk.l} style={{ marginBottom: 8 }}>
                  {"ext" in lk && lk.ext
                    ? <a href={lk.h} target="_blank" rel="noopener noreferrer" className="footer-link">{lk.l}</a>
                    : <Link href={lk.h} className="footer-link">{lk.l}</Link>
                  }
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: "40px auto 0", paddingTop: 30, borderTop: "1px solid #222", fontSize: 13, textAlign: "center", color: "#666" }}>
        © 2026 Melive, a Metub Company. Built between New York &amp; Saigon. All rights reserved.
      </div>
    </footer>
  );
}
