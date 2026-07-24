import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoMark from "../assets/logo-mark.png";
import api from "../api/axios";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
];

const INK = "#181815";
const INK_SOFT = "#22221E";
const GOLD = "#FBB316";
const GOLD_D = "#DE9E08";
const FOREST = "#2C4A3B";
const STEEL = "#778088";
const IVORY = "#F5F0EB";

function useNavbarMode() {
  const { pathname } = useLocation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  if (!isHome) {
    return { mode: "glass-light", scrolled: scrollY > 80 };
  }

  const journeyEnd =
    typeof window !== "undefined" ? window.innerHeight * 5.5 : 4000;

  if (scrollY < journeyEnd - 200) {
    return { mode: "transparent", scrolled: scrollY > 50 };
  }

  return { mode: "solid-dark", scrolled: true };
}

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyName, setCompanyName] = useState("Concord Interior Concepts");
  const { mode, scrolled } = useNavbarMode();

  useEffect(() => {
    api
      .get("/settings")
      .then((r) => {
        if (r.data?.company_name) setCompanyName(r.data.company_name);
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const onDark = mode === "transparent" || mode === "solid-dark";

  /* Bar height — the circular mark matches this exactly */
  const BAR_H = !scrolled && mode === "transparent" ? 84 : 68;

  /* Frosted glass capsule per mode */
  const capsuleBg = onDark
    ? mode === "solid-dark"
      ? "rgba(24,24,21,0.62)"
      : scrolled
        ? "rgba(24,24,21,0.48)"
        : "rgba(24,24,21,0.32)"
    : scrolled
      ? "rgba(255,255,255,0.68)"
      : "rgba(255,255,255,0.52)";

  const capsuleBorder = onDark
    ? "1px solid rgba(245,240,235,0.16)"
    : "1px solid rgba(255,255,255,0.65)";

  const capsuleShadow = onDark
    ? "0 4px 24px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08)"
    : "0 4px 20px rgba(24,24,21,0.07), inset 0 1px 0 rgba(255,255,255,0.6)";

  const wordmarkColor = onDark ? IVORY : INK_SOFT;
  const linkColorBase = onDark ? "rgba(245,240,235,0.92)" : INK_SOFT;
  const linkColorActive = onDark ? GOLD : FOREST;
  const hamburgerColor = onDark ? "white" : INK_SOFT;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 14,
          left: 16,
          right: 16,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1320,
            pointerEvents: "auto",
          }}
        >
          {/* ── Frosted glass capsule ── */}
          <div
            style={{
              height: BAR_H,
              borderRadius: 999,
              background: capsuleBg,
              backdropFilter: "blur(22px) saturate(170%)",
              WebkitBackdropFilter: "blur(22px) saturate(170%)",
              border: capsuleBorder,
              boxShadow: capsuleShadow,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: 12,
              transition:
                "height 0.4s ease, background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
            }}
          >
            {/* ── Logo: steel circle mark + separate wordmark ── */}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexShrink: 0,
                height: "100%",
              }}
            >
              {/* Circular steel-grey plate — exactly navbar height */}
              <span
                style={{
                  width: BAR_H,
                  height: BAR_H,
                  borderRadius: "50%",
                  background: `linear-gradient(145deg, #838B93 0%, ${STEEL} 55%, #666E76 100%)`,
                  border: "1px solid rgba(255,255,255,0.35)",
                  boxShadow:
                    "0 6px 18px rgba(0,0,0,0.28), inset 0 1px 2px rgba(255,255,255,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "width 0.4s ease, height 0.4s ease",
                }}
              >
                <img
                  src={logoMark}
                  alt={companyName}
                  className="nav-mark-img"
                  style={{
                    width: "72%",
                    height: "72%",
                    objectFit: "contain",
                    display: "block",
                    filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))",
                  }}
                />
              </span>

              {/* Wordmark — real text, larger */}
              <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span
                  className="nav-wordmark"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: 600,
                    fontSize: !scrolled && mode === "transparent" ? 25 : 22,
                    letterSpacing: "0.05em",
                    color: wordmarkColor,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    transition: "font-size 0.4s ease, color 0.4s ease",
                    textShadow: onDark ? "0 2px 10px rgba(0,0,0,0.45)" : "none",
                  }}
                >
                  Concord
                </span>
                <span
                  className="nav-wordmark"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: 600,
                    fontSize: !scrolled && mode === "transparent" ? 25 : 22,
                    letterSpacing: "0.05em",
                    color: wordmarkColor,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    transition: "font-size 0.4s ease, color 0.4s ease",
                    textShadow: onDark ? "0 2px 10px rgba(0,0,0,0.45)" : "none",
                  }}
                >
                  Interior Concepts
                </span>
                <span
                  className="nav-strapline"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 8.5,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: GOLD,
                    marginTop: 6,
                    whiteSpace: "nowrap",
                    textShadow: onDark ? "0 1px 6px rgba(0,0,0,0.5)" : "none",
                  }}
                >
                  Constructions&nbsp;|&nbsp;Interiors&nbsp;|&nbsp;Consultants
                </span>
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav
              className="navbar-desktop"
              style={{ display: "flex", alignItems: "center", gap: 30 }}
            >
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11.5,
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: isActive ? linkColorActive : linkColorBase,
                    background: isActive
                      ? onDark
                        ? "rgba(251,179,22,0.14)"
                        : "rgba(44,74,59,0.10)"
                      : "transparent",
                    padding: "9px 16px",
                    borderRadius: 999,
                    transition: "color 0.3s, background 0.3s",
                    textShadow:
                      mode === "transparent" ? "0 1px 6px rgba(0,0,0,0.4)" : "none",
                  })}
                >
                  {label}
                </NavLink>
              ))}

              <Link
                to="/contact"
                style={{
                  textDecoration: "none",
                  background: GOLD,
                  color: INK,
                  padding: "13px 28px",
                  borderRadius: 999,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  transition: "background 0.3s, box-shadow 0.3s",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 18px rgba(251,179,22,0.45)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FCC94E";
                  e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(251,179,22,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = GOLD;
                  e.currentTarget.style.boxShadow =
                    "0 4px 18px rgba(251,179,22,0.45)";
                }}
              >
                Get a Quote
              </Link>
            </nav>

            {/* ── Hamburger ── */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="mobile-menu-btn"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 12px",
                display: "none",
                flexDirection: "column",
                gap: 5,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 26,
                    height: 1.5,
                    background: hamburgerColor,
                    transform: menuOpen
                      ? i === 0
                        ? "rotate(45deg) translate(4.8px, 4.8px)"
                        : i === 1
                          ? "scaleX(0)"
                          : "rotate(-45deg) translate(4.8px, -4.8px)"
                      : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </button>
          </div>

          {/* ── Mobile dropdown — rounded glass card ── */}
          <div
            style={{
              marginTop: 10,
              borderRadius: 24,
              background: onDark
                ? "rgba(24,24,21,0.78)"
                : "rgba(255,255,255,0.82)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: menuOpen
                ? onDark
                  ? "1px solid rgba(245,240,235,0.16)"
                  : "1px solid rgba(255,255,255,0.7)"
                : "1px solid transparent",
              boxShadow: menuOpen ? "0 18px 48px rgba(0,0,0,0.3)" : "none",
              maxHeight: menuOpen ? 420 : 0,
              overflow: "hidden",
              transition:
                "max-height 0.45s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <nav
              className="mobile-nav"
              style={{
                padding: "26px 32px 30px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12.5,
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: isActive ? GOLD : onDark ? "white" : INK_SOFT,
                  })}
                >
                  {label}
                </NavLink>
              ))}

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  background: GOLD,
                  color: INK,
                  padding: "12px 28px",
                  borderRadius: 999,
                  width: "fit-content",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 16px rgba(251,179,22,0.4)",
                }}
              >
                Get a Quote
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <style>
        {`
          @media (max-width: 980px) {
            .navbar-desktop {
              display: none !important;
            }

            .mobile-menu-btn {
              display: flex !important;
            }
          }

          @media (min-width: 981px) {
            .mobile-nav {
              display: none !important;
            }
          }

          @media (max-width: 640px) {
            .nav-wordmark {
              font-size: 16px !important;
            }
            .nav-strapline {
              display: none !important;
            }
          }
        `}
      </style>
    </>
  );
}
