import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import ConnectCTA from "../components/ConnectCTA";

/* ── Brand tokens ─────────────────────────────── */
const NAVY = "#22221E";
const GOLD = "#C2A87A";
const GOLD_D = "#A08760";
const BG = "#F5F0EB";
const PORTFOLIO_RED = "#2C4A3B";
const PORTFOLIO_RED_LIGHT = "#7FA08C";

/* ── Image URL helper ────────────────────────── */
const imgUrl = (p) => {
  if (!p) return null;
  if (p.startsWith("/") || p.startsWith("http")) return p;
  return `/uploads/${p}`;
};

/* ── Fade-in wrapper ─────────────────────────── */
function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   OUR ECOSYSTEM OF SERVICES — the five disciplines
   (verbatim structure from the CIC content document)
══════════════════════════════════════════════════ */
const ACCENT_COLORS = ["#C2A87A", "#2C4A3B", "#7FA08C", "#A08760", "#22221E"];
const FALLBACK_SERVICES = [
  {
    num: "A",
    title: "Design & Development",
    tagline: "Land to Lifestyle.",
    desc: "Planning spaces that are intelligent, functional and future-ready. The success of a project begins long before construction — our consultancy supports landowners, investors, developers and organizations with informed planning and development decisions.",
    cover_image: "/images/brand/doc-image-5.jpg",
    features: [
      "Master Planning",
      "Site Analysis",
      "Layout Development",
      "Infrastructure Planning",
      "Land Development Consultancy",
      "Feasibility Studies",
      "Building Planning",
      "Zoning & Utilization Studies",
      "Design Strategy",
      "Development Advisory",
    ],
    accent: "#2C4A3B",
  },
  {
    num: "B",
    title: "Architecture & Construction",
    tagline: "Building enduring spaces with precision.",
    desc: "From empty land to enduring landmarks. Concord provides end-to-end development solutions for residential, commercial, hospitality and institutional projects — integrating planning, engineering, architecture and execution into a seamless delivery process.",
    cover_image: "/images/brand/doc-image-4.jpg",
    features: [
      "Residential Construction",
      "Luxury Villas",
      "Apartments",
      "Farm Houses",
      "Commercial Buildings",
      "Retail Developments",
      "Hospitality Projects & Resorts",
      "Institutional Buildings",
      "Turnkey Construction",
      "Project Management",
    ],
    accent: "#C2A87A",
  },
  {
    num: "C",
    title: "Landscape Architecture",
    tagline: "Where nature and design become one.",
    desc: "Creating destinations, not just gardens. Landscape architecture is the art of shaping experiences through nature — whether a farmhouse retreat, a resort environment, a recreational destination or a community development, we create outdoor spaces that connect people with their surroundings.",
    cover_image: "/images/brand/doc-image-2.jpg",
    features: [
      "Farmhouse Landscapes",
      "Resort Landscapes",
      "Garden Design",
      "Outdoor Living Spaces",
      "Courtyard Design",
      "Water Features",
      "Sustainable Landscaping",
      "Recreational Spaces",
      "Green Infrastructure",
      "Eco-sensitive Development",
    ],
    accent: "#7FA08C",
  },
  {
    num: "D",
    title: "Interior Design & Turnkey Execution",
    tagline: "Spaces designed around people.",
    desc: "Interior design at Concord goes beyond decoration. We create environments that influence emotions, productivity, wellbeing and experiences — every interior tailored to the people who use it.",
    cover_image: "/images/brand/doc-image-3.jpg",
    features: [
      "Residential & Luxury Home Interiors",
      "Commercial Interiors",
      "Corporate Offices",
      "Retail & Hospitality Interiors",
      "Space Planning",
      "Custom Furniture",
      "Modular Kitchens",
      "Lighting & False Ceiling Design",
      "Material Selection",
      "Complete Turnkey Execution",
    ],
    accent: "#A08760",
  },
  {
    num: "E",
    title: "Smart Living & Smart Workspaces",
    tagline: "Technology integrated seamlessly into everyday experiences.",
    desc: "Technology integrated seamlessly into everyday experiences — smart home and office automation, intelligent lighting, voice-controlled environments, security integration and energy monitoring that quietly anticipate the people who use them.",
    cover_image: "/images/brand/doc-image-8.jpg",
    features: [
      "Smart Home Automation",
      "Smart Office Automation",
      "Intelligent Lighting Systems",
      "Voice-Controlled Environments",
      "Security & Surveillance Integration",
      "Energy Monitoring Systems",
      "Smart Climate Control",
      "Integrated AV Systems",
      "Workplace Automation",
    ],
    accent: "#22221E",
  },
];

