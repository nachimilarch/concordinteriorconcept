import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useInViewObs } from "react-intersection-observer";

/* ── Brand tokens ─────────────────────────────── */
const NAVY = "#2F3142";
const GOLD = "#C8A75B";
const GOLD_D = "#A88A3D";
const BG = "#F4F6F8";

/* ── Hero bg slides (Picsum placeholders) ──────── */
const HERO_IMAGES = [
  "https://picsum.photos/seed/interior-hero1/1920/1080",
  "https://picsum.photos/seed/interior-hero2/1920/1080",
  "https://picsum.photos/seed/interior-hero3/1920/1080",
];

/* ── Stats ─────────────────────────────────────── */
const STATS = [
  { end: 150, suffix: "+", label: "Projects Completed" },
  { end: 12, suffix: "+", label: "Years of Experience" },
  { end: 120, suffix: "+", label: "Happy Clients" },
  { end: 8, suffix: "", label: "Awards Won" },
];

/* ── Services ──────────────────────────────────── */
const SERVICES = [
  {
    num: "01",
    title: "Interior Design",
    desc: "Bespoke interiors that balance aesthetics and function — from concept boards to final styling.",
    seed: "svc-interior",
    accent: "#C8A75B",
  },
  {
    num: "02",
    title: "Construction",
    desc: "End-to-end construction management with precision craftsmanship and on-time delivery.",
    seed: "svc-construction",
    accent: "#7A9E9F",
  },
  {
    num: "03",
    title: "Renovation",
    desc: "Transforming existing spaces with thoughtful renovation — structural and cosmetic upgrades.",
    seed: "svc-renovation",
    accent: "#B07D62",
  },
  {
    num: "04",
    title: "Consultation",
    desc: "Expert guidance on space planning, material selection, and design direction.",
    seed: "svc-consult",
    accent: "#8A7FAF",
  },
];

/* ── Mock featured projects ─────────────────────── */
const FEATURED = [
  { id: 1, title: "The Meridian Residence", category: "Residential", location: "Jubilee Hills", year: 2024, seed: "interior1" },
  { id: 2, title: "Lumina Office Complex", category: "Commercial", location: "Madhapur", year: 2024, seed: "interior3" },
  { id: 10, title: "The Loft at Banjara", category: "Residential", location: "Banjara Hills", year: 2023, seed: "living1" },
  { id: 6, title: "Skyline Retail Hub", category: "Commercial", location: "Kukatpally", year: 2024, seed: "interior6" },
];

/* ── Testimonials ───────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "Concord transformed our home beyond what we imagined. Every detail was handled with exceptional care and precision.",
    name: "Rajesh & Priya Sharma",
    project: "Meridian Residence, Jubilee Hills",
  },
  {
    quote: "Our office space now reflects our brand identity perfectly. The team delivered on time with zero compromise on quality.",
    name: "Anil Reddy",
    project: "Lumina Office Complex, Madhapur",
  },
  {
    quote: "From concept to completion, the professionalism was unmatched. We'd work with Concord again without hesitation.",
    name: "Sunita Rao",
    project: "Palm Court Interiors, Kondapur",
  },
];

/* ── Fade-in wrapper ─────────────────────────────── */
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

/* ── Hero slider ─────────────────────────────────── */
function HeroSlider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_IMAGES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {HERO_IMAGES.map((src, i) => (
        <div key={src} style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: i === idx ? 1 : 0,
          transition: "opacity 1.4s ease",
          transform: i === idx ? "scale(1.04)" : "scale(1)",
        }} />
      ))}
    </>
  );
}

