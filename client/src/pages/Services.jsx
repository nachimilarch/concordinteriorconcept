import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ── Brand tokens ─────────────────────────────── */
const NAVY = "#2F3142";
const GOLD = "#C8A75B";
const GOLD_D = "#A88A3D";
const BG = "#F4F6F8";

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

/* ── Services data ───────────────────────────── */
const SERVICES = [
  {
    num: "01",
    title: "Interior Design",
    tagline: "Spaces that feel like you.",
    desc: "We create bespoke interiors that seamlessly blend aesthetics with function. From initial concept boards to the final styling touches, every element is curated to reflect your personality and elevate everyday living.",
    features: ["Space Planning", "Furniture Selection", "Lighting Design", "Material & Finish Specification", "3D Visualisation", "Styling & Accessories"],
    seed: "svc-interior1",
    accent: "#C8A75B",
  },
  {
    num: "02",
    title: "Construction",
    tagline: "Built to outlast generations.",
    desc: "End-to-end construction management combining precision craftsmanship with transparent project delivery. We oversee every stage — from foundation to finishing — ensuring quality that stands the test of time.",
    features: ["Structural Works", "Civil Construction", "MEP Coordination", "Project Management", "Quality Control", "On-Time Delivery"],
    seed: "svc-construction1",
    accent: "#7A9E9F",
  },
  {
    num: "03",
    title: "Renovation",
    tagline: "Transform what already exists.",
    desc: "Breathe new life into existing spaces with thoughtful renovation. Whether it's a cosmetic refresh or a full structural overhaul, we approach every renovation with the same care and precision as a new build.",
    features: ["Full Home Renovation", "Kitchen & Bath Remodels", "Structural Modifications", "Façade Upgrades", "Flooring & Ceiling Works", "Plumbing & Electrical"],
    seed: "svc-renovation1",
    accent: "#B07D62",
  },
  {
    num: "04",
    title: "Consultation",
    tagline: "Clarity before commitment.",
    desc: "Not sure where to start? Our expert consultation sessions guide you through space planning, material selection, design direction, and budget planning — giving you a clear roadmap before a single rupee is spent.",
    features: ["Design Direction", "Space Planning Advice", "Material Selection", "Budget Planning", "Contractor Briefing", "Project Roadmap"],
    seed: "svc-consult1",
    accent: "#8A7FAF",
  },
];

/* ── Process steps ───────────────────────────── */
const PROCESS = [
  { step: "01", title: "Brief", desc: "We listen to your vision, goals, and constraints in depth." },
  { step: "02", title: "Concept", desc: "Mood boards, palettes, and spatial layouts tailored to you." },
  { step: "03", title: "Design", desc: "Detailed drawings, 3D visuals, and full specifications." },
  { step: "04", title: "Build", desc: "On-site management with milestone-based quality delivery." },
  { step: "05", title: "Handover", desc: "Final walkthrough, sign-off, and ongoing after-care." },
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
        borderBottom: "1px solid rgba(47,49,66,0.1)",
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
            padding: "36px 0",
            cursor: "pointer",
            background: hovered ? "rgba(200,167,91,0.03)" : "transparent",
            transition: "background 0.3s ease",
            margin: "0 -40px",
            padding: "36px 40px",
          }}
        >
          {/* Number */}
          <span style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 44, fontWeight: 300, lineHeight: 1,
            color: open ? service.accent : "rgba(47,49,66,0.18)",
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
              fontSize: 12, letterSpacing: "0.1em",
              color: service.accent,
              margin: 0, textTransform: "uppercase",
              opacity: open ? 1 : 0.6,
              transition: "opacity 0.35s ease",
            }}>{service.tagline}</p>
          </div>

          {/* Toggle icon */}
          <div style={{
            width: 44, height: 44,
            border: `1px solid ${open ? service.accent : "rgba(47,49,66,0.2)"}`,
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
                    <img
                      src={`https://picsum.photos/seed/${service.seed}/700/440`}
                      alt={service.title}
                      loading="lazy"
                      width={700} height={440}
                      style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
                    />
                    {/* accent line */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0,
                      width: 48, height: 3,
                      background: service.accent,
                    }} />
                  </div>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13.5, lineHeight: 1.85,
                    color: "#4B5563", margin: 0,
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

                {/* Right: features list */}
                <div>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10, letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: service.accent, margin: "0 0 24px",
                  }}>What's Included</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {service.features.map((f, i) => (
                      <div key={f} style={{
                        display: "flex", alignItems: "center", gap: 16,
                        padding: "14px 0",
                        borderBottom: "1px solid rgba(47,49,66,0.07)",
                      }}>
                        <div style={{
                          width: 6, height: 6,
                          background: service.accent,
                          flexShrink: 0,
                        }} />
                        <span style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 13, color: NAVY,
                          letterSpacing: "0.02em",
                        }}>{f}</span>
                      </div>
                    ))}
                  </div>
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
    <div style={{ borderBottom: "1px solid rgba(47,49,66,0.09)" }}>
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
          border: `1px solid ${open ? GOLD : "rgba(47,49,66,0.2)"}`,
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
              fontSize: 13.5, lineHeight: 1.85,
              color: "#6B7280", margin: "0 0 24px",
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
export default function Services() {
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
          background: "linear-gradient(135deg, rgba(200,167,91,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

            <FadeIn>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: 10,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: GOLD, margin: "0 0 20px",
              }}>What We Offer</p>
              <h1 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(48px, 6.5vw, 96px)",
                fontWeight: 400, lineHeight: 0.95,
                color: NAVY, margin: "0 0 32px",
              }}>
                Our<br />
                Services<span style={{ color: GOLD }}>.</span>
              </h1>
              <div style={{ width: 48, height: 1.5, background: GOLD, marginBottom: 28 }} />
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14, lineHeight: 1.85,
                color: "#4B5563", maxWidth: 420, margin: "0 0 40px",
              }}>
                From single-room interiors to full construction projects — we offer a complete suite of design and build services tailored to your vision and budget.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link to="/contact" style={{
                  textDecoration: "none",
                  background: GOLD, color: "white",
                  padding: "13px 36px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10, letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 20px rgba(200,167,91,0.35)",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = GOLD_D}
                  onMouseLeave={e => e.currentTarget.style.background = GOLD}
                >Get a Free Quote</Link>
                <Link to="/portfolio" style={{
                  textDecoration: "none",
                  border: `1px solid ${NAVY}`,
                  color: NAVY,
                  padding: "13px 36px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10, letterSpacing: "0.26em",
                  textTransform: "uppercase",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = NAVY; }}
                >View Our Work</Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div style={{ position: "relative" }}>
                <img
                  src="https://picsum.photos/seed/services-hero/700/800"
                  alt="Interior design services"
                  loading="lazy" width={700} height={800}
                  style={{ width: "100%", height: 520, objectFit: "cover", display: "block" }}
                />
                {/* Floating stat */}
                <div style={{
                  position: "absolute", bottom: 32, left: -32,
                  background: NAVY, padding: "22px 30px",
                  boxShadow: "0 8px 32px rgba(47,49,66,0.2)",
                }}>
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 48, fontWeight: 300,
                    color: GOLD, margin: 0, lineHeight: 1,
                  }}>4</p>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 9, letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)", margin: "6px 0 0",
                  }}>Core<br />Services</p>
                </div>
                {/* Gold frame accent */}
                <div style={{
                  position: "absolute", top: -20, right: -20,
                  width: 120, height: 120,
                  border: `1px solid ${GOLD}`,
                  zIndex: -1,
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
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: 10,
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: GOLD, margin: "0 0 48px",
            }}>Explore Our Services</p>
          </FadeIn>
          {SERVICES.map((s, i) => (
            <ServiceBlock key={s.num} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────── */}
      <section style={{ background: "#0E0F1A", padding: "110px 40px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 72 }}>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: GOLD, margin: "0 0 16px" }}>Why Concord</p>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 4.5vw, 60px)", fontWeight: 400, color: "white", margin: 0, lineHeight: 1.05 }}>What Sets Us Apart</h2>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.4)", maxWidth: 360, margin: 0 }}>
                Six reasons our clients trust us with their most important spaces.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {[
              { num: "01", title: "Design-Led", desc: "Every project begins with design thinking — function and beauty are never compromised.", seed: "why-design", accent: GOLD },
              { num: "02", title: "Single Point", desc: "One dedicated project manager from brief to handover. No miscommunication, ever.", seed: "why-single", accent: "#7A9E9F" },
              { num: "03", title: "Transparent", desc: "Detailed quotes, milestone billing, and weekly progress updates — always.", seed: "why-transparent", accent: "#B07D62" },
              { num: "04", title: "Quality Assured", desc: "We use only vetted materials and contractors. Every finish is inspected personally.", seed: "why-quality", accent: "#8A7FAF" },
              { num: "05", title: "On Schedule", desc: "We have a 94% on-time delivery rate across all completed projects.", seed: "why-schedule", accent: "#7A9E9F" },
              { num: "06", title: "After-Care", desc: "90-day post-handover support. We stand behind every project we deliver.", seed: "why-aftercare", accent: GOLD },
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
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD, margin: "0 0 14px" }}>Our Workflow</p>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 400, color: NAVY, margin: 0 }}>How a Project Unfolds</h2>
              </div>
              <Link to="/contact" style={{
                textDecoration: "none", fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                color: NAVY, borderBottom: `1px solid ${GOLD}`, paddingBottom: 4,
              }}>Start Your Project →</Link>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }}>
            {PROCESS.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.09}>
                <div style={{
                  padding: "40px 32px",
                  borderRight: i < 4 ? "1px solid rgba(47,49,66,0.09)" : "none",
                  position: "relative",
                }}>
                  {/* Step number */}
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 64, fontWeight: 300, lineHeight: 1,
                    color: "rgba(200, 167, 91, 0.8)", margin: "0 0 -12px",
                    userSelect: "none",
                  }}>{p.step}</p>
                  {/* Gold dot */}
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: GOLD, marginBottom: 20,
                    position: "relative", zIndex: 1,
                  }} />
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 22, fontWeight: 500,
                    color: NAVY, margin: "0 0 12px",
                  }}>{p.title}</p>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12, lineHeight: 1.75,
                    color: "#6B7280", margin: 0,
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
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD, margin: "0 0 16px" }}>Got Questions?</p>
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

      {/* ── CTA ──────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(https://picsum.photos/seed/services-cta/1920/600)",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.25)",
        }} />
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 1280, margin: "0 auto",
          padding: "100px 40px",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 40,
        }}>
          <FadeIn>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD, margin: "0 0 16px" }}>Ready to Begin?</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 400, color: "white", margin: 0, lineHeight: 1.05 }}>
              Let's Design<br />
              <em style={{ color: GOLD, fontStyle: "italic" }}>Your Space</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Link to="/contact" style={{
              textDecoration: "none",
              background: GOLD, color: "white",
              padding: "16px 48px",
              fontFamily: "Inter, sans-serif",
              fontSize: 10, letterSpacing: "0.26em",
              textTransform: "uppercase",
              boxShadow: "0 4px 24px rgba(200,167,91,0.4)",
            }}>Book a Consultation</Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}

/* ── Why card ────────────────────────────────── */
function WhyCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        cursor: "default",
        background: "#141520",
      }}
    >
      {/* Background image — fades in on hover */}
      <img
        src={`https://picsum.photos/seed/${item.seed}/600/500`}
        alt={item.title}
        loading="lazy" width={600} height={500}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          filter: hovered ? "brightness(0.38)" : "brightness(0.12)",
          transform: hovered ? "scale(1.07)" : "scale(1.02)",
          transition: "filter 0.6s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Bottom gradient wash */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(14,15,26,0.95) 0%, rgba(14,15,26,0.4) 55%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: 3,
        background: hovered ? item.accent : "transparent",
        transition: "background 0.4s ease",
      }} />

      {/* Ghost number — top right */}
      <span style={{
        position: "absolute", top: 12, right: 20,
        fontFamily: "Cormorant Garamond, serif",
        fontSize: 96, fontWeight: 300, lineHeight: 1,
        color: hovered ? `${item.accent}28` : "rgba(255,255,255,0.05)",
        transition: "color 0.45s ease",
        userSelect: "none", pointerEvents: "none",
      }}>{item.num}</span>

      {/* Content */}
      <div style={{
        position: "absolute", inset: 0,
        padding: "32px 28px",
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
      }}>
        {/* Title */}
        <p style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: 26, fontWeight: 500,
          color: "white", margin: "0 0 10px", lineHeight: 1.15,
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.4s ease",
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}>{item.title}</p>

        {/* Expanding divider */}
        <div style={{
          width: hovered ? 44 : 20, height: 1.5,
          background: item.accent,
          marginBottom: 14,
          transition: "width 0.4s ease",
        }} />

        {/* Description */}
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 12, lineHeight: 1.8,
          color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)",
          margin: 0,
          transition: "color 0.4s ease",
        }}>{item.desc}</p>
      </div>
    </div>
  );
}