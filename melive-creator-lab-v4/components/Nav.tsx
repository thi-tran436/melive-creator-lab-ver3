"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Why Sign", href: "#why" },
  { label: "What You Get", href: "#benefits" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Requirements", href: "#requirements" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(251,247,240,0.96)" : "rgba(251,247,240,0.92)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(15,15,18,0.08)", transition: "background 0.2s",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", maxWidth: 1300, margin: "0 auto" }}>
          <Link href="/" style={{ textDecoration: "none", fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em", color: "#0F0F12" }}>
            me<span style={{ color: "#FF2E63" }}>live</span>
            <span style={{ color: "#0F0F12", fontSize: 14, fontWeight: 600 }}>·Creator Lab NYC</span>
          </Link>
          <div className="nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navLinks.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="#apply" className="btn-nav">Apply Now →</a>
            <button
              className="hamburger-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#0F0F12" }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget) setMenuOpen(false); }}
          style={{ position: "fixed", inset: 0, background: "rgba(15,15,18,0.95)", zIndex: 49, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          {navLinks.map(l => (
            <button key={l.href} onClick={() => { setMenuOpen(false); setTimeout(() => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }), 50); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#FBF7F0", fontSize: 28, fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800 }}>
              {l.label}
            </button>
          ))}
          <a href="#apply" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ fontSize: 18, marginTop: 8 }}>Apply Now →</a>
        </div>
      )}
    </>
  );
}
