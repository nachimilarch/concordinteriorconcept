import { Link } from "react-router-dom";
import logoLight from "../assets/logo-light.png";

const NAVY = "#2F3142";
const GOLD = "#C8A75B";

export default function Footer() {
  return (
    <footer style={{
      background: "#F4F6F8",
      color: NAVY,
      fontFamily: "Inter, sans-serif",
    }}>
      {/* Top section */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "56px 40px 40px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 48,
        borderBottom: "1px solid rgba(47,49,66,0.1)",   /* ← navy tint border */
      }}>

        {/* Brand */}
        <div>
          <img
            src={logoLight}
            alt="CIC Logo"
            style={{
              height: "auto",
              width: 480,          /* fixed width — safe for a wide logo */
              maxWidth: "100%",
              objectFit: "contain",
              marginBottom: 16,
              opacity: 0.95,
            }}
          />
        </div>

        {/* Quick Links */}
        <div>
          <p style={{
            fontSize: 10, letterSpacing: "0.2em", color: GOLD,
            textTransform: "uppercase", marginBottom: 20,
          }}>Quick Links</p>
          {[
            { to: "/portfolio", label: "Our Portfolio" },
            { to: "/services", label: "Services" },
            { to: "/about", label: "About Us" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              display: "block",
              color: NAVY,                              /* ← navy */
              textDecoration: "none", fontSize: 12,
              letterSpacing: "0.06em", marginBottom: 12,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = NAVY}
            >{label}</Link>
          ))}
        </div>

        {/* Services */}
        <div>
          <p style={{
            fontSize: 10, letterSpacing: "0.2em", color: GOLD,
            textTransform: "uppercase", marginBottom: 20,
          }}>Services</p>
          {["Interior Design", "Construction", "Renovation", "Consultation"].map(s => (
            <p key={s} style={{
              color: NAVY,                              /* ← navy */
              fontSize: 12, letterSpacing: "0.06em", marginBottom: 12,
            }}>{s}</p>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p style={{
            fontSize: 10, letterSpacing: "0.2em", color: GOLD,
            textTransform: "uppercase", marginBottom: 20,
          }}>Contact</p>
          {[
            { icon: "📍", text: "Secunderabad, Hyderabad, Telangana" },
            { icon: "📞", text: "+91 98765 43210" },
            { icon: "✉️", text: "hello@concordinteriors.com" },
          ].map(({ icon, text }) => (
            <p key={text} style={{
              color: NAVY,                              /* ← navy */
              fontSize: 12, marginBottom: 12,
              display: "flex", gap: 8, alignItems: "flex-start",
            }}>
              <span>{icon}</span>{text}
            </p>
          ))}

          {/* WhatsApp CTA */}
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginTop: 8, background: "#25D366", color: "white",
              padding: "8px 16px", textDecoration: "none",
              fontSize: 11, letterSpacing: "0.1em",
            }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "20px 40px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <p style={{ color: NAVY, fontSize: 11 }}>           {/* ← navy */}
          © 2026 Concord Interior Concepts. All rights reserved.
        </p>
        <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.1em" }}>  {/* ← gold accent */}
          CONSTRUCTIONS · INTERIORS · CONSULTANTS
        </p>
      </div>
    </footer>
  );
}