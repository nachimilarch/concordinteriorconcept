import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const GOLD = "#C9A96E";
const NAVY = "#1A1A2E";
const API_BASE = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(26,26,46,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", padding: "36px 32px", boxShadow: "0 24px 64px rgba(0,0,0,0.2)", animation: "modalIn 0.18s ease" }}>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: NAVY, marginBottom: 28 }}>{title}</h2>
        {children}
      </div>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <Modal title="Confirm Delete" onClose={onCancel}>
      <p style={{ fontSize: 14, color: "#555", marginBottom: 28, lineHeight: 1.6 }}>{message}</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
        <button onClick={onCancel} style={{ padding: "9px 20px", background: "white", border: "1px solid #e0dbd3", fontSize: 13, cursor: "pointer", color: "#555" }}>Cancel</button>
        <button onClick={onConfirm} style={{ padding: "9px 20px", background: "#ef4444", color: "white", border: "none", fontSize: 13, cursor: "pointer" }}>Delete</button>
      </div>
    </Modal>
  );
}

const EMPTY_FORM = { title: "", description: "", icon: "", display_order: 0 };

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetch = useCallback(async () => {
    setLoading(true);
    try { const res = await api.get("/services"); setServices(res.data); }
    catch { toast.error("Failed to load services"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  function openAdd() {
    setForm(EMPTY_FORM); setEditId(null); setImageFile(null); setImagePreview(null); setFormError(""); setModal("add");
  }
  function openEdit(svc) {
    setForm({ title: svc.title, description: svc.description || "", icon: svc.icon || "", display_order: svc.display_order });
    setEditId(svc.id);
    setImageFile(null);
    setImagePreview(svc.image ? `${API_BASE}/uploads/${svc.image}` : null);
    setFormError(""); setModal("edit");
  }
  function closeModal() { setModal(null); setEditId(null); }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!form.title.trim()) { setFormError("Title is required."); return; }
    setFormError(""); setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append("image", imageFile);
      if (modal === "add") {
        await api.post("/services", fd, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Service added");
      } else {
        await api.put(`/services/${editId}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Service updated");
      }
      closeModal(); fetch();
    } catch (err) {
      setFormError(err.response?.data?.message || "Save failed");
    } finally { setSaving(false); }
  }

  async function handleDelete(svc) {
    try {
      await api.delete(`/services/${svc.id}`);
      toast.success("Service deleted"); setDeleteTarget(null); fetch();
    } catch { toast.error("Delete failed"); setDeleteTarget(null); }
  }

  async function moveOrder(svc, direction) {
    const idx = services.findIndex(s => s.id === svc.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= services.length) return;
    const updated = [...services];
    [updated[idx], updated[swapIdx]] = [updated[swapIdx], updated[idx]];
    const order = updated.map((s, i) => ({ id: s.id, display_order: i }));
    setServices(updated);
    try { await api.put("/services/reorder", { order }); }
    catch { fetch(); }
  }

  const lbl = { display: "block", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#666", marginBottom: 7 };
  const inp = { display: "block", width: "100%", padding: "10px 12px", border: "1px solid #e0dbd3", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "Inter, sans-serif" };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 30, color: NAVY, marginBottom: 4 }}>Services</h1>
          <p style={{ fontSize: 13, color: "#888" }}>{services.length} services</p>
        </div>
        <button onClick={openAdd} style={{ background: GOLD, color: "white", border: "none", padding: "11px 22px", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer" }}>
          + Add Service
        </button>
      </div>

      {loading ? (
        <div style={{ background: "white", padding: 24 }}>
          {Array.from({ length: 4 }).map((_, i) => <div key={i} style={{ height: 60, marginBottom: 4, background: "#f5f0eb", animation: "pulse 1.4s ease infinite" }} />)}
        </div>
      ) : services.length === 0 ? (
        <div style={{ background: "white", padding: "64px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, color: "#ccc", marginBottom: 8 }}>No services yet</p>
          <p style={{ fontSize: 13, color: "#bbb", marginBottom: 24 }}>Add services to display on your website.</p>
          <button onClick={openAdd} style={{ background: GOLD, color: "white", border: "none", padding: "11px 22px", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer" }}>+ Add Service</button>
        </div>
      ) : (
        <div style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0ede9" }}>
                {["Order", "Image", "Icon", "Title", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((svc, idx) => (
                <tr key={svc.id} style={{ borderBottom: "1px solid #f9f7f5" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button onClick={() => moveOrder(svc, "up")} disabled={idx === 0} style={{ background: "none", border: "1px solid #e0dbd3", width: 24, height: 24, cursor: idx === 0 ? "default" : "pointer", opacity: idx === 0 ? 0.3 : 1, fontSize: 12 }}>↑</button>
                      <button onClick={() => moveOrder(svc, "down")} disabled={idx === services.length - 1} style={{ background: "none", border: "1px solid #e0dbd3", width: 24, height: 24, cursor: idx === services.length - 1 ? "default" : "pointer", opacity: idx === services.length - 1 ? 0.3 : 1, fontSize: 12 }}>↓</button>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    {svc.image ? (
                      <img src={`${API_BASE}/uploads/${svc.image}`} alt="" style={{ width: 48, height: 36, objectFit: "cover" }} />
                    ) : <span style={{ color: "#ddd", fontSize: 11 }}>none</span>}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 20 }}>{svc.icon || "—"}</td>
                  <td style={{ padding: "14px 16px", color: NAVY, fontWeight: 500 }}>{svc.title}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => openEdit(svc)} style={{ padding: "5px 14px", background: "white", border: "1px solid #e0dbd3", fontSize: 12, cursor: "pointer", color: "#555" }}>Edit</button>
                      <button onClick={() => setDeleteTarget(svc)} style={{ padding: "5px 14px", background: "white", border: "1px solid #fca5a5", fontSize: 12, cursor: "pointer", color: "#ef4444" }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal title={modal === "add" ? "Add Service" : "Edit Service"} onClose={closeModal}>
          {formError && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "10px 12px", marginBottom: 18, fontSize: 13, color: "#dc2626" }}>{formError}</div>}

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Title *</label>
            <input style={inp} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Description</label>
            <textarea style={{ ...inp, minHeight: 90, resize: "vertical" }} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Icon (emoji or text)</label>
            <input style={inp} value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} placeholder="e.g. 🏗️ or Architecture" />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Display Order</label>
            <input type="number" style={inp} value={form.display_order} onChange={e => setForm(p => ({ ...p, display_order: Number(e.target.value) }))} />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={lbl}>Service Image</label>
            {imagePreview && (
              <div style={{ marginBottom: 10 }}>
                <img src={imagePreview} alt="preview" style={{ width: "100%", maxHeight: 160, objectFit: "cover" }} />
              </div>
            )}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage}
              style={{ fontSize: 13, color: "#555" }} />
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button onClick={closeModal} style={{ padding: "9px 20px", background: "white", border: "1px solid #e0dbd3", fontSize: 13, cursor: "pointer", color: "#555" }}>Cancel</button>
            <button onClick={handleSave} disabled={saving} style={{ padding: "9px 22px", background: GOLD, color: "white", border: "none", fontSize: 13, cursor: "pointer", opacity: saving ? 0.7 : 1 }}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete service "${deleteTarget.title}"? This cannot be undone.`}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
}