/* ── The Concord Approach (from content doc) ── */
const PROCESS = [
  { step: "01", title: "Discover", desc: "Understanding aspirations, lifestyles, business goals and opportunities." },
  { step: "02", title: "Design", desc: "Developing intelligent concepts rooted in functionality and aesthetics." },
  { step: "03", title: "Develop", desc: "Technical planning, engineering coordination and execution strategy." },
  { step: "04", title: "Deliver", desc: "Construction, interiors and landscape implementation with precision." },
  { step: "05", title: "Evolve", desc: "Long-term support for future growth and adaptability." },
];

/* ── FAQ data ────────────────────────────────── */
const FAQS = [
  { q: "How long does a typical interior project take?", a: "Timelines vary by scope — a single-room interior typically takes 6–10 weeks, while a full home or commercial fit-out can range from 4–9 months. We provide a detailed project schedule before work begins." },
  { q: "Do you handle projects outside Hyderabad?", a: "Our primary base is Hyderabad, but we do take on select projects in Bangalore, Mumbai, and other major cities. Contact us to discuss your location and requirements." },
  { q: "Can I be involved in the design process?", a: "Absolutely — client collaboration is central to how we work. You'll be involved at every key decision point, from concept approval to material selection." },
  { q: "Do you provide 3D renders before construction begins?", a: "Yes. Every project includes photorealistic 3D visualisations so you can see exactly what your space will look like before a single wall is touched." },
  { q: "What is your minimum project budget?", a: "We work with a wide range of budgets. Consultation projects start from ₹15,000. For full interior or construction projects, we recommend a minimum budget discussion during our first meeting." },
  { q: "Do you offer post-project support?", a: "Yes. All completed projects come with a 90-day after-care period where we address any snags, touch-ups, or concerns at no additional charge." },
];

