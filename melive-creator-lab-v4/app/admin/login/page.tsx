"use client";
export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/admin";
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
      if (res.ok) { router.push(from); router.refresh(); }
      else { setErr("Incorrect password."); setPw(""); }
    } catch { setErr("Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F12", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#FBF7F0", borderRadius: 24, padding: "48px 40px", width: "100%", maxWidth: 400 }}>
        <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 28, marginBottom: 8, color: "#0F0F12" }}>me<span style={{ color: "#FF2E63" }}>live</span></div>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 36 }}>Admin Dashboard</p>
        <form onSubmit={submit}>
          <label htmlFor="pw" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Admin Password</label>
          <input id="pw" type="password" value={pw} onChange={e => setPw(e.target.value)} autoFocus required placeholder="Enter admin password"
            style={{ width: "100%", fontFamily: "'Inter',sans-serif", fontSize: 15, padding: "14px 16px", border: `2px solid ${err ? "#FF2E63" : "rgba(0,0,0,0.12)"}`, borderRadius: 12, background: "#fff", outline: "none", marginBottom: 8 }} />
          {err && <p style={{ color: "#FF2E63", fontSize: 13, marginBottom: 16 }}>{err}</p>}
          {!err && <div style={{ height: 24 }} />}
          <button type="submit" disabled={loading || !pw} className="submit-btn">{loading ? "Signing in…" : "Sign In"}</button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return <Suspense fallback={null}><LoginForm /></Suspense>;
}
