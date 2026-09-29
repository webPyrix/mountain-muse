"use client";
import { useEffect, useState } from "react";
import { API_BASE } from "@/libs/api";

export default function AdminContactPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/contact/list.php`);
      const data = await res.json();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (id, currentStatus) => {
    try {
      await fetch(`${API_BASE}/contact/mark_read.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_read: currentStatus ? 0 : 1 }),
      });
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, is_read: currentStatus ? "0" : "1" } : e))
      );
    } catch (err) {
      alert("Failed to update — check the console");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this enquiry? This cannot be undone.");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE}/contact/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
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

  if (loading) return <div style={{ fontSize: 13, color: "#888" }}>Loading enquiries...</div>;

  const unreadCount = enquiries.filter((e) => e.is_read === "0" || e.is_read === 0).length;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#111" }}>Contact Enquiries</h1>
        <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
          {enquiries.length} total{unreadCount > 0 ? ` · ${unreadCount} unread` : ""}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {enquiries.map((e) => {
          const isUnread = e.is_read === "0" || e.is_read === 0;
          const isExpanded = expandedId === e.id;
          return (
            <div
              key={e.id}
              style={{
                background: "#fff",
                border: "1px solid #e4e4e7",
                borderRadius: 10,
                padding: "16px 20px",
                cursor: "pointer",
              }}
              onClick={() => handleRowClick(e.id, e.is_read)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {isUnread && (
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563eb", flexShrink: 0 }} />
                  )}
                  <span style={{ fontSize: 14, fontWeight: isUnread ? 600 : 500, color: "#111" }}>{e.name}</span>
                  <span style={{ fontSize: 12.5, color: "#999" }}>{e.email}</span>
                </div>
                <span style={{ fontSize: 11.5, color: "#aaa" }}>
                  {new Date(e.created_at).toLocaleString()}
                </span>
              </div>

              <div style={{ fontSize: 13, color: "#555", marginTop: 6 }}>{e.subject || "(no subject)"}</div>

              {isExpanded && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #f0f0f0" }} onClick={(ev) => ev.stopPropagation()}>
                  <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{e.message}</p>
                  {e.phone && <p style={{ fontSize: 12.5, color: "#888", marginTop: 10 }}>Phone: {e.phone}</p>}
                  <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                    <button
                      onClick={() => handleToggleRead(e.id, !isUnread)}
                      style={{ fontSize: 12.5, color: "#333", background: "#f4f4f5", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer" }}
                    >
                      Mark as {isUnread ? "read" : "unread"}
                    </button>
                    <button
                      onClick={() => handleDelete(e.id)}
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

        {enquiries.length === 0 && (
          <p style={{ padding: 24, fontSize: 13, color: "#999", textAlign: "center", background: "#fff", borderRadius: 10, border: "1px solid #e4e4e7" }}>
            No enquiries yet.
          </p>
        )}
      </div>
    </div>
  );
}