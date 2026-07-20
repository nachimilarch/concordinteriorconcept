import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useInViewObs } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Brand tokens — Minimal Luxury (per content doc) ── */
const INK = "#181815";
const IVORY = "#F5F0EB";
const BEIGE = "#FBB316";
const BEIGE_DEEP = "#DE9E08";
const FOREST = "#2C4A3B";
const FOREST_LIGHT = "#7FA08C";

/* ── Cinematic scenes — imagery from the brand content document ──
 * The journey tells the brand story in three words:
 *   Scene 1 — "We Design."     luxury interior (doc-image-3)
 *   Scene 2 — "We Build."      construction in progress (doc-image-4)
 *   Scene 3 — "We Transform."  completed villa with pool (doc-image-1)
 *   Scene 4 — brand statement  resort panorama (doc-image-2)
 *   Scene 5 — preview cards
 */
const SCENES = [
  {
    id: 1,
    src: "/images/brand/doc-image-3.jpg",
    fallback: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=88",
    alt: "A refined contemporary living room with layered lighting, glass partitions, and a calm neutral palette",
  },
  {
    id: 2,
    src: "/images/brand/doc-image-4.jpg",
    fallback: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=85",
    alt: "Modern villas under construction — cranes above, landscaping and stonework taking shape below",
  },
  {
    id: 3,
    src: "/images/brand/doc-image-1.jpg",
    fallback: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85",
    alt: "A completed modern villa with infinity pool, timber deck, and mountains beyond",
  },
  {
    id: 4,
    src: "/images/brand/doc-image-2.jpg",
    fallback: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=85",
    alt: "A resort landscape at dusk — infinity pool flowing toward the sea between mature trees",
  },
];

/* Preview thumbs for Scene 5 cards */
const PREVIEW_THUMBS = {
  portfolio: "/images/brand/doc-image-1.jpg",
  services: "/images/brand/doc-image-5.jpg",
  about: "/images/brand/doc-image-7.jpg",
};

/* ── Helpers ───────────────────────────────────── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setMobile(mq.matches);
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mobile;
}

function ScrollIndicator() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <span style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 10, letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "rgba(245,240,235,0.65)",
      }}>Scroll</span>
      <div style={{ position: "relative", width: 1, height: 48, background: "rgba(245,240,235,0.25)" }}>
        <motion.div
          animate={{ y: [0, 32, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            position: "absolute", left: -2.5, top: 0,
            width: 6, height: 6, borderRadius: "50%",
            background: BEIGE,
          }}
        />
      </div>
    </div>
  );
}

/* Shared word-mark treatment for the three scene words */
function SceneWord({ label, word, sub, align = "center" }) {
  const alignment = align === "left" ? "flex-start" : "center";
  const textAlign = align === "left" ? "left" : "center";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: alignment, textAlign }}>
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 11, letterSpacing: "0.4em",
        textTransform: "uppercase", color: BEIGE,
        margin: "0 0 20px", fontWeight: 600,
        textShadow: "0 2px 12px rgba(0,0,0,0.95)",
      }}>{label}</p>
      <h1 style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: "clamp(56px, 9vw, 128px)",
        fontWeight: 500, lineHeight: 0.98,
        color: "white", margin: "0 0 26px",
        letterSpacing: "0.01em",
        textShadow: "0 6px 40px rgba(0,0,0,0.95), 0 2px 10px rgba(0,0,0,0.8)",
      }}>
        {word}
      </h1>
      <div style={{ width: 64, borderTop: `1px solid ${BEIGE}`, marginBottom: 24, boxShadow: "0 1px 8px rgba(0,0,0,0.5)" }} />
      <p style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: "clamp(18px, 2vw, 26px)", fontStyle: "italic",
        color: "rgba(245,240,235,0.95)", margin: 0,
        maxWidth: 560, lineHeight: 1.5,
        textShadow: "0 2px 16px rgba(0,0,0,0.95)",
      }}>
        {sub}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   STATIC HERO (mobile + reduced-motion fallback)
