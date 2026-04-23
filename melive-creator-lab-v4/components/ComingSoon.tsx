import Link from "next/link";

export default function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0F0F12", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "20px 40px" }}>
        <Link href="/" style={{ textDecoration: "none", fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22, color: "#FBF7F0" }}>
          me<span style={{ color: "#FF2E63" }}>live</span>
        </Link>
      </header>
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 24 }}>🚧</div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: "clamp(32px,5vw,52px)", color: "#FBF7F0", marginBottom: 16 }}>{title}</h1>
          <p style={{ color: "#888", fontSize: 18, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>{description}</p>
          <Link href="/" className="btn-primary">← Back to Creator Lab</Link>
        </div>
      </main>
    </div>
  );
}
