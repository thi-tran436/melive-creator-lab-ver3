"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Application, ApplicationStatus } from "@/types";
import { APPLICATION_STATUSES, PLATFORMS, FOLLOWER_RANGES } from "@/types";

function Badge({ status }: { status: ApplicationStatus }) {
  const colors: Record<ApplicationStatus, string> = {
    new: "background:#f0f0f0;color:#555",
    reviewing: "background:#dbeafe;color:#1d4ed8",
    shortlisted: "background:#fef3c7;color:#92400e",
    approved: "background:#dcfce7;color:#166534",
    rejected: "background:#fee2e2;color:#991b1b",
    contacted: "background:#f3e8ff;color:#581c87",
  };
  const label = APPLICATION_STATUSES.find(s => s.value === status)?.label ?? status;
  return <span style={{ display:"inline-block", padding:"3px 10px", borderRadius:999, fontSize:12, fontWeight:700, ...Object.fromEntries(colors[status].split(";").map(p => p.split(":"))) }}>{label}</span>;
}

interface ApiResponse {
  applications: Application[];
  total: number;
  page: number;
  totalPages: number;
  stats: { total: number; byStatus: Record<string, number>; byPlatform: Record<string, number> };
}

const sel: React.CSSProperties = { fontFamily:"'Inter',sans-serif", fontSize:13, padding:"8px 12px", border:"1px solid #e5e7eb", borderRadius:8, background:"#fff", outline:"none", color:"#0F0F12" };

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusF, setStatusF] = useState("");
  const [platformF, setPlatformF] = useState("");
  const [followersF, setFollowersF] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => { const t = setTimeout(() => setSearch(searchInput), 300); return () => clearTimeout(t); }, [searchInput]);
  useEffect(() => { setPage(1); }, [statusF, platformF, followersF, search]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (statusF) p.set("status", statusF);
      if (platformF) p.set("platform", platformF);
      if (followersF) p.set("followers", followersF);
      if (search) p.set("search", search);
      p.set("page", String(page));
      p.set("limit", "25");
      const res = await fetch(`/api/admin/applications?${p}`);
      if (!res.ok) throw new Error();
      setData(await res.json());
    } catch { setData(null); }
    finally { setLoading(false); }
  }, [statusF, platformF, followersF, search, page]);

  useEffect(() => { load(); }, [load]);

  const logout = async () => { await fetch("/api/admin/login", { method: "DELETE" }); router.push("/admin/login"); };
  const exportCsv = () => {
    const p = new URLSearchParams();
    if (statusF) p.set("status", statusF);
    if (platformF) p.set("platform", platformF);
    if (search) p.set("search", search);
    p.set("export", "true");
    window.open(`/api/admin/applications?${p}`, "_blank");
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f9fafb" }}>
      {/* Header */}
      <header style={{ background:"#0F0F12", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:22, color:"#FBF7F0" }}>
          me<span style={{ color:"#FF2E63" }}>live</span> <span style={{ fontSize:14, fontWeight:400, color:"#888" }}>Admin</span>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={exportCsv} style={{ ...sel, background:"#FFD369", color:"#0F0F12", fontWeight:700, cursor:"pointer", border:"none", padding:"8px 16px" }}>↓ Export CSV</button>
          <button onClick={logout} style={{ ...sel, background:"rgba(255,255,255,0.1)", color:"#FBF7F0", cursor:"pointer", border:"1px solid rgba(255,255,255,0.2)" }}>Sign Out</button>
        </div>
      </header>

      <main style={{ padding:32 }}>
        {/* Stats */}
        {data?.stats && (
          <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:24 }}>
            {[
              { label:"Total", val: data.stats.total, color:"#0F0F12" },
              { label:"New", val: data.stats.byStatus.new ?? 0, color:"#555" },
              { label:"Reviewing", val: data.stats.byStatus.reviewing ?? 0, color:"#1d4ed8" },
              { label:"Shortlisted", val: data.stats.byStatus.shortlisted ?? 0, color:"#92400e" },
              { label:"Approved", val: data.stats.byStatus.approved ?? 0, color:"#166534" },
              { label:"Rejected", val: data.stats.byStatus.rejected ?? 0, color:"#991b1b" },
            ].map(s => (
              <div key={s.label} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:"14px 20px", minWidth:90, textAlign:"center" }}>
                <div style={{ fontSize:28, fontWeight:800, color:s.color, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:12, color:"#888", marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:"20px 24px", marginBottom:20, display:"flex", gap:12, flexWrap:"wrap", alignItems:"flex-end" }}>
          {[
            { label:"SEARCH", el: <input type="text" placeholder="Name, email, handle…" value={searchInput} onChange={e => setSearchInput(e.target.value)} style={{ ...sel, width:220 }} /> },
            { label:"STATUS", el: <select value={statusF} onChange={e => setStatusF(e.target.value)} style={sel}><option value="">All statuses</option>{APPLICATION_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}</select> },
            { label:"PLATFORM", el: <select value={platformF} onChange={e => setPlatformF(e.target.value)} style={sel}><option value="">All platforms</option>{PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}</select> },
            { label:"FOLLOWERS", el: <select value={followersF} onChange={e => setFollowersF(e.target.value)} style={sel}><option value="">All ranges</option>{FOLLOWER_RANGES.map(f => <option key={f} value={f}>{f}</option>)}</select> },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize:11, fontWeight:600, color:"#888", display:"block", marginBottom:4 }}>{f.label}</label>
              {f.el}
            </div>
          ))}
          {(statusF || platformF || followersF || search) && (
            <button onClick={() => { setStatusF(""); setPlatformF(""); setFollowersF(""); setSearchInput(""); setSearch(""); }} style={{ ...sel, cursor:"pointer", color:"#FF2E63", background:"#fff5f8", border:"1px solid #FF2E63" }}>Clear</button>
          )}
          <div style={{ marginLeft:"auto", fontSize:13, color:"#888", alignSelf:"center" }}>
            {loading ? "Loading…" : `${data?.total ?? 0} result${data?.total !== 1 ? "s" : ""}`}
          </div>
        </div>

        {/* Table */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, overflow:"hidden" }}>
          {loading ? (
            <div style={{ padding:60, textAlign:"center", color:"#888" }}>Loading applications…</div>
          ) : !data || data.applications.length === 0 ? (
            <div style={{ padding:60, textAlign:"center", color:"#888" }}>No applications match your filters.</div>
          ) : (
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"#f9fafb", borderBottom:"1px solid #e5e7eb" }}>
                    {["Name","Platform","Handle","Followers","Categories","Status","Applied"].map(h => (
                      <th key={h} style={{ padding:"12px 16px", fontSize:11, fontWeight:700, color:"#888", textAlign:"left", textTransform:"uppercase", letterSpacing:"0.05em", whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.applications.map(app => (
                    <tr key={app.id} onClick={() => router.push(`/admin/applications/${app.id}`)}
                      style={{ borderBottom:"1px solid #f0f0f0", cursor:"pointer" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#fff")}>
                      <td style={{ padding:"14px 16px" }}>
                        <div style={{ fontWeight:600, fontSize:14, color:"#0F0F12" }}>{app.firstName} {app.lastName}</div>
                        <div style={{ fontSize:12, color:"#888" }}>{app.email}</div>
                        <div style={{ fontSize:12, color:"#aaa" }}>{app.cityState}</div>
                      </td>
                      <td style={{ padding:"14px 16px", fontSize:14 }}>{app.platform}</td>
                      <td style={{ padding:"14px 16px", fontSize:13, fontFamily:"monospace" }}>{app.handle}</td>
                      <td style={{ padding:"14px 16px", fontSize:13, whiteSpace:"nowrap" }}>{app.followers}</td>
                      <td style={{ padding:"14px 16px" }}>
                        <div style={{ display:"flex", gap:4, flexWrap:"wrap", maxWidth:200 }}>
                          {(app.categories ?? []).slice(0,2).map(c => <span key={c} style={{ background:"#f3f4f6", color:"#555", padding:"2px 8px", borderRadius:999, fontSize:11, fontWeight:600 }}>{c.split("/")[0].trim()}</span>)}
                          {app.categories.length > 2 && <span style={{ fontSize:11, color:"#aaa" }}>+{app.categories.length - 2}</span>}
                        </div>
                      </td>
                      <td style={{ padding:"14px 16px" }}><Badge status={app.status} /></td>
                      <td style={{ padding:"14px 16px", fontSize:12, color:"#888", whiteSpace:"nowrap" }}>
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div style={{ display:"flex", justifyContent:"center", gap:12, marginTop:24, alignItems:"center" }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ ...sel, cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.5 : 1 }}>← Previous</button>
            <span style={{ fontSize:13, color:"#666" }}>Page {page} of {data.totalPages}</span>
            <button onClick={() => setPage(p => Math.min(data.totalPages, p + 1))} disabled={page === data.totalPages} style={{ ...sel, cursor: page === data.totalPages ? "not-allowed" : "pointer", opacity: page === data.totalPages ? 0.5 : 1 }}>Next →</button>
          </div>
        )}
      </main>
    </div>
  );
}
