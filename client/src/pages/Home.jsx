import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import api from "../api/axios";
import ScrollJourney from "../components/ScrollJourney";
import ConnectCTA from "../components/ConnectCTA";

gsap.registerPlugin(ScrollTrigger);

/* ── Image URL helper (CMS uploads live under /uploads) ── */
const imgUrl = (p) => {
  if (!p) return null;
  if (p.startsWith("/") || p.startsWith("http")) return p;
  return `/uploads/${p}`;
};

/* ── Brand tokens — Minimal Luxury (per content doc) ── */
const INK = "#181815";
const IVORY = "#F5F0EB";
const IVORY_WARM = "#F2EDE5";
const BEIGE = "#C2A87A";
const BEIGE_DEEP = "#A08760";
const FOREST = "#2C4A3B";
const FOREST_DEEP = "#1C332A";
const FOREST_LIGHT = "#7FA08C";

/* ── What We Create — the five disciplines, in the document's A–E order,
     with taglines and descriptions taken from the content doc. ── */
const DISCIPLINES = [
  {
    letter: "A",
    title: "Design & Development",
    tagline: "Land to Lifestyle.",
    desc: "Planning spaces that are intelligent, functional and future-ready. The success of a project begins long before construction — we support landowners, investors and developers with informed planning and development decisions.",
    services: ["Master Planning", "Site Analysis", "Layout Development", "Infrastructure Planning", "Feasibility Studies", "Development Advisory"],
    img: "/images/brand/doc-image-5.jpg",
    alt: "A commercial office development set in landscaped grounds",
  },
  {
    letter: "B",
    title: "Architecture & Construction",
    tagline: "Building enduring spaces with precision.",
    desc: "From empty land to enduring landmarks — end-to-end development for residential, commercial, hospitality and institutional projects, integrating planning, engineering, architecture and execution into a seamless delivery process.",
    services: ["Luxury Villas", "Apartments", "Farm Houses", "Commercial Buildings", "Resorts", "Turnkey Construction"],
    img: "/images/brand/doc-image-4.jpg",
    alt: "Modern villas under construction with cranes overhead",
  },
  {
    letter: "C",
    title: "Landscape Architecture",
    tagline: "Where nature and design become one.",
    desc: "Creating destinations, not just gardens. Landscape architecture is the art of shaping experiences through nature — farmhouse retreats, resort environments and recreational destinations that connect people with their surroundings.",
    services: ["Farmhouse Landscapes", "Resort Landscapes", "Outdoor Living Spaces", "Courtyard Design", "Water Features", "Sustainable Landscaping"],
    img: "/images/brand/doc-image-2.jpg",
    alt: "A resort infinity pool flowing toward the sea between mature trees",
  },
  {
    letter: "D",
    title: "Interior Design & Turnkey Execution",
    tagline: "Spaces designed around people.",
    desc: "Interior design at Concord goes beyond decoration. We create environments that influence emotions, productivity, wellbeing and experiences — every interior tailored to the people who use it.",
    services: ["Luxury Home Interiors", "Corporate Offices", "Space Planning", "Custom Furniture", "Modular Kitchens", "Lighting Design"],
    img: "/images/brand/doc-image-3.jpg",
    alt: "A refined contemporary living room with layered lighting",
  },
  {
    letter: "E",
    title: "Smart Living & Smart Workspaces",
    tagline: "Technology integrated seamlessly into everyday experiences.",
    desc: "Smart home and office automation, intelligent lighting, voice-controlled environments, security and energy monitoring — environments that quietly anticipate the people who use them.",
    services: ["Smart Home Automation", "Smart Office Automation", "Intelligent Lighting", "Voice-Controlled Environments", "Security Integration", "Energy Monitoring"],
    img: "/images/brand/doc-image-8.jpg",
    alt: "A smart-home control app in a luxurious living room",
  },
];

/* ── Interior portraits — immersive horizontal gallery ── */
const INTERIOR_PORTRAITS = [
  { src: "/images/brand/doc-image-3.jpg", caption: "Living Spaces", note: "Composed around light and conversation" },
  { src: "/images/interiors/IMG20230712190652.jpg", caption: "Entertainment Walls", note: "Custom joinery, layered illumination" },
  { src: "/images/brand/doc-image-7.jpg", caption: "Workspaces", note: "Calm, focused, quietly premium" },
  { src: "/images/interiors/IMG20230515035704.jpg", caption: "Commercial Interiors", note: "Brand identity built into the room" },
  { src: "/images/brand/doc-image-8.jpg", caption: "Smart Homes", note: "Technology that stays invisible" },
  { src: "/images/interiors/IMG20230301114229.jpg", caption: "Turnkey Delivery", note: "Design through final styling" },
];

