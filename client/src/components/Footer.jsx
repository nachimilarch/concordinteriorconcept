import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoMark from "../assets/logo-mark.png";
import api from "../api/axios";

const INK = "#181815";
const IVORY = "#F5F0EB";
const GOLD = "#FBB316";
const STEEL = "#778088";

export default function Footer() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    api.get("/settings").then(r => setSettings(r.data)).catch(() => {});
  }, []);

  const address = settings.company_address || settings.address || "";
  const phone = settings.company_phone || settings.phone || "";
  const email = settings.company_email || settings.email || "";
  const whatsapp = settings.whatsapp_number || settings.whatsapp || "";
  const companyTagline = settings.company_tagline || "A Design, Build & Development Consultancy";
  const brandTagline = settings.footer_message || "Designing Spaces. Building Experiences. Creating Sustainable Futures.";

  const socials = [
    settings.instagram && { label: "Instagram", href: settings.instagram },
    settings.facebook && { label: "Facebook", href: settings.facebook },
    settings.linkedin && { label: "LinkedIn", href: settings.linkedin },
    settings.youtube && { label: "YouTube", href: settings.youtube },
    settings.twitter && { label: "Twitter / X", href: settings.twitter },
  ].filter(Boolean);

  const linkStyle = {
    display: "block",
    color: "rgba(245,240,235,0.82)",
    textDecoration: "none",
    fontSize: 13.5,
    letterSpacing: "0.04em",
    marginBottom: 12,
    transition: "color 0.2s",
  };

  const headingStyle = {
    fontSize: 10.5,
    letterSpacing: "0.24em",
    color: GOLD,
    textTransform: "uppercase",
    marginBottom: 22,
    fontWeight: 700,
  };

  return (
    <footer style={{
      /* Deep ink-forest gradient — high contrast for every text color used below */
      background: "linear-gradient(165deg, #191D1A 0%, #141815 55%, #101311 100%)",
      color: IVORY,
      fontFamily: "Inter, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Beige hairline top */}
      <div style={{ borderTop: "1px solid rgba(251,179,22,0.4)" }} />

      {/* Faint blueprint grid backdrop */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(251,179,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(251,179,22,0.04) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "64px 40px 44px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 48,
        borderBottom: "1px solid rgba(245,240,235,0.12)",
        position: "relative", zIndex: 1,
      }}>

        {/* Brand — mark + wordmark (matches navbar) */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <span style={{
              width: 58, height: 58, borderRadius: "50%",
              background: `linear-gradient(145deg, #838B93 0%, ${STEEL} 55%, #666E76 100%)`,
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 6px 18px rgba(0,0,0,0.35), inset 0 1px 2px rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <img src={logoMark} alt="Concord Interior Concepts" style={{ width: "72%", height: "72%", objectFit: "contain" }} />
            </span>
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 600, fontSize: 21, letterSpacing: "0.05em", color: IVORY, textTransform: "uppercase" }}>Concord</span>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 600, fontSize: 21, letterSpacing: "0.05em", color: IVORY, textTransform: "uppercase" }}>Interior Concepts</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginTop: 5 }}>
                Constructions&nbsp;|&nbsp;Interiors&nbsp;|&nbsp;Consultants
              </span>
            </span>
          </div>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 15, fontStyle: "italic", color: "rgba(252,201,78,0.95)", margin: "0 0 8px", lineHeight: 1.55, maxWidth: 300 }}>{brandTagline}</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.14em", color: "rgba(245,240,235,0.6)", margin: "0 0 16px", textTransform: "uppercase" }}>{companyTagline}</p>
          {socials.length > 0 && (
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              {socials.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.12em",
                    color: "rgba(245,240,235,0.75)", textDecoration: "none", textTransform: "uppercase",
                    padding: "7px 14px", borderRadius: 999,
                    border: "1px solid rgba(245,240,235,0.2)",
                    background: "rgba(245,240,235,0.05)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = "rgba(251,179,22,0.6)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(245,240,235,0.75)"; e.currentTarget.style.borderColor = "rgba(245,240,235,0.2)"; }}
                >{label}</a>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div>
          <p style={headingStyle}>Quick Links</p>
          {[
            { to: "/portfolio", label: "Our Portfolio" },
            { to: "/services", label: "Services" },
            { to: "/about", label: "About Us" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={linkStyle}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,235,0.82)"}
            >{label}</Link>
          ))}
        </div>

        {/* Services — six disciplines */}
        <div>
          <p style={headingStyle}>Services</p>
          {["Architecture", "Construction", "Landscape Architecture", "Interior Design", "Smart Automation", "Development Consultancy"].map(s => (
            <Link
              key={s}
              to="/services"
              style={linkStyle}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,235,0.82)"}
            >{s}</Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p style={headingStyle}>Contact</p>
          {[
            address && { icon: "📍", text: address },
            phone && { icon: "📞", text: phone, href: `tel:${phone.replace(/\s/g, "")}` },
            email && { icon: "✉️", text: email, href: `mailto:${email}` },
          ].filter(Boolean).map(({ icon, text, href }) => (
            <p key={text} style={{ color: "rgba(245,240,235,0.82)", fontSize: 13.5, marginBottom: 12, display: "flex", gap: 8, alignItems: "flex-start", lineHeight: 1.6 }}>
              <span>{icon}</span>
              {href
                ? <a href={href} style={{ color: "rgba(245,240,235,0.82)", textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color = GOLD} onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,235,0.82)"}>{text}</a>
                : <span>{text}</span>
              }
            </p>
          ))}
          {whatsapp && (
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 8, background: "#25D366", color: "white", padding: "9px 18px", borderRadius: 999, textDecoration: "none", fontSize: 11, letterSpacing: "0.1em", fontWeight: 600, boxShadow: "0 4px 16px rgba(37,211,102,0.3)" }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp Us
            </a>
          )}
        </div>
      </div>

      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "22px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
        position: "relative", zIndex: 1,
      }}>
        <p style={{ color: "rgba(245,240,235,0.55)", fontSize: 12, margin: 0 }}>© {new Date().getFullYear()} Concord Interior Concepts. All rights reserved.</p>
        <p style={{ color: GOLD, fontSize: 13.5, letterSpacing: "0.08em", fontStyle: "italic", fontFamily: "Cormorant Garamond, serif", margin: 0 }}>Designing Spaces. Building Experiences. Creating Sustainable Futures.</p>
      </div>
    </footer>
  );
}
