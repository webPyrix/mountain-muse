"use client";
import { useEffect, useState } from "react";
import { API_BASE, IMG_HOST } from "@/libs/api";


export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/applications/list.php`);
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (id, currentStatus) => {
    try {
      await fetch(`${API_BASE}/applications/mark_read.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_read: currentStatus ? 0 : 1 }),
      });
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, is_read: currentStatus ? "0" : "1" } : a))
      );
    } catch (err) {
      alert("Failed to update — check the console");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this application? This cannot be undone.");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE}/applications/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      alert("Delete failed — check the console");
    }
  };

  const handleRowClick = (id, isRead) => {
    setExpandedId((prev) => (prev === id ? null : id));
    if (!isRead || isRead === "0") {
      handleToggleRead(id, false);
    }
  };

  const calcAge = (dob) => {
    if (!dob) return "—";
    const birth = new Date(dob);
    const diff = Date.now() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  if (loading) return <div style={{ fontSize: 13, color: "#888" }}>Loading applications...</div>;

  const unreadCount = applications.filter((a) => a.is_read === "0" || a.is_read === 0).length;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#111" }}>Model Applications</h1>
        <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
          {applications.length} total{unreadCount > 0 ? ` · ${unreadCount} unread` : ""}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {applications.map((a) => {
          const isUnread = a.is_read === "0" || a.is_read === 0;
          const isExpanded = expandedId === a.id;
          const photos = [
            { label: "Side Shot", src: a.side_image },
            { label: "Full Body", src: a.full_image },
            { label: "Headshot", src: a.head_image },
          ];
          const badges = [
                { label: "Gender", value: a.gender === "female" ? "Female" : "Male" },
                { label: "Age", value: `${calcAge(a.dob)} yrs` },
                { label: "Height", value: `${a.height} cm` },
                { label: "City", value: a.city },
            ];

          return (
            <div
              key={a.id}
              style={{
                background: "#fff",
                border: "1px solid #e4e4e7",
                borderRadius: 10,
                padding: "18px 20px",
                cursor: "pointer",
              }}
              onClick={() => handleRowClick(a.id, a.is_read)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {isUnread && (
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563eb", flexShrink: 0 }} />
                  )}
                  <span style={{ fontSize: 15, fontWeight: isUnread ? 600 : 500, color: "#111" }}>{a.name}</span>
                </div>
                <span style={{ fontSize: 11.5, color: "#aaa", whiteSpace: "nowrap" }}>
                  {new Date(a.created_at).toLocaleString()}
                </span>
              </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                {badges.map((b) => (
                    <span
                    key={b.label}
                    style={{
                        fontSize: 11.5,
                        color: "#444",
                        background: "#f4f4f5",
                        border: "1px solid #ececef",
                        borderRadius: 999,
                        padding: "4px 11px",
                        fontWeight: 500,
                    }}
                    >
                    <span style={{ color: "#999" }}>{b.label}:</span> {b.value}
                    </span>
                ))}
                </div>

              <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 12.5, color: "#777" }}>
                <span>{a.email}</span>
                <span>{a.phone}</span>
              </div>

              {isExpanded && (
                <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid #f0f0f0" }} onClick={(ev) => ev.stopPropagation()}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                    <div>
                      <div style={{ fontSize: 10.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Profession</div>
                      <div style={{ fontSize: 13.5, color: "#222" }}>{a.profession}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Date of Birth</div>
                      <div style={{ fontSize: 13.5, color: "#222" }}>{a.dob}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 18 }}>
                    {photos.map((p) => (
                      <div key={p.label}>
                        {p.src ? (
                          <img
                            src={`${IMG_HOST}${p.src}`}
                            alt={p.label}
                            style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }}
                          />
                        ) : (
                          <div style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 8, background: "#f4f4f5" }} />
                        )}
                        <div style={{ fontSize: 11, color: "#999", marginTop: 6, textAlign: "center" }}>{p.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={() => handleToggleRead(a.id, !isUnread)}
                      style={{ fontSize: 12.5, color: "#333", background: "#f4f4f5", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer" }}
                    >
                      Mark as {isUnread ? "read" : "unread"}
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      style={{ fontSize: 12.5, color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {applications.length === 0 && (
          <p style={{ padding: 24, fontSize: 13, color: "#999", textAlign: "center", background: "#fff", borderRadius: 10, border: "1px solid #e4e4e7" }}>
            No applications yet.
          </p>
        )}
      </div>
    </div>
  );
}