import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const GOLD = "#C9A96E";
const NAVY = "#1A1A2E";

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(26,26,46,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300 }} onClick={onCancel}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", width: 400, padding: "32px 28px", boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
        <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: NAVY, marginBottom: 16 }}>Confirm Delete</h3>
        <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, marginBottom: 28 }}>{message}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{ padding: "9px 20px", background: "white", border: "1px solid #e0dbd3", fontSize: 13, cursor: "pointer", color: "#555" }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: "9px 20px", background: "#ef4444", color: "white", border: "none", fontSize: 13, cursor: "pointer" }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ enquiry, onClose, onRead, onUnread, onDelete }) {
  const fmt = d => d ? new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(26,26,46,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", width: "100%", maxWidth: 560, padding: "36px 32px", boxShadow: "0 24px 64px rgba(0,0,0,0.25)", animation: "modalIn 0.18s ease" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: NAVY }}>Enquiry from {enquiry.name || "Unknown"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#999", lineHeight: 1 }}>×</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 20 }}>
          {[["Email", enquiry.email], ["Phone", enquiry.phone], ["Service", enquiry.service], ["Date", fmt(enquiry.created_at)]].map(([k, v]) => (
            <div key={k}>
              <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: 3 }}>{k}</p>
              <p style={{ fontSize: 14, color: "#333" }}>{v || "—"}</p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: 8 }}>Message</p>
          <div style={{ background: "#f9f7f5", padding: "16px", fontSize: 14, lineHeight: 1.7, color: "#333", whiteSpace: "pre-wrap", borderLeft: `3px solid ${GOLD}` }}>
            {enquiry.message || "—"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {enquiry.read_status ? (
            <button onClick={() => onUnread(enquiry.id)} style={{ padding: "8px 18px", background: "white", border: "1px solid #e0dbd3", fontSize: 12, cursor: "pointer", color: "#555" }}>
              Mark Unread
            </button>
          ) : (
            <button onClick={() => onRead(enquiry.id)} style={{ padding: "8px 18px", background: "white", border: `1px solid ${GOLD}`, fontSize: 12, cursor: "pointer", color: GOLD }}>
              Mark Read
            </button>
          )}
          {enquiry.email && (
            <a href={`mailto:${enquiry.email}`} style={{ padding: "8px 18px", background: NAVY, color: "white", fontSize: 12, textDecoration: "none", display: "inline-block" }}>
              Reply via Email
            </a>
          )}
          <button onClick={() => onDelete(enquiry)} style={{ padding: "8px 18px", background: "white", border: "1px solid #fca5a5", fontSize: 12, cursor: "pointer", color: "#ef4444", marginLeft: "auto" }}>
            Delete
          </button>
        </div>
      </div>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}

export default function ManageEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter !== "all" ? `?status=${filter}` : "";
      const res = await api.get(`/enquiries${params}`);
      setEnquiries(res.data);
    } catch { toast.error("Failed to load enquiries"); }
    finally { setLoading(false); }
  }, [filter]);

  useEffect(() => { fetch(); }, [fetch]);

  async function markRead(id) {
    await api.put(`/enquiries/${id}/read`);
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, read_status: 1 } : e));
    if (selected?.id === id) setSelected(p => ({ ...p, read_status: 1 }));
  }

  async function markUnread(id) {
    await api.put(`/enquiries/${id}/unread`);
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, read_status: 0 } : e));
    if (selected?.id === id) setSelected(p => ({ ...p, read_status: 0 }));
  }

  async function handleDelete(enq) {
    try {
      await api.delete(`/enquiries/${enq.id}`);
      toast.success("Enquiry deleted");
      setDeleteTarget(null);
      if (selected?.id === enq.id) setSelected(null);
      fetch();
    } catch { toast.error("Delete failed"); setDeleteTarget(null); }
  }

  function handleExportCSV() {
    api.get("/enquiries/export/csv", { responseType: "blob" })
      .then(res => {
        const blobUrl = URL.createObjectURL(new Blob([res.data], { type: "text/csv" }));
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `enquiries-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(blobUrl);
      })
      .catch(() => toast.error("Export failed"));
  }

  const fmt = d => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
  const unreadCount = enquiries.filter(e => !e.read_status).length;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 30, color: NAVY, marginBottom: 4 }}>Enquiries</h1>
          <p style={{ fontSize: 13, color: "#888" }}>
            {enquiries.length} total · <span style={{ color: unreadCount > 0 ? "#ef4444" : "#888" }}>{unreadCount} unread</span>
          </p>
        </div>
        <button onClick={handleExportCSV} style={{ background: "white", color: "#555", border: "1px solid #e0dbd3", padding: "10px 18px", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
          ↓ Export CSV
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "1px solid #e0dbd3" }}>
        {[["all", "All"], ["unread", "Unread"], ["read", "Read"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{
            padding: "9px 20px", background: "none", border: "none",
            fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
            color: filter === val ? GOLD : "#888",
            borderBottom: filter === val ? `2px solid ${GOLD}` : "2px solid transparent",
            marginBottom: -1,
          }}>{label}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ background: "white", padding: 24 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid #f5f0eb", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ height: 14, background: "#ede9e4", borderRadius: 2, width: "40%", marginBottom: 6, animation: "pulse 1.4s ease infinite" }} />
                <div style={{ height: 11, background: "#ede9e4", borderRadius: 2, width: "60%", animation: "pulse 1.4s ease infinite" }} />
              </div>
              <div style={{ height: 22, background: "#ede9e4", borderRadius: 2, width: 60, animation: "pulse 1.4s ease infinite" }} />
            </div>
          ))}
        </div>
      ) : enquiries.length === 0 ? (
        <div style={{ background: "white", padding: "64px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, color: "#ccc", marginBottom: 8 }}>No enquiries</p>
          <p style={{ fontSize: 13, color: "#bbb" }}>{filter !== "all" ? `No ${filter} enquiries.` : "Enquiries from your website will appear here."}</p>
        </div>
      ) : (
        <div style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0ede9" }}>
                {["", "Name", "Email", "Phone", "Service", "Date", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enquiries.map(enq => (
                <tr
                  key={enq.id}
                  style={{ borderBottom: "1px solid #f9f7f5", background: !enq.read_status ? "rgba(201,169,110,0.05)" : "transparent", cursor: "pointer" }}
                  onClick={() => { setSelected(enq); if (!enq.read_status) markRead(enq.id); }}
                >
                  <td style={{ padding: "14px 10px 14px 14px", width: 8 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: !enq.read_status ? GOLD : "transparent" }} />
                  </td>
                  <td style={{ padding: "14px 14px", color: NAVY, fontWeight: !enq.read_status ? 600 : 400 }}>{enq.name || "—"}</td>
                  <td style={{ padding: "14px 14px", color: "#555", maxWidth: 180 }}>
                    <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{enq.email || "—"}</span>
                  </td>
                  <td style={{ padding: "14px 14px", color: "#888" }}>{enq.phone || "—"}</td>
                  <td style={{ padding: "14px 14px", color: "#888" }}>{enq.service || "—"}</td>
                  <td style={{ padding: "14px 14px", color: "#aaa", fontSize: 12, whiteSpace: "nowrap" }}>{fmt(enq.created_at)}</td>
                  <td style={{ padding: "14px 14px" }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {enq.read_status ? (
                        <button onClick={() => markUnread(enq.id)} style={{ padding: "4px 10px", background: "white", border: "1px solid #e0dbd3", fontSize: 11, cursor: "pointer", color: "#777", whiteSpace: "nowrap" }}>Unread</button>
                      ) : (
                        <button onClick={() => markRead(enq.id)} style={{ padding: "4px 10px", background: "white", border: `1px solid ${GOLD}`, fontSize: 11, cursor: "pointer", color: GOLD, whiteSpace: "nowrap" }}>Read</button>
                      )}
                      <button onClick={() => setDeleteTarget(enq)} style={{ padding: "4px 10px", background: "white", border: "1px solid #fca5a5", fontSize: 11, cursor: "pointer", color: "#ef4444" }}>×</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <DetailModal
          enquiry={selected}
          onClose={() => setSelected(null)}
          onRead={id => markRead(id)}
          onUnread={id => markUnread(id)}
          onDelete={enq => { setSelected(null); setDeleteTarget(enq); }}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete enquiry from "${deleteTarget.name}"? This cannot be undone.`}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
}
