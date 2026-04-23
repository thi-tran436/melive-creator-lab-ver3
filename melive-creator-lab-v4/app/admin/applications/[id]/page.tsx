"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Application, ApplicationStatus } from "@/types";
import { APPLICATION_STATUSES } from "@/types";

function Badge({ status }: { status: ApplicationStatus }) {
  const colors: Record<ApplicationStatus, string> = {
    new:"background:#f0f0f0;color:#555", reviewing:"background:#dbeafe;color:#1d4ed8",
    shortlisted:"background:#fef3c7;color:#92400e", approved:"background:#dcfce7;color:#166534",
    rejected:"background:#fee2e2;color:#991b1b", contacted:"background:#f3e8ff;color:#581c87",
  };
  return <span style={{ display:"inline-block", padding:"4px 12px", borderRadius:999, fontSize:13, fontWeight:700, ...Object.fromEntries(colors[status].split(";").map(p => p.split(":"))) }}>{APPLICATION_STATUSES.find(s => s.value === status)?.label ?? status}</span>;
}

function Row({ label, value }: { label: string; value?: string | string[] | null }) {
  if (!value || (Array.isArray(value) && !value.length)) return null;
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{label}</div>
      {Array.isArray(value)
        ? <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{value.map(v => <span key={v} style={{ background:"#f3f4f6", color:"#555", padding:"3px 10px", borderRadius:999, fontSize:13, fontWeight:600 }}>{v}</span>)}</div>
        : <div style={{ fontSize:15, color:"#0F0F12", lineHeight:1.7, whiteSpace:"pre-wrap" }}>{value}</div>
      }
    </div>
  );
}

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>("new");
  const [notes, setNotes] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/admin/applications?limit=2000`);
        const data = await res.json();
        const found = data.applications?.find((a: Application) => a.id === id);
        if (found) { setApp(found); setNewStatus(found.status); setNotes(found.notes ?? ""); }
      } finally { setLoading(false); }
    })();
  }, [id]);

  const update = async () => {
    if (!app) return;
    setUpdating(true); setMsg(null);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ status:newStatus, notes, sendEmail }) });
      if (res.ok) { setApp(a => a ? { ...a, status:newStatus, notes } : a); setMsg(sendEmail ? "Updated and email sent." : "Updated."); setTimeout(() => setMsg(null), 3000); }
      else setMsg("Update failed.");
    } catch { setMsg("Network error."); }
    finally { setUpdating(false); }
  };

  const inp: React.CSSProperties = { fontFamily:"'Inter',sans-serif", fontSize:14, padding:"10px 14px", border:"1px solid #e5e7eb", borderRadius:10, background:"#fff", outline:"none", width:"100%", color:"#0F0F12" };

  if (loading) return <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f9fafb", color:"#888" }}>Loading…</div>;
  if (!app) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f9fafb" }}>
      <div style={{ textAlign:"center" }}>
        <p style={{ color:"#991b1b", marginBottom:16 }}>Application not found.</p>
        <button onClick={() => router.push("/admin")} style={{ color:"#FF2E63", background:"none", border:"none", cursor:"pointer" }}>← Back</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#f9fafb" }}>
      <header style={{ background:"#0F0F12", padding:"16px 32px", display:"flex", alignItems:"center", gap:16 }}>
        <button onClick={() => router.push("/admin")} style={{ background:"none", border:"none", cursor:"pointer", color:"#aaa", fontSize:14, fontFamily:"'Inter',sans-serif" }}>← Back</button>
        <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:20, color:"#FBF7F0" }}>
          me<span style={{ color:"#FF2E63" }}>live</span> <span style={{ fontSize:14, fontWeight:400, color:"#888" }}>/ {app.firstName} {app.lastName}</span>
        </div>
      </header>

      <main style={{ padding:32, maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 320px", gap:24, alignItems:"start" }}>
        <div>
          {/* Identity */}
          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:32, marginBottom:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
              <div>
                <h1 style={{ fontSize:26, color:"#0F0F12", fontFamily:"'Bricolage Grotesque',sans-serif", marginBottom:4 }}>{app.firstName} {app.lastName}</h1>
                <div style={{ fontSize:14, color:"#888" }}>Applied {app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" }) : "—"}</div>
              </div>
              <Badge status={app.status} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 32px" }}>
              <Row label="Email" value={app.email} />
              <Row label="Phone" value={app.phone} />
              <Row label="City / State" value={app.cityState} />
              <Row label="Full-time?" value={app.fulltime} />
              <Row label="Platform" value={app.platform} />
              <Row label="Handle" value={app.handle} />
              <Row label="Followers" value={app.followers} />
              <Row label="Current GMV" value={app.currentGmv} />
            </div>
            <Row label="Content Categories" value={app.categories} />
          </div>

          {/* Pitch */}
          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:32, marginBottom:20 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:12 }}>Pitch</div>
            <p style={{ fontSize:15, color:"#0F0F12", lineHeight:1.8 }}>{app.pitch}</p>
          </div>

          {/* Links */}
          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:32 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:12 }}>Links</div>
            {(app.links ?? "").split("\n").map((line, i) => {
              const url = line.match(/(https?:\/\/[^\s]+)/)?.[1];
              return <div key={i} style={{ fontSize:14, lineHeight:2 }}>{url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{ color:"#FF2E63", wordBreak:"break-all" }}>{line}</a> : line}</div>;
            })}
          </div>
        </div>

        {/* Pipeline sidebar */}
        <div style={{ position:"sticky", top:24 }}>
          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:28, marginBottom:16 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#0F0F12", marginBottom:20 }}>Pipeline</div>
            <label style={{ fontSize:12, fontWeight:600, color:"#888", display:"block", marginBottom:6 }}>STATUS</label>
            <select value={newStatus} onChange={e => setNewStatus(e.target.value as ApplicationStatus)} style={{ ...inp, marginBottom:16, cursor:"pointer", appearance:"none" }}>
              {APPLICATION_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <label style={{ fontSize:12, fontWeight:600, color:"#888", display:"block", marginBottom:6 }}>INTERNAL NOTES</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Team notes (not visible to applicant)…" style={{ ...inp, minHeight:100, resize:"vertical", marginBottom:16 }} />
            {["reviewing","shortlisted","rejected","approved"].includes(newStatus) && (
              <label style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, cursor:"pointer", fontSize:14 }}>
                <input type="checkbox" checked={sendEmail} onChange={e => setSendEmail(e.target.checked)} style={{ accentColor:"#FF2E63", width:16, height:16 }} />
                Notify creator by email
              </label>
            )}
            <button onClick={update} disabled={updating} style={{ width:"100%", background:updating?"#aaa":"#0F0F12", color:"#FBF7F0", padding:12, borderRadius:10, border:"none", fontWeight:700, fontSize:14, cursor:updating?"not-allowed":"pointer", fontFamily:"'Inter',sans-serif" }}>
              {updating ? "Updating…" : "Update Status"}
            </button>
            {msg && <p style={{ marginTop:12, fontSize:13, textAlign:"center", color: msg.includes("fail")||msg.includes("error") ? "#FF2E63" : "#166534" }}>{msg}</p>}
          </div>

          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:24 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:12 }}>Quick Info</div>
            {[["Platform",app.platform],["Handle",app.handle],["Followers",app.followers],["City",app.cityState]].map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #f0f0f0", fontSize:13 }}>
                <span style={{ color:"#888" }}>{k}</span>
                <span style={{ fontWeight:600, color:"#0F0F12" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
