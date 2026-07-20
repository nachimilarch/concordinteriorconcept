import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import api from "../api/axios";

const NAVY = "#22221E";
const GOLD = "#FBB316";
const BG = "#F5F0EB";

/* ── Image URL helper ─────────────────────────── */
const imgUrl = (p) => {
  if (!p) return null;
  if (p.startsWith("/") || p.startsWith("http")) return p;
  return `/uploads/${p}`;
};

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ── Before / After slider ───────────────────────── */
function BeforeAfterSlider({ before, after }) {
  const [pos, setPos] = useState(50);

  return (
    <div style={{ position: "relative", overflow: "hidden", userSelect: "none", height: 520, cursor: "col-resize" }}>
      {/* After (right side — revealed as pos increases) */}
      <img
        src={imgUrl(after.image_path)}
        alt="After"
        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
      />
      {/* Before (left side — clipped) */}
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={imgUrl(before.image_path)}
          alt="Before"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Labels */}
      <div style={{ position: "absolute", top: 20, left: 20, background: "rgba(24,24,21,0.75)", color: "white", padding: "4px 12px", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>Before</div>
      <div style={{ position: "absolute", top: 20, right: 20, background: `rgba(251,179,22,0.9)`, color: "white", padding: "4px 12px", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>After</div>

      {/* Divider handle */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, transform: "translateX(-50%)", width: 2, background: "white", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 44, height: 44, background: "white", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
        }}>
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 6h18M6 1l-5 5 5 5M14 1l5 5-5 5" stroke={NAVY} strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </div>
      </div>

      {/* Invisible range input for interaction */}
      <input
        type="range" min="0" max="100" value={pos}
        onChange={e => setPos(Number(e.target.value))}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "col-resize", margin: 0 }}
      />
    </div>
  );
}

/* ── Gallery lightbox ────────────────────────────── */
function Lightbox({ images, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);

  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = e => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: "absolute", left: 24, background: "none", border: "1px solid rgba(255,255,255,0.3)", color: "white", width: 48, height: 48, cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
      <img
        onClick={e => e.stopPropagation()}
        src={imgUrl(images[idx].image_path)}
        alt=""
        style={{ maxHeight: "85vh", maxWidth: "85vw", objectFit: "contain", display: "block" }}
      />
      <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: "absolute", right: 24, background: "none", border: "1px solid rgba(255,255,255,0.3)", color: "white", width: 48, height: 48, cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
      <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 28, cursor: "pointer", lineHeight: 1 }}>×</button>
      <p style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>{idx + 1} / {images.length}</p>
    </div>
  );
}

/* ── Related project card ────────────────────────── */
function RelatedCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = imgUrl(project.cover_image);
  return (
    <Link to={`/portfolio/${project.slug}`} style={{ textDecoration: "none", display: "block" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ position: "relative", height: 260, overflow: "hidden", background: "#181815" }}>
        {imgSrc
          ? <img src={imgSrc} alt={project.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" }} />
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" stroke={GOLD} strokeWidth="0.75" rx="1" /></svg></div>
        }
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(24,24,21,0.8) 0%, transparent 55%)", opacity: hovered ? 1 : 0.5, transition: "opacity 0.4s" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, margin: "0 0 6px" }}>{project.category_name}</p>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, color: "white", margin: 0 }}>{project.title}</p>
        </div>
      </div>
    </Link>
  );
}

