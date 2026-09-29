"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(searchParams.get("redirect") || "/admin");
        router.refresh();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong — check your connection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrapStyle}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: "#111", marginBottom: 4 }}>Mountain Muse Admin</h1>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Sign in to manage the site</p>
        {error && <div style={errorBoxStyle}>{error}</div>}
        <label style={{ display: "block", marginBottom: 14 }}>
          <span style={labelStyle}>Username</span>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus style={inputStyle} />
        </label>
        <label style={{ display: "block", marginBottom: 22 }}>
          <span style={labelStyle}>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
        </label>
        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

const wrapStyle = { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f4f5", padding: 20 };
const cardStyle = { width: "100%", maxWidth: 380, background: "#fff", border: "1px solid #e4e4e7", borderRadius: 12, padding: "32px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" };
const labelStyle = { fontSize: 12.5, fontWeight: 500, color: "#333", display: "block", marginBottom: 6 };
const inputStyle = { width: "100%", padding: "10px 12px", fontSize: 13.5, border: "1px solid #d4d4d8", borderRadius: 8, outline: "none", color: "#111", background: "#fff", boxSizing: "border-box" };
const btnStyle = { width: "100%", padding: "11px 0", background: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" };
const errorBoxStyle = { background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 18 };