import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useInViewObs } from "react-intersection-observer";
import api from "../api/axios";
import ConnectCTA from "../components/ConnectCTA";

const NAVY = "#22221E";
const GOLD = "#C2A87A";
const BG = "#F5F0EB";
const PORTFOLIO_RED = "#2C4A3B";
const PORTFOLIO_RED_LIGHT = "#7FA08C";

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function StatsCounter({ stats, loading }) {
  const { ref, inView } = useInViewObs({ triggerOnce: true, threshold: 0.3 });
  const currentYear = new Date().getFullYear();
  const items = [
    { end: stats?.totalProjects || 50, suffix: "+", label: "Projects Completed" },
    { end: stats?.yearsExperience || (currentYear - 2020), suffix: "+", label: "Years of Experience" },
    { end: stats?.happyClients || 50, suffix: "+", label: "Happy Clients" },
    { end: stats?.awardsWon || 8, suffix: "", label: "Awards Won" },
  ];
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 0 }}>
      {items.map(({ end, suffix, label }, i) => (
        <div key={label} style={{ padding: "48px 32px", borderRight: i < items.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none", textAlign: "center" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(40px, 4vw, 64px)", fontWeight: 400, color: GOLD, margin: 0, lineHeight: 1 }}>
            {inView && !loading ? <CountUp end={end} duration={2.2} suffix={suffix} /> : `0${suffix}`}
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", margin: "10px 0 0" }}>{label}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Icon map for core values ────────────────────── */
const VALUE_ICONS = {
  leaf: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  trees: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
      <path d="M7 16v5" />
      <path d="M13 19v3" />
      <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
    </svg>
  ),
  gem: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 3h12l4 6-10 13L2 9Z" />
      <path d="M11 3 8 9l4 13 4-13-3-6" />
      <path d="M2 9h20" />
    </svg>
  ),
  lightbulb: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" /><path d="M10 22h4" />
    </svg>
  ),
  "shield-check": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  "heart-handshake": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
      <path d="m18 15-2-2" /><path d="m15 18-2-2" />
    </svg>
  ),
  sparkles: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
};

function ValueCard({ value, index }) {
  const [hovered, setHovered] = useState(false);
  const icon = VALUE_ICONS[value.icon] || VALUE_ICONS.sparkles;
  return (
    <FadeIn delay={index * 0.07}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "rgba(24,24,21,0.88)" : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(14px) saturate(150%)",
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
          border: `1px solid ${hovered ? "rgba(194,168,122,0.5)" : "rgba(255,255,255,0.7)"}`,
          borderRadius: 20,
          padding: "36px 28px",
          boxShadow: hovered ? "0 18px 44px rgba(0,0,0,0.28)" : "0 8px 28px rgba(24,24,21,0.08)",
          transition: "all 0.35s ease",
          cursor: "default",
          minHeight: 220,
        }}
      >
        <div style={{ color: hovered ? GOLD : NAVY, marginBottom: 16, transition: "color 0.35s" }}>
          {icon}
        </div>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 600, color: hovered ? GOLD : NAVY, margin: "0 0 10px", transition: "color 0.35s" }}>{value.title}</p>
        <div style={{ width: hovered ? 32 : 16, height: 1, background: GOLD, marginBottom: 14, transition: "width 0.35s" }} />
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, lineHeight: 1.8, color: hovered ? "rgba(255,255,255,0.82)" : "#4B5563", margin: 0, transition: "color 0.35s" }}>{value.description}</p>
      </div>
    </FadeIn>
  );
}

