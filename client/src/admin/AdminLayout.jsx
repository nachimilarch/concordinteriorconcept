import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAVY = "#2F3142";
const GOLD = "#C8A75B";
const GOLD10 = "rgba(200,167,91,0.1)";
const GOLD30 = "rgba(200,167,91,0.3)";

const NAV_LINKS = [
  { to: "/admin", label: "Dashboard", icon: "⊞" },
  { to: "/admin/projects", label: "Projects", icon: "◫" },
  { to: "/admin/categories", label: "Categories", icon: "⊟" },
  { to: "/admin/services", label: "Services", icon: "◈" },
  { to: "/admin/enquiries", label: "Enquiries", icon: "◻" },
  { to: "/admin/settings", label: "Settings", icon: "⚙" },
];

export default function AdminLayout() {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>

      {/* Sidebar */}
      <aside style={{
        width: 220, background: "#1A1A2E", display: "flex",
        flexDirection: "column", flexShrink: 0,
      }}>
        {/* Brand */}
        <div style={{
          padding: "28px 24px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>
          <p style={{
            fontFamily: "Cormorant Garamond, serif",
            color: "#C9A96E", fontSize: 17, letterSpacing: "0.2em",
          }}>CONCORDE</p>
          <p style={{
            color: "rgba(255,255,255,0.35)", fontSize: 11,
            letterSpacing: "0.12em", marginTop: 3
          }}>ADMIN PANEL</p>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: "12px 0" }}>
          {NAV_LINKS.map(function (link) {
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/admin"}
                style={function ({ isActive }) {
                  return {
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "11px 24px", textDecoration: "none",
                    fontSize: 13, letterSpacing: "0.04em",
                    color: isActive ? "#C9A96E" : "rgba(255,255,255,0.55)",
                    background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                    borderLeft: isActive ? "2px solid #C9A96E" : "2px solid transparent",
                    transition: "all 0.2s ease",
                  };
                }}
              >
                <span style={{ fontSize: 14, opacity: 0.8 }}>{link.icon}</span>
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div style={{
          padding: "16px 24px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}>
          <p style={{
            color: "rgba(255,255,255,0.4)", fontSize: 11,
            letterSpacing: "0.08em", marginBottom: 10
          }}>
            {admin || "admin"}
          </p>
          <button
            onClick={handleLogout}
            style={{
              width: "100%", background: "#C9A96E", color: "white",
              border: "none", padding: "9px 0", cursor: "pointer",
              fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{
        flex: 1, background: "#F5F0EB",
        padding: "36px 40px", overflowY: "auto",
        minHeight: "100vh",
      }}>
        <Outlet />
      </main>
    </div>
  );
}