/* ── Service card (large expandable) ────────── */
function ServiceBlock({ service, index }) {
  const [open, setOpen] = useState(index === 0);
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.08}>
      <div style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(16px) saturate(150%)",
        WebkitBackdropFilter: "blur(16px) saturate(150%)",
        border: "1px solid rgba(255,255,255,0.7)",
        borderRadius: 24,
        boxShadow: "0 10px 36px rgba(24,24,21,0.08)",
        marginBottom: 20,
        overflow: "hidden",
      }}>
        {/* Header row — always visible */}
        <div
          onClick={() => setOpen(v => !v)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr auto",
            alignItems: "center",
            gap: 32,
            cursor: "pointer",
            background: hovered ? "rgba(194,168,122,0.03)" : "transparent",
            transition: "background 0.3s ease",
            margin: 0,
            padding: "36px 40px",
          }}
        >
          {/* Number */}
          <span style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 44, fontWeight: 300, lineHeight: 1,
            color: open ? service.accent : "rgba(24,24,21,0.18)",
            transition: "color 0.35s ease",
          }}>{service.num}</span>

          {/* Title + tagline */}
          <div>
            <p style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 400, color: NAVY,
              margin: "0 0 4px", lineHeight: 1.1,
              transform: open ? "translateX(6px)" : "translateX(0)",
              transition: "transform 0.35s ease",
            }}>{service.title}</p>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13, letterSpacing: "0.08em",
              color: service.accent,
              margin: 0, textTransform: "uppercase",
              opacity: open ? 1 : 0.65,
              transition: "opacity 0.35s ease",
            }}>{service.tagline}</p>
          </div>

          {/* Toggle icon */}
          <div style={{
            width: 44, height: 44,
            border: `1px solid ${open ? service.accent : "rgba(24,24,21,0.2)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: open ? service.accent : "transparent",
            transition: "all 0.35s ease",
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.35s ease" }}>
              <path d="M7 1v12M1 7h12" stroke={open ? "white" : NAVY} strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 60,
                paddingBottom: 48,
                paddingLeft: 112,  /* aligns with title */
              }}>
                {/* Left: image + desc */}
                <div>
                  <div style={{ position: "relative", marginBottom: 28 }}>
                    {imgUrl(service.cover_image)
                    ? <img
                        src={imgUrl(service.cover_image)}
                        alt={service.title}
                        loading="lazy"
                        width={700} height={440}
                        style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
                      />
                    : <div style={{ width: "100%", height: 260, background: "#181815", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" stroke={service.accent} strokeWidth="0.75" rx="1" /><circle cx="8.5" cy="8.5" r="1.5" fill={service.accent} opacity="0.6" /><path d="M21 15l-5-5L5 21" stroke={service.accent} strokeWidth="0.75" strokeLinecap="round" opacity="0.6" /></svg>
                      </div>
                  }
                    {/* accent line */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0,
                      width: 48, height: 3,
                      background: service.accent,
                    }} />
                  </div>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 15, lineHeight: 1.85,
                    color: "#374151", margin: 0,
                  }}>{service.desc}</p>
                  <Link to="/contact" style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    marginTop: 28, textDecoration: "none",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10, letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: service.accent,
                    borderBottom: `1px solid ${service.accent}`,
                    paddingBottom: 3,
                  }}>
                    Enquire About This Service
                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                      <path d="M0 4h14M10 1l4 3-4 3" stroke={service.accent} strokeWidth="1.2" strokeLinecap="square" />
                    </svg>
                  </Link>
                </div>

                {/* Right: features list or full description */}
                <div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: service.accent, margin: "0 0 24px" }}>What's Included</p>
                  {service.features?.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      {service.features.map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid rgba(24,24,21,0.07)" }}>
                          <div style={{ width: 6, height: 6, background: service.accent, flexShrink: 0 }} />
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: NAVY, letterSpacing: "0.02em" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  ) : service.full_desc ? (
                    <div dangerouslySetInnerHTML={{ __html: service.full_desc }} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.85, color: "#4B5563" }} />
                  ) : null}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

/* ── FAQ item ────────────────────────────────── */
function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(24,24,21,0.09)" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%", background: "none", border: "none",
          cursor: "pointer", textAlign: "left",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: 24,
          padding: "22px 0",
        }}
      >
        <span style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: 20, fontWeight: 500, color: NAVY,
        }}>{faq.q}</span>
        <div style={{
          width: 32, height: 32, flexShrink: 0,
          border: `1px solid ${open ? GOLD : "rgba(24,24,21,0.2)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: open ? GOLD : "transparent",
          transition: "all 0.3s ease",
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s ease" }}>
            <path d="M6 1v10M1 6h10" stroke={open ? "white" : NAVY} strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15, lineHeight: 1.85,
              color: "#4B5563", margin: "0 0 24px",
              paddingRight: 56, maxWidth: "75ch",
            }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN SERVICES PAGE
══════════════════════════════════════════════ */
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

/* Map a CMS services row onto the discipline-block shape.
   Falls back to the doc-verbatim copy when a field is empty. */
function fromCms(row, i) {
  let features = [];
  try { features = JSON.parse(row.features || "[]"); } catch { /* ignore */ }
  const fallback = FALLBACK_SERVICES[i] || FALLBACK_SERVICES[0];
  return {
    id: row.id,
    num: LETTERS[i] || String(i + 1),
    title: row.title || fallback.title,
    tagline: row.tagline || fallback.tagline,
    desc: row.description || fallback.desc,
    features: features.length ? features : fallback.features,
    cover_image: imgUrl(row.image) || fallback.cover_image,
    accent: ACCENT_COLORS[i % ACCENT_COLORS.length],
  };
}

export default function Services() {
  // CMS-driven: the admin panel manages these via /api/services.
  // The doc-verbatim FALLBACK_SERVICES render if the API is unreachable.
  const [services, setServices] = useState(FALLBACK_SERVICES);

  useEffect(() => {
    api.get("/services")
      .then((r) => { if (r.data?.length) setServices(r.data.map(fromCms)); })
      .catch(() => {});
  }, []);

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────── */}
      <section style={{
        position: "relative",
        paddingTop: 160, paddingBottom: 80,
        overflow: "hidden",
      }}>
        {/* Background accent */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "45%", height: "100%",
          background: "linear-gradient(135deg, rgba(194,168,122,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

            <FadeIn>
              <p className="chapter-label" style={{ margin: "0 0 20px" }}>Our Ecosystem of Services</p>
              <h1 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(48px, 6.5vw, 96px)",
                fontWeight: 500, lineHeight: 0.98,
                color: NAVY, margin: "0 0 32px",
              }}>
                What We<br />
                <em style={{ fontStyle: "italic", color: PORTFOLIO_RED }}>Create</em>
              </h1>
              <div style={{ width: 60, borderTop: `1px solid ${GOLD}`, marginBottom: 28 }} />
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 15.5, lineHeight: 1.85,
                color: "#3C3A34", maxWidth: 480, margin: "0 0 24px",
              }}>
                Five disciplines, one integrated vision. From raw land to finished environments —
                master planning, construction, landscape, interiors and intelligent automation,
                carried by a single accountable team.
              </p>
              <p style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 19, lineHeight: 1.6,
                color: "#6F6B62", maxWidth: 480, margin: "0 0 40px",
                fontStyle: "italic",
              }}>
                Design, Build & Development Consultancy — for homes, businesses, resorts and communities.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link to="/contact" style={{
                  textDecoration: "none",
                  background: PORTFOLIO_RED, color: "#F5F0EB",
                  padding: "15px 38px", borderRadius: 999,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10, letterSpacing: "0.28em",
                  textTransform: "uppercase",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1C332A"}
                  onMouseLeave={e => e.currentTarget.style.background = PORTFOLIO_RED}
                >Book a Consultation</Link>
                <Link to="/portfolio" style={{
                  textDecoration: "none",
                  border: `1px solid ${NAVY}`,
                  color: NAVY,
                  padding: "15px 38px", borderRadius: 999,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10, letterSpacing: "0.28em",
                  textTransform: "uppercase",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = "#F5F0EB"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = NAVY; }}
                >Discover Our Work</Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div style={{ position: "relative" }}>
                <img
                  src="/images/brand/doc-image-1.jpg"
                  alt="A completed modern villa with infinity pool and mountain views"
                  loading="lazy" width={700} height={800}
                  style={{ width: "100%", height: 520, objectFit: "cover", display: "block", borderRadius: 24, boxShadow: "0 20px 56px rgba(24,24,21,0.16)" }}
                />
                {/* Floating stat */}
                <div style={{
                  position: "absolute", bottom: 32, left: -32,
                  background: "rgba(24,24,21,0.82)",
                  backdropFilter: "blur(14px) saturate(140%)",
                  WebkitBackdropFilter: "blur(14px) saturate(140%)",
                  border: "1px solid rgba(194,168,122,0.3)",
                  borderRadius: 18,
                  padding: "22px 30px",
                  boxShadow: "0 12px 36px rgba(24,24,21,0.3)",
                }}>
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 48, fontWeight: 300,
                    color: GOLD, margin: 0, lineHeight: 1,
                  }}>5</p>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 9, letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)", margin: "6px 0 0",
                  }}>Integrated<br />Disciplines</p>
                </div>
                {/* Editorial hairline frame accents */}
                <div style={{
                  position: "absolute", top: -20, right: -20,
                  width: 140, height: 140,
                  border: `1px solid rgba(44,74,59,0.4)`, borderRadius: 24,
                  zIndex: -1,
                }} />
                <div style={{
                  position: "absolute", bottom: -24, left: -24,
                  width: 100, height: 100,
                  border: `1px solid rgba(44,74,59,0.4)`, borderRadius: 24,
                  zIndex: -1, opacity: 0.7,
                }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Services accordion ───────────────── */}
      <section style={{ background: "white", padding: "80px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <FadeIn>
            <p className="chapter-label" style={{ margin: "0 0 48px" }}>The Five Disciplines</p>
          </FadeIn>
          {services.map((s, i) => (
            <ServiceBlock key={s.id || s.num} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* ── Why Choose Us — What Sets Us Apart ── */}
      <section style={{ background: "#141412", padding: "120px 40px 130px", overflow: "hidden", position: "relative" }}>

        {/* Blueprint grid backdrop */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(194,168,122,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(194,168,122,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          pointerEvents: "none",
        }} />
        {/* Compass arcs — top right */}
        <svg aria-hidden viewBox="0 0 500 500" style={{ position: "absolute", top: -140, right: -120, width: 520, height: 520, opacity: 0.08, pointerEvents: "none" }}>
          <g stroke="#DCCBA6" strokeWidth="1" fill="none">
            <circle cx="250" cy="250" r="240" />
            <circle cx="250" cy="250" r="175" />
            <circle cx="250" cy="250" r="110" />
            <path d="M250 10 L250 490 M10 250 L490 250" />
          </g>
        </svg>
        {/* Ghost serif word — bottom left */}
        <span aria-hidden style={{
          position: "absolute", bottom: -30, left: 12,
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(120px, 16vw, 240px)",
          fontStyle: "italic", fontWeight: 500, lineHeight: 1,
          color: "rgba(194,168,122,0.06)",
          userSelect: "none", pointerEvents: "none",
          whiteSpace: "nowrap",
        }}>Concord</span>

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 18 }}>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", color: GOLD, margin: "0 0 16px", fontWeight: 600 }}>Why Concord</p>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(38px, 4.8vw, 66px)", fontWeight: 500, color: "white", margin: 0, lineHeight: 1.05 }}>
                  What Sets Us <em style={{ fontStyle: "italic", color: GOLD }}>Apart</em>
                </h2>
              </div>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontStyle: "italic", lineHeight: 1.6, color: "rgba(245,240,235,0.75)", maxWidth: 380, margin: 0 }}>
                Six commitments behind every space we design, build and hand over.
              </p>
            </div>
            <div style={{ borderTop: "1px solid rgba(194,168,122,0.35)", margin: "36px 0 64px" }} />
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {[
              {
                num: "01", title: "Design-Led", icon: "compass",
                desc: "Every project begins with design thinking — function and beauty are never compromised.",
              },
              {
                num: "02", title: "Single Point of Contact", icon: "target",
                desc: "One dedicated project lead from brief to handover. No miscommunication, ever.",
              },
              {
                num: "03", title: "Transparent Always", icon: "document",
                desc: "Detailed quotes, milestone billing, and weekly progress updates — in writing.",
              },
              {
                num: "04", title: "Quality Assured", icon: "shield",
                desc: "Vetted materials, vetted craftsmen. Every finish inspected personally before sign-off.",
              },
              {
                num: "05", title: "On Schedule", icon: "clock",
                desc: "A 94% on-time delivery record across every completed Concord project.",
              },
              {
                num: "06", title: "After-Care Promise", icon: "home-heart",
                desc: "90-day post-handover support. We stand behind every project we deliver.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <WhyCard item={item} />
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ── Process strip ────────────────────── */}
      <section style={{ background: BG, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 64 }}>
              <div>
                <p className="chapter-label" style={{ margin: "0 0 14px" }}>How We Work</p>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 400, color: NAVY, margin: 0 }}>The Concord Approach</h2>
              </div>
              <Link to="/contact" style={{
                textDecoration: "none", fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                color: NAVY, borderBottom: `1px solid ${PORTFOLIO_RED}`, paddingBottom: 4,
              }}>Start Your Project →</Link>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }}>
            {PROCESS.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.09}>
                <div style={{
                  padding: "40px 32px",
                  borderRight: i < 4 ? "1px solid rgba(24,24,21,0.09)" : "none",
                  position: "relative",
                }}>
                  {/* Step number */}
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 64, fontWeight: 500, lineHeight: 1,
                    color: PORTFOLIO_RED, margin: "0 0 -12px",
                    userSelect: "none",
                    opacity: 0.9,
                  }}>{p.step}</p>
                  {/* Red dot */}
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: PORTFOLIO_RED, marginBottom: 20,
                    position: "relative", zIndex: 1,
                  }} />
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 22, fontWeight: 500,
                    color: NAVY, margin: "0 0 12px",
                  }}>{p.title}</p>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13.5, lineHeight: 1.8,
                    color: "#4B5563", margin: 0,
                  }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────── */}
      <section style={{ background: "white", padding: "100px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p className="chapter-label" style={{ margin: "0 0 16px" }}>Got Questions?</p>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 400, color: NAVY, margin: 0 }}>Frequently Asked</h2>
            </div>
          </FadeIn>
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <FAQItem faq={faq} index={i} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Let's Connect — uniform site-wide CTA ── */}
      <ConnectCTA />

    </div>
  );
}