/* ── The Concord Approach (from content doc) ── */
const APPROACH = [
  { step: "01", title: "Discover", desc: "Understanding aspirations, lifestyles, business goals and opportunities." },
  { step: "02", title: "Design", desc: "Developing intelligent concepts rooted in functionality and aesthetics." },
  { step: "03", title: "Develop", desc: "Technical planning, engineering coordination and execution strategy." },
  { step: "04", title: "Deliver", desc: "Construction, interiors and landscape implementation with precision." },
  { step: "05", title: "Evolve", desc: "Long-term support for future growth and adaptability." },
];

/* ── Why Concord — verbatim from the content doc ── */
const WHY_CONCORD = [
  { title: "Multidisciplinary Expertise", desc: "Architecture, construction, interiors, landscape and consultancy." },
  { title: "Turnkey Execution", desc: "Single-point responsibility from concept to completion." },
  { title: "Design-Driven Approach", desc: "Functionality and aesthetics working together." },
  { title: "Sustainable Thinking", desc: "Future-ready solutions." },
  { title: "Smart Integration", desc: "Technology-enhanced environments." },
  { title: "Trusted Delivery", desc: "Quality, transparency and reliability." },
];

/* ── Fade-in wrapper ───────────────────────────── */
function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ── Editorial label ── */
function Eyebrow({ children, color = FOREST, style }) {
  return (
    <p style={{
      fontFamily: "Inter, sans-serif",
      fontSize: 11, letterSpacing: "0.34em",
      textTransform: "uppercase",
      color, fontWeight: 600,
      margin: "0 0 18px",
      ...style,
    }}>{children}</p>
  );
}

/* ══════════════════════════════════════════════════
   SECTION — Building Beyond Structures
══════════════════════════════════════════════════ */
function BuildingBeyond() {
  return (
    <section style={{ background: IVORY, padding: "140px 40px 120px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <Eyebrow style={{ textAlign: "center" }}>Concord Interior Concepts</Eyebrow>
          <h2 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(38px, 5vw, 68px)",
            fontWeight: 500, lineHeight: 1.08,
            color: INK, margin: "0 0 36px",
          }}>
            Building Beyond <em style={{ fontStyle: "italic", color: FOREST }}>Structures</em>
          </h2>
          <div style={{ width: 72, borderTop: `1px solid ${BEIGE}`, margin: "0 auto 40px" }} />
          <p style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(20px, 2.2vw, 28px)",
            fontStyle: "italic", lineHeight: 1.6,
            color: "#3C3A34", margin: "0 0 28px",
          }}>
            We believe exceptional spaces begin long before construction — and continue long after completion.
          </p>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 16, lineHeight: 1.9,
            color: "#55524A", margin: "0 auto",
            maxWidth: 760,
          }}>
            Our expertise spans architectural planning, infrastructure development, construction,
            landscape architecture, luxury interiors, smart automation, and project consultancy.
            From residential homes and commercial developments to farmhouses, resorts, corporate
            offices, and large-scale layouts — we provide complete solutions from concept to reality.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   SECTION — Interior Portraits (immersive horizontal scroll)
   Desktop: pinned section, gallery pans horizontally as you scroll.
   Mobile:  native snap-scroll strip.
══════════════════════════════════════════════════ */
function InteriorsShowcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    setIsDesktop(mq.matches);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop || !sectionRef.current || !trackRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section ref={sectionRef} style={{ background: INK, overflow: "hidden" }}>
      <div style={{
        height: isDesktop ? "100vh" : "auto",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: isDesktop ? 0 : "90px 0",
      }}>
        {/* Header */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", width: "100%", marginBottom: 48 }}>
          <FadeIn>
            <Eyebrow color={BEIGE}>The Heart of Concord</Eyebrow>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(34px, 4.4vw, 62px)",
              fontWeight: 500, lineHeight: 1.06,
              color: IVORY, margin: 0,
            }}>
              Interiors that hold <em style={{ fontStyle: "italic", color: BEIGE }}>everyday life</em>
            </h2>
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: 14.5, lineHeight: 1.8,
              color: "rgba(245,240,235,0.7)", margin: "18px 0 0", maxWidth: 560,
            }}>
              {isDesktop ? "Keep scrolling — the gallery moves with you." : "Swipe through a few of our favourite rooms."}
            </p>
          </FadeIn>
        </div>

        {/* Track */}
        <div style={{
          overflowX: isDesktop ? "visible" : "auto",
          scrollSnapType: isDesktop ? "none" : "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}>
          <div
            ref={trackRef}
            style={{
              display: "flex", gap: 28,
              padding: "0 40px",
              width: "max-content",
              willChange: "transform",
            }}
          >
            {INTERIOR_PORTRAITS.map((p, i) => (
              <figure key={p.caption} style={{
                margin: 0, flexShrink: 0,
                scrollSnapAlign: "start",
                width: "clamp(300px, 34vw, 520px)",
              }}>
                <div style={{ overflow: "hidden", aspectRatio: "4/3", background: "#101010", borderRadius: 18, boxShadow: "0 14px 40px rgba(0,0,0,0.35)" }}>
                  <img
                    src={p.src}
                    alt={`${p.caption} — ${p.note}`}
                    loading="lazy"
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover", display: "block",
                      filter: "saturate(1.12) contrast(1.05) brightness(1.05)",
                      transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <figcaption style={{ padding: "18px 2px 0" }}>
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 24, fontWeight: 500,
                    color: IVORY, margin: 0, lineHeight: 1.2,
                  }}>{p.caption}</p>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12.5, letterSpacing: "0.06em",
                    color: BEIGE, margin: "6px 0 0", fontStyle: "italic",
                  }}>{p.note}</p>
                </figcaption>
              </figure>
            ))}

            {/* Closing card → portfolio */}
            <Link to="/portfolio" style={{
              flexShrink: 0, width: "clamp(260px, 24vw, 380px)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              border: `1px solid rgba(194,168,122,0.4)`,
              borderRadius: 18,
              background: "rgba(245,240,235,0.05)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              textDecoration: "none", aspectRatio: "4/3",
              alignSelf: "flex-start",
            }}>
              <p style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 30, fontWeight: 500, fontStyle: "italic",
                color: BEIGE, margin: "0 0 14px", textAlign: "center",
              }}>See every room</p>
              <span style={{
                fontFamily: "Inter, sans-serif", fontSize: 10,
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: IVORY, fontWeight: 600,
              }}>Visit the Portfolio →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   SECTION — What We Create (editorial alternating rows)
