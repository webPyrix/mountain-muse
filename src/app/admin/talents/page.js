"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE, IMG_HOST } from "@/libs/api";

export default function AdminTalentsPage() {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchTalents();
  }, []);

  const fetchTalents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/talents/list.php`);
      const data = await res.json();
      setTalents(data);
    } catch (err) {
      setError("Failed to load talents");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Delete "${name}"? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE}/talents/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setTalents((prev) => prev.filter((t) => t.id !== id));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      alert("Delete failed — check the console");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ height: 20, width: 120, background: "#f0f0f0", borderRadius: 6, marginBottom: 28 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ height: 76, background: "#f4f4f5", borderRadius: 12 }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div style={{ padding: 8, color: "#b91c1c", fontSize: 13 }}>{error}</div>;

  const femaleCount = talents.filter((t) => t.gender === "female").length;
  const maleCount = talents.filter((t) => t.gender === "male").length;

  const filtered = talents
    .filter((t) => filter === "all" || t.gender === filter)
    .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#111" }}>Talents</h1>
          <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
            {talents.length} total · {femaleCount} female · {maleCount} male
          </p>
        </div>
        <Link href="/admin/talents/new" style={addBtnStyle}>+ Add Talent</Link>
      </div>

      {/* Filter tabs + search */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 6, background: "#f4f4f5", borderRadius: 9, padding: 4 }}>
          {[
            { key: "all", label: "All" },
            { key: "female", label: "Female" },
            { key: "male", label: "Male" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: "7px 16px",
                fontSize: 12.5,
                fontWeight: 500,
                border: "none",
                borderRadius: 7,
                cursor: "pointer",
                background: filter === tab.key ? "#111" : "transparent",
                color: filter === tab.key ? "#fff" : "#555",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "9px 14px",
            fontSize: 13,
            border: "1px solid #e4e4e7",
            borderRadius: 8,
            outline: "none",
            width: 220,
            color: "#111",
          }}
        />
      </div>

      {/* Talent rows */}
      {filtered.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px dashed #d4d4d8",
            borderRadius: 12,
            padding: "48px 24px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 14, color: "#999" }}>
            {talents.length === 0 ? "No talents yet." : "No talents match your search."}
          </p>
          {talents.length === 0 && (
            <Link href="/admin/talents/new" style={{ ...addBtnStyle, display: "inline-block", marginTop: 16 }}>
              + Add your first talent
            </Link>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((t) => {
            const mainUrl = t.main_image ? `${IMG_HOST}${t.main_image}` : null;
            const hoverUrl = t.hover_image ? `${IMG_HOST}${t.hover_image}` : null;
            const isDeleting = deletingId === t.id;

            return (
              <div
                key={t.id}
                className="talent-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  background: "#fff",
                  border: "1px solid #e4e4e7",
                  borderRadius: 12,
                  padding: "12px 18px",
                  opacity: isDeleting ? 0.4 : 1,
                  transition: "opacity 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <style>{`
                  .talent-row:hover { border-color: #d4d4d8; box-shadow: 0 4px 14px rgba(0,0,0,0.05); }
                  .talent-thumb { position: relative; width: 52px; height: 64px; border-radius: 8px; overflow: hidden; flex-shrink: 0; border: 1px solid #eee; }
                  .talent-thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.35s ease; }
                  .talent-thumb .thumb-hover { opacity: 0; }
                  .talent-row:hover .talent-thumb .thumb-hover { opacity: 1; }
                `}</style>

                <div className="talent-thumb">
                  {mainUrl ? (
                    <img src={mainUrl} alt={t.name} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "#f0f0f0" }} />
                  )}
                  {hoverUrl && <img src={hoverUrl} alt="" className="thumb-hover" />}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>{t.name}</span>
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        padding: "2px 9px",
                        borderRadius: 999,
                        color: t.gender === "female" ? "#be185d" : "#1d4ed8",
                        background: t.gender === "female" ? "#fce7f3" : "#dbeafe",
                      }}
                    >
                      {t.gender}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 4, fontFamily: "monospace" }}>/{t.slug}</div>
                </div>

                <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                  <Link
                    href={`/admin/talents/${t.id}`}
                    style={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: "#111",
                      background: "#f4f4f5",
                      borderRadius: 7,
                      padding: "8px 16px",
                      textDecoration: "none",
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(t.id, t.name)}
                    disabled={isDeleting}
                    style={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: "#dc2626",
                      background: "none",
                      border: "1px solid #fecaca",
                      borderRadius: 7,
                      padding: "8px 16px",
                      cursor: isDeleting ? "default" : "pointer",
                    }}
                  >
                    {isDeleting ? "..." : "Delete"}
                  </button>
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