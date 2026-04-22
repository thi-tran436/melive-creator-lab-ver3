import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0F0F12",
        color: "#888",
        padding: "60px 40px 40px",
        borderTop: "3px solid #FF2E63",
      }}
    >
      <div
        className="footer-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        {/* Brand column */}
        <div>
          <div
            style={{
              color: "#FBF7F0",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 28,
              marginBottom: 14,
            }}
          >
            me<span style={{ color: "#FF2E63" }}>live</span>
          </div>
          <p style={{ color: "#aaa", maxWidth: 320, fontSize: 14, lineHeight: 1.6 }}>
            The US live commerce arm of The Metub Company. Building the next
            generation of TikTok Shop creators.
          </p>
        </div>

        {/* Program links */}
        <div>
          <h4
            style={{
              color: "#FBF7F0",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 16,
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            Program
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {footerLinks.program.map((link) => (
              <li key={link.label} style={{ marginBottom: 8 }}>
                <a
                  href={link.href}
                  style={{
                    color: "#888",
                    textDecoration: "none",
                    fontSize: 14,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#FBF7F0")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "#888")
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company links */}
        <div>
          <h4
            style={{
              color: "#FBF7F0",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 16,
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            Company
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {footerLinks.company.map((link) => (
              <li key={link.label} style={{ marginBottom: 8 }}>
                {"external" in link && link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#888",
                      textDecoration: "none",
                      fontSize: 14,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "#FBF7F0")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "#888")
                    }
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    style={{
                      color: "#888",
                      textDecoration: "none",
                      fontSize: 14,
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact links */}
        <div>
          <h4
            style={{
              color: "#FBF7F0",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 16,
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            Contact & Legal
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {footerLinks.contact.map((link) => (
              <li key={link.label} style={{ marginBottom: 8 }}>
                <a
                  href={link.href}
                  style={{
                    color: "#888",
                    textDecoration: "none",
                    fontSize: 14,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#FBF7F0")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "#888")
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "40px auto 0",
          paddingTop: 30,
          borderTop: "1px solid #222",
          fontSize: 13,
          textAlign: "center",
          color: "#666",
        }}
      >
        © {siteConfig.cohort.year} Melive, a Metub Company. Built between New
        York &amp; Saigon. All rights reserved.
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          footer { padding: 48px 20px 32px !important; }
        }
      `}</style>
    </footer>
  );
}