══════════════════════════════════════════════════ */
function WhatWeCreate({ disciplines = DISCIPLINES }) {
  return (
    <section style={{ background: "white", padding: "130px 0 60px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 90 }}>
            <Eyebrow style={{ textAlign: "center" }}>Our Ecosystem of Services</Eyebrow>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(40px, 5.5vw, 76px)",
              fontWeight: 500, lineHeight: 1.02,
              color: INK, margin: 0,
            }}>
              What We <em style={{ fontStyle: "italic", color: FOREST }}>Create</em>
            </h2>
          </div>
        </FadeIn>

        {disciplines.map((d, i) => (
          <FadeIn key={d.letter} delay={0.05}>
            <div style={{
              display: "grid",
              gridTemplateColumns: i % 2 === 0 ? "1.1fr 1fr" : "1fr 1.1fr",
              gap: "clamp(40px, 6vw, 96px)",
              alignItems: "center",
              padding: "72px 0",
              borderTop: i === 0 ? `1px solid rgba(24,24,21,0.12)` : "none",
              borderBottom: `1px solid rgba(24,24,21,0.12)`,
            }}>
              {/* Image */}
              <div style={{ order: i % 2 === 0 ? 0 : 1, overflow: "hidden", borderRadius: 22, boxShadow: "0 16px 48px rgba(24,24,21,0.14)" }}>
                <img
                  src={d.img}
                  alt={d.alt}
                  loading="lazy"
                  style={{
                    width: "100%", aspectRatio: "16/11",
                    objectFit: "cover", display: "block",
                    transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              {/* Text */}
              <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 20 }}>
                  <span style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 64, fontWeight: 400, lineHeight: 1,
                    color: BEIGE,
                  }}>{d.letter}</span>
                  <span style={{ flex: 1, borderTop: `1px solid rgba(194,168,122,0.5)` }} />
                </div>
                <h3 style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(28px, 3vw, 42px)",
                  fontWeight: 500, lineHeight: 1.12,
                  color: INK, margin: "0 0 10px",
                }}>{d.title}</h3>
                <p style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 21, fontStyle: "italic",
                  color: FOREST, margin: "0 0 20px",
                }}>{d.tagline}</p>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15, lineHeight: 1.85,
                  color: "#55524A", margin: "0 0 26px",
                  maxWidth: 520,
                }}>{d.desc}</p>

                {/* Service list — two columns, quiet */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "10px 24px", marginBottom: 30, maxWidth: 520,
                }}>
                  {d.services.map((s) => (
                    <span key={s} style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12.5, letterSpacing: "0.04em",
                      color: "#6F6B62",
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <span style={{ width: 14, borderTop: `1px solid ${BEIGE}`, flexShrink: 0 }} />
                      {s}
                    </span>
                  ))}
                </div>

                <Link to="/services" style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10, letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: FOREST, fontWeight: 600,
                  textDecoration: "none",
                  borderBottom: `1px solid ${BEIGE}`,
                  paddingBottom: 5,
                }}>
                  Explore This Discipline →
                </Link>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   SECTION — The Concord Approach
