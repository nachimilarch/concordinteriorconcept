import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import api from "../api/axios";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: "⊞", end: true },
  { to: "/admin/projects", label: "Projects", icon: "◫" },
  { to: "/admin/categories", label: "Categories", icon: "⊟" },
  { to: "/admin/services", label: "Services", icon: "◈" },
  { to: "/admin/enquiries", label: "Enquiries", icon: "◻", badge: true },
  { to: "/admin/settings", label: "Settings", icon: "⚙" },
];

export default function AdminLayout() {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function fetchUnread() {
    try {
      const res = await api.get("/enquiries?status=unread");
      setUnread(res.data.length);
    } catch { /* silent */ }
  }

  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 60000);
    return () => clearInterval(interval);
  }, []);

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  const sidebar = (
    <aside style={{
      width: 220, background: "#1A1A2E", display: "flex",
      flexDirection: "column", flexShrink: 0, minHeight: "100vh",
    }}>
      <div style={{ padding: "28px 24px 22px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#FBB316", fontSize: 17, letterSpacing: "0.22em" }}>
          CONCORDE
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.14em", marginTop: 3 }}>
          ADMIN PANEL
        </p>
      </div>

      <nav style={{ flex: 1, padding: "10px 0" }}>
        {NAV.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: 10,
              padding: "11px 24px", textDecoration: "none",
              fontSize: 13, letterSpacing: "0.04em",
              color: isActive ? "#FBB316" : "rgba(255,255,255,0.55)",
              background: isActive ? "rgba(251,179,22,0.08)" : "transparent",
              borderLeft: isActive ? "2px solid #FBB316" : "2px solid transparent",
              transition: "all 0.18s ease", position: "relative",
            })}
          >
            <span style={{ fontSize: 13, opacity: 0.8 }}>{link.icon}</span>
            {link.label}
            {link.badge && unread > 0 && (
              <span style={{
                marginLeft: "auto", background: "#FBB316", color: "#1A1A2E",
                fontSize: 10, fontWeight: 700, borderRadius: "10px",
                padding: "1px 7px", minWidth: 18, textAlign: "center",
              }}>
                {unread > 99 ? "99+" : unread}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, letterSpacing: "0.08em", marginBottom: 11 }}>
          {admin || "admin"}
        </p>
        <button
          onClick={handleLogout}
          style={{
            width: "100%", background: "transparent", color: "#FBB316",
            border: "1px solid rgba(251,179,22,0.4)", padding: "8px 0",
            cursor: "pointer", fontSize: 10, letterSpacing: "0.18em",
            textTransform: "uppercase", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.background = "#FBB316"; e.target.style.color = "#1A1A2E"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#FBB316"; }}
        >
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      {/* Desktop sidebar */}
      <div style={{ display: "none" }} className="admin-sidebar-desktop">
        {sidebar}
      </div>

      {/* Mobile overlay sidebar */}
      {mobileOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100 }}
          onClick={() => setMobileOpen(false)}
        >
          <div onClick={e => e.stopPropagation()} style={{ width: 220, height: "100%" }}>
            {sidebar}
          </div>
        </div>
      )}

      {/* Always-visible sidebar for desktop */}
      <div style={{ display: "flex", flexShrink: 0 }}>
        {sidebar}
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Mobile header */}
        <header style={{
          display: "none", padding: "14px 20px",
          background: "#1A1A2E", alignItems: "center", gap: 14,
        }} className="admin-mobile-header">
          <button
            onClick={() => setMobileOpen(true)}
            style={{ background: "none", border: "none", color: "#FBB316", fontSize: 22, cursor: "pointer" }}
          >
            ☰
          </button>
          <span style={{ fontFamily: "Cormorant Garamond, serif", color: "#FBB316", fontSize: 16, letterSpacing: "0.2em" }}>
            CONCORDE
          </span>
        </header>

        <main style={{
          flex: 1, background: "#F5F0EB",
          padding: "36px 40px", overflowY: "auto",
        }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-mobile-header { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