/* ── Main page ───────────────────────────────────── */
export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setProject(null);
    setRelated([]);
    api.get(`/projects/${slug}`)
      .then(r => {
        setProject(r.data);
        if (r.data.category_slug) {
          api.get("/projects", { params: { category: r.data.category_slug, limit: 4 } })
            .then(r2 => setRelated(r2.data.filter(p => p.slug !== slug).slice(0, 3)))
            .catch(() => {});
        }
      })
      .catch(e => {
        if (e.response?.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: BG, paddingTop: 96 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 40px" }}>
        <div style={{ height: 560, background: "#E8E4DF", marginBottom: 40, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)", animation: "shimmer 1.6s ease infinite" }} />
        </div>
        <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
      </div>
    </div>
  );

  if (notFound) return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 40px" }}>
      <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 80, color: "rgba(24,24,21,0.1)", margin: 0, lineHeight: 1 }}>404</p>
      <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, color: NAVY, margin: "0 0 16px" }}>Project Not Found</h1>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", margin: "0 0 32px" }}>This project may have been moved or is no longer published.</p>
      <Link to="/portfolio" style={{ textDecoration: "none", background: GOLD, color: "white", padding: "12px 32px", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase" }}>Back to Portfolio</Link>
    </div>
  );

  if (!project) return null;

  const galleryImages = project.images || [];
  const hasBeforeAfter = project.beforeImg && project.afterImg;

  const coverSrc = imgUrl(project.cover_image);

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────────── */}
      <div style={{ position: "relative", height: 600, overflow: "hidden" }}>
        {coverSrc
          ? <img src={coverSrc} alt={project.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <div style={{ width: "100%", height: "100%", background: "#181815", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="64" height="64" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" stroke={GOLD} strokeWidth="0.75" rx="1" /></svg></div>
        }
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(24,24,21,0.9) 0%, rgba(24,24,21,0.3) 50%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 40px 60px", maxWidth: 1280, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, margin: "0 0 12px" }}>
              {project.category_name}
            </p>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 400, color: "white", margin: "0 0 16px", lineHeight: 1.05 }}>
              {project.title}
            </h1>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: 0 }}>
              {project.location}{project.year_completed ? ` · ${project.year_completed}` : ""}
              {project.area ? ` · ${project.area}` : ""}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Breadcrumb ───────────────────────────── */}
      <div style={{ borderBottom: "1px solid rgba(24,24,21,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 40px", display: "flex", gap: 8, alignItems: "center", fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF" }}>
          <Link to="/" style={{ color: "#9CA3AF", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link to="/portfolio" style={{ color: "#9CA3AF", textDecoration: "none" }}>Portfolio</Link>
          <span>/</span>
          <span style={{ color: NAVY }}>{project.title}</span>
        </div>
      </div>

      {/* ── Overview ─────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 80, alignItems: "start" }}>

          {/* Left: description */}
          <FadeIn>
            {project.short_desc && (
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(20px, 2.5vw, 28px)", fontStyle: "italic", color: NAVY, lineHeight: 1.6, margin: "0 0 32px" }}>
                "{project.short_desc}"
              </p>
            )}
            {project.full_desc && (
              <div
                className="prose-project"
                dangerouslySetInnerHTML={{ __html: project.full_desc }}
                style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.9, color: "#374151" }}
              />
            )}
          </FadeIn>

          {/* Right: project meta */}
          <FadeIn delay={0.12}>
            <div style={{ background: "white", padding: "32px 28px" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, margin: "0 0 20px" }}>Project Details</p>
              {[
                ["Category", project.category_name],
                ["Location", project.location],
                ["Year", project.year_completed],
                ["Area", project.area],
              ].filter(([, v]) => v).map(([label, value]) => (
                <div key={label} style={{ borderBottom: "1px solid rgba(24,24,21,0.07)", paddingBottom: 14, marginBottom: 14 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 4px" }}>{label}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: NAVY, margin: 0 }}>{value}</p>
                </div>
              ))}
              <Link to="/contact" style={{
                display: "block", marginTop: 24,
                textAlign: "center", padding: "12px",
                background: GOLD, color: "white", textDecoration: "none",
                fontFamily: "Inter, sans-serif", fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
              }}>
                Start a Similar Project
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────── */}
      {galleryImages.length > 0 && (
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 80px" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, fontWeight: 400, color: NAVY, margin: 0 }}>Gallery</h2>
              <div style={{ flex: 1, height: 1, background: "rgba(24,24,21,0.1)" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF" }}>{galleryImages.length} images</span>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {galleryImages.map((img, i) => (
              <FadeIn key={img.id} delay={i * 0.05}>
                <div
                  onClick={() => setLightboxIdx(i)}
                  style={{
                    position: "relative", overflow: "hidden",
                    height: i % 5 === 0 ? 380 : 260,
                    cursor: "pointer", background: "#E8EAED",
                    gridColumn: i % 5 === 0 ? "span 2" : "span 1",
                  }}
                >
                  <img
                    src={imgUrl(img.image_path)}
                    alt=""
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(24,24,21,0)", transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(24,24,21,0.35)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(24,24,21,0)"; }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ opacity: 0, transition: "opacity 0.3s" }}
                      ref={el => {
                        if (el) {
                          const parent = el.parentElement;
                          parent.addEventListener("mouseenter", () => el.style.opacity = "1");
                          parent.addEventListener("mouseleave", () => el.style.opacity = "0");
                        }
                      }}
                    >
                      <rect x="1" y="1" width="30" height="30" stroke="white" strokeWidth="1" />
                      <path d="M10 16h12M16 10v12" stroke="white" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* ── Before / After ───────────────────────── */}
      {hasBeforeAfter && (
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 80px" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, fontWeight: 400, color: NAVY, margin: 0 }}>Transformation</h2>
              <div style={{ flex: 1, height: 1, background: "rgba(24,24,21,0.1)" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF" }}>Drag to compare</span>
            </div>
          </FadeIn>
          <BeforeAfterSlider before={project.beforeImg} after={project.afterImg} />
        </section>
      )}

      {/* ── Related Projects ─────────────────────── */}
      {related.length > 0 && (
        <section style={{ background: "#141412", padding: "80px 40px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, fontWeight: 400, color: "white", margin: 0 }}>Related Projects</h2>
                <Link to="/portfolio" style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, textDecoration: "none", borderBottom: `1px solid ${GOLD}`, paddingBottom: 3 }}>View All →</Link>
              </div>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${related.length}, 1fr)`, gap: 20 }}>
              {related.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.1}>
                  <RelatedCard project={p} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────── */}
      <section style={{ background: NAVY, padding: "72px 40px", textAlign: "center" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD, margin: "0 0 16px" }}>Have a project in mind?</p>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 400, color: "white", margin: "0 0 32px", lineHeight: 1.2 }}>
          Let's build something<br />extraordinary together.
        </h2>
        <Link to="/contact" className="btn-gold" style={{ textDecoration: "none" }}>Start Your Project</Link>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && galleryImages.length > 0 && (
        <Lightbox images={galleryImages} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}

    </div>
  );
}