══════════════════════════════════════════════════ */
function StaticHero() {
  return (
    <section style={{
      position: "relative", height: "100vh", minHeight: 560,
      overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <img
        src={SCENES[2].src}
        onError={(e) => { e.currentTarget.src = SCENES[2].fallback; }}
        alt={SCENES[2].alt}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(16,16,16,0.6) 0%, rgba(16,16,16,0.8) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 600px 380px at center, rgba(0,0,0,0.45) 0%, transparent 75%)",
      }} />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px", maxWidth: 900 }}
      >
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 10, letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: BEIGE, margin: "0 0 22px", fontWeight: 600,
          textShadow: "0 2px 10px rgba(0,0,0,0.9)",
        }}>Concord Interior Concepts</p>
        <h1 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(44px, 11vw, 84px)",
          fontWeight: 500, lineHeight: 1.05,
          color: "white", margin: "0 0 24px",
          textShadow: "0 4px 28px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.8)",
        }}>
          We Design.<br />We Build.<br />
          <em style={{ color: BEIGE, fontStyle: "italic", textShadow: "0 4px 24px rgba(0,0,0,0.9)" }}>We Transform.</em>
        </h1>
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 15, lineHeight: 1.8,
          color: "white", margin: "0 auto 34px",
          maxWidth: 560,
          textShadow: "0 2px 12px rgba(0,0,0,0.9)",
        }}>
          Architecture, Construction, Interiors, Landscape Development and Strategic Planning —
          brought together through one integrated vision.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/portfolio" style={{
            textDecoration: "none", background: FOREST, color: IVORY,
            padding: "15px 34px", borderRadius: 999, fontFamily: "Inter, sans-serif",
            fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
          }}>Discover Our Work</Link>
          <Link to="/contact" style={{
            textDecoration: "none", border: "1px solid rgba(245,240,235,0.65)", color: IVORY,
            padding: "15px 34px", borderRadius: 999, fontFamily: "Inter, sans-serif",
            fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
          }}>Book a Consultation</Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   CINEMATIC SCROLL JOURNEY (desktop)
══════════════════════════════════════════════════ */
export default function ScrollJourney({ stats }) {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  if (isMobile || reducedMotion) {
    return <StaticHero />;
  }

  return <CinematicJourney stats={stats} />;
}

function CinematicJourney({ stats }) {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const scenesRef = useRef([]);
  const scene1ContentRef = useRef(null);
  const scene2ContentRef = useRef(null);
  const scene3ContentRef = useRef(null);
  const scene4ContentRef = useRef(null);
  const scene5ContentRef = useRef(null);
  const progressBarRef = useRef(null);
  const { ref: counterTrigger, inView: counterInView } = useInViewObs({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;
    const sceneEls = scenesRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.set(sceneEls[0], { opacity: 1, scale: 1.12 });
      gsap.set(sceneEls.slice(1), { opacity: 0 });
      gsap.set([scene2ContentRef.current, scene3ContentRef.current, scene4ContentRef.current, scene5ContentRef.current], { opacity: 0, y: 30 });
      gsap.set(scene1ContentRef.current, { opacity: 1, y: 0 });

      /*
       * Timeline (1 unit = 1/5 of the 500vh journey):
       *   0.0 – 1.0   Scene 1 "We Design."     hold + slow zoom
       *   1.0 – 1.4   crossfade → Scene 2
       *   1.4 – 2.0   Scene 2 "We Build."      hold
       *   2.0 – 2.4   crossfade → Scene 3
       *   2.4 – 3.0   Scene 3 "We Transform."  hold
       *   3.0 – 3.4   crossfade → Scene 4 brand statement
       *   3.4 – 4.4   Scene 4 hold (CTAs + counters)
       *   4.4 – 5.0   Scene 5 preview cards rise
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          pin: pinRef.current,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Scene 1 hold + slow zoom out
      tl.to(sceneEls[0], { scale: 1.0, duration: 1.0, ease: "power2.inOut" }, 0);

      // Crossfade 1 → 2
      tl.to(scene1ContentRef.current, { opacity: 0, y: -40, duration: 0.35, ease: "power2.in" }, 1.0)
        .to(sceneEls[0], { opacity: 0, duration: 0.4, ease: "power2.inOut" }, 1.0)
        .fromTo(sceneEls[1], { opacity: 0, scale: 1.18 }, { opacity: 1, duration: 0.4, ease: "power2.inOut" }, 1.0)
        .fromTo(scene2ContentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 1.15);

      // Scene 2 hold
      tl.to(sceneEls[1], { scale: 1.0, duration: 0.6, ease: "power2.inOut" }, 1.4);

      // Crossfade 2 → 3
      tl.to(scene2ContentRef.current, { opacity: 0, y: -30, duration: 0.3, ease: "power2.in" }, 2.0)
        .to(sceneEls[1], { opacity: 0, duration: 0.4, ease: "power2.inOut" }, 2.0)
        .fromTo(sceneEls[2], { opacity: 0, scale: 1.16 }, { opacity: 1, duration: 0.4, ease: "power2.inOut" }, 2.0)
        .fromTo(scene3ContentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 2.1);

      // Scene 3 hold
      tl.to(sceneEls[2], { scale: 1.0, duration: 0.6, ease: "power2.inOut" }, 2.4);

      // Crossfade 3 → 4 (blur clears into brand statement)
      tl.to(scene3ContentRef.current, { opacity: 0, y: -30, duration: 0.3, ease: "power2.in" }, 3.0)
        .to(sceneEls[2], { opacity: 0, duration: 0.4, ease: "power2.inOut" }, 3.0)
        .fromTo(
          sceneEls[3],
          { opacity: 0, scale: 1.08, filter: "blur(8px) brightness(0.85)" },
          { opacity: 1, filter: "blur(0px) brightness(1)", duration: 0.5, ease: "power2.out" },
          3.0
        )
        .fromTo(scene4ContentRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 3.1);

      // Scene 4 hold
      tl.to(sceneEls[3], { scale: 1.0, duration: 1.0, ease: "power2.inOut" }, 3.4);

      // Scene 5 rises; scene 4 dims
      tl.to(scene4ContentRef.current, { opacity: 0, y: -40, duration: 0.45, ease: "power2.in" }, 4.4)
        .to(sceneEls[3], { opacity: 0.18, duration: 0.5, ease: "power2.inOut" }, 4.4)
        .fromTo(
          scene5ContentRef.current,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          4.45
        );

      // Progress bar
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=500%",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      <div ref={pinRef} style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: INK,
      }}>
        {/* ── Scene image layers ── */}
        {SCENES.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => (scenesRef.current[i] = el)}
            style={{
              position: "absolute", inset: 0,
              willChange: "transform, opacity, filter",
              transformOrigin: "center center",
            }}
          >
            <img
              src={s.src}
              onError={(e) => { if (e.currentTarget.src !== s.fallback) e.currentTarget.src = s.fallback; }}
              alt={s.alt}
              loading={i === 0 ? "eager" : "lazy"}
              fetchpriority={i === 0 ? "high" : "auto"}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center",
                display: "block",
                filter: "saturate(1.15) contrast(1.06) brightness(1.07)",
              }}
            />
            {/* Full-image scrim */}
            <div style={{
              position: "absolute", inset: 0,
              background:
                i === 3
                  ? "linear-gradient(180deg, rgba(16,16,16,0.30) 0%, rgba(16,16,16,0.44) 100%)"
                  : "linear-gradient(180deg, rgba(16,16,16,0.26) 0%, rgba(16,16,16,0.36) 55%, rgba(16,16,16,0.28) 100%)",
              pointerEvents: "none",
            }} />
            {/* Focused vignette behind text */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 780px 460px at center, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 45%, transparent 78%)",
              pointerEvents: "none",
            }} />
          </div>
        ))}

        {/* ════ SCENE 1 — We Design. ════ */}
        <div ref={scene1ContentRef} style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 40px", pointerEvents: "none",
          willChange: "transform, opacity",
        }}>
          <div style={{ pointerEvents: "auto" }}>
            <SceneWord
              label="Concord Interior Concepts"
              word="We Design."
              sub="Developing intelligent concepts rooted in functionality and aesthetics — every line serves a function."
            />
          </div>
        </div>

        {/* ════ SCENE 2 — We Build. ════ */}
        <div ref={scene2ContentRef} style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 40px", pointerEvents: "none",
          willChange: "transform, opacity",
        }}>
          <div style={{ pointerEvents: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
            <SceneWord
              label="Architecture & Construction"
              word="We Build."
              sub="Building enduring spaces with precision — construction, interiors and landscape implementation, delivered as one."
            />
            <ScrollIndicator />
          </div>
        </div>

        {/* ════ SCENE 3 — We Transform. ════ */}
        <div ref={scene3ContentRef} style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 40px", pointerEvents: "none",
          willChange: "transform, opacity",
        }}>
          <div style={{ pointerEvents: "auto" }}>
            <SceneWord
              label="A Design, Build & Development Consultancy"
              word="We Transform."
              sub="Transforming land, structures, interiors and environments into meaningful, sustainable, and future-ready spaces."
            />
          </div>
        </div>

        {/* ════ SCENE 4 — Brand statement ════ */}
        <div ref={scene4ContentRef} style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 32px", pointerEvents: "none",
          willChange: "transform, opacity",
        }}>
          <div ref={counterTrigger} style={{ textAlign: "center", maxWidth: 1020, color: "white", pointerEvents: "auto" }}>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11, letterSpacing: "0.4em",
              textTransform: "uppercase", color: BEIGE,
              margin: "0 0 24px", fontWeight: 600,
              textShadow: "0 2px 12px rgba(0,0,0,0.95)",
            }}>A Design, Build & Development Consultancy</p>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 500, lineHeight: 1.08,
              color: "white", margin: "0 0 26px",
              textShadow: "0 6px 32px rgba(0,0,0,0.95), 0 2px 10px rgba(0,0,0,0.85)",
            }}>
              Environments that inspire living,<br />
              <em style={{ fontStyle: "italic", color: BEIGE, textShadow: "0 6px 32px rgba(0,0,0,0.9)" }}>
                enable business, and enrich communities.
              </em>
            </h2>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16, lineHeight: 1.8,
              color: "white", margin: "0 auto 38px",
              maxWidth: 640,
              textShadow: "0 2px 14px rgba(0,0,0,0.95)",
            }}>
              Architecture, Construction, Interiors, Landscape Development and Strategic Planning —
              brought together through one integrated vision.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 46 }}>
              <Link to="/portfolio" style={{
                textDecoration: "none", background: FOREST, color: IVORY,
                padding: "16px 38px", borderRadius: 999, fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                transition: "background 0.3s",
                boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1C332A")}
                onMouseLeave={(e) => (e.currentTarget.style.background = FOREST)}
              >Discover Our Work</Link>
              <Link to="/contact" style={{
                textDecoration: "none", border: "1px solid rgba(245,240,235,0.7)", color: IVORY,
                padding: "16px 38px", borderRadius: 999, fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                transition: "border-color 0.3s, background 0.3s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = BEIGE; e.currentTarget.style.background = "rgba(251,179,22,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(245,240,235,0.7)"; e.currentTarget.style.background = "transparent"; }}
              >Book a Consultation</Link>
            </div>
            {/* Counters */}
            <div style={{ display: "flex", gap: 60, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { end: stats?.totalProjects || 50, suffix: "+", label: "Projects Delivered" },
                { end: stats?.yearsExperience || (new Date().getFullYear() - 2020), suffix: "+", label: "Years of Practice" },
                { end: 6, suffix: "", label: "Disciplines, One Vision" },
              ].map((c) => (
                <div key={c.label} style={{ textAlign: "center" }}>
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 48, fontWeight: 600, lineHeight: 1,
                    color: BEIGE, margin: 0,
                    textShadow: "0 4px 20px rgba(0,0,0,0.95)",
                  }}>
                    {counterInView ? <CountUp end={c.end} duration={2.4} suffix={c.suffix} /> : `0${c.suffix}`}
                  </p>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10, letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,235,0.92)", margin: "10px 0 0",
                    fontWeight: 600,
                    textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                  }}>{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ SCENE 5 — slide-up preview panel ════ */}
        <div ref={scene5ContentRef} style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          height: "100%",
          background: `linear-gradient(180deg, rgba(24,24,21,0.0) 0%, ${INK} 35%, ${INK} 100%)`,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          padding: "0 40px 80px",
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}>
          <div style={{ maxWidth: 1280, width: "100%", pointerEvents: "auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11, letterSpacing: "0.36em",
                textTransform: "uppercase", color: BEIGE,
                margin: "0 0 14px", fontWeight: 600,
              }}>Begin the Journey</p>
              <h3 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(28px, 3.4vw, 44px)",
                fontWeight: 500, lineHeight: 1.1,
                color: "white", margin: 0,
              }}>
                Where would you like to <em style={{ fontStyle: "italic", color: BEIGE }}>begin?</em>
              </h3>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 28,
            }}>
              {[
                {
                  to: "/portfolio",
                  label: "Our Work",
                  title: "Explore Projects",
                  desc: "Residential, commercial, hospitality and landscape projects — from concept to reality.",
                  img: PREVIEW_THUMBS.portfolio,
                },
                {
                  to: "/services",
                  label: "What We Create",
                  title: "Our Ecosystem",
                  desc: "Design & development, construction, landscape, interiors, and smart living.",
                  img: PREVIEW_THUMBS.services,
                },
                {
                  to: "/about",
                  label: "Our Story",
                  title: "About Concord",
                  desc: "A multidisciplinary studio designing experiences and building possibilities.",
                  img: PREVIEW_THUMBS.about,
                },
              ].map((card) => (
                <PreviewCard key={card.to} {...card} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right-edge progress bar ── */}
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: 2, background: "rgba(245,240,235,0.08)", pointerEvents: "none",
        }}>
          <div
            ref={progressBarRef}
            style={{
              width: "100%", height: "100%",
              background: BEIGE,
              transformOrigin: "top",
              transform: "scaleY(0)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Preview card ─────────────────────────────── */
function PreviewCard({ to, label, title, desc, img }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none", display: "block",
        background: "rgba(245,240,235,0.08)",
        backdropFilter: "blur(16px) saturate(140%)",
        WebkitBackdropFilter: "blur(16px) saturate(140%)",
        border: `1px solid ${hovered ? BEIGE : "rgba(245,240,235,0.16)"}`,
        borderRadius: 20,
        overflow: "hidden",
        transition: "border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
        <img
          src={img}
          alt={title}
          loading="lazy"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.6s ease",
            display: "block",
          }}
        />
      </div>
      <div style={{ padding: "22px 26px 24px" }}>
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 10, letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: BEIGE, margin: "0 0 10px", fontWeight: 600,
        }}>{label}</p>
        <h4 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: 26, fontWeight: 500,
          color: hovered ? BEIGE : "white",
          margin: "0 0 10px", lineHeight: 1.15,
          transition: "color 0.3s ease",
        }}>{title}</h4>
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 13.5, lineHeight: 1.7,
          color: "rgba(245,240,235,0.72)",
          margin: "0 0 16px",
        }}>{desc}</p>
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 10, letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: BEIGE,
          display: "inline-flex", alignItems: "center", gap: 8,
        }}>
          Explore <span style={{
            display: "inline-block",
            transform: hovered ? "translateX(6px)" : "translateX(0)",
            transition: "transform 0.35s ease",
          }}>→</span>
        </span>
      </div>
    </Link>
  );
}