/* ── Why card — line-art icon plates ─────────── */
const WHY_ICONS = {
  compass: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="1.6" />
      <path d="M12 5.6 L6 20 M12 5.6 L18 20" />
      <path d="M8.2 14.6 A7 7 0 0 1 15.8 14.6" />
    </svg>
  ),
  target: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  document: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2.8 H14.5 L19 7.3 V21.2 H6 Z" />
      <path d="M14.5 2.8 V7.3 H19" />
      <path d="M9 12 H16 M9 15.4 H16 M9 18.8 H13" />
    </svg>
  ),
  shield: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.8 L19.5 5.6 V11.5 C19.5 16.6 16.4 19.9 12 21.6 C7.6 19.9 4.5 16.6 4.5 11.5 V5.6 Z" />
      <path d="M8.8 11.8 L11 14 L15.4 9.6" />
    </svg>
  ),
  clock: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.5 V12 L16 14.4" />
    </svg>
  ),
  "home-heart": (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10.5 L12 3.5 L20 10.5 V20.5 H4 Z" />
      <path d="M12 16.6 C10.2 15 8.8 13.7 8.8 12.4 C8.8 11.3 9.7 10.6 10.6 10.6 C11.2 10.6 11.7 10.9 12 11.4 C12.3 10.9 12.8 10.6 13.4 10.6 C14.3 10.6 15.2 11.3 15.2 12.4 C15.2 13.7 13.8 15 12 16.6 Z" />
    </svg>
  ),
};

function WhyCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const icon = WHY_ICONS[item.icon] || WHY_ICONS.compass;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        minHeight: 300,
        cursor: "default",
        background: hovered
          ? "linear-gradient(160deg, rgba(44,74,59,0.55) 0%, rgba(24,24,21,0.9) 70%)"
          : "linear-gradient(160deg, rgba(245,240,235,0.045) 0%, rgba(245,240,235,0.015) 100%)",
        border: `1px solid ${hovered ? "rgba(194,168,122,0.65)" : "rgba(245,240,235,0.12)"}`,
        borderRadius: 22,
        backdropFilter: "blur(14px) saturate(130%)",
        WebkitBackdropFilter: "blur(14px) saturate(130%)",
        padding: "36px 32px 32px",
        display: "flex", flexDirection: "column",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 48px rgba(0,0,0,0.4)" : "0 0 0 rgba(0,0,0,0)",
        transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.45s ease, background 0.6s ease, box-shadow 0.45s ease",
        overflow: "hidden",
      }}
    >
      {/* Ghost number — top right */}
      <span style={{
        position: "absolute", top: 6, right: 18,
        fontFamily: "Cormorant Garamond, serif",
        fontSize: 110, fontWeight: 400, lineHeight: 1,
        color: hovered ? "rgba(194,168,122,0.22)" : "rgba(245,240,235,0.055)",
        transition: "color 0.5s ease",
        userSelect: "none", pointerEvents: "none",
      }}>{item.num}</span>

      {/* Corner tick — drafting mark */}
      <svg aria-hidden width="26" height="26" viewBox="0 0 26 26" style={{ position: "absolute", left: 12, bottom: 12, opacity: hovered ? 0.9 : 0.3, transition: "opacity 0.4s ease" }}>
        <path d="M1 25 V14 M1 25 H12" stroke="#C2A87A" strokeWidth="1.2" fill="none" />
      </svg>

      {/* Icon plate */}
      <div style={{
        width: 68, height: 68,
        border: `1px solid ${hovered ? "#C2A87A" : "rgba(194,168,122,0.4)"}`,
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hovered ? "#DCCBA6" : "#C2A87A",
        marginBottom: 26,
        background: hovered ? "rgba(194,168,122,0.1)" : "transparent",
        transform: hovered ? "scale(1.06) rotate(-4deg)" : "scale(1) rotate(0deg)",
        transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Title */}
      <p style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: 27, fontWeight: 500,
        color: "white", margin: "0 0 12px", lineHeight: 1.15,
      }}>{item.title}</p>

      {/* Expanding divider */}
      <div style={{
        width: hovered ? 52 : 24, height: 1,
        background: "#C2A87A",
        marginBottom: 16,
        transition: "width 0.45s ease",
      }} />

      {/* Description */}
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 14, lineHeight: 1.8,
        color: hovered ? "rgba(245,240,235,0.92)" : "rgba(245,240,235,0.62)",
        margin: 0,
        transition: "color 0.45s ease",
      }}>{item.desc}</p>
    </div>
  );
}
