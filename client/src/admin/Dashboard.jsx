import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import api from "../api/axios";

function StatCard({ label, value, loading, accent }) {
  return (
    <div style={{
      background: "white", padding: "28px 24px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      borderTop: `3px solid ${accent || "#FBB316"}`,
      flex: "1 1 180px",
    }}>
      <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>
        {label}
      </p>
      {loading ? (
        <div style={{ height: 36, background: "#f0ede9", borderRadius: 2, width: "60%", animation: "pulse 1.4s ease infinite" }} />
      ) : (
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 40, color: "#1A1A2E", lineHeight: 1 }}>
          <CountUp end={value} duration={1.2} />
        </p>
      )}
    </div>
  );
}

function SkeletonRow({ cols }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} style={{ padding: "14px 16px" }}>
          <div style={{ height: 12, background: "#ede9e4", borderRadius: 2, width: i === 0 ? "70%" : "50%", animation: "pulse 1.4s ease infinite" }} />
        </td>
      ))}
    </tr>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({ published: 0, draft: 0, categories: 0, unread: 0 });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [pub, draft, cats, enq] = await Promise.all([
          api.get("/projects/admin/all?status=published&limit=5&page=1"),
          api.get("/projects/admin/all?status=draft&limit=5&page=1"),
          api.get("/categories"),
          api.get("/enquiries?status=unread"),
        ]);
        setStats({
          published: pub.data.total,
          draft: draft.data.total,
          categories: cats.data.length,
          unread: enq.data.length,
        });
        setRecentProjects(pub.data.projects.slice(0, 5));
        const enqAll = await api.get("/enquiries");
        setRecentEnquiries(enqAll.data.slice(0, 5));
      } catch { /* silent */ }
      finally { setLoading(false); }
    }
    load();
  }, []);

  const fmt = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 30, color: "#1A1A2E", marginBottom: 4 }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 13, color: "#888" }}>Welcome back. Here's what's happening.</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 40 }}>
        <StatCard label="Published Projects" value={stats.published} loading={loading} accent="#FBB316" />
        <StatCard label="Draft Projects" value={stats.draft} loading={loading} accent="#94a3b8" />
        <StatCard label="Total Categories" value={stats.categories} loading={loading} accent="#1A1A2E" />
        <StatCard label="Unread Enquiries" value={stats.unread} loading={loading} accent="#ef4444" />
      </div>

      {/* Quick Actions */}
      <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
        <Link to="/admin/projects" style={{
          background: "#FBB316", color: "white", textDecoration: "none",
          padding: "10px 22px", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: 8,
        }}>
          + Add New Project
        </Link>
        <Link to="/admin/enquiries" style={{
          background: "white", color: "#1A1A2E", textDecoration: "none",
          padding: "10px 22px", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
          border: "1px solid #e5e0d8", display: "inline-flex", alignItems: "center", gap: 8,
        }}>
          View Enquiries{stats.unread > 0 && ` (${stats.unread} unread)`}
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Recent Projects */}
        <div style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #f0ede9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, color: "#1A1A2E" }}>Recent Projects</h2>
            <Link to="/admin/projects" style={{ fontSize: 11, color: "#FBB316", textDecoration: "none", letterSpacing: "0.08em" }}>View all →</Link>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0ede9" }}>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>Title</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>Status</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} cols={3} />)
              ) : recentProjects.length === 0 ? (
                <tr><td colSpan={3} style={{ padding: "28px 16px", textAlign: "center", color: "#bbb", fontSize: 13 }}>No projects yet</td></tr>
              ) : recentProjects.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f9f7f5" }}>
                  <td style={{ padding: "13px 16px", color: "#2F3142", fontWeight: 500, maxWidth: 160 }}>
                    <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</span>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
                      padding: "3px 8px",
                      background: p.status === "published" ? "#dcfce7" : "#f1f5f9",
                      color: p.status === "published" ? "#15803d" : "#64748b",
                    }}>{p.status}</span>
                  </td>
                  <td style={{ padding: "13px 16px", color: "#888", fontSize: 12 }}>{fmt(p.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Enquiries */}
        <div style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #f0ede9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, color: "#1A1A2E" }}>Recent Enquiries</h2>
            <Link to="/admin/enquiries" style={{ fontSize: 11, color: "#FBB316", textDecoration: "none", letterSpacing: "0.08em" }}>View all →</Link>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0ede9" }}>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>Name</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>Service</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} cols={3} />)
              ) : recentEnquiries.length === 0 ? (
                <tr><td colSpan={3} style={{ padding: "28px 16px", textAlign: "center", color: "#bbb", fontSize: 13 }}>No enquiries yet</td></tr>
              ) : recentEnquiries.map(e => (
                <tr key={e.id} style={{ borderBottom: "1px solid #f9f7f5", background: !e.read_status ? "rgba(251,179,22,0.04)" : "transparent" }}>
                  <td style={{ padding: "13px 16px", color: "#2F3142", fontWeight: !e.read_status ? 600 : 400 }}>
                    {e.name || "—"}
                  </td>
                  <td style={{ padding: "13px 16px", color: "#888", fontSize: 12 }}>{e.service || "—"}</td>
                  <td style={{ padding: "13px 16px", color: "#888", fontSize: 12 }}>{fmt(e.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media(max-width:900px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
