import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const GOLD = "#FBB316";
const NAVY = "#1A1A2E";
const API_BASE = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

const TABS = ["Hero Banner", "Company Info", "Social Media", "SEO", "Testimonials"];
const lbl = { display: "block", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#666", marginBottom: 7 };
const inp = { display: "block", width: "100%", padding: "10px 12px", border: "1px solid #e0dbd3", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "Inter, sans-serif" };
const fld = { marginBottom: 20 };

// ─── Testimonial Modal ─────────────────────────────────────────────────────────
function TestimonialModal({ t, onClose, onSave }) {
  const isNew = !t.id;
  const [form, setForm] = useState({ client_name: t.client_name || "", designation: t.designation || "", company: t.company || "", review_text: t.review_text || "", rating: t.rating || 5, display_order: t.display_order || 0, is_active: t.is_active !== 0 ? 1 : 0 });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(t.photo ? `${API_BASE}/uploads/${t.photo}` : null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    if (!form.client_name.trim()) { setError("Client name is required."); return; }
    setError(""); setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    if (photoFile) fd.append("photo", photoFile);
    try {
      if (isNew) await api.post("/testimonials", fd, { headers: { "Content-Type": "multipart/form-data" } });
      else await api.put(`/testimonials/${t.id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    } finally { setSaving(false); }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(26,26,46,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", width: "100%", maxWidth: 500, maxHeight: "92vh", overflowY: "auto", padding: "32px 28px", boxShadow: "0 24px 64px rgba(0,0,0,0.22)" }}>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: NAVY, marginBottom: 24 }}>{isNew ? "Add Testimonial" : "Edit Testimonial"}</h2>
        {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "10px", marginBottom: 16, fontSize: 13, color: "#dc2626" }}>{error}</div>}

        <div style={fld}><label style={lbl}>Client Name *</label><input style={inp} value={form.client_name} onChange={e => setForm(p => ({ ...p, client_name: e.target.value }))} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
          <div><label style={lbl}>Designation</label><input style={inp} value={form.designation} onChange={e => setForm(p => ({ ...p, designation: e.target.value }))} /></div>
          <div><label style={lbl}>Company</label><input style={inp} value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} /></div>
        </div>
        <div style={fld}><label style={lbl}>Review</label><textarea style={{ ...inp, minHeight: 90, resize: "vertical" }} value={form.review_text} onChange={e => setForm(p => ({ ...p, review_text: e.target.value }))} /></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
          <div>
            <label style={lbl}>Rating (1-5)</label>
            <select style={inp} value={form.rating} onChange={e => setForm(p => ({ ...p, rating: Number(e.target.value) }))}>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} ★</option>)}
            </select>
          </div>
          <div><label style={lbl}>Order</label><input type="number" style={inp} value={form.display_order} onChange={e => setForm(p => ({ ...p, display_order: Number(e.target.value) }))} /></div>
          <div>
            <label style={lbl}>Active</label>
            <select style={inp} value={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: Number(e.target.value) }))}>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>
        </div>

        <div style={fld}>
          <label style={lbl}>Photo</label>
          {photoPreview && <img src={photoPreview} alt="" style={{ width: 72, height: 72, objectFit: "cover", borderRadius: "50%", marginBottom: 10 }} />}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => { const f = e.target.files[0]; if (f) { setPhotoFile(f); setPhotoPreview(URL.createObjectURL(f)); } }} style={{ fontSize: 12, color: "#555" }} />
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <button onClick={onClose} style={{ padding: "9px 20px", background: "white", border: "1px solid #e0dbd3", fontSize: 13, cursor: "pointer", color: "#555" }}>Cancel</button>
          <button onClick={save} disabled={saving} style={{ padding: "9px 22px", background: GOLD, color: "white", border: "none", fontSize: 13, cursor: "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving…" : "Save"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function SiteSettings() {
  const [tab, setTab] = useState(0);
  const [settings, setSettings] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tModal, setTModal] = useState(null); // null | testimonial object
  const [tDeleteTarget, setTDeleteTarget] = useState(null);
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);

  const loadSettings = useCallback(async () => {
    try { const res = await api.get("/settings"); setSettings(res.data); }
    catch { toast.error("Failed to load settings"); }
  }, []);

  const loadTestimonials = useCallback(async () => {
    setTestimonialsLoading(true);
    try { const res = await api.get("/testimonials"); setTestimonials(res.data); }
    catch { /* silent */ }
    finally { setTestimonialsLoading(false); }
  }, []);

  useEffect(() => { loadSettings(); loadTestimonials(); }, [loadSettings, loadTestimonials]);
  useEffect(() => { if (settings.hero_image) setHeroPreview(`${API_BASE}/uploads/${settings.hero_image}`); }, [settings.hero_image]);

  function set(key, val) { setSettings(p => ({ ...p, [key]: val })); }

  async function saveSettings() {
    setSaving(true);
    try {
      // Upload hero image first if changed
      if (heroImageFile) {
        const fd = new FormData(); fd.append("file", heroImageFile);
        const res = await api.post("/settings/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
        settings.hero_image = res.data.filename;
        setSettings(p => ({ ...p, hero_image: res.data.filename }));
      }
      await api.put("/settings", settings);
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch { toast.error("Failed to save settings"); }
    finally { setSaving(false); }
  }

  async function deleteTestimonial(t) {
    try { await api.delete(`/testimonials/${t.id}`); loadTestimonials(); setTDeleteTarget(null); }
    catch { toast.error("Delete failed"); }
  }

  const SEO_PAGES = ["home", "portfolio", "about", "contact", "services"];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 30, color: NAVY, marginBottom: 4 }}>Site Settings</h1>
        <p style={{ fontSize: 13, color: "#888" }}>Configure your website content and metadata.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e0dbd3", marginBottom: 28, overflowX: "auto" }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            padding: "10px 20px", background: "none", border: "none", whiteSpace: "nowrap",
            fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
            color: tab === i ? GOLD : "#888",
            borderBottom: tab === i ? `2px solid ${GOLD}` : "2px solid transparent",
            marginBottom: -1,
          }}>{t}</button>
        ))}
      </div>

      <div style={{ maxWidth: 780 }}>
        {/* ── TAB 0: Hero Banner ── */}
        {tab === 0 && (
          <div style={{ background: "white", padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: NAVY, marginBottom: 24 }}>Hero Banner</h2>

            <div style={fld}>
              <label style={lbl}>Background Type</label>
              <select style={inp} value={settings.hero_type || "image"} onChange={e => set("hero_type", e.target.value)}>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div style={fld}>
              <label style={lbl}>Hero Image</label>
              {heroPreview && <img src={heroPreview} alt="hero" style={{ width: "100%", maxHeight: 160, objectFit: "cover", marginBottom: 10 }} />}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => { const f = e.target.files[0]; if (f) { setHeroImageFile(f); setHeroPreview(URL.createObjectURL(f)); } }} style={{ fontSize: 13, color: "#555" }} />
            </div>

            <div style={fld}><label style={lbl}>Hero Video URL</label><input style={inp} value={settings.hero_video || ""} onChange={e => set("hero_video", e.target.value)} placeholder="https://..." /></div>
            <div style={fld}><label style={lbl}>Tagline</label><input style={inp} value={settings.hero_tagline || ""} onChange={e => set("hero_tagline", e.target.value)} /></div>
            <div style={fld}><label style={lbl}>Sub-tagline</label><input style={inp} value={settings.hero_subtagline || ""} onChange={e => set("hero_subtagline", e.target.value)} /></div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div><label style={lbl}>CTA Button 1 Label</label><input style={inp} value={settings.cta1_label || ""} onChange={e => set("cta1_label", e.target.value)} /></div>
              <div><label style={lbl}>CTA Button 1 URL</label><input style={inp} value={settings.cta1_url || ""} onChange={e => set("cta1_url", e.target.value)} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label style={lbl}>CTA Button 2 Label</label><input style={inp} value={settings.cta2_label || ""} onChange={e => set("cta2_label", e.target.value)} /></div>
              <div><label style={lbl}>CTA Button 2 URL</label><input style={inp} value={settings.cta2_url || ""} onChange={e => set("cta2_url", e.target.value)} /></div>
            </div>
          </div>
        )}

        {/* ── TAB 1: Company Info ── */}
        {tab === 1 && (
          <div style={{ background: "white", padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: NAVY, marginBottom: 24 }}>Company Info</h2>
            <div style={fld}><label style={lbl}>Company Name</label><input style={inp} value={settings.company_name || ""} onChange={e => set("company_name", e.target.value)} /></div>
            <div style={fld}><label style={lbl}>Tagline</label><input style={inp} value={settings.company_tagline || ""} onChange={e => set("company_tagline", e.target.value)} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div><label style={lbl}>Phone</label><input style={inp} value={settings.phone || ""} onChange={e => set("phone", e.target.value)} /></div>
              <div><label style={lbl}>WhatsApp Number</label><input style={inp} value={settings.whatsapp || ""} onChange={e => set("whatsapp", e.target.value)} placeholder="919876543210" /></div>
            </div>
            <div style={fld}><label style={lbl}>Email</label><input style={inp} value={settings.email || ""} onChange={e => set("email", e.target.value)} /></div>
            <div style={fld}><label style={lbl}>Address</label><textarea style={{ ...inp, minHeight: 80, resize: "vertical" }} value={settings.address || ""} onChange={e => set("address", e.target.value)} /></div>
          </div>
        )}

        {/* ── TAB 2: Social Media ── */}
        {tab === 2 && (
          <div style={{ background: "white", padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: NAVY, marginBottom: 24 }}>Social Media</h2>
            {[["Instagram", "instagram_url"], ["Facebook", "facebook_url"], ["LinkedIn", "linkedin_url"], ["YouTube", "youtube_url"], ["Pinterest", "pinterest_url"]].map(([label, key]) => (
              <div key={key} style={fld}>
                <label style={lbl}>{label} URL</label>
                <input style={inp} value={settings[key] || ""} onChange={e => set(key, e.target.value)} placeholder="https://..." />
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 3: SEO ── */}
        {tab === 3 && (
          <div style={{ background: "white", padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: NAVY, marginBottom: 8 }}>SEO Settings</h2>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Configure meta tags for each page.</p>

            <div style={fld}>
              <label style={lbl}>Google Analytics Measurement ID</label>
              <input style={inp} value={settings.ga_id || ""} onChange={e => set("ga_id", e.target.value)} placeholder="G-XXXXXXXXXX" />
            </div>

            {SEO_PAGES.map(page => (
              <div key={page} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid #f0ede9" }}>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 17, color: NAVY, marginBottom: 16, textTransform: "capitalize" }}>{page} Page</h3>
                <div style={fld}><label style={lbl}>Meta Title</label><input style={inp} value={settings[`seo_${page}_title`] || ""} onChange={e => set(`seo_${page}_title`, e.target.value)} /></div>
                <div style={fld}><label style={lbl}>Meta Description</label><textarea style={{ ...inp, minHeight: 70, resize: "vertical" }} value={settings[`seo_${page}_desc`] || ""} onChange={e => set(`seo_${page}_desc`, e.target.value)} /></div>
                <div style={fld}><label style={lbl}>Meta Keywords</label><input style={inp} value={settings[`seo_${page}_keywords`] || ""} onChange={e => set(`seo_${page}_keywords`, e.target.value)} placeholder="comma, separated, keywords" /></div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 4: Testimonials ── */}
        {tab === 4 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: NAVY }}>Testimonials</h2>
              <button onClick={() => setTModal({ id: null })} style={{ background: GOLD, color: "white", border: "none", padding: "10px 18px", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer" }}>
                + Add
              </button>
            </div>

            {testimonialsLoading ? (
              <div style={{ background: "white", padding: 24 }}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} style={{ height: 60, marginBottom: 8, background: "#f5f0eb", animation: "pulse 1.4s ease infinite" }} />
                ))}
              </div>
            ) : testimonials.length === 0 ? (
              <div style={{ background: "white", padding: "48px 24px", textAlign: "center" }}>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: "#ccc", marginBottom: 8 }}>No testimonials yet</p>
                <button onClick={() => setTModal({ id: null })} style={{ background: GOLD, color: "white", border: "none", padding: "10px 18px", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", marginTop: 12 }}>+ Add Testimonial</button>
              </div>
            ) : (
              <div style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                {testimonials.map((t, idx) => (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderBottom: idx < testimonials.length - 1 ? "1px solid #f0ede9" : "none" }}>
                    {t.photo ? (
                      <img src={`${API_BASE}/uploads/${t.photo}`} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: "50%", flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: 44, height: 44, background: "#f0ede9", borderRadius: "50%", flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, color: NAVY, fontWeight: 500, marginBottom: 2 }}>{t.client_name}</p>
                      <p style={{ fontSize: 12, color: "#888" }}>{t.designation}{t.company ? `, ${t.company}` : ""}</p>
                      <p style={{ fontSize: 12, color: GOLD }}>{"★".repeat(t.rating)}</p>
                    </div>
                    <span style={{ fontSize: 10, padding: "3px 8px", background: t.is_active ? "#dcfce7" : "#f1f5f9", color: t.is_active ? "#15803d" : "#64748b", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {t.is_active ? "Active" : "Inactive"}
                    </span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setTModal(t)} style={{ padding: "5px 12px", background: "white", border: "1px solid #e0dbd3", fontSize: 12, cursor: "pointer", color: "#555" }}>Edit</button>
                      <button onClick={() => setTDeleteTarget(t)} style={{ padding: "5px 12px", background: "white", border: "1px solid #fca5a5", fontSize: 12, cursor: "pointer", color: "#ef4444" }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Save button (not shown on testimonials tab) */}
        {tab !== 4 && (
          <div style={{ marginTop: 28 }}>
            {saved && <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#15803d" }}>Settings saved successfully.</div>}
            <button onClick={saveSettings} disabled={saving} style={{ background: GOLD, color: "white", border: "none", padding: "12px 28px", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", opacity: saving ? 0.7 : 1 }}>
              {saving ? "Saving…" : "Save Settings"}
            </button>
          </div>
        )}
      </div>

      {tModal !== null && (
        <TestimonialModal
          t={tModal}
          onClose={() => setTModal(null)}
          onSave={() => { setTModal(null); loadTestimonials(); }}
        />
      )}

      {tDeleteTarget && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,26,46,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300 }} onClick={() => setTDeleteTarget(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "white", width: 400, padding: "32px 28px", boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
            <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: NAVY, marginBottom: 16 }}>Confirm Delete</h3>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, marginBottom: 28 }}>Delete testimonial from "{tDeleteTarget.client_name}"?</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button onClick={() => setTDeleteTarget(null)} style={{ padding: "9px 20px", background: "white", border: "1px solid #e0dbd3", fontSize: 13, cursor: "pointer", color: "#555" }}>Cancel</button>
              <button onClick={() => deleteTestimonial(tDeleteTarget)} style={{ padding: "9px 20px", background: "#ef4444", color: "white", border: "none", fontSize: 13, cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @media(max-width:768px){
          div[style*="gridTemplateColumns: 1fr 1fr"]{grid-template-columns:1fr!important}
          div[style*="gridTemplateColumns: 1fr 1fr 1fr"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
}
