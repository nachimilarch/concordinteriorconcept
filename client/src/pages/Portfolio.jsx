import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import ConnectCTA from "../components/ConnectCTA";

/* ── Brand tokens ─────────────────────────────── */
const NAVY = "#22221E";
const GOLD = "#FBB316";
const GOLD_D = "#DE9E08";
const BG = "#F5F0EB";
const PORTFOLIO_RED = "#2C4A3B";
const PORTFOLIO_RED_LIGHT = "#7FA08C";

/* ── Image URL helper ─────────────────────────── */
const imgUrl = (p) => {
  if (!p) return null;
  if (p.startsWith("/") || p.startsWith("http")) return p;
  return `/uploads/${p}`;
};

/* ── Category accent colors (subtle) ─────────── */
const CAT_COLOR = {
  Residential: "#4A7C6F",
  Commercial: "#5B6A8A",
  Construction: "#8A6A3A",
  Interiors: "#7A5A6A",
  Renovation: "#6A7A5A",
};

/* ── Card component ──────────────────────────── */
function PortfolioCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = imgUrl(project.cover_image);

  /* Height mapping for visual rhythm */
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
      <Link
        to={`/portfolio/${project.slug || project.id}`}
        style={{ textDecoration: "none", display: "block" }}
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

          {/* Dark overlay on hover */}
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

          {/* View arrow — appears on hover */}
          <div style={{
            position: "absolute", top: 20, right: 20,
            width: 40, height: 40,
            border: `1px solid rgba(245,240,235,0.7)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(0,0)" : "translate(8px,-8px)",
            transition: "all 0.35s ease",
            background: "rgba(255,255,255,0.08)",
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H6M13 3V10" stroke={PORTFOLIO_RED_LIGHT} strokeWidth="1.5" />
            </svg>
          </div>

          {/* Title overlay at bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "24px 24px 20px",
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "transform 0.4s ease",
          }}>
            <p style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 20, fontWeight: 500,
              color: "white", margin: 0,
              lineHeight: 1.25,
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
      </Link>
    </motion.div>
  );
}

/* ── Main Portfolio page ─────────────────────── */
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Fetch categories for filter tabs */
  useEffect(() => {
    api.get("/categories").then(r => { if (r.data?.length) setCategories(r.data); }).catch(() => {});
  }, []);

  /* Fetch real projects from API */
  useEffect(() => {
    setLoading(true);
    api.get("/projects")
      .then(r => { if (r.data?.length) setProjects(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* Only show filter chips for categories that have at least one published project */
  const usedCategoryNames = [...new Set(projects.map(p => p.category_name).filter(Boolean))];
  const filters = ["All", ...categories.map(c => c.name).filter(n => usedCategoryNames.includes(n))];

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category_name === activeFilter);

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>

      {/* ── Hero header ── (editorial framed cover) */}
      <section className="paper-bg" style={{
        paddingTop: 140, paddingBottom: 80,
        borderBottom: `1px solid rgba(44,74,59,0.12)`,
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div className="dashed-frame" style={{ background: "rgba(255,255,255,0.55)" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>

              {/* Left: title */}
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

              {/* Right: descriptor */}
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

      {/* ── Filter bar ───────────────────────── */}
      <section style={{
        position: "sticky",
        top: 76,   /* matches scrolled navbar height */
        zIndex: 49,
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
          overflowX: "auto",
          scrollbarWidth: "none",       /* Firefox */
          msOverflowStyle: "none",      /* IE */
        }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
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

      {/* ── Project grid ─────────────────────── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 40px 100px" }}>
        {loading && (
          <div style={{
            textAlign: "center", padding: "80px 0", color: "#6B7280",
            fontFamily: "Inter, sans-serif", fontSize: 12, letterSpacing: "0.15em"
          }}>
            Loading projects…
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {/* ── Bento-style editorial grid ──── */}
          <motion.div
            key={activeFilter}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 24,
            }}
          >
            {filtered.map((project, i) => {
              /*
               * Layout pattern (repeats every 5):
               * 0 → large  (span 8)
               * 1 → small  (span 4)
               * 2 → small  (span 4)
               * 3 → medium (span 4)
               * 4 → medium (span 4)
               * Then repeat, alternating left/right for large card
               */
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
                  />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
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

      {/* ── Let's Connect — uniform site-wide CTA ── */}
      <ConnectCTA />

    </div>
  );
}