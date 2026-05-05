import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logoLight from "../assets/logo-light.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const NAVY = "#2F3142";
const GOLD = "#C8A75B";
const GOLD_D = "#A88A3D";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,

      /* ── Glass effect — always on, stronger on scroll ── */
      background: scrolled
        ? "rgba(255, 255, 255, 0.72)"
        : "rgba(255, 255, 255, 0.38)",
      backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(10px) saturate(140%)",
      WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(10px) saturate(140%)",
      borderBottom: scrolled
        ? "1px solid rgba(200,167,91,0.25)"
        : "1px solid rgba(255,255,255,0.3)",
      boxShadow: scrolled
        ? "0 4px 32px rgba(47,49,66,0.10)"
        : "0 2px 12px rgba(47,49,66,0.04)",
      transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <div style={{
        maxWidth: 1320, margin: "0 auto",
        padding: "0 40px",
        height: scrolled ? 76 : 96,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        transition: "height 0.4s ease",
      }}>

        {/* ── Logo ── */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src={logoLight}
            alt="Concord Interior Concepts"
            style={{
              width: scrolled ? 200 : 240,
              height: "auto",
              objectFit: "contain",
              transition: "width 0.4s ease",
              filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.12))",
            }}
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <nav style={{ display: "flex", alignItems: "center", gap: 34 }}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === "/"}
              style={({ isActive }) => ({
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
                fontSize: 11, letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: isActive ? GOLD : NAVY,
                borderBottom: isActive ? `1px solid ${GOLD}` : "1px solid transparent",
                paddingBottom: 3,
                transition: "color 0.3s, border-color 0.3s",
              })}
            >{label}</NavLink>
          ))}

          <Link to="/contact"
            style={{
              textDecoration: "none",
              background: GOLD,
              color: "white",
              padding: "10px 24px",
              fontFamily: "Inter, sans-serif",
              fontSize: 10, letterSpacing: "0.24em",
              textTransform: "uppercase",
              transition: "background 0.3s",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 12px rgba(200,167,91,0.35)",
            }}
            onMouseEnter={e => e.currentTarget.style.background = GOLD_D}
            onMouseLeave={e => e.currentTarget.style.background = GOLD}
          >Get a Quote</Link>
        </nav>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          className="mobile-menu-btn"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 8, display: "none",
            flexDirection: "column", gap: 5,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 26, height: 1.5,
              background: NAVY,
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translate(4.8px, 4.8px)"
                  : i === 1 ? "scaleX(0)"
                    : "rotate(-45deg) translate(4.8px, -4.8px)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
              transition: "all 0.3s ease",
            }} />
          ))}
        </button>
      </div>

      {/* ── Mobile Dropdown ── */}
      <div style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        maxHeight: menuOpen ? 420 : 0,
        overflow: "hidden",
        transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)",
        borderTop: menuOpen ? "1px solid rgba(200,167,91,0.2)" : "none",
      }}>
        <nav
          className="mobile-nav"
          style={{ padding: "24px 40px 32px", display: "flex", flexDirection: "column", gap: 22 }}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === "/"}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
                fontSize: 12, letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: isActive ? GOLD : NAVY,
              })}
            >{label}</NavLink>
          ))}
          <Link to="/contact" onClick={() => setMenuOpen(false)} style={{
            textDecoration: "none",
            background: GOLD, color: "white",
            padding: "11px 26px", width: "fit-content",
            fontFamily: "Inter, sans-serif",
            fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
            boxShadow: "0 2px 12px rgba(200,167,91,0.35)",
          }}>Get a Quote</Link>
        </nav>
      </div>
    </header>
  );
}