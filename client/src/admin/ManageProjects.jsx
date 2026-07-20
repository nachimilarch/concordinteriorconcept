import { useState, useEffect, useCallback, useRef } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const GOLD = "#FBB316";
const NAVY = "#1A1A2E";
const API_BASE = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

const imgUrl = (p) => {
  if (!p) return null;
  if (p.startsWith("/") || p.startsWith("http")) return p;
  return `${API_BASE}/uploads/${p}`;
};

// ─── helpers ──────────────────────────────────────────────────────────────────
function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

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

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ height = 16, width = "100%" }) {
  return <div style={{ height, width, background: "#ede9e4", borderRadius: 2, animation: "pulse 1.4s ease infinite" }} />;
}

// ─── Empty gallery image upload widget ─────────────────────────────────────────
function GalleryGrid({ images, onDelete, onReorder }) {
  const [dragging, setDragging] = useState(null);

  if (!images.length) return null;

  function onDragStart(e, id) { setDragging(id); e.dataTransfer.effectAllowed = "move"; }
  function onDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }
  function onDrop(e, targetId) {
    e.preventDefault();
    if (dragging === targetId) return;
    const from = images.findIndex(i => i.id === dragging);
    const to = images.findIndex(i => i.id === targetId);
    const reordered = [...images];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    onReorder(reordered.map((img, idx) => ({ ...img, sort_order: idx })));
    setDragging(null);
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
      {images.map((img) => (
        <div
          key={img.id}
          draggable
          onDragStart={e => onDragStart(e, img.id)}
          onDragOver={onDragOver}
          onDrop={e => onDrop(e, img.id)}
          style={{
            position: "relative", width: 100, height: 80,
            cursor: "grab", opacity: dragging === img.id ? 0.5 : 1,
            border: "1px solid #e0dbd3",
          }}
        >
          <img
            src={img.preview || imgUrl(img.image_path)}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <button
            onClick={() => onDelete(img)}
            style={{
              position: "absolute", top: 3, right: 3, background: "rgba(239,68,68,0.9)",
              color: "white", border: "none", width: 20, height: 20,
              cursor: "pointer", fontSize: 12, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >×</button>
          <div style={{ position: "absolute", bottom: 3, left: 3, background: "rgba(0,0,0,0.45)", color: "white", fontSize: 9, padding: "1px 4px" }}>drag</div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  title: "", slug: "", category_id: "", location: "", area: "",
  year_completed: "", short_desc: "", full_desc: "",
  status: "draft", featured: false,
};

export default function ManageProjects() {
  const [view, setView] = useState("list"); // 'list' | 'form'
  const [editId, setEditId] = useState(null);

  // List state
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ status: "all", category: "", search: "" });
  const [categories, setCategories] = useState([]);
  const [listLoading, setListLoading] = useState(true);

  // Form state
  const [form, setForm] = useState(EMPTY_FORM);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]); // {id, image_path, sort_order, preview?}
  const [newGalleryFiles, setNewGalleryFiles] = useState([]); // files not yet uploaded
  const [beforeFile, setBeforeFile] = useState(null);
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const autoSaveTimer = useRef(null);
  const LIMIT = 10;

  // Load categories once
  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data)).catch(() => {});
  }, []);

  const fetchProjects = useCallback(async () => {
    setListLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT, ...filters });
      const res = await api.get(`/projects/admin/all?${params}`);
      setProjects(res.data.projects);
      setTotal(res.data.total);
    } catch { toast.error("Failed to load projects"); }
    finally { setListLoading(false); }
  }, [page, filters]);

  useEffect(() => { if (view === "list") fetchProjects(); }, [view, fetchProjects]);

  async function openEdit(id) {
    setFormError(""); setFormSuccess("");
    setCoverFile(null); setCoverPreview(null);
    setNewGalleryFiles([]);
    setBeforeFile(null); setBeforePreview(null);
    setAfterFile(null); setAfterPreview(null);
    try {
      const res = await api.get(`/projects/admin/${id}`);
      const p = res.data;
      setForm({
        title: p.title, slug: p.slug, category_id: p.category_id || "",
        location: p.location || "", area: p.area || "",
        year_completed: p.year_completed || "", short_desc: p.short_desc || "",
        full_desc: p.full_desc || "", status: p.status, featured: !!p.featured,
      });
      const gallery = (p.images || []).filter(i => !i.is_before && !i.is_after);
      setGalleryImages(gallery);
      const before = (p.images || []).find(i => i.is_before);
      const after = (p.images || []).find(i => i.is_after);
      if (before) setBeforePreview(imgUrl(before.image_path));
      if (after) setAfterPreview(imgUrl(after.image_path));
      if (p.cover_image) setCoverPreview(imgUrl(p.cover_image));
      setEditId(id);
      setView("form");
    } catch { toast.error("Failed to load project"); }
  }

  function openAdd() {
    setForm(EMPTY_FORM); setEditId(null);
    setCoverFile(null); setCoverPreview(null);
    setGalleryImages([]); setNewGalleryFiles([]);
    setBeforeFile(null); setBeforePreview(null);
    setAfterFile(null); setAfterPreview(null);
    setFormError(""); setFormSuccess("");
    setView("form");
  }

  function backToList() {
    clearTimeout(autoSaveTimer.current);
    setView("list");
    fetchProjects();
  }

  // Auto-slug from title on new project
  useEffect(() => {
    if (!editId && form.title) {
      setForm(p => ({ ...p, slug: slugify(p.title) }));
    }
  }, [form.title, editId]);

  // Auto-save draft every 30s in edit mode
  useEffect(() => {
    if (view !== "form" || !editId) return;
    autoSaveTimer.current = setTimeout(() => {
      saveDraft(true);
    }, 30000);
    return () => clearTimeout(autoSaveTimer.current);
  });

  async function saveDraft(silent = false) {
    if (!form.title.trim()) return;
    const fd = buildFormData("draft");
    try {
      if (editId) {
        await api.put(`/projects/${editId}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        if (!silent) { setFormSuccess("Draft saved."); setTimeout(() => setFormSuccess(""), 3000); }
        else toast("Draft auto-saved", { icon: "💾", duration: 2000 });
      }
    } catch { /* silent */ }
  }

  function buildFormData(statusOverride) {
    const fd = new FormData();
    const s = { ...form, status: statusOverride || form.status };
    Object.entries(s).forEach(([k, v]) => {
      if (k === "featured") fd.append(k, v ? "1" : "0");
      else fd.append(k, v ?? "");
    });
    if (coverFile) fd.append("cover_image", coverFile);
    newGalleryFiles.forEach(f => fd.append("gallery", f));
    if (beforeFile) fd.append("before_image", beforeFile);
    if (afterFile) fd.append("after_image", afterFile);
    return fd;
  }

  async function handleSave(statusOverride) {
    if (!form.title.trim()) { setFormError("Title is required."); return; }
    setFormError(""); setFormSuccess("");
    setSaving(true);
    const fd = buildFormData(statusOverride);
    try {
      if (editId) {
        await api.put(`/projects/${editId}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        setFormSuccess(statusOverride === "published" ? "Project published!" : "Draft saved.");
        setNewGalleryFiles([]);
      } else {
        const res = await api.post("/projects", fd, { headers: { "Content-Type": "multipart/form-data" } });
        setEditId(res.data.id);
        setFormSuccess(statusOverride === "published" ? "Project published!" : "Draft saved. You can continue editing.");
        setNewGalleryFiles([]);
        const projRes = await api.get(`/projects/admin/${res.data.id}`);
        setGalleryImages((projRes.data.images || []).filter(i => !i.is_before && !i.is_after));
      }
    } catch (err) {
      setFormError(err.response?.data?.message || "Save failed.");
    } finally { setSaving(false); }
  }

  async function handleDeleteImage(img) {
    if (img.id && !img.preview) {
      try { await api.delete(`/projects/images/${img.id}`); }
      catch { toast.error("Failed to delete image"); return; }
    }
    setGalleryImages(prev => prev.filter(i => i.id !== img.id));
  }

  async function handleGalleryReorder(newOrder) {
    setGalleryImages(newOrder);
    if (editId) {
      try {
        await api.put("/projects/images/reorder", {
          order: newOrder.map((img, idx) => ({ id: img.id, sort_order: idx })),
        });
      } catch { /* silent */ }
    }
  }

  function handleNewGallery(e) {
    const files = Array.from(e.target.files);
    setNewGalleryFiles(prev => [...prev, ...files]);
    const previews = files.map((f, i) => ({
      id: `new-${Date.now()}-${i}`, preview: URL.createObjectURL(f), sort_order: galleryImages.length + i,
    }));
    setGalleryImages(prev => [...prev, ...previews]);
    e.target.value = "";
  }

  async function handleDeleteProject(p) {
    try {
      await api.delete(`/projects/${p.id}`);
      toast.success("Project deleted");
      setDeleteTarget(null);
      fetchProjects();
    } catch { toast.error("Delete failed"); setDeleteTarget(null); }
  }

  const lbl = { display: "block", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#666", marginBottom: 7 };
  const inp = { display: "block", width: "100%", padding: "10px 12px", border: "1px solid #e0dbd3", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "Inter, sans-serif" };
  const fieldBox = { marginBottom: 22 };

  // ── LIST VIEW ──
  if (view === "list") {
    const totalPages = Math.ceil(total / LIMIT);
    return (
      <div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 30, color: NAVY, marginBottom: 4 }}>Projects</h1>
            <p style={{ fontSize: 13, color: "#888" }}>{total} total</p>
          </div>
          <button onClick={openAdd} style={{ background: GOLD, color: "white", border: "none", padding: "11px 22px", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer" }}>
            + Add Project
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <input
            placeholder="Search by title…"
            value={filters.search}
            onChange={e => { setFilters(p => ({ ...p, search: e.target.value })); setPage(1); }}
            style={{ ...inp, width: 220 }}
          />
          <select value={filters.status} onChange={e => { setFilters(p => ({ ...p, status: e.target.value })); setPage(1); }} style={{ ...inp, width: 140 }}>
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select value={filters.category} onChange={e => { setFilters(p => ({ ...p, category: e.target.value })); setPage(1); }} style={{ ...inp, width: 180 }}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>
        </div>

        {listLoading ? (
          <div style={{ background: "white", padding: 24 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "16px 0", borderBottom: "1px solid #f5f0eb", alignItems: "center" }}>
                <Skeleton height={48} width={64} />
                <div style={{ flex: 1 }}><Skeleton height={14} width="60%" /><div style={{ marginTop: 6 }}><Skeleton height={11} width="35%" /></div></div>
                <Skeleton height={22} width={70} />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div style={{ background: "white", padding: "64px 24px", textAlign: "center" }}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, color: "#ccc", marginBottom: 8 }}>No projects found</p>
            <p style={{ fontSize: 13, color: "#bbb", marginBottom: 24 }}>
              {filters.search || filters.status !== "all" || filters.category ? "Try adjusting your filters." : "Add your first project."}
            </p>
            <button onClick={openAdd} style={{ background: GOLD, color: "white", border: "none", padding: "11px 22px", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer" }}>+ Add Project</button>
          </div>
        ) : (
          <div style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f0ede9" }}>
                  {["Cover", "Title", "Category", "Status", "Featured", "Year", "Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #f9f7f5" }}>
                    <td style={{ padding: "12px 14px" }}>
                      {p.cover_image ? (
                        <img src={imgUrl(p.cover_image)} alt="" style={{ width: 56, height: 40, objectFit: "cover" }} />
                      ) : <div style={{ width: 56, height: 40, background: "#f0ede9" }} />}
                    </td>
                    <td style={{ padding: "12px 14px", color: NAVY, fontWeight: 500, maxWidth: 200 }}>
                      <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</span>
                    </td>
                    <td style={{ padding: "12px 14px", color: "#888" }}>{p.category_name || "—"}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", background: p.status === "published" ? "#dcfce7" : "#f1f5f9", color: p.status === "published" ? "#15803d" : "#64748b" }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", color: "#888" }}>{p.featured ? "★" : "—"}</td>
                    <td style={{ padding: "12px 14px", color: "#888" }}>{p.year_completed || "—"}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => openEdit(p.id)} style={{ padding: "5px 14px", background: "white", border: "1px solid #e0dbd3", fontSize: 12, cursor: "pointer", color: "#555" }}>Edit</button>
                        <button onClick={() => setDeleteTarget(p)} style={{ padding: "5px 14px", background: "white", border: "1px solid #fca5a5", fontSize: 12, cursor: "pointer", color: "#ef4444" }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 24 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{ padding: "7px 14px", border: "1px solid #e0dbd3", background: "white", cursor: page === 1 ? "default" : "pointer", opacity: page === 1 ? 0.4 : 1, fontSize: 13 }}>← Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                style={{ padding: "7px 14px", border: `1px solid ${n === page ? GOLD : "#e0dbd3"}`, background: n === page ? GOLD : "white", color: n === page ? "white" : "#555", cursor: "pointer", fontSize: 13 }}>{n}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              style={{ padding: "7px 14px", border: "1px solid #e0dbd3", background: "white", cursor: page === totalPages ? "default" : "pointer", opacity: page === totalPages ? 0.4 : 1, fontSize: 13 }}>Next →</button>
          </div>
        )}

        {deleteTarget && (
          <ConfirmDialog
            message={`Delete "${deleteTarget.title}"? All gallery images will also be deleted. This cannot be undone.`}
            onConfirm={() => handleDeleteProject(deleteTarget)}
            onCancel={() => setDeleteTarget(null)}
          />
        )}

        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
      </div>
    );
  }

  // ── FORM VIEW ──
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <button onClick={backToList} style={{ background: "none", border: "1px solid #e0dbd3", padding: "7px 14px", cursor: "pointer", fontSize: 12, color: "#555" }}>← Back</button>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: NAVY }}>
          {editId ? "Edit Project" : "New Project"}
        </h1>
      </div>

      {formError && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#dc2626" }}>{formError}</div>}
      {formSuccess && <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#15803d" }}>{formSuccess}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        {/* Left column */}
        <div>
          <div style={{ background: "white", padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 20 }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, color: NAVY, marginBottom: 22 }}>Project Details</h2>

            <div style={fieldBox}>
              <label style={lbl}>Title *</label>
              <input style={inp} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div style={fieldBox}>
              <label style={lbl}>Slug</label>
              <input style={inp} value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
              <div>
                <label style={lbl}>Category</label>
                <select style={inp} value={form.category_id} onChange={e => setForm(p => ({ ...p, category_id: e.target.value }))}>
                  <option value="">— Select —</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Year Completed</label>
                <input type="number" style={inp} value={form.year_completed} onChange={e => setForm(p => ({ ...p, year_completed: e.target.value }))} placeholder="2024" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
              <div>
                <label style={lbl}>Location</label>
                <input style={inp} value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
              </div>
              <div>
                <label style={lbl}>Area (sq ft)</label>
                <input style={inp} value={form.area} onChange={e => setForm(p => ({ ...p, area: e.target.value }))} />
              </div>
            </div>

            <div style={fieldBox}>
              <label style={lbl}>Short Description <span style={{ color: "#bbb" }}>({form.short_desc.length}/200)</span></label>
              <textarea
                style={{ ...inp, minHeight: 80, resize: "vertical" }}
                maxLength={200}
                value={form.short_desc}
                onChange={e => setForm(p => ({ ...p, short_desc: e.target.value }))}
              />
            </div>

            <div style={fieldBox}>
              <label style={{ ...lbl, marginBottom: 10 }}>Full Description</label>
              <ReactQuill
                theme="snow"
                value={form.full_desc}
                onChange={val => setForm(p => ({ ...p, full_desc: val }))}
                style={{ background: "white" }}
                modules={{ toolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["link"], ["clean"]] }}
              />
            </div>
          </div>

          {/* Gallery */}
          <div style={{ background: "white", padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 20 }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, color: NAVY, marginBottom: 8 }}>Gallery Images</h2>
            <p style={{ fontSize: 12, color: "#999", marginBottom: 16 }}>Drag thumbnails to reorder. Max 20 images.</p>

            <GalleryGrid
              images={galleryImages}
              onDelete={handleDeleteImage}
              onReorder={handleGalleryReorder}
            />

            <div style={{ marginTop: galleryImages.length ? 16 : 0 }}>
              <label style={{ ...lbl, marginBottom: 8 }}>Add Images</label>
              <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleNewGallery} style={{ fontSize: 13, color: "#555" }} />
            </div>
          </div>

          {/* Before / After */}
          <div style={{ background: "white", padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, color: NAVY, marginBottom: 20 }}>Before / After</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={lbl}>Before Image</label>
                {beforePreview && <img src={beforePreview} alt="before" style={{ width: "100%", height: 120, objectFit: "cover", marginBottom: 8 }} />}
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => { const f = e.target.files[0]; if (f) { setBeforeFile(f); setBeforePreview(URL.createObjectURL(f)); } }} style={{ fontSize: 12, color: "#555" }} />
              </div>
              <div>
                <label style={lbl}>After Image</label>
                {afterPreview && <img src={afterPreview} alt="after" style={{ width: "100%", height: 120, objectFit: "cover", marginBottom: 8 }} />}
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => { const f = e.target.files[0]; if (f) { setAfterFile(f); setAfterPreview(URL.createObjectURL(f)); } }} style={{ fontSize: 12, color: "#555" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* Publish box */}
          <div style={{ background: "white", padding: "24px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 20 }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 16, color: NAVY, marginBottom: 18 }}>Publish</h2>

            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Status</label>
              <select style={inp} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "10px 12px", border: "1px solid #e0dbd3", cursor: "pointer" }} onClick={() => setForm(p => ({ ...p, featured: !p.featured }))}>
              <span style={{ fontSize: 18, color: form.featured ? GOLD : "#ddd" }}>★</span>
              <span style={{ fontSize: 13, color: "#555" }}>Featured Project</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={() => handleSave("published")}
                disabled={saving}
                style={{ background: GOLD, color: "white", border: "none", padding: "12px", cursor: "pointer", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Saving…" : "Publish"}
              </button>
              <button
                onClick={() => handleSave("draft")}
                disabled={saving}
                style={{ background: "white", color: "#555", border: "1px solid #e0dbd3", padding: "10px", cursor: "pointer", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                Save Draft
              </button>
              {editId && (
                <a href={`/portfolio/${form.slug}`} target="_blank" rel="noreferrer"
                  style={{ display: "block", textAlign: "center", fontSize: 11, color: GOLD, textDecoration: "none", padding: "8px 0", border: `1px solid rgba(251,179,22,0.4)`, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Preview ↗
                </a>
              )}
            </div>
          </div>

          {/* Cover image */}
          <div style={{ background: "white", padding: "24px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 16, color: NAVY, marginBottom: 16 }}>Cover Image</h2>
            {coverPreview && (
              <img src={coverPreview} alt="cover" style={{ width: "100%", height: 160, objectFit: "cover", marginBottom: 12 }} />
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={e => { const f = e.target.files[0]; if (f) { setCoverFile(f); setCoverPreview(URL.createObjectURL(f)); } }}
              style={{ fontSize: 12, color: "#555" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .ql-container { font-family: Inter, sans-serif; font-size: 14px; }
        @media(max-width:900px) {
          div[style*="gridTemplateColumns: 1fr 320px"] { grid-template-columns: 1fr !important; }
          div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
