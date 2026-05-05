import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password });
      login(res.data.token, res.data.username);
      toast.success("Welcome back!");
      navigate("/admin");
    } catch (err) {
      toast.error(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Login failed. Check your credentials."
      );
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
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#F5F0EB", padding: "48px 40px",
          width: 360, boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* Logo */}
        <p style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: 22, color: "#1A1A2E",
          letterSpacing: "0.25em", marginBottom: 4,
        }}>CONCORDE</p>
        <p style={{
          fontSize: 11, color: "#999",
          letterSpacing: "0.18em", textTransform: "uppercase",
          marginBottom: 36,
        }}>Admin Login</p>

        {/* Username */}
        <div style={{ marginBottom: 18 }}>
          <label style={{
            display: "block", fontSize: 11,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#666", marginBottom: 6,
          }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={function(e) { setUsername(e.target.value); }}
            required
            style={{
              display: "block", width: "100%", padding: "10px 12px",
              border: "1px solid #ddd", background: "white",
              fontSize: 14, outline: "none",
              fontFamily: "Inter, sans-serif",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 28 }}>
          <label style={{
            display: "block", fontSize: 11,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#666", marginBottom: 6,
          }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={function(e) { setPassword(e.target.value); }}
            required
            style={{
              display: "block", width: "100%", padding: "10px 12px",
              border: "1px solid #ddd", background: "white",
              fontSize: 14, outline: "none",
              fontFamily: "Inter, sans-serif",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%", background: "#C9A96E", color: "white",
            border: "none", padding: "13px 0", cursor: "pointer",
            fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
