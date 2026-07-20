import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) { setError("Username is required."); return; }
    if (!password.trim()) { setError("Password is required."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password, remember });
      login(res.data.token, res.data.username);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#1A1A2E",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Inter, sans-serif",
    }}>
      <form onSubmit={handleSubmit} noValidate style={{
        background: "#F5F0EB", padding: "52px 44px",
        width: 380, boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
      }}>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, color: "#1A1A2E", letterSpacing: "0.25em", marginBottom: 2 }}>
          CONCORDE
        </p>
        <p style={{ fontSize: 10, color: "#999", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 40 }}>
          Interior Concepts · Admin
        </p>

        {error && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca",
            padding: "11px 14px", marginBottom: 24,
            fontSize: 13, color: "#dc2626", lineHeight: 1.5,
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#666", marginBottom: 7 }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            style={{
              display: "block", width: "100%", padding: "11px 13px",
              border: "1px solid #ddd", background: "white",
              fontSize: 14, outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box",
              transition: "border-color 0.15s",
            }}
            onFocus={e => { e.target.style.borderColor = "#FBB316"; }}
            onBlur={e => { e.target.style.borderColor = "#ddd"; }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#666", marginBottom: 7 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              display: "block", width: "100%", padding: "11px 13px",
              border: "1px solid #ddd", background: "white",
              fontSize: 14, outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box",
              transition: "border-color 0.15s",
            }}
            onFocus={e => { e.target.style.borderColor = "#FBB316"; }}
            onBlur={e => { e.target.style.borderColor = "#ddd"; }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 32 }}>
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
            style={{ accentColor: "#FBB316", width: 14, height: 14, cursor: "pointer" }}
          />
          <label htmlFor="remember" style={{ fontSize: 12, color: "#666", cursor: "pointer" }}>
            Remember me for 30 days
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%", background: loading ? "#b8935a" : "#FBB316",
            color: "white", border: "none", padding: "14px 0",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase",
            fontFamily: "Inter, sans-serif", transition: "background 0.2s ease",
          }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