/* ── Project card (featured) ────────────────────── */
function FeaturedCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = `https://picsum.photos/seed/${project.seed}/800/600`;
  const isLarge = index === 0;

  return (
    <Link
      to={`/portfolio/${project.id}`}
      style={{ textDecoration: "none", display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: "relative",
        height: isLarge ? 520 : 340,
        overflow: "hidden",
        background: "#E8EAED",
      }}>
        <img
          src={imgSrc} alt={project.title}
          loading="lazy" width={800} height={600}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(47,49,66,0.78) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 0.4s ease",
        }} />
        {/* Arrow */}
        <div style={{
          position: "absolute", top: 20, right: 20,
          width: 38, height: 38,
          border: `1px solid ${GOLD}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translate(0,0)" : "translate(6px,-6px)",
          transition: "all 0.3s ease",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke={GOLD} strokeWidth="1.5" />
          </svg>
        </div>
        {/* Bottom info */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 22px" }}>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 9,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: GOLD, margin: "0 0 6px",
          }}>{project.category}</p>
          <p style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: isLarge ? 22 : 17, fontWeight: 500,
            color: "white", margin: 0, lineHeight: 1.2,
          }}>{project.title}</p>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 10,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)", margin: "6px 0 0",
            opacity: hovered ? 1 : 0, transition: "opacity 0.35s ease",
          }}>{project.location} · {project.year}</p>
        </div>
      </div>
    </Link>
  );
}

/* ── Counter with InView ────────────────────────── */
function StatsCounter() {
  const { ref, inView } = useInViewObs({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: 0,
    }}>
      {STATS.map(({ end, suffix, label }, i) => (
        <div key={label} style={{
          padding: "40px 32px",
          borderRight: i < STATS.length - 1 ? "1px solid rgba(47,49,66,0.1)" : "none",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(40px, 4vw, 64px)",
            fontWeight: 400, color: NAVY, margin: 0, lineHeight: 1,
          }}>
            {inView
              ? <CountUp end={end} duration={2.2} suffix={suffix} />
              : `0${suffix}`}
          </p>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 10, letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6B7280", margin: "10px 0 0",
          }}>{label}</p>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN HOME PAGE
══════════════════════════════════════════════════ */
export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: BG, overflowX: "hidden" }}>

      {/* ════════════════════════════════════════
          01  HERO
      ════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        height: "100vh", minHeight: 600,
        overflow: "hidden",
        display: "flex", alignItems: "center",
      }}>
        <HeroSlider />

        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(47,49,66,0.72) 0%, rgba(47,49,66,0.35) 60%, transparent 100%)",
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: 1280, margin: "0 auto",
          padding: "0 40px", width: "100%",
        }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10, letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: GOLD, margin: "0 0 20px",
            }}
          >Premium Interior &amp; Construction — Hyderabad</motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(48px, 7.5vw, 112px)",
              fontWeight: 400, lineHeight: 0.95,
              color: "white", margin: "0 0 32px",
              maxWidth: "70%",
            }}
          >
            Crafting Spaces<br />
            That <em style={{ color: GOLD, fontStyle: "italic" }}>Inspire</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14, lineHeight: 1.75,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 440, margin: "0 0 40px",
            }}
          >
            Award-winning interior design and construction firm based in Secunderabad. We deliver spaces that are precise, purposeful, and built to last.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
          >
            <Link to="/portfolio" style={{
              textDecoration: "none",
              background: GOLD, color: "white",
              padding: "14px 36px",
              fontFamily: "Inter, sans-serif",
              fontSize: 10, letterSpacing: "0.26em",
              textTransform: "uppercase",
              transition: "background 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = GOLD_D}
              onMouseLeave={e => e.currentTarget.style.background = GOLD}
            >View Our Work</Link>

            <Link to="/contact" style={{
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.5)",
              color: "white",
              padding: "14px 36px",
              fontFamily: "Inter, sans-serif",
              fontSize: 10, letterSpacing: "0.26em",
              textTransform: "uppercase",
              transition: "border-color 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"}
            >Get a Quote</Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: 36, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8,
          zIndex: 2,
        }}>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 9,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)", margin: 0,
          }}>Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ width: 1, height: 40, background: "rgba(255,255,255,0.3)" }}
          />
        </div>

        {/* Slide dots */}
        <div style={{
          position: "absolute", bottom: 36, right: 40,
          display: "flex", gap: 8, zIndex: 2,
        }}>
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => { }}
              style={{
                width: i === 0 ? 24 : 8, height: 2,
                background: i === 0 ? GOLD : "rgba(255,255,255,0.35)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          02  STATS STRIP
      ════════════════════════════════════════ */}
      <section style={{
        background: "white",
        borderBottom: "1px solid rgba(47,49,66,0.07)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <StatsCounter />
        </div>
      </section>

      {/* ════════════════════════════════════════
          03  INTRO / BRAND STATEMENT
      ════════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80, alignItems: "center",
        }}>
          <FadeIn>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10, letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: GOLD, margin: "0 0 20px",
            }}>Who We Are</p>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 400, lineHeight: 1.1,
              color: NAVY, margin: "0 0 28px",
            }}>
              Where Design Meets<br />
              <em style={{ color: GOLD, fontStyle: "italic" }}>Craftsmanship</em>
            </h2>
            <div style={{ width: 40, height: 1, background: GOLD, marginBottom: 24 }} />
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14, lineHeight: 1.85,
              color: "#4B5563", margin: "0 0 20px",
            }}>
              Concord Interior Concepts is a Hyderabad-based design and construction firm with over 12 years of delivering spaces that merge beauty with function. From luxury residences to landmark commercial builds, we bring vision to life.
            </p>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14, lineHeight: 1.85,
              color: "#4B5563", margin: "0 0 36px",
            }}>
              Every project begins with listening — understanding our clients' needs, lifestyle, and aspirations — before a single line is drawn.
            </p>
            <Link to="/about" style={{
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              fontSize: 10, letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: NAVY,
              borderBottom: `1px solid ${GOLD}`,
              paddingBottom: 4,
            }}>Learn Our Story →</Link>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ position: "relative" }}>
              <img
                src="https://picsum.photos/seed/interior-about/700/800"
                alt="Concord Interior Concepts workspace"
                loading="lazy" width={700} height={800}
                style={{ width: "100%", height: 520, objectFit: "cover", display: "block" }}
              />
              {/* Gold accent box */}
              <div style={{
                position: "absolute", bottom: -24, left: -24,
                width: 160, height: 160,
                border: `1px solid ${GOLD}`,
                zIndex: -1,
              }} />
              {/* Stat badge */}
              <div style={{
                position: "absolute", top: 32, right: -24,
                background: NAVY, padding: "20px 28px",
                textAlign: "center",
              }}>
                <p style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 40, fontWeight: 400,
                  color: GOLD, margin: 0, lineHeight: 1,
                }}>12+</p>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 9, letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.65)", margin: "6px 0 0",
                }}>Years of<br />Excellence</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
    04  SERVICES
════════════════════════════════════════ */}
      <section style={{ background: "#0E0F1A", padding: "110px 40px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 72 }}>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: GOLD, margin: "0 0 16px" }}>What We Do</p>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 4.5vw, 60px)", fontWeight: 400, color: "white", margin: 0, lineHeight: 1.05 }}>Our Services</h2>
              </div>
              <Link to="/services" style={{ textDecoration: "none", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, borderBottom: `1px solid ${GOLD}`, paddingBottom: 4 }}>All Services →</Link>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <DynamicServiceCard service={s} index={i} />
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          05  FEATURED PROJECTS
      ════════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 48 }}>
            <div>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: GOLD, margin: "0 0 16px",
              }}>Selected Works</p>
              <h2 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 400, color: NAVY,
                margin: 0,
              }}>Featured Projects</h2>
            </div>
            <Link to="/portfolio" style={{
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: NAVY,
              borderBottom: `1px solid ${GOLD}`,
              paddingBottom: 4,
            }}>View All →</Link>
          </div>
        </FadeIn>

        {/* Bento grid: 1 large left + 3 right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto",
          gap: 20,
        }}>
          <div style={{ gridRow: "span 2" }}>
            <FadeIn><FeaturedCard project={FEATURED[0]} index={0} /></FadeIn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {FEATURED.slice(1).map((p, i) => (
              <FadeIn key={p.id} delay={(i + 1) * 0.08}>
                <FeaturedCard project={p} index={1} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
    06  PROCESS
════════════════════════════════════════ */}
      <section style={{ background: BG, padding: "110px 40px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 80 }}>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: GOLD, margin: "0 0 16px" }}>How We Work</p>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 4.5vw, 60px)", fontWeight: 400, color: NAVY, margin: 0, lineHeight: 1.05 }}>Our Process</h2>
              </div>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.8, color: "#6B7280", maxWidth: 380, margin: 0 }}>
                  A structured, transparent approach — from first conversation to final handover.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            {[
              { step: "01", title: "Discovery", desc: "We listen and deeply understand your vision, lifestyle, and goals.", icon: "🔍" },
              { step: "02", title: "Concept", desc: "Mood boards, space plans, and material palettes — all tailored to your brief.", icon: "✏️" },
              { step: "03", title: "Design", desc: "Detailed drawings, 3D visuals, and full specification documents.", icon: "📐" },
              { step: "04", title: "Execution", desc: "On-site management, quality control, and milestone-based delivery.", icon: "🏗️" },
              { step: "05", title: "Handover", desc: "Final walkthrough, punch list sign-off, and after-care support.", icon: "🔑" },
            ].map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.1}>
                <ProcessCard step={p} index={i} />
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          07  TESTIMONIALS
      ════════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", background: BG }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10, letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: GOLD, margin: "0 0 16px",
            }}>Client Voices</p>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 400, color: NAVY,
              margin: "0 0 56px",
            }}>What Our Clients Say</h2>
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(20px, 2.5vw, 28px)",
                fontStyle: "italic", fontWeight: 400,
                color: NAVY, lineHeight: 1.65,
                margin: "0 0 32px",
              }}>
                "{TESTIMONIALS[testimonialIdx].quote}"
              </p>
              <div style={{ width: 32, height: 1, background: GOLD, margin: "0 auto 20px" }} />
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12, fontWeight: 500,
                letterSpacing: "0.06em",
                color: NAVY, margin: "0 0 4px",
              }}>{TESTIMONIALS[testimonialIdx].name}</p>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6B7280", margin: 0,
              }}>{TESTIMONIALS[testimonialIdx].project}</p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 40 }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                style={{
                  width: i === testimonialIdx ? 24 : 8, height: 2,
                  background: i === testimonialIdx ? GOLD : "rgba(47,49,66,0.2)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          08  CTA BANNER
      ════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(https://picsum.photos/seed/interior-cta/1920/600)",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.3)",
        }} />
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 1280, margin: "0 auto",
          padding: "100px 40px",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 40,
        }}>
          <FadeIn>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10, letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: GOLD, margin: "0 0 16px",
            }}>Ready to Begin?</p>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(32px, 4.5vw, 64px)",
              fontWeight: 400, color: "white",
              margin: 0, lineHeight: 1.05,
            }}>
              Let's Create Your<br />
              <em style={{ color: GOLD, fontStyle: "italic" }}>Dream Space</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link to="/contact" style={{
                textDecoration: "none",
                background: GOLD, color: "white",
                padding: "16px 40px",
                fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.26em",
                textTransform: "uppercase",
              }}>Start a Project</Link>
              <Link to="/portfolio" style={{
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.45)",
                color: "white",
                padding: "16px 40px",
                fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.26em",
                textTransform: "uppercase",
              }}>View Portfolio</Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}

/* ── Service card (inside dark bg) ─────────────── */
function DynamicServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: 440,
        overflow: "hidden",
        cursor: "pointer",
        background: "#141520",
      }}
    >
      {/* Full background image — always visible, dims on idle */}
      <img
        src={`https://picsum.photos/seed/${service.seed}/600/800`}
        alt={service.title}
        loading="lazy"
        width={600} height={800}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.08)" : "scale(1.02)",
          transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          filter: hovered ? "brightness(0.45)" : "brightness(0.2)",
          transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease",
        }}
      />

      {/* Gradient wash — stronger at bottom */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(to top, rgba(14,15,26,0.97) 0%, rgba(14,15,26,0.4) 50%, transparent 100%)`,
      }} />

      {/* Left accent line */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: 3,
        background: hovered ? service.accent : "transparent",
        transition: "background 0.4s ease",
      }} />

      {/* Number — top right, large ghost */}
      <div style={{
        position: "absolute", top: 20, right: 24,
        fontFamily: "Cormorant Garamond, serif",
        fontSize: 100, fontWeight: 300, lineHeight: 1,
        color: hovered ? `${service.accent}30` : "rgba(255,255,255,0.06)",
        transition: "color 0.45s ease",
        userSelect: "none",
        pointerEvents: "none",
      }}>{service.num}</div>

      {/* Main content */}
      <div style={{
        position: "absolute", inset: 0,
        padding: "36px 30px",
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
      }}>

        {/* Title */}
        <p style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: 30, fontWeight: 500,
          color: "white", margin: "0 0 14px", lineHeight: 1.15,
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}>{service.title}</p>

        {/* Divider line */}
        <div style={{
          width: hovered ? 48 : 24, height: 1,
          background: service.accent,
          marginBottom: 16,
          transition: "width 0.4s ease",
        }} />

        {/* Description */}
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 12.5, lineHeight: 1.8,
          color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)",
          margin: "0 0 24px",
          transition: "color 0.4s ease",
          maxWidth: "90%",
        }}>{service.desc}</p>

        {/* CTA row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.4s ease 0.06s",
        }}>
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 9, letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: service.accent,
          }}>Explore</span>
          <div style={{ flex: 1, height: 1, background: `${service.accent}60` }} />
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="10" stroke={service.accent} strokeWidth="1" />
            <path d="M7 11h8M12 8l3 3-3 3" stroke={service.accent} strokeWidth="1.2" strokeLinecap="square" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProcessCard({ step, index }) {
  const [hovered, setHovered] = useState(false);

  const CARD_COLORS = [
    { bg: "#2F3142", text: "white", accent: GOLD },
    { bg: "white", text: NAVY, accent: GOLD },
    { bg: GOLD, text: "white", accent: NAVY },
    { bg: "white", text: NAVY, accent: GOLD },
    { bg: "#2F3142", text: "white", accent: GOLD },
  ];

  const { bg, text, accent } = CARD_COLORS[index];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        padding: "40px 28px",
        position: "relative",
        overflow: "hidden",
        height: 320,
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: hovered
          ? "0 20px 48px rgba(47,49,66,0.18)"
          : "0 4px 16px rgba(47,49,66,0.06)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
        cursor: "default",
      }}
    >
      {/* Ghost big number — background */}
      <span style={{
        position: "absolute", bottom: -16, right: 12,
        fontFamily: "Cormorant Garamond, serif",
        fontSize: 120, fontWeight: 300, lineHeight: 1,
        color: index === 2
          ? "rgba(47,49,66,0.12)"
          : bg === "white"
            ? "rgba(47,49,66,0.06)"
            : "rgba(255,255,255,0.06)",
        userSelect: "none", pointerEvents: "none",
      }}>{step.step}</span>

      {/* Top: step number + connector dot */}
      <div>
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 24,
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: hovered ? accent : "transparent",
            border: `1.5px solid ${accent}`,
            flexShrink: 0,
            transition: "background 0.35s ease",
          }} />
          {index < 4 && (
            <div style={{ flex: 1, height: 1, background: `${accent}30` }} />
          )}
        </div>

        {/* Icon */}
        <div style={{
          fontSize: 28, marginBottom: 14,
          transform: hovered ? "scale(1.2) rotate(-5deg)" : "scale(1) rotate(0deg)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          display: "inline-block",
        }}>{step.icon}</div>

        {/* Title */}
        <p style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: 24, fontWeight: 500,
          color: text, margin: "0 0 10px", lineHeight: 1.2,
        }}>{step.title}</p>

        {/* Divider */}
        <div style={{
          width: hovered ? 36 : 20, height: 1.5,
          background: accent, marginBottom: 12,
          transition: "width 0.4s ease",
        }} />

        {/* Description */}
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 12, lineHeight: 1.75,
          color: text === "white" ? "rgba(255,255,255,0.65)" : "#6B7280",
          margin: 0,
        }}>{step.desc}</p>
      </div>
    </div>
  );
}