import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

/* ── Brand tokens ─────────────────────────────── */
const INK = "#181815";
const IVORY = "#F5F0EB";
const BEIGE = "#FBB316";
const BEIGE_LIGHT = "#FCC94E";
const FOREST_DEEP = "#1C332A";

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * The single, site-wide "Let's Connect" closing banner.
 * Used on Home, Services, About and Portfolio so the final
 * moment of every page is identical and unmistakably Concord.
 */
export default function ConnectCTA() {
  return (
    <section style={{
      position: "relative",
      padding: "140px 40px",
      overflow: "hidden",
    }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/images/brand/cta-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }} />

      {/* Dark overlay for legibility */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(24,24,21,0.82) 0%, rgba(28,51,42,0.78) 100%)",
      }} />

      {/* Editorial hairlines top and bottom */}
      <div style={{ position: "absolute", top: 36, left: 40, right: 40, borderTop: "1px solid rgba(251,179,22,0.3)", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: 36, left: 40, right: 40, borderTop: "1px solid rgba(251,179,22,0.3)", zIndex: 1 }} />

      <div style={{
        maxWidth: 960, margin: "0 auto", textAlign: "center",
        position: "relative", zIndex: 1,
        background: "rgba(245,240,235,0.06)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        border: "1px solid rgba(251,179,22,0.28)",
        borderRadius: 32,
        padding: "clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}>
        <FadeIn>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11, letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: BEIGE, fontWeight: 600,
            margin: "0 0 20px",
          }}>Begin Your Project</p>

          <h2 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(48px, 6.5vw, 96px)",
            fontWeight: 500, lineHeight: 1.02,
            color: IVORY, margin: "0 0 18px",
          }}>
            Let&rsquo;s <em style={{ fontStyle: "italic", color: BEIGE }}>Connect</em>
          </h2>

          <p style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(19px, 2.1vw, 27px)",
            fontStyle: "italic", lineHeight: 1.5,
            color: "rgba(245,240,235,0.9)",
            margin: "0 0 26px",
          }}>
            Designing Spaces. Building Experiences. Creating Sustainable Futures.
          </p>

          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 15.5, lineHeight: 1.85,
            color: "rgba(245,240,235,0.75)",
            margin: "0 auto 44px", maxWidth: 560,
          }}>
            Whether you hold a plot of land, a building in need of new life, or the first
            sketch of an idea — begin with a conversation. We listen first, and design second.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/contact"
              style={{
                textDecoration: "none", background: BEIGE, color: INK,
                padding: "17px 46px", borderRadius: 999, fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                fontWeight: 600, transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = BEIGE_LIGHT)}
              onMouseLeave={(e) => (e.currentTarget.style.background = BEIGE)}
            >Book a Consultation</Link>
            <Link
              to="/portfolio"
              style={{
                textDecoration: "none",
                border: "1px solid rgba(245,240,235,0.5)", color: IVORY,
                padding: "17px 46px", borderRadius: 999, fontFamily: "Inter, sans-serif",
                fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = BEIGE)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(245,240,235,0.5)")}
            >Discover Our Work</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
