import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const GOLD = "#C9A96E";
const NAVY = "#1A1A2E";

function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(26,26,46,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "white", width: 440, padding: "36px 32px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
        animation: "modalIn 0.18s ease",
      }}>
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
        <button onClick={onCancel} style={{ padding: "9px 20px", background: "white", border: "1px solid #e0dbd3", fontSize: 13, cursor: "pointer", color: "#555" }}>
          Cancel
        </button>
        <button onClick={onConfirm} style={{ padding: "9px 20px", background: "#ef4444", color: "white", border: "none", fontSize: 13, cursor: "pointer", letterSpacing: "0.04em" }}>
          Delete
        </button>
      </div>
    </Modal>
  );
}

const EMPTY_FORM = { name: "", icon: "", display_order: 0 };

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch { toast.error("Failed to load categories"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  function openAdd() { setForm(EMPTY_FORM); setEditId(null); setFormError(""); setModal("add"); }
  function openEdit(cat) { setForm({ name: cat.name, icon: cat.icon || "", display_order: cat.display_order }); setEditId(cat.id); setFormError(""); setModal("edit"); }
  function closeModal() { setModal(null); setEditId(null); }

  async function handleSave() {
    if (!form.name.trim()) { setFormError("Name is required."); return; }
    setFormError("");
    setSaving(true);
    try {
      if (modal === "add") {
        await api.post("/categories", form);
        toast.success("Category added");
      } else {
        await api.put(`/categories/${editId}`, form);
        toast.success("Category updated");
      }
      closeModal();
      fetch();
    } catch (err) {
      setFormError(err.response?.data?.message || "Save failed");
    } finally { setSaving(false); }
  }

  async function handleDelete(cat) {
    try {
      await api.delete(`/categories/${cat.id}`);
      toast.success("Category deleted");
      setDeleteTarget(null);
      fetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
      setDeleteTarget(null);
    }
  }

  async function moveOrder(cat, direction) {
    const idx = categories.findIndex(c => c.id === cat.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= categories.length) return;
    const updated = [...categories];
    [updated[idx], updated[swapIdx]] = [updated[swapIdx], updated[idx]];
    const order = updated.map((c, i) => ({ id: c.id, display_order: i }));
    setCategories(updated);
    try {
      await api.put("/categories/reorder", { order });
    } catch { fetch(); }
  }

  const field = { marginBottom: 20 };
  const label = { display: "block", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#666", marginBottom: 7 };
  const input = { display: "block", width: "100%", padding: "10px 12px", border: "1px solid #e0dbd3", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "Inter, sans-serif" };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 30, color: NAVY, marginBottom: 4 }}>Categories</h1>
          <p style={{ fontSize: 13, color: "#888" }}>{categories.length} categories</p>
        </div>
        <button onClick={openAdd} style={{
          background: GOLD, color: "white", border: "none", padding: "11px 22px",
          fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer",
        }}>
          + Add Category
        </button>
      </div>

      {loading ? (
        <div style={{ background: "white", padding: 24 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ height: 52, marginBottom: 4, background: "#f5f0eb", animation: "pulse 1.4s ease infinite" }} />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div style={{ background: "white", padding: "64px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, color: "#ccc", marginBottom: 8 }}>No categories yet</p>
          <p style={{ fontSize: 13, color: "#bbb", marginBottom: 24 }}>Add your first category to organise projects.</p>
          <button onClick={openAdd} style={{ background: GOLD, color: "white", border: "none", padding: "11px 22px", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer" }}>
            + Add Category
          </button>
        </div>
      ) : (
        <div style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0ede9" }}>
                {["Order", "Name", "Slug", "Icon", "Projects", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={cat.id} style={{ borderBottom: "1px solid #f9f7f5" }}>
                  <td style={{ padding: "14px 16px", color: "#888", fontSize: 12 }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button onClick={() => moveOrder(cat, "up")} disabled={idx === 0}
                        style={{ background: "none", border: "1px solid #e0dbd3", width: 24, height: 24, cursor: idx === 0 ? "default" : "pointer", opacity: idx === 0 ? 0.3 : 1, fontSize: 12 }}>↑</button>
                      <button onClick={() => moveOrder(cat, "down")} disabled={idx === categories.length - 1}
                        style={{ background: "none", border: "1px solid #e0dbd3", width: 24, height: 24, cursor: idx === categories.length - 1 ? "default" : "pointer", opacity: idx === categories.length - 1 ? 0.3 : 1, fontSize: 12 }}>↓</button>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", color: NAVY, fontWeight: 500 }}>{cat.name}</td>
                  <td style={{ padding: "14px 16px", color: "#888", fontFamily: "monospace", fontSize: 12 }}>{cat.slug}</td>
                  <td style={{ padding: "14px 16px", color: "#555", fontSize: 18 }}>{cat.icon || "—"}</td>
                  <td style={{ padding: "14px 16px", color: "#888", fontSize: 12 }}>{cat.project_count ?? 0}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => openEdit(cat)} style={{ padding: "5px 14px", background: "white", border: "1px solid #e0dbd3", fontSize: 12, cursor: "pointer", color: "#555" }}>Edit</button>
                      <button onClick={() => setDeleteTarget(cat)} style={{ padding: "5px 14px", background: "white", border: "1px solid #fca5a5", fontSize: 12, cursor: "pointer", color: "#ef4444" }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal && (
        <Modal title={modal === "add" ? "Add Category" : "Edit Category"} onClose={closeModal}>
          {formError && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "10px 12px", marginBottom: 18, fontSize: 13, color: "#dc2626" }}>{formError}</div>}
          <div style={field}>
            <label style={label}>Name *</label>
            <input style={input} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Residential" />
          </div>
          <div style={field}>
            <label style={label}>Icon (emoji or text)</label>
            <input style={input} value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} placeholder="e.g. 🏠 or Home" />
          </div>
          <div style={{ ...field, marginBottom: 28 }}>
            <label style={label}>Display Order</label>
            <input type="number" style={input} value={form.display_order} onChange={e => setForm(p => ({ ...p, display_order: Number(e.target.value) }))} />
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button onClick={closeModal} style={{ padding: "9px 20px", background: "white", border: "1px solid #e0dbd3", fontSize: 13, cursor: "pointer", color: "#555" }}>Cancel</button>
            <button onClick={handleSave} disabled={saving} style={{ padding: "9px 22px", background: GOLD, color: "white", border: "none", fontSize: 13, cursor: "pointer", opacity: saving ? 0.7 : 1, letterSpacing: "0.06em" }}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </Modal>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <ConfirmDialog
          message={`Delete "${deleteTarget.name}"?${Number(deleteTarget.project_count) > 0 ? ` This category has ${deleteTarget.project_count} project(s) — they will become uncategorised.` : ""}`}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
}
