"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        setError("Incorrect password. Please try again.");
        setPassword("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F0F12",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#FBF7F0",
          borderRadius: 24,
          padding: "48px 40px",
          width: "100%",
          maxWidth: 400,
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: 28,
            marginBottom: 8,
            color: "#0F0F12",
          }}
        >
          me<span style={{ color: "#FF2E63" }}>live</span>
        </div>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 36 }}>
          Admin Dashboard
        </p>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
              color: "#0F0F12",
            }}
          >
            Admin Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
            placeholder="Enter admin password"
            style={{
              width: "100%",
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              padding: "14px 16px",
              border: `2px solid ${error ? "#FF2E63" : "rgba(0,0,0,0.12)"}`,
              borderRadius: 12,
              background: "#fff",
              outline: "none",
              marginBottom: 8,
            }}
          />
          {error && (
            <p style={{ color: "#FF2E63", fontSize: 13, marginBottom: 16 }}>
              {error}
            </p>
          )}
          {!error && <div style={{ height: 24 }} />}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              background: loading ? "#666" : "#0F0F12",
              color: "#FBF7F0",
              padding: "14px",
              borderRadius: 12,
              border: "none",
              fontWeight: 700,
              fontSize: 15,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 12, color: "#aaa", marginTop: 24 }}>
          Set <code>ADMIN_PASSWORD</code> in your environment variables.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
