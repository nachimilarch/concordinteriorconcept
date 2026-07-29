import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ConnectCTA from "../components/ConnectCTA";
import { HexagonGrid } from "../components/AnimatedAccents";
import { CATEGORIES } from "../data/settings";
import { PROJECTS } from "../data/projects";

/* ── Brand tokens ─────────────────────────────── */
const NAVY = "#22221E";
const GOLD = "#FBB316";
const BG = "#F5F0EB";
const FOREST = "#2C4A3B";

/* ── Image URL helper ─────────────────────────── */
const imgUrl = (p) => {
  if (!p) return null;
  if (p.startsWith("/") || p.startsWith("http")) return p;
  return `/uploads/${p}`;
};

/* ── Category accent colors ───────────────────── */
const CAT_COLOR = {
  Residential: "#4A7C6F",
  Commercial:  "#5B6A8A",
  Construction:"#8A6A3A",
  Interiors:   "#7A5A6A",
  Renovation:  "#6A7A5A",
  "Layouts & Planning": "#5A6A7A",
};

/* ── Project detail modal ─────────────────────── */
function ProjectModal({ slug, onClose }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    setLoading(true);
    const found = PROJECTS.find(p => p.slug === slug || String(p.id) === String(slug));
    setProject(found || null);
    setLoading(false);
  }, [slug]);

  const handleKey = useCallback(e => { if (e.key === "Escape") onClose(); }, [onClose]);
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const coverSrc = project ? imgUrl(project.cover_image) : null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(10,10,8,0.82)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px",
        }}
      >
        {/* Modal panel */}
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          style={{
            display: "flex",
            width: "min(1120px, 96vw)",
            height: "min(720px, 90vh)",
            background: "#FEFCFA",
            overflow: "hidden",
            boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
            position: "relative",
          }}
        >
          {/* ── Close button ── */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 20, right: 20, zIndex: 10,
              width: 40, height: 40,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              border: "none", borderRadius: "50%",
              color: "white", fontSize: 18, lineHeight: 1,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(251,179,22,0.9)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.55)"}
            aria-label="Close"
          >×</button>

          {loading ? (
            /* Loading skeleton */
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#F0ECE7" }}>
              <div style={{
                width: 40, height: 40, border: `3px solid rgba(251,179,22,0.25)`,
                borderTopColor: GOLD, borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }} />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : project ? (
            <>
              {/* ── Left: Full image ── */}
              <div style={{
                width: "58%", flexShrink: 0,
                position: "relative", overflow: "hidden",
                background: "#1A1A18",
              }}>
                {coverSrc
                  ? <img
                      src={coverSrc}
                      alt={project.title}
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: "center",
                        display: "block",
                      }}
                    />
                  : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" stroke={GOLD} strokeWidth="0.75" rx="1" /></svg>
                    </div>
                }
                {/* Gradient overlay at bottom */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: "35%",
                  background: "linear-gradient(to top, rgba(10,10,8,0.7) 0%, transparent 100%)",
                }} />
                {/* Category badge */}
                <div style={{
                  position: "absolute", top: 20, left: 20,
                  background: CAT_COLOR[project.category_name] || FOREST,
                  color: "white",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 9, letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "5px 14px", borderRadius: 999,
                }}>
                  {project.category_name}
                </div>
                {/* Location/year at bottom */}
                <div style={{
                  position: "absolute", bottom: 20, left: 20,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10, letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}>
                  {[project.location, project.year_completed, project.area].filter(Boolean).join(" · ")}
                </div>
              </div>

              {/* ── Right: Details panel ── */}
              <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                overflow: "hidden",
                borderLeft: "1px solid rgba(24,24,21,0.07)",
              }}>
                {/* Header */}
                <div style={{
                  padding: "36px 36px 24px",
                  borderBottom: "1px solid rgba(24,24,21,0.08)",
                  flexShrink: 0,
                }}>
                  <h2 style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(22px, 2.8vw, 32px)",
                    fontWeight: 500, lineHeight: 1.15,
                    color: NAVY, margin: "0 0 12px",
                    paddingRight: 32,
                  }}>
                    {project.title}
                  </h2>
                  {project.short_desc && (
                    <p style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: 16, fontStyle: "italic",
                      color: "#6B7280", lineHeight: 1.55,
                      margin: 0,
                    }}>
                      {project.short_desc}
                    </p>
                  )}
                </div>

                {/* Meta row */}
                <div style={{
                  display: "flex", flexWrap: "wrap",
                  padding: "16px 36px",
                  borderBottom: "1px solid rgba(24,24,21,0.08)",
                  gap: "12px 24px",
                  flexShrink: 0,
                }}>
                  {[
                    ["Category", project.category_name],
                    ["Location", project.location],
                    ["Year", project.year_completed],
                    ["Area", project.area],
                  ].filter(([, v]) => v).map(([label, value]) => (
                    <div key={label}>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 3px" }}>{label}</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: NAVY, margin: 0, fontWeight: 500 }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Full description — scrollable */}
                <div style={{
                  flex: 1, overflowY: "auto",
                  padding: "24px 36px 0",
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(24,24,21,0.15) transparent",
                }}>
                  {project.full_desc && (
                    <p style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13.5, lineHeight: 1.85,
                      color: "#374151", margin: 0,
                      whiteSpace: "pre-line",
                    }}>
                      {project.full_desc.replace(/<[^>]+>/g, "")}
                    </p>
                  )}
                </div>

                {/* CTA footer */}
                <div style={{
                  padding: "20px 36px 28px",
                  flexShrink: 0,
                  borderTop: "1px solid rgba(24,24,21,0.08)",
                  display: "flex", gap: 12, alignItems: "center",
                }}>
                  <Link
                    to="/contact"
                    onClick={onClose}
                    style={{
                      display: "inline-block",
                      background: GOLD, color: "white",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 9, letterSpacing: "0.22em",
                      textTransform: "uppercase", fontWeight: 600,
                      padding: "12px 22px",
                      textDecoration: "none",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#DE9E08"}
                    onMouseLeave={e => e.currentTarget.style.background = GOLD}
                  >
                    Start a Similar Project
                  </Link>
                  <button
                    onClick={onClose}
                    style={{
                      background: "none",
                      border: "1px solid rgba(24,24,21,0.18)",
                      color: NAVY,
                      fontFamily: "Inter, sans-serif",
                      fontSize: 9, letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "11px 18px",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                  >
                    Back to Portfolio
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF", fontFamily: "Inter, sans-serif", fontSize: 13 }}>
              Could not load project.
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Card component ──────────────────────────── */
function PortfolioCard({ project, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = imgUrl(project.cover_image);

  const heightMap = { large: 480, medium: 360, small: 280 };
  const cardH = heightMap[project.size] || 360;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <div
        onClick={() => onOpen(project.slug || project.id)}
        style={{ textDecoration: "none", display: "block", cursor: "pointer" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div style={{
          position: "relative",
          height: cardH,
          overflow: "hidden",
          background: "#E8EAED",
          borderRadius: 18,
          boxShadow: "0 12px 36px rgba(24,24,21,0.10)",
        }}>
          {imgSrc
            ? <img
                src={imgSrc}
                alt={project.title}
                loading="lazy"
                width={800}
                height={600}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  transform: hovered ? "scale(1.06)" : "scale(1)",
                  transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1)",
                  display: "block",
                }}
              />
            : <div style={{ width: "100%", height: "100%", background: "#181815", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" stroke={GOLD} strokeWidth="0.75" rx="1" /><circle cx="8.5" cy="8.5" r="1.5" fill={GOLD} opacity="0.6" /><path d="M21 15l-5-5L5 21" stroke={GOLD} strokeWidth="0.75" strokeLinecap="round" opacity="0.6" /></svg>
              </div>
          }

          {/* Dark overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to top, rgba(24,24,21,0.82) 0%, rgba(24,24,21,0.12) 55%, transparent 100%)`,
            opacity: hovered ? 1 : 0.45,
            transition: "opacity 0.45s ease",
          }} />

          {/* Category badge */}
          <div style={{
            position: "absolute", top: 20, left: 20,
            background: CAT_COLOR[project.category_name] || NAVY,
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontSize: 9, letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "5px 12px",
            borderRadius: 999,
          }}>
            {project.category_name}
          </div>

          {/* Expand icon on hover */}
          <div style={{
            position: "absolute", top: 20, right: 20,
            width: 40, height: 40,
            border: `1px solid rgba(245,240,235,0.7)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(0,0) scale(1)" : "translate(6px,-6px) scale(0.85)",
            transition: "all 0.35s ease",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(4px)",
          }}>
            {/* Expand icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H7M13 1V7" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Title at bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "24px 24px 20px",
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "transform 0.4s ease",
          }}>
            <p style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 20, fontWeight: 500,
              color: "white", margin: 0, lineHeight: 1.25,
            }}>{project.title}</p>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10, letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.6)",
              margin: "6px 0 0",
              textTransform: "uppercase",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.4s ease 0.05s",
            }}>
              {project.location} &nbsp;·&nbsp; {project.year_completed}
            </p>
          </div>
        </div>

        {/* Below-image meta */}
        <div style={{ padding: "14px 4px 0" }}>
          <p style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 18, fontWeight: 500,
            color: NAVY, margin: 0,
          }}>{project.title}</p>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 10, letterSpacing: "0.12em",
            color: "#6B7280", margin: "4px 0 0",
            textTransform: "uppercase",
          }}>
            {project.location} &nbsp;·&nbsp; {project.year_completed}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Portfolio page ─────────────────────── */
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const projects = PROJECTS;
  const categories = CATEGORIES;
  const loading = false;
  const [openSlug, setOpenSlug] = useState(null);

  const usedCategoryNames = [...new Set(projects.map(p => p.category_name).filter(Boolean))];
  const filters = ["All", ...categories.map(c => c.name).filter(n => usedCategoryNames.includes(n))];

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category_name === activeFilter);

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>

      {/* ── Hero header ── */}
      <section className="paper-bg" style={{
        paddingTop: 140, paddingBottom: 80,
        borderBottom: `1px solid rgba(44,74,59,0.12)`,
        position: "relative", overflow: "hidden",
      }}>
        <HexagonGrid style={{ position: "absolute", bottom: -20, right: -10, opacity: 0.72 }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div className="dashed-frame" style={{ background: "rgba(255,255,255,0.55)" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
              <div>
                <p className="chapter-label" style={{ margin: "0 0 14px" }}>Concord Interior Concepts · Selected Works</p>
                <h1 style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(56px, 8vw, 124px)",
                  fontWeight: 500, lineHeight: 0.92,
                  color: "#181815", margin: 0,
                  letterSpacing: "-0.01em",
                }}>
                  Portfolio<span style={{ color: "#FBB316" }}>.</span>
                </h1>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12, letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: NAVY, margin: "12px 0 0", opacity: 0.7,
                }}>Architecture &nbsp;·&nbsp; Interiors &nbsp;·&nbsp; Landscape</p>
              </div>
              <div style={{ maxWidth: 360 }}>
                <div style={{ width: 40, height: 1, background: "#2C4A3B", marginBottom: 16 }} />
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15, lineHeight: 1.8,
                  color: "#4B5563", margin: 0,
                }}>
                  From private villas and farmhouses to commercial developments and resort environments — each project is a story of design intent carried through to precise delivery.
                </p>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10, letterSpacing: "0.15em",
                  color: NAVY, margin: "16px 0 0",
                  textTransform: "uppercase",
                }}>
                  {filtered.length} {activeFilter === "All" ? "Projects" : activeFilter + " Projects"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section style={{
        position: "sticky", top: 76, zIndex: 49,
        background: "rgba(244,246,248,0.72)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(251,179,22,0.18)",
        boxShadow: "0 4px 24px rgba(24,24,21,0.07)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 40px",
          display: "flex", alignItems: "center", gap: 0,
          overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none",
        }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.2em",
                textTransform: "uppercase", fontWeight: 600,
                color: activeFilter === f ? "#F5F0EB" : NAVY,
                background: activeFilter === f ? "rgba(44,74,59,0.92)" : "rgba(255,255,255,0.4)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: activeFilter === f ? "1px solid rgba(44,74,59,0.9)" : "1px solid rgba(24,24,21,0.12)",
                borderRadius: 999,
                padding: "11px 22px",
                margin: "14px 5px",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
                boxShadow: activeFilter === f ? "0 6px 18px rgba(44,74,59,0.3)" : "none",
              }}
              onMouseEnter={e => { if (activeFilter !== f) e.currentTarget.style.background = "rgba(255,255,255,0.75)"; }}
              onMouseLeave={e => { if (activeFilter !== f) e.currentTarget.style.background = "rgba(255,255,255,0.4)"; }}
            >{f}</button>
          ))}
        </div>
      </section>

      {/* ── Project grid ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 40px 100px" }}>
        {loading && (
          <div style={{
            textAlign: "center", padding: "80px 0", color: "#6B7280",
            fontFamily: "Inter, sans-serif", fontSize: 12, letterSpacing: "0.15em",
          }}>
            Loading projects…
          </div>
        )}

        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}
          >
            {filtered.map((project, i) => {
              const pos = i % 5;
              const cycle = Math.floor(i / 5);
              const isEven = cycle % 2 === 0;

              let colSpan;
              if (pos === 0) colSpan = isEven ? "span 8" : "span 8 / 13";
              else if (pos === 1) colSpan = isEven ? "span 4" : "1 / span 4";
              else if (pos === 2) colSpan = isEven ? "1 / span 4" : "span 4";
              else if (pos === 3) colSpan = "span 4";
              else colSpan = "span 4";

              return (
                <div key={project.id} style={{ gridColumn: colSpan }}>
                  <PortfolioCard
                    project={{ ...project, size: pos === 0 ? "large" : pos <= 2 ? "medium" : "small" }}
                    index={i}
                    onOpen={setOpenSlug}
                  />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {!loading && filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: "100px 0",
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 28, color: "#9CA3AF",
          }}>
            No {activeFilter} projects yet.
          </div>
        )}
      </section>

      <ConnectCTA />

      {/* ── Project modal ── */}
      <AnimatePresence>
        {openSlug && (
          <ProjectModal key={openSlug} slug={openSlug} onClose={() => setOpenSlug(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
