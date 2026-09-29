"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE, IMG_HOST } from "@/libs/api";

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    designation: "",
    image: "",
    sort_order: 0,
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_BASE}/team/upload.php`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setForm((prev) => ({ ...prev, image: data.path }));
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      setError("Upload failed — check the console");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/team/create.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/admin/team");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Request failed — check the console");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <Link href="/admin/team" style={backLinkStyle}>← Back to Team</Link>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#111", marginTop: 12 }}>Add Team Member</h1>
      </div>

      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", padding: "12px 16px", borderRadius: 8, fontSize: 13, marginBottom: 20 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 10, padding: 24, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 20 }}>
            <label style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              width: 120, height: 120, flexShrink: 0,
              border: "1.5px dashed #d4d4d8", borderRadius: 10, cursor: "pointer",
              overflow: "hidden", background: "#fafafa",
            }}>
              <input type="file" accept="image/jpeg,image/png" onChange={handleFileSelect} style={{ display: "none" }} />
              {uploading ? (
                <span style={{ fontSize: 11, color: "#888" }}>Uploading...</span>
              ) : form.image ? (
                <img src={`${IMG_HOST}${form.image}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <>
                  <span style={{ fontSize: 20, color: "#bbb" }}>+</span>
                  <span style={{ fontSize: 10, color: "#999", marginTop: 4 }}>Upload photo</span>
                </>
              )}
            </label>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
              <label>
                <span style={{ fontSize: 12.5, fontWeight: 500, color: "#333", display: "block", marginBottom: 6 }}>
                  Full Name <span style={{ color: "#dc2626" }}>*</span>
                </span>
                <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} placeholder="e.g. Rahul Mehta" />
              </label>

              <label>
                <span style={{ fontSize: 12.5, fontWeight: 500, color: "#333", display: "block", marginBottom: 6 }}>
                  Designation <span style={{ color: "#dc2626" }}>*</span>
                </span>
                <input name="designation" value={form.designation} onChange={handleChange} required style={inputStyle} placeholder="e.g. Creative Director" />
              </label>
            </div>
          </div>

          <label style={{ display: "block", marginTop: 16 }}>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: "#333", display: "block", marginBottom: 6 }}>Sort Order</span>
            <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} style={{ ...inputStyle, maxWidth: 140 }} />
          </label>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" disabled={submitting || uploading} style={submitBtnStyle}>
            {submitting ? "Saving..." : "Save Team Member"}
          </button>
          <Link href="/admin/team" style={cancelBtnStyle}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}

const backLinkStyle = { fontSize: 12.5, color: "#666", textDecoration: "none" };
const inputStyle = { width: "100%", padding: "9px 12px", fontSize: 13.5, border: "1px solid #d4d4d8", borderRadius: 7, outline: "none", color: "#111", background: "#fff", boxSizing: "border-box" };
const submitBtnStyle = { padding: "11px 24px", background: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 500, cursor: "pointer" };
const cancelBtnStyle = { padding: "11px 24px", background: "#fff", color: "#333", border: "1px solid #d4d4d8", borderRadius: 8, fontSize: 13.5, fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center" };