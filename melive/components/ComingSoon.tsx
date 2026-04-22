import Link from "next/link";

function ComingSoonPage({ title, description }: { title: string; description: string }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0F0F12", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "20px 40px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 22, color: "#FBF7F0" }}>
            me<span style={{ color: "#FF2E63" }}>live</span>
          </span>
        </Link>
      </header>
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 24 }}>🚧</div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", color: "#FBF7F0", marginBottom: 16 }}>
            {title}
          </h1>
          <p style={{ color: "#888", fontSize: 18, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
            {description}
          </p>
          <Link href="/" style={{ display: "inline-block", background: "#FF2E63", color: "#fff", padding: "14px 28px", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>
            ← Back to Creator Lab
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ComingSoonPage;
