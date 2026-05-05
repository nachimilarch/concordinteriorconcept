import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ── Brand tokens ─────────────────────────────── */
const NAVY = "#2F3142";
const GOLD = "#C8A75B";
const GOLD_D = "#A88A3D";
const BG = "#F4F6F8";

/* ── Filter categories ───────────────────────── */
const FILTERS = [
  "All",
  "Residential",
  "Commercial",
  "Construction",
  "Interiors",
  "Renovation",
];

/* ── Placeholder projects (replace with API data) */
const MOCK_PROJECTS = [
  { id: 1, title: "The Meridian Residence", category_name: "Residential", location: "Jubilee Hills", year_completed: 2024, cover_image: null, size: "large" },
  { id: 2, title: "Azure Sky Penthouse", category_name: "Interiors", location: "Banjara Hills", year_completed: 2023, cover_image: null, size: "small" },
  { id: 3, title: "Lumina Office Complex", category_name: "Commercial", location: "Madhapur", year_completed: 2024, cover_image: null, size: "small" },
  { id: 4, title: "The Crest Villa", category_name: "Construction", location: "Gachibowli", year_completed: 2023, cover_image: null, size: "medium" },
  { id: 5, title: "Orchid Terrace Reno", category_name: "Renovation", location: "Secunderabad", year_completed: 2022, cover_image: null, size: "medium" },
  { id: 6, title: "Skyline Retail Hub", category_name: "Commercial", location: "Kukatpally", year_completed: 2024, cover_image: null, size: "large" },
  { id: 7, title: "Palm Court Interiors", category_name: "Interiors", location: "Kondapur", year_completed: 2023, cover_image: null, size: "small" },
  { id: 8, title: "Heritage Home Restored", category_name: "Renovation", location: "Himayatnagar", year_completed: 2022, cover_image: null, size: "small" },
  { id: 9, title: "Vertex Tower Lobby", category_name: "Commercial", location: "Nanakramguda", year_completed: 2024, cover_image: null, size: "medium" },
  { id: 10, title: "The Loft at Banjara", category_name: "Residential", location: "Banjara Hills", year_completed: 2023, cover_image: null, size: "large" },
  { id: 11, title: "Garden Row Townhomes", category_name: "Construction", location: "Miyapur", year_completed: 2024, cover_image: null, size: "small" },
  { id: 12, title: "Studio Nine Workspace", category_name: "Interiors", location: "Madhapur", year_completed: 2023, cover_image: null, size: "medium" },
];

/* Picsum seeds per project for deterministic placeholder images */
const SEEDS = [
  "interior1", "interior2", "interior3", "interior4",
  "interior5", "interior6", "interior7", "interior8",
  "interior9", "living1", "living2", "living3",
];

/* ── Category accent colors (subtle) ─────────── */
const CAT_COLOR = {
  Residential: "#4A7C6F",
  Commercial: "#5B6A8A",
  Construction: "#8A6A3A",
  Interiors: "#7A5A6A",
  Renovation: "#6A7A5A",
};

/* ── Card component ──────────────────────────── */
function PortfolioCard({ project, index, seed }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = project.cover_image
    ? `${import.meta.env.VITE_API_URL}/uploads/${project.cover_image}`
    : `https://picsum.photos/seed/${seed}/800/600`;

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
        to={`/portfolio/${project.id}`}
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
        }}>
          <img
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

          {/* Dark overlay on hover */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to top, rgba(47,49,66,0.82) 0%, rgba(47,49,66,0.12) 55%, transparent 100%)`,
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
          }}>
            {project.category_name}
          </div>

          {/* View arrow — appears on hover */}
          <div style={{
            position: "absolute", top: 20, right: 20,
            width: 40, height: 40,
            border: `1px solid ${GOLD}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(0,0)" : "translate(8px,-8px)",
            transition: "all 0.35s ease",
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H6M13 3V10" stroke={GOLD} strokeWidth="1.5" />
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
            fontSize: 16, fontWeight: 500,
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
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [loading, setLoading] = useState(false);

  /* Fetch real projects from API */
  useEffect(() => {
    const api = import.meta.env.VITE_API_URL;
    if (!api) return;
    setLoading(true);
    fetch(`${api}/api/projects?published=true`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.length) setProjects(data); })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category_name === activeFilter);

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>

      {/* ── Hero header ──────────────────────── */}
      <section style={{
        paddingTop: 140, paddingBottom: 60,
        borderBottom: "1px solid rgba(47,49,66,0.08)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>

            {/* Left: title */}
            <div>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: GOLD, margin: "0 0 16px",
              }}>Selected Works</p>
              <h1 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(44px, 6vw, 88px)",
                fontWeight: 400, lineHeight: 1.0,
                color: NAVY, margin: 0,
              }}>
                Our<br />Portfolio<span style={{ color: GOLD }}>.</span>
              </h1>
            </div>

            {/* Right: descriptor */}
            <div style={{ maxWidth: 360 }}>
              <div style={{ width: 40, height: 1, background: GOLD, marginBottom: 16 }} />
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13, lineHeight: 1.75,
                color: "#6B7280", margin: 0,
              }}>
                From intimate residences to landmark commercial spaces — each project is a story of craftsmanship, vision, and precision execution across Hyderabad.
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
      </section>

      {/* ── Filter bar ───────────────────────── */}
      <section style={{
        position: "sticky",
        top: 76,   /* matches scrolled navbar height */
        zIndex: 49,
        background: "rgba(244,246,248,0.72)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(200,167,91,0.18)",
        boxShadow: "0 4px 24px rgba(47,49,66,0.07)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 40px",
          display: "flex", alignItems: "center", gap: 0,
          overflowX: "auto",
          scrollbarWidth: "none",       /* Firefox */
          msOverflowStyle: "none",      /* IE */
        }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: activeFilter === f ? GOLD : NAVY,
                padding: "20px 24px",
                borderBottom: activeFilter === f ? `2px solid ${GOLD}` : "2px solid transparent",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
                opacity: activeFilter === f ? 1 : 0.6,
              }}
              onMouseEnter={e => { if (activeFilter !== f) e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={e => { if (activeFilter !== f) e.currentTarget.style.opacity = "0.6"; }}
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
                    seed={SEEDS[i % SEEDS.length]}
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

      {/* ── CTA strip ────────────────────────── */}
      <section style={{
        background: NAVY,
        padding: "72px 40px",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 10, letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: GOLD, margin: "0 0 16px",
        }}>Have a project in mind?</p>
        <h2 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(28px, 3.5vw, 48px)",
          fontWeight: 400, color: "white",
          margin: "0 0 32px", lineHeight: 1.2,
        }}>
          Let's build something<br />extraordinary together.
        </h2>
        <Link
          to="/contact"
          className="btn-gold"
          style={{ textDecoration: "none" }}
        >
          Start Your Project
        </Link>
      </section>

    </div>
  );
}