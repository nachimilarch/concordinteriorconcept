import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

const NAVY = "#22221E";
const GOLD = "#FBB316";
const GOLD_D = "#DE9E08";
const BG = "#F5F0EB";

const SERVICE_OPTIONS = ["Interior Design", "Construction", "Renovation", "Consultation", "Other"];

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B7280", marginBottom: 8 }}>{label}</label>
      {children}
      {error && <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#EF4444", marginTop: 5 }}>{error}</p>}
    </div>
  );
}

const inputStyle = (hasError) => ({
  width: "100%", boxSizing: "border-box",
  padding: "13px 18px",
  border: `1px solid ${hasError ? "#EF4444" : "rgba(24,24,21,0.15)"}`,
  borderRadius: 12,
  fontFamily: "Inter, sans-serif", fontSize: 15,
  color: NAVY, background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  outline: "none", transition: "border-color 0.25s",
});

export default function Contact() {
  const [settings, setSettings] = useState({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    api.get("/settings").then(r => setSettings(r.data)).catch(() => {});
  }, []);

  const phone = settings.company_phone || settings.phone || "";
  const email = settings.company_email || settings.email || "";
  const address = settings.company_address || settings.address || "";
  const whatsapp = settings.whatsapp_number || settings.whatsapp || "";

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    try {
      await api.post("/enquiries", form);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>

      {/* Hero — PDF closing-page "Let's Connect" treatment */}
      <section className="paper-bg" style={{ paddingTop: 140, paddingBottom: 80, borderBottom: "1px solid rgba(44,74,59,0.12)", position: "relative", overflow: "hidden" }}>
        {/* Decorative architectural line sketch (left) */}
        <svg
          aria-hidden
          viewBox="0 0 280 200"
          style={{ position: "absolute", left: 24, bottom: 24, width: 280, height: 200, opacity: 0.35, pointerEvents: "none" }}
        >
          <g stroke="#2C4A3B" strokeWidth="1" fill="none" strokeLinejoin="round">
            <path d="M30,160 L30,90 L80,50 L130,90 L130,160 Z" />
            <path d="M55,160 L55,120 L75,120 L75,160" />
            <path d="M85,160 L85,110 L115,110 L115,160" />
            <path d="M40,90 L80,60 L120,90" />
            <circle cx="200" cy="60" r="22" />
            <path d="M200,38 L200,82 M178,60 L222,60" />
            <path d="M165,160 L260,160" strokeDasharray="3 3" />
            <path d="M165,150 L170,160 L165,170" />
            <path d="M260,150 L255,160 L260,170" />
          </g>
        </svg>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
            <p className="chapter-label" style={{ margin: "0 0 16px" }}>Book a Consultation</p>
            <h1 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(64px, 10vw, 160px)",
              fontWeight: 400,
              lineHeight: 1,
              color: "#2C4A3B",
              margin: "0 0 10px",
            }}>
              Let's Connect
            </h1>
            <p style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(18px, 2vw, 26px)",
              fontStyle: "italic",
              color: NAVY,
              margin: "0 0 8px",
            }}>
              and let's design what comes next — together.
            </p>
            <div style={{ width: 80, height: 1, background: "#2C4A3B", margin: "20px auto 0" }} />
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 40px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 80, alignItems: "start" }}>

          {/* Form */}
          <div>
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: "48px 40px", background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderLeft: `4px solid ${GOLD}`, borderRadius: 18, boxShadow: "0 8px 28px rgba(24,24,21,0.08)" }}>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: NAVY, margin: "0 0 12px" }}>Thank you.</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", lineHeight: 1.75, margin: "0 0 24px" }}>Your enquiry has been received. We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} style={{ background: "none", border: `1px solid ${GOLD}`, color: GOLD, padding: "10px 24px", borderRadius: 999, fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {errors.submit && (
                  <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", padding: "12px 16px", marginBottom: 24, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#DC2626" }}>
                    {errors.submit}
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                  <Field label="Full Name *" error={errors.name}>
                    <input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Rajesh Kumar" style={inputStyle(errors.name)}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = errors.name ? "#EF4444" : "rgba(24,24,21,0.15)"} />
                  </Field>
                  <Field label="Email Address *" error={errors.email}>
                    <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@example.com" style={inputStyle(errors.email)}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = errors.email ? "#EF4444" : "rgba(24,24,21,0.15)"} />
                  </Field>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                  <Field label="Phone Number">
                    <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 98765 43210" style={inputStyle(false)}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = "rgba(24,24,21,0.15)"} />
                  </Field>
                  <Field label="Service Interested In">
                    <select value={form.service} onChange={e => set("service", e.target.value)} style={{ ...inputStyle(false), appearance: "none", cursor: "pointer" }}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = "rgba(24,24,21,0.15)"}>
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Your Message *" error={errors.message}>
                  <textarea value={form.message} onChange={e => set("message", e.target.value)} placeholder="Tell us about your project — location, scope, timeline, and any other details..." rows={6} style={{ ...inputStyle(errors.message), resize: "vertical", minHeight: 140 }}
                    onFocus={e => e.target.style.borderColor = GOLD}
                    onBlur={e => e.target.style.borderColor = errors.message ? "#EF4444" : "rgba(24,24,21,0.15)"} />
                </Field>

                <button type="submit" disabled={submitting} style={{ background: submitting ? "#DE9E08" : GOLD, color: "white", border: "none", padding: "15px 40px", borderRadius: 999, fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", cursor: submitting ? "not-allowed" : "pointer", transition: "background 0.3s" }}
                  onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = GOLD_D; }}
                  onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = GOLD; }}>
                  {submitting ? "Sending…" : "Send Enquiry"}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: 120 }}>
            <div style={{ background: "rgba(24,24,21,0.86)", backdropFilter: "blur(16px) saturate(140%)", WebkitBackdropFilter: "blur(16px) saturate(140%)", border: "1px solid rgba(251,179,22,0.25)", borderRadius: 22, padding: "40px 36px", marginBottom: 24, boxShadow: "0 16px 44px rgba(24,24,21,0.22)" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: GOLD, margin: "0 0 28px" }}>Contact Details</p>
              {[
                address && { label: "Address", value: address },
                phone && { label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
                email && { label: "Email", value: email, href: `mailto:${email}` },
              ].filter(Boolean).map(({ label, value, href }) => (
                <div key={label} style={{ marginBottom: 22 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: "0 0 4px" }}>{label}</p>
                  {href
                    ? <a href={href} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>{value}</a>
                    : <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.6 }}>{value}</p>
                  }
                </div>
              ))}
              {whatsapp && <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, marginTop: 8 }}>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "white", padding: "11px 22px", borderRadius: 999, textDecoration: "none", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>}
            </div>
            <div style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.75)", borderLeft: `3px solid ${GOLD}`, borderRadius: 18, padding: "28px 32px", boxShadow: "0 8px 28px rgba(24,24,21,0.08)" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, margin: "0 0 10px" }}>Office Hours</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563", margin: "0 0 6px" }}>Monday – Saturday</p>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: NAVY, margin: 0 }}>9:00 AM – 7:00 PM</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
