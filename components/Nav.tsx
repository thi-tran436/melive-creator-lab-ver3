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
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeAndScroll = (href: string) => {
    setMenuOpen(false);
    // Allow state update before scroll
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled
            ? "rgba(251,247,240,0.96)"
            : "rgba(251,247,240,0.92)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(15,15,18,0.08)",
          transition: "background 0.2s",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 40px",
            maxWidth: 1300,
            margin: "0 auto",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Melive Creator Lab — home"
            style={{ textDecoration: "none" }}
          >
            <span
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: "-0.02em",
                color: "#0F0F12",
              }}
            >
              me<span style={{ color: "#FF2E63" }}>live</span>
              <span style={{ color: "#0F0F12", fontSize: 14, fontWeight: 600 }}>
                ·Creator Lab NYC
              </span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div
            className="hidden-mobile"
            style={{ display: "flex", gap: 28, alignItems: "center" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: "none",
                  color: "#0F0F12",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.opacity = "0.5")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.opacity = "1")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a
              href="#apply"
              aria-label="Apply Now — scroll to application form"
              style={{
                background: "#0F0F12",
                color: "#FBF7F0",
                padding: "10px 20px",
                borderRadius: 999,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                transition: "transform 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.transform = "translateY(0)")
              }
            >
              Apply Now →
            </a>

            {/* Hamburger — visible on mobile only */}
            <button
              className="show-mobile"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                fontSize: 22,
                display: "none",
                color: "#0F0F12",
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15,15,18,0.95)",
            zIndex: 49,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setMenuOpen(false);
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => closeAndScroll(link.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#FBF7F0",
                fontSize: 28,
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="#apply"
            onClick={() => setMenuOpen(false)}
            style={{
              background: "#FF2E63",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 18,
              fontWeight: 700,
              marginTop: 8,
            }}
          >
            Apply Now →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 901px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
