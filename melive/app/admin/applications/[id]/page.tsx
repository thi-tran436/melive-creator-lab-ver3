"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Application, ApplicationStatus } from "@/types";
import { APPLICATION_STATUSES } from "@/types";

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const found = APPLICATION_STATUSES.find((s) => s.value === status);
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 700,
        background:
          status === "new" ? "#f0f0f0" :
          status === "reviewing" ? "#dbeafe" :
          status === "shortlisted" ? "#fef3c7" :
          status === "approved" ? "#dcfce7" :
          status === "rejected" ? "#fee2e2" :
          "#f3e8ff",
        color:
          status === "new" ? "#555" :
          status === "reviewing" ? "#1d4ed8" :
          status === "shortlisted" ? "#92400e" :
          status === "approved" ? "#166534" :
          status === "rejected" ? "#991b1b" :
          "#581c87",
      }}
    >
      {found?.label ?? status}
    </span>
  );
}

function Field({ label, value }: { label: string; value?: string | string[] | null }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 15, color: "#0F0F12", lineHeight: 1.7 }}>
        {Array.isArray(value) ? (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {value.map((v) => (
              <span key={v} style={{ background: "#f3f4f6", color: "#555", padding: "4px 10px", borderRadius: 999, fontSize: 13, fontWeight: 600 }}>
                {v}
              </span>
            ))}
          </div>
        ) : (
          <span style={{ whiteSpace: "pre-wrap" }}>{value}</span>
        )}
      </div>
    </div>
  );
}

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Status update state
  const [newStatus, setNewStatus] = useState<ApplicationStatus>("new");
  const [notes, setNotes] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  // Fetch applications list and find by ID (since we use Sheets, no single-row endpoint needed)
  useEffect(() => {
    const fetchApp = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/applications?limit=1000`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        const found = data.applications.find((a: Application) => a.id === id);
        if (!found) { setError("Application not found."); return; }
        setApp(found);
        setNewStatus(found.status);
        setNotes(found.notes ?? "");
      } catch {
        setError("Failed to load application.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchApp();
  }, [id]);

  const handleUpdate = async () => {
    if (!app) return;
    setUpdating(true);
    setUpdateMsg(null);

    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, notes, sendEmail }),
      });

      if (res.ok) {
        setApp((prev) => prev ? { ...prev, status: newStatus, notes } : prev);
        setUpdateMsg(sendEmail ? "Status updated and email sent." : "Status updated successfully.");
        setTimeout(() => setUpdateMsg(null), 3000);
      } else {
        setUpdateMsg("Update failed. Please try again.");
      }
    } catch {
      setUpdateMsg("Network error. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    padding: "10px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    background: "#fff",
    outline: "none",
    width: "100%",
    color: "#0F0F12",
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#888" }}>Loading…</p>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#991b1b", marginBottom: 16 }}>{error ?? "Application not found."}</p>
          <button onClick={() => router.push("/admin")} style={{ cursor: "pointer", color: "#FF2E63" }}>
            ← Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const emailableStatuses = ["reviewing", "shortlisted", "rejected", "approved"];

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* Header */}
      <header style={{ background: "#0F0F12", padding: "16px 32px", display: "flex", alignItems: "center", gap: 20 }}>
        <button
          onClick={() => router.push("/admin")}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 14, fontFamily: "'Inter', sans-serif" }}
        >
          ← Back
        </button>
        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: "#FBF7F0" }}>
          me<span style={{ color: "#FF2E63" }}>live</span>{" "}
          <span style={{ fontSize: 14, fontWeight: 400, color: "#888" }}>
            / {app.firstName} {app.lastName}
          </span>
        </div>
      </header>

      <main style={{ padding: "32px", maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

        {/* Left: Application data */}
        <div>
          {/* Identity card */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 32, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 26, color: "#0F0F12", marginBottom: 4, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {app.firstName} {app.lastName}
                </h1>
                <div style={{ fontSize: 14, color: "#888" }}>
                  Applied {app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}
                </div>
              </div>
              <StatusBadge status={app.status} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
              <Field label="Email" value={app.email} />
              <Field label="Phone" value={app.phone} />
              <Field label="City / State" value={app.cityState} />
              <Field label="Full-time?" value={app.fulltime} />
              <Field label="Platform" value={app.platform} />
              <Field label="Handle" value={app.handle} />
              <Field label="Followers" value={app.followers} />
              <Field label="Current GMV" value={app.currentGmv} />
            </div>

            <Field label="Content Categories" value={app.categories} />
          </div>

          {/* Pitch */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 32, marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
              Pitch
            </div>
            <p style={{ fontSize: 15, color: "#0F0F12", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
              {app.pitch}
            </p>
          </div>

          {/* Links */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 32, marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
              Links
            </div>
            <div style={{ whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 2 }}>
              {(app.links ?? "").split("\n").map((line, i) => {
                const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
                if (urlMatch) {
                  return (
                    <div key={i}>
                      <a href={urlMatch[1]} target="_blank" rel="noopener noreferrer" style={{ color: "#FF2E63", wordBreak: "break-all" }}>
                        {line}
                      </a>
                    </div>
                  );
                }
                return <div key={i}>{line}</div>;
              })}
            </div>
          </div>

          {/* Attribution */}
          {(app.utmSource || app.utmMedium || app.utmCampaign) && (
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                Attribution
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <Field label="UTM Source" value={app.utmSource} />
                <Field label="UTM Medium" value={app.utmMedium} />
                <Field label="UTM Campaign" value={app.utmCampaign} />
              </div>
            </div>
          )}
        </div>

        {/* Right: Pipeline controls */}
        <div style={{ position: "sticky", top: 24 }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F0F12", marginBottom: 20 }}>
              Pipeline
            </div>

            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 6 }}>
              STATUS
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
              style={{ ...inputStyle, marginBottom: 16, cursor: "pointer", appearance: "none" }}
            >
              {APPLICATION_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>

            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 6 }}>
              INTERNAL NOTES
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes visible only to the team…"
              style={{ ...inputStyle, minHeight: 100, resize: "vertical", marginBottom: 16 }}
            />

            {emailableStatuses.includes(newStatus) && (
              <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, cursor: "pointer", fontSize: 14 }}>
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  style={{ accentColor: "#FF2E63", width: 16, height: 16 }}
                />
                <span>Notify creator by email</span>
              </label>
            )}

            <button
              onClick={handleUpdate}
              disabled={updating}
              style={{
                width: "100%",
                background: updating ? "#aaa" : "#0F0F12",
                color: "#FBF7F0",
                padding: "12px",
                borderRadius: 10,
                border: "none",
                fontWeight: 700,
                fontSize: 14,
                cursor: updating ? "not-allowed" : "pointer",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {updating ? "Updating…" : "Update Status"}
            </button>

            {updateMsg && (
              <p style={{
                marginTop: 12,
                fontSize: 13,
                textAlign: "center",
                color: updateMsg.includes("failed") || updateMsg.includes("error") ? "#FF2E63" : "#166534",
              }}>
                {updateMsg}
              </p>
            )}
          </div>

          {/* Quick info */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 24, marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
              Quick Info
            </div>
            {[
              ["Platform", app.platform],
              ["Handle", app.handle],
              ["Followers", app.followers],
              ["City", app.cityState],
            ].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}>
                <span style={{ color: "#888" }}>{label}</span>
                <span style={{ fontWeight: 600, color: "#0F0F12" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