══════════════════════════════════════════════════ */
function ConcordApproach() {
  return (
    <section style={{ background: INK, padding: "130px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 90 }}>
            <Eyebrow color={BEIGE} style={{ textAlign: "center" }}>How We Work</Eyebrow>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(38px, 5vw, 68px)",
              fontWeight: 500, lineHeight: 1.05,
              color: IVORY, margin: 0,
            }}>
              The Concord <em style={{ fontStyle: "italic", color: BEIGE }}>Approach</em>
            </h2>
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 18,
        }}>
          {APPROACH.map((p, i) => (
            <FadeIn key={p.step} delay={i * 0.08}>
              <div style={{
                padding: "34px 30px",
                background: "rgba(245,240,235,0.05)",
                backdropFilter: "blur(14px) saturate(130%)",
                WebkitBackdropFilter: "blur(14px) saturate(130%)",
                border: "1px solid rgba(245,240,235,0.12)",
                borderRadius: 22,
                height: "100%",
                boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
              }}>
                <p style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 58, fontWeight: 400, lineHeight: 1,
                  color: FOREST_LIGHT, margin: "0 0 22px",
                }}>{p.step}</p>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12, letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: BEIGE, fontWeight: 600,
                  margin: "0 0 16px",
                }}>{p.title}</p>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14, lineHeight: 1.8,
                  color: "rgba(245,240,235,0.72)", margin: 0,
                }}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   SECTION — Why Concord
══════════════════════════════════════════════════ */
function WhyConcord() {
  return (
    <section style={{ background: IVORY_WARM, padding: "130px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 84 }}>
            <Eyebrow style={{ textAlign: "center" }}>Why Concord</Eyebrow>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(36px, 4.6vw, 64px)",
              fontWeight: 500, lineHeight: 1.12,
              color: INK, margin: 0,
            }}>
              One Vision. One Team.<br />
              <em style={{ fontStyle: "italic", color: FOREST }}>Complete Accountability.</em>
            </h2>
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "56px 64px",
        }}>
          {WHY_CONCORD.map((w, i) => (
            <FadeIn key={w.title} delay={i * 0.06}>
              <div>
                <div style={{ width: 32, borderTop: `2px solid ${FOREST}`, marginBottom: 20 }} />
                <p style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 25, fontWeight: 600,
                  color: INK, margin: "0 0 12px", lineHeight: 1.2,
                }}>{w.title}</p>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14.5, lineHeight: 1.8,
                  color: "#55524A", margin: 0,
                }}>{w.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   MAIN HOME PAGE
══════════════════════════════════════════════════ */
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

/* Map a CMS services row onto the editorial discipline-row shape.
   Doc-verbatim DISCIPLINES render when the API is unreachable. */
function disciplineFromCms(row, i) {
  let features = [];
  try { features = JSON.parse(row.features || "[]"); } catch { /* ignore */ }
  const fallback = DISCIPLINES[i] || DISCIPLINES[0];
  return {
    letter: LETTERS[i] || String(i + 1),
    title: row.title || fallback.title,
    tagline: row.tagline || fallback.tagline,
    desc: row.description || fallback.desc,
    services: features.length ? features.slice(0, 6) : fallback.services,
    img: imgUrl(row.image) || fallback.img,
    alt: `${row.title} — Concord Interior Concepts`,
  };
}

export default function Home() {
  const [stats, setStats] = useState(null);
  const [disciplines, setDisciplines] = useState(DISCIPLINES);

  useEffect(() => {
    api.get("/projects/stats").then((r) => setStats(r.data)).catch(() => {});
    api.get("/services")
      .then((r) => { if (r.data?.length) setDisciplines(r.data.map(disciplineFromCms)); })
      .catch(() => {});
  }, []);

  return (
    <div style={{ background: IVORY, overflowX: "hidden" }}>
      {/* ═════ CINEMATIC SCROLL JOURNEY — We Design / We Build / We Transform ═════ */}
      <ScrollJourney stats={stats} />

      {/* ═════ Building Beyond Structures ═════ */}
      <BuildingBeyond />

      {/* ═════ Interior Portraits — immersive horizontal gallery ═════ */}
      <InteriorsShowcase />

      {/* ═════ What We Create — five disciplines ═════ */}
      <WhatWeCreate disciplines={disciplines} />

      {/* ═════ The Concord Approach ═════ */}
      <ConcordApproach />

      {/* ═════ Why Concord ═════ */}
      <WhyConcord />

      {/* ═════ Let's Connect — uniform site-wide CTA ═════ */}
      <ConnectCTA />
    </div>
  );
}

/* Preload first scene image for a fast cinematic start */
if (typeof document !== "undefined" && !document.getElementById("__cc_scene_preload")) {
  const link = document.createElement("link");
  link.id = "__cc_scene_preload";
  link.rel = "preload";
  link.as = "image";
  link.href = "/images/brand/doc-image-3.jpg";
  document.head.appendChild(link);
}
