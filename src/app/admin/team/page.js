"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE, IMG_HOST } from "@/libs/api";


export default function AdminTeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/team/list.php`);
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      setError("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Delete "${name}"? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE}/team/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      alert("Delete failed — check the console");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ height: 20, width: 120, background: "#f0f0f0", borderRadius: 6, marginBottom: 28 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ aspectRatio: "4 / 5", background: "#f4f4f5", borderRadius: 12 }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div style={{ fontSize: 13, color: "#b91c1c" }}>{error}</div>;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#111" }}>Team</h1>
          <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
            {members.length} {members.length === 1 ? "member" : "members"}
          </p>
        </div>
        <Link href="/admin/team/new" style={addBtnStyle}>+ Add Team Member</Link>
      </div>

      {members.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px dashed #d4d4d8",
            borderRadius: 12,
            padding: "64px 24px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 14, color: "#999", marginBottom: 16 }}>No team members yet.</p>
          <Link href="/admin/team/new" style={addBtnStyle}>+ Add your first team member</Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {members.map((m) => {
            const imgUrl = m.image ? `${IMG_HOST}${m.image}` : null;
            const isDeleting = deletingId === m.id;
            return (
              <div
                key={m.id}
                className="team-card"
                style={{
                  position: "relative",
                  borderRadius: 14,
                  overflow: "hidden",
                  aspectRatio: "4 / 5",
                  background: "#111",
                  opacity: isDeleting ? 0.4 : 1,
                  transition: "opacity 0.2s ease, transform 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                <style>{`
                  .team-card { box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
                  .team-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.16); }
                  .team-card .team-card-img { transition: transform 0.6s cubic-bezier(0.23,1,0.32,1); }
                  .team-card:hover .team-card-img { transform: scale(1.06); }
                  .team-card .team-card-overlay { opacity: 1; }
                  .team-card .team-card-actions { opacity: 0; transform: translateY(6px); transition: opacity 0.25s ease, transform 0.25s ease; }
                  .team-card:hover .team-card-actions { opacity: 1; transform: translateY(0); }
                `}</style>

                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={m.name}
                    className="team-card-img"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, #2a2a2a, #111)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.2)",
                      fontSize: 32,
                      fontWeight: 600,
                    }}
                  >
                    {m.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}

                {/* Bottom gradient + info */}
                <div
                  className="team-card-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 75%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>{m.designation}</div>

                  <div className="team-card-actions" style={{ display: "flex", gap: 8 }}>
                    <Link
                      href={`/admin/team/${m.id}`}
                      style={{
                        flex: 1,
                        textAlign: "center",
                        fontSize: 12.5,
                        fontWeight: 500,
                        color: "#111",
                        background: "#fff",
                        borderRadius: 7,
                        padding: "7px 0",
                        textDecoration: "none",
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(m.id, m.name)}
                      disabled={isDeleting}
                      style={{
                        flex: 1,
                        fontSize: 12.5,
                        fontWeight: 500,
                        color: "#fff",
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: 7,
                        padding: "7px 0",
                        cursor: isDeleting ? "default" : "pointer",
                      }}
                    >
                      {isDeleting ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const addBtnStyle = {
  padding: "10px 18px",
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  borderRadius: 8,
  fontSize: 13.5,
  fontWeight: 500,
};