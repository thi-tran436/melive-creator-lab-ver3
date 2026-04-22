"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Application, ApplicationStatus } from "@/types";
import { APPLICATION_STATUSES, PLATFORMS, FOLLOWER_RANGES } from "@/types";

// ---- Status badge ----
function StatusBadge({ status }: { status: ApplicationStatus }) {
  const found = APPLICATION_STATUSES.find((s) => s.value === status);
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 12,
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

// ---- Stats row ----
function StatsRow({ stats }: { stats: Record<string, number> }) {
  const items = [
    { label: "Total", value: stats.total ?? 0, color: "#0F0F12" },
    { label: "New", value: stats.new ?? 0, color: "#666" },
    { label: "Reviewing", value: stats.reviewing ?? 0, color: "#1d4ed8" },
    { label: "Shortlisted", value: stats.shortlisted ?? 0, color: "#92400e" },
    { label: "Approved", value: stats.approved ?? 0, color: "#166534" },
    { label: "Rejected", value: stats.rejected ?? 0, color: "#991b1b" },
  ];
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: "14px 20px",
            minWidth: 100,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 800, color: item.color, lineHeight: 1 }}>
            {item.value}
          </div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

interface ApiResponse {
  applications: Application[];
  total: number;
  page: number;
  totalPages: number;
  stats: { total: number; byStatus: Record<string, number>; byPlatform: Record<string, number> };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [status, setStatus] = useState("");
  const [platform, setPlatform] = useState("");
  const [followers, setFollowers] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [status, platform, followers, search]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (platform) params.set("platform", platform);
      if (followers) params.set("followers", followers);
      if (search) params.set("search", search);
      params.set("page", String(page));
      params.set("limit", "25");

      const res = await fetch(`/api/admin/applications?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to load applications. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [status, platform, followers, search, page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleExport = async () => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (platform) params.set("platform", platform);
    if (followers) params.set("followers", followers);
    if (search) params.set("search", search);
    params.set("export", "true");
    window.open(`/api/admin/applications?${params.toString()}`, "_blank");
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  const clearFilters = () => {
    setStatus(""); setPlatform(""); setFollowers("");
    setSearchInput(""); setSearch(""); setPage(1);
  };

  const hasFilters = status || platform || followers || search;

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    background: "#fff",
    outline: "none",
    color: "#0F0F12",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* Top bar */}
      <header
        style={{
          background: "#0F0F12",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: "#FBF7F0",
          }}
        >
          me<span style={{ color: "#FF2E63" }}>live</span>{" "}
          <span style={{ fontSize: 14, fontWeight: 500, color: "#aaa" }}>
            Admin
          </span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={handleExport}
            style={{
              ...inputStyle,
              background: "#FFD369",
              color: "#0F0F12",
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
              padding: "8px 16px",
            }}
          >
            ↓ Export CSV
          </button>
          <button
            onClick={handleLogout}
            style={{
              ...inputStyle,
              background: "rgba(255,255,255,0.1)",
              color: "#FBF7F0",
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main style={{ padding: "32px" }}>
        {/* Stats */}
        {data?.stats && (
          <StatsRow
            stats={{
              total: data.stats.total,
              ...data.stats.byStatus,
            }}
          />
        )}

        {/* Filters */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: "20px 24px",
            marginBottom: 20,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "flex-end",
          }}
        >
          {/* Search */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#888", display: "block", marginBottom: 4 }}>
              SEARCH
            </label>
            <input
              type="text"
              placeholder="Name, email, handle…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ ...inputStyle, width: 220 }}
            />
          </div>

          {/* Status filter */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#888", display: "block", marginBottom: 4 }}>
              STATUS
            </label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
              <option value="">All statuses</option>
              {APPLICATION_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Platform filter */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#888", display: "block", marginBottom: 4 }}>
              PLATFORM
            </label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={inputStyle}>
              <option value="">All platforms</option>
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Followers filter */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#888", display: "block", marginBottom: 4 }}>
              FOLLOWERS
            </label>
            <select value={followers} onChange={(e) => setFollowers(e.target.value)} style={inputStyle}>
              <option value="">All ranges</option>
              {FOLLOWER_RANGES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              style={{ ...inputStyle, cursor: "pointer", color: "#FF2E63", background: "#fff5f8", border: "1px solid #FF2E63" }}
            >
              Clear filters
            </button>
          )}

          <div style={{ marginLeft: "auto", fontSize: 13, color: "#888", alignSelf: "center" }}>
            {loading ? "Loading…" : `${data?.total ?? 0} result${data?.total !== 1 ? "s" : ""}`}
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div style={{ background: "#fee2e2", color: "#991b1b", padding: "14px 20px", borderRadius: 12, marginBottom: 20 }}>
            {error}
          </div>
        )}

        {/* Table */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div style={{ padding: 60, textAlign: "center", color: "#888" }}>
              Loading applications…
            </div>
          ) : data?.applications.length === 0 ? (
            <div style={{ padding: 60, textAlign: "center", color: "#888" }}>
              No applications match your filters.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                    {["Name", "Platform", "Handle", "Followers", "Categories", "Status", "Applied"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#888",
                          textAlign: "left",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.applications.map((app) => (
                    <tr
                      key={app.id}
                      onClick={() => router.push(`/admin/applications/${app.id}`)}
                      style={{
                        borderBottom: "1px solid #f0f0f0",
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "#f9fafb")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "#fff")
                      }
                    >
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: "#0F0F12" }}>
                          {app.firstName} {app.lastName}
                        </div>
                        <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                          {app.email}
                        </div>
                        <div style={{ fontSize: 12, color: "#aaa" }}>{app.cityState}</div>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 14, color: "#0F0F12" }}>
                        {app.platform}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 14, color: "#0F0F12", fontFamily: "monospace" }}>
                        {app.handle}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#555", whiteSpace: "nowrap" }}>
                        {app.followers}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", maxWidth: 200 }}>
                          {(app.categories ?? []).slice(0, 2).map((cat) => (
                            <span
                              key={cat}
                              style={{
                                background: "#f3f4f6",
                                color: "#555",
                                padding: "2px 8px",
                                borderRadius: 999,
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                            >
                              {cat.split("/")[0].trim()}
                            </span>
                          ))}
                          {app.categories.length > 2 && (
                            <span style={{ fontSize: 11, color: "#aaa", padding: "2px 4px" }}>
                              +{app.categories.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <StatusBadge status={app.status} />
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 12, color: "#888", whiteSpace: "nowrap" }}>
                        {app.createdAt
                          ? new Date(app.createdAt).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric",
                            })
                          : "—"}
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
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24, alignItems: "center" }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                ...inputStyle,
                cursor: page === 1 ? "not-allowed" : "pointer",
                opacity: page === 1 ? 0.5 : 1,
                padding: "8px 16px",
              }}
            >
              ← Previous
            </button>
            <span style={{ fontSize: 13, color: "#666" }}>
              Page {page} of {data.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
              style={{
                ...inputStyle,
                cursor: page === data.totalPages ? "not-allowed" : "pointer",
                opacity: page === data.totalPages ? 0.5 : 1,
                padding: "8px 16px",
              }}
            >
              Next →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