export default function About() {
  const [settings, setSettings] = useState({});
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [coreValues, setCoreValues] = useState([]);

  useEffect(() => {
    api.get("/settings").then(r => {
      const s = r.data || {};
      setSettings(s);
      try {
        if (s.core_values) setCoreValues(JSON.parse(s.core_values));
      } catch { /* ignore */ }
    }).catch(() => {});

    api.get("/projects/stats")
      .then(r => setStats(r.data))
      .catch(() => {})
      .finally(() => setStatsLoading(false));
  }, []);

  const companyName = settings.company_name || "Concord Interior Concepts";
  const tagline = settings.company_tagline || "Sustainable Luxury Spaces.";
  const brandStoryLong = settings.brand_story_long || "Concord Interior Concepts is a multidisciplinary design and development firm dedicated to shaping spaces that balance aesthetics, functionality, sustainability and long-term value. Our work spans architecture, construction, landscape development, luxury interiors, infrastructure planning and consultancy. We collaborate with homeowners, businesses, developers and institutions to transform ideas into environments that inspire everyday life. Every project is approached with one objective — to create spaces that are not only visually exceptional but strategically designed for the future.";
  const visionStatement = settings.vision_statement || "";
  const missionStatement = settings.mission_statement || "";
  const brandPhilosophy = settings.brand_philosophy || "";
  const servicePhilosophy = settings.service_philosophy || "";
  const brandPromise = settings.brand_promise || "";
  const brandUsp = settings.brand_usp || "";

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>

      {/* ── Section 1: Hero Banner ────────────── */}
      <section style={{ position: "relative", height: "60vh", minHeight: 480, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <img
          src="/images/brand/doc-image-7.jpg"
          alt="A premium corporate interior with floor-to-ceiling city views — the Concord studio aesthetic"
          loading="eager"
          width={1920} height={800}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        {/* Strong layered scrim for legibility */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,25,0.92) 0%, rgba(15,15,25,0.65) 50%, rgba(15,15,25,0.35) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 800px 500px at 25% 80%, rgba(0,0,0,0.5) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "0 40px 60px" }}>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.36em", textTransform: "uppercase", color: GOLD, margin: "0 0 16px", fontWeight: 600, textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>About Concord Interior Concepts</p>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(42px, 6vw, 84px)", fontWeight: 500, lineHeight: 1.02, color: "white", margin: "0 0 16px", textShadow: "0 4px 28px rgba(0,0,0,0.95), 0 2px 10px rgba(0,0,0,0.85)" }}>
              Designing Experiences.<br /><em style={{ color: GOLD, fontStyle: "italic" }}>Building Possibilities.</em>
            </h1>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "white", margin: 0, maxWidth: 540, lineHeight: 1.75, textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>A multidisciplinary design and development firm shaping spaces that balance aesthetics, functionality, sustainability and long-term value.</p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Brand Story (PDF chapter style) ────────────── */}
      <section className="paper-bg" style={{ padding: "100px 40px" }}>
       <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 12 }}>
              <span className="chapter-num" style={{ fontSize: "clamp(56px, 7vw, 96px)" }}>01</span>
              <p className="chapter-label">Who We Are</p>
            </div>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.1, color: NAVY, margin: "0 0 28px" }}>
              A Design, Build &<br /><em style={{ color: "#2C4A3B", fontStyle: "italic" }}>Development Consultancy</em>
            </h2>
            <div style={{ width: 40, height: 1.5, background: "#2C4A3B", marginBottom: 24 }} />
            {brandStoryLong.split(". ").reduce((chunks, sentence, i, arr) => {
              const mid = Math.ceil(arr.length / 2);
              if (i < mid) chunks[0].push(sentence);
              else chunks[1].push(sentence);
              return chunks;
            }, [[], []]).map((para, idx) => (
              para.length > 0 && (
                <p key={idx} style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.9, color: "#374151", margin: "0 0 20px" }}>
                  {para.join(". ").trim()}{para[para.length-1] && !para[para.length-1].endsWith(".") ? "." : ""}
                </p>
              )
            ))}
            <Link to="/portfolio" style={{ textDecoration: "none", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: NAVY, borderBottom: `1px solid #2C4A3B`, paddingBottom: 4 }}>See Our Work →</Link>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ position: "relative" }}>
              <img
                src="/images/brand/doc-image-4.jpg"
                alt="Concord villas taking shape on site — cranes above, landscaping below"
                loading="lazy"
                width={700} height={800}
                style={{ width: "100%", height: 520, objectFit: "cover", display: "block", border: "1px solid rgba(44,74,59,0.18)", borderRadius: 24, boxShadow: "0 20px 56px rgba(24,24,21,0.16)" }}
              />
              <div style={{ position: "absolute", bottom: -24, left: -24, width: 160, height: 160, border: `1px solid rgba(44,74,59,0.45)`, borderRadius: 24, zIndex: -1 }} />
              <div style={{ position: "absolute", top: 32, right: -24, background: "rgba(24,24,21,0.82)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(194,168,122,0.3)", borderRadius: 18, padding: "20px 28px", textAlign: "center" }}>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 40, fontWeight: 400, color: GOLD, margin: 0, lineHeight: 1 }}>{stats?.yearsExperience || (new Date().getFullYear() - 2020)}+</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", margin: "6px 0 0" }}>Years of<br />Excellence</p>
              </div>
            </div>
          </FadeIn>
        </div>
       </div>
      </section>

      {/* ── Stats ────────────────────────────── */}
      <section style={{ background: NAVY }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <StatsCounter stats={stats} loading={statsLoading} />
        </div>
      </section>

      {/* ── Our Philosophy — four pillars (from content doc) ── */}
      <section style={{ background: "white", padding: "130px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 84 }}>
              <p className="chapter-label" style={{ marginBottom: 16 }}>Our Philosophy</p>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(34px, 4.4vw, 60px)", fontWeight: 500, color: NAVY, margin: 0, lineHeight: 1.1 }}>
                Four principles.<br /><em style={{ fontStyle: "italic", color: "#2C4A3B" }}>Every project.</em>
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 0 }}>
            {[
              { title: "Design with Purpose.", desc: "Every line serves a function." },
              { title: "Build with Precision.", desc: "Every detail reflects quality." },
              { title: "Deliver with Integrity.", desc: "Every promise is backed by accountability." },
              { title: "Sustain with Responsibility.", desc: "Every project respects tomorrow." },
            ].map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <div style={{
                  padding: "12px 36px",
                  borderLeft: i > 0 ? "1px solid rgba(24,24,21,0.12)" : "none",
                  height: "100%",
                }}>
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 56, fontWeight: 400, lineHeight: 1,
                    color: "#C2A87A", margin: "0 0 20px",
                  }}>{String(i + 1).padStart(2, "0")}</p>
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 26, fontWeight: 600,
                    color: NAVY, margin: "0 0 12px", lineHeight: 1.2,
                  }}>{p.title}</p>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14.5, lineHeight: 1.75, fontStyle: "italic",
                    color: "#6F6B62", margin: 0,
                  }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sustainability (verbatim from content doc) ── */}
      <section style={{ background: "#1C332A", padding: "130px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 32, left: 40, right: 40, borderTop: "1px solid rgba(194,168,122,0.3)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 70 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", color: "#C2A87A", fontWeight: 600, margin: "0 0 18px" }}>Sustainability</p>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(34px, 4.4vw, 60px)", fontWeight: 500, color: "#F5F0EB", margin: "0 0 24px", lineHeight: 1.1 }}>
                Building Responsibly for<br /><em style={{ fontStyle: "italic", color: "#C2A87A" }}>Future Generations</em>
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15.5, lineHeight: 1.85, color: "rgba(245,240,235,0.8)", margin: "0 auto", maxWidth: 640 }}>
                Sustainability is integrated into our design philosophy. We adopt responsible strategies
                that reduce environmental impact while improving long-term performance.
              </p>
            </div>
          </FadeIn>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "28px 40px",
            maxWidth: 1080, margin: "0 auto",
          }}>
            {[
              "Climate Responsive Design",
              "Water Conservation",
              "Rainwater Management",
              "Natural Ventilation",
              "Energy Efficiency",
              "Sustainable Materials",
              "Green Landscapes",
              "Long-Life Building Systems",
            ].map((item, i) => (
              <FadeIn key={item} delay={i * 0.05}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 22, borderTop: "1px solid #C2A87A", flexShrink: 0 }} />
                  <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 21, fontWeight: 500, color: "#F5F0EB", lineHeight: 1.3 }}>{item}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Vision & Mission ──────── */}
      {(visionStatement || missionStatement) && (
        <section style={{ background: "#181815", padding: "100px 40px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <div style={{ display: "inline-flex", alignItems: "baseline", gap: 14, marginBottom: 12 }}>
                  <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(56px, 7vw, 96px)", fontWeight: 500, color: "#7FA08C", lineHeight: 0.9 }}>02.</span>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#7FA08C", fontWeight: 500, margin: 0 }}>Where We're Headed</p>
                </div>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "white", margin: 0 }}>Vision & Mission</h2>
              </div>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {visionStatement && (
                <FadeIn delay={0.1}>
                  <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${GOLD}30`, padding: "48px 40px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                      <div style={{ width: 48, height: 48, border: `1px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
                        </svg>
                      </div>
                      <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: GOLD, margin: 0 }}>Vision</p>
                    </div>
                    <div style={{ width: 40, height: 1.5, background: PORTFOLIO_RED_LIGHT, marginBottom: 24, opacity: 0.7 }} />
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.85)", margin: 0 }}>{visionStatement}</p>
                  </div>
                </FadeIn>
              )}
              {missionStatement && (
                <FadeIn delay={0.2}>
                  <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${GOLD}30`, padding: "48px 40px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                      <div style={{ width: 48, height: 48, border: `1px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5">
                          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: GOLD, margin: 0 }}>Mission</p>
                    </div>
                    <div style={{ width: 40, height: 1.5, background: PORTFOLIO_RED_LIGHT, marginBottom: 24, opacity: 0.7 }} />
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.85)", margin: 0 }}>{missionStatement}</p>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 4: Core Values Grid ──────── */}
      {coreValues.length > 0 && (
        <section style={{ background: "white", padding: "100px 40px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <div style={{ display: "inline-flex", alignItems: "baseline", gap: 14, marginBottom: 12 }}>
                  <span className="chapter-num" style={{ fontSize: "clamp(56px, 7vw, 96px)" }}>03</span>
                  <p className="chapter-label">What Drives Us</p>
                </div>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: NAVY, margin: 0 }}>Our Core Values</h2>
              </div>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
              {coreValues.map((v, i) => (
                <ValueCard key={v.title} value={v} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 5: Brand Philosophy Pull Quote ── */}
      {brandPhilosophy && (
        <section style={{ background: "#F5F0EB", padding: "100px 40px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <FadeIn>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 80, color: PORTFOLIO_RED, lineHeight: 0.5, marginBottom: 24, opacity: 0.5 }}>"</div>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(22px, 2.8vw, 34px)", fontStyle: "italic", fontWeight: 400, color: NAVY, lineHeight: 1.7, margin: "0 0 32px" }}>
                {brandPhilosophy}
              </p>
              <div style={{ width: 60, height: 1.5, background: PORTFOLIO_RED, margin: "0 auto" }} />
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Section 6: Service Philosophy ────── */}
      {servicePhilosophy && (
        <section style={{ background: BG, padding: "100px 40px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "center" }}>
              <FadeIn>
                <p className="chapter-label" style={{ margin: "0 0 20px" }}>Our Approach</p>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 400, color: NAVY, margin: "0 0 20px", lineHeight: 1.15 }}>Service<br />Philosophy</h2>
                <div style={{ width: 40, height: 1.5, background: PORTFOLIO_RED }} />
              </FadeIn>
              <FadeIn delay={0.15}>
                <img
                  src="/images/layouts/IMG_20210706_085736.jpg"
                  alt="Architecture and planning philosophy"
                  loading="lazy"
                  width={80} height={80}
                  style={{ display: "none" }}
                />
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.9, color: "#4B5563", margin: 0 }}>
                  {servicePhilosophy}
                </p>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* ── Section 7: Brand Promise + USP ───── */}
      {(brandPromise || brandUsp) && (
        <section style={{ background: "#141412", padding: "100px 40px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: PORTFOLIO_RED_LIGHT, margin: "0 0 16px", fontWeight: 500 }}>Our Commitment</p>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "white", margin: 0 }}>Promise & Distinction</h2>
              </div>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {brandPromise && (
                <FadeIn delay={0.1}>
                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "44px 40px", borderLeft: `3px solid ${PORTFOLIO_RED_LIGHT}` }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: PORTFOLIO_RED_LIGHT, margin: "0 0 20px", fontWeight: 500 }}>Our Promise</p>
                    <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, color: "white", margin: "0 0 20px", lineHeight: 1.3 }}>Built on Trust.</p>
                    <div style={{ width: 32, height: 1.5, background: PORTFOLIO_RED_LIGHT, marginBottom: 20, opacity: 0.6 }} />
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.82)", margin: 0 }}>{brandPromise}</p>
                  </div>
                </FadeIn>
              )}
              {brandUsp && (
                <FadeIn delay={0.2}>
                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "44px 40px", borderLeft: `3px solid ${PORTFOLIO_RED_LIGHT}` }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: PORTFOLIO_RED_LIGHT, margin: "0 0 20px", fontWeight: 500 }}>What Makes Us Different</p>
                    <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, color: "white", margin: "0 0 20px", lineHeight: 1.3 }}>Holistic by Design.</p>
                    <div style={{ width: 32, height: 1.5, background: PORTFOLIO_RED_LIGHT, marginBottom: 20, opacity: 0.6 }} />
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.82)", margin: 0 }}>{brandUsp}</p>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Let's Connect — uniform site-wide CTA ── */}
      <ConnectCTA />

    </div>
  );
}
