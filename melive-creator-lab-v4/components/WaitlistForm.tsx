"use client";
import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      setDone(true);
    } finally { setLoading(false); }
  };

  if (done) return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
      <p style={{ color: "#FBF7F0", fontSize: 18, fontWeight: 600 }}>You&apos;re on the list!</p>
      <p style={{ color: "#aaa", fontSize: 14, marginTop: 6 }}>We&apos;ll email you when Class of 2027 applications open.</p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }} noValidate>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
        style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, padding: "14px 20px", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 999, background: "rgba(255,255,255,0.08)", color: "#FBF7F0", outline: "none", width: 280 }} />
      <button type="submit" disabled={loading} className="btn-primary" style={{ border: "none" }}>
        {loading ? "Joining…" : "Notify me for Class of 2027"}
      </button>
    </form>
  );
}
