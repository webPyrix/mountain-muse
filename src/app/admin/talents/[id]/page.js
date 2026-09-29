"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { API_BASE, IMG_HOST } from "@/libs/api";
import { uploadImage } from "@/libs/upload";


export default function EditTalentPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState(null); // null until loaded
  const [loading, setLoading] = useState(true);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingHover, setUploadingHover] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [gallery, setGallery] = useState([]);
const [uploadingGallery, setUploadingGallery] = useState(false);

  useEffect(() => {
    fetchTalent();
  }, [id]);

const fetchTalent = async () => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE}/talents/get.php?id=${id}`);
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      setForm(data);
      setGallery(data.gallery || []);
    }
  } catch (err) {
    setError("Failed to load talent");
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = async (e, field, setUploadingState) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingState(true);
    setError(null);

    try {
      const path = await uploadImage(file);
      setForm((prev) => ({ ...prev, [field]: path }));
    } catch (err) {
      setError(`Image upload failed: ${err.message}`);
    } finally {
      setUploadingState(false);
    }
  };

  const handleGalleryUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploadingGallery(true);
  setError(null);

  try {
    const path = await uploadImage(file);

    const res = await fetch(`${API_BASE}/talents/gallery_add.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        talent_id: id,
        image_path: path,
        sort_order: gallery.length + 1,
      }),
    });
    const data = await res.json();

    if (data.success) {
      setGallery((prev) => [...prev, { id: data.id, image_path: path, sort_order: gallery.length + 1 }]);
    } else {
      setError(data.error || "Failed to add gallery photo");
    }
  } catch (err) {
    setError(`Gallery upload failed: ${err.message}`);
  } finally {
    setUploadingGallery(false);
    e.target.value = ""; // reset so the same file can be picked again if needed
  }
};

const handleGalleryDelete = async (galleryId) => {
  const confirmed = window.confirm("Remove this photo from the gallery?");
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_BASE}/talents/gallery_delete.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: galleryId }),
    });
    const data = await res.json();

    if (data.success) {
      setGallery((prev) => prev.filter((g) => g.id !== galleryId));
    } else {
      alert(data.error || "Delete failed");
    }
  } catch (err) {
    alert("Delete failed — check the console");
  }
};





  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/talents/update.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/admin/talents");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Request failed — check the console");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ fontSize: 13, color: "#888" }}>Loading talent...</div>;
  if (error && !form) return <div style={{ fontSize: 13, color: "#b91c1c" }}>{error}</div>;
  if (!form) return null;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <Link href="/admin/talents" style={backLinkStyle}>← Back to Talents</Link>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#111", marginTop: 12 }}>Edit {form.name}</h1>
      </div>

      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", padding: "12px 16px", borderRadius: 8, fontSize: 13, marginBottom: 20 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Section title="Basic Information">
          <FieldRow>
            <Field label="Full Name" required>
              <input name="name" value={form.name || ""} onChange={handleChange} required style={inputStyle} />
            </Field>
            <Field label="Slug" required>
              <input name="slug" value={form.slug || ""} onChange={handleChange} required style={inputStyle} />
            </Field>
          </FieldRow>

          <FieldRow>
            <Field label="Gender" required>
              <select name="gender" value={form.gender || "female"} onChange={handleChange} style={inputStyle}>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </Field>
            <Field label="Sort Order">
              <input type="number" name="sort_order" value={form.sort_order ?? 0} onChange={handleChange} style={inputStyle} />
            </Field>
          </FieldRow>

          <FieldRow>
            <Field label="Active">
              <select name="is_active" value={form.is_active ?? 1} onChange={handleChange} style={inputStyle}>
                <option value={1}>Active (visible on site)</option>
                <option value={0}>Inactive (hidden)</option>
              </select>
            </Field>
            <div />
          </FieldRow>
        </Section>

        <Section title="Images">
          <FieldRow>
            <Field label="Main Image">
              <ImageUploadBox
                path={form.main_image}
                uploading={uploadingMain}
                onSelect={(e) => handleFileSelect(e, "main_image", setUploadingMain)}
              />
            </Field>
            <Field label="Hover Image">
              <ImageUploadBox
                path={form.hover_image}
                uploading={uploadingHover}
                onSelect={(e) => handleFileSelect(e, "hover_image", setUploadingHover)}
              />
            </Field>
          </FieldRow>
        </Section>

        <Section title="Gallery" hint="Extra detail-page photos — add as many as needed">
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 12 }}>
    {gallery.map((g) => (
      <div key={g.id} style={{ position: "relative" }}>
        <img
          src={`${IMG_HOST}${g.image_path}`}
          alt=""
          style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }}
        />
        <button
          type="button"
          onClick={() => handleGalleryDelete(g.id)}
          style={{
            position: "absolute", top: 4, right: 4,
            width: 22, height: 22, borderRadius: "50%",
            background: "rgba(0,0,0,0.6)", color: "#fff",
            border: "none", cursor: "pointer", fontSize: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          ×
        </button>
      </div>
    ))}

    <label style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      aspectRatio: "3/4", border: "1.5px dashed #d4d4d8", borderRadius: 8,
      cursor: "pointer", background: "#fafafa",
    }}>
      <input type="file" accept="image/jpeg,image/png" onChange={handleGalleryUpload} style={{ display: "none" }} />
      {uploadingGallery ? (
        <span style={{ fontSize: 11, color: "#888" }}>Uploading...</span>
      ) : (
        <>
          <span style={{ fontSize: 20, color: "#bbb" }}>+</span>
          <span style={{ fontSize: 10, color: "#999", marginTop: 2 }}>Add photo</span>
        </>
      )}
    </label>
  </div>
</Section>

        <Section title="Measurements">
          <FieldRow>
            <Field label="Height">
              <input name="height" value={form.height || ""} onChange={handleChange} style={inputStyle} />
            </Field>
            <Field label={form.gender === "male" ? "Chest" : "Bust"}>
              <input name="bust_or_chest" value={form.bust_or_chest || ""} onChange={handleChange} style={inputStyle} />
            </Field>
          </FieldRow>
          <FieldRow>
            <Field label="Waist">
              <input name="waist" value={form.waist || ""} onChange={handleChange} style={inputStyle} />
            </Field>
            <Field label="Hips">
              <input name="hips" value={form.hips || ""} onChange={handleChange} style={inputStyle} />
            </Field>
          </FieldRow>
          <FieldRow single>
            <Field label="Shoe Size">
              <input name="shoe_size" value={form.shoe_size || ""} onChange={handleChange} style={inputStyle} />
            </Field>
          </FieldRow>
        </Section>

        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <button type="submit" disabled={submitting || uploadingMain || uploadingHover} style={submitBtnStyle}>
            {submitting ? "Saving..." : "Save Changes"}
          </button>
          <Link href="/admin/talents" style={cancelBtnStyle}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}

function ImageUploadBox({ path, uploading, onSelect }) {
  const displayUrl = path ? `${IMG_HOST}${path}` : null;
  return (
    <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 140, height: 140, border: "1.5px dashed #d4d4d8", borderRadius: 10, cursor: "pointer", position: "relative", overflow: "hidden", background: "#fafafa" }}>
      <input type="file" accept="image/jpeg,image/png" onChange={onSelect} style={{ display: "none" }} />
      {uploading ? (
        <span style={{ fontSize: 12, color: "#888" }}>Uploading...</span>
      ) : displayUrl ? (
        <img src={displayUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <>
          <span style={{ fontSize: 22, color: "#bbb" }}>+</span>
          <span style={{ fontSize: 11, color: "#999", marginTop: 4 }}>Upload photo</span>
        </>
      )}
    </label>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 10, padding: 24, marginBottom: 20 }}>
      <h2 style={{ fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 18 }}>{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </div>
  );
}

function FieldRow({ children, single }) {
  return <div style={{ display: "grid", gridTemplateColumns: single ? "1fr" : "1fr 1fr", gap: 16 }}>{children}</div>;
}

function Field({ label, required, children }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ fontSize: 12.5, fontWeight: 500, color: "#333", display: "block", marginBottom: 6 }}>
        {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
      </span>
      {children}
    </label>
  );
}

const backLinkStyle = { fontSize: 12.5, color: "#666", textDecoration: "none" };
const inputStyle = { width: "100%", padding: "9px 12px", fontSize: 13.5, border: "1px solid #d4d4d8", borderRadius: 7, outline: "none", color: "#111", background: "#fff", boxSizing: "border-box" };
const submitBtnStyle = { padding: "11px 24px", background: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 500, cursor: "pointer" };
const cancelBtnStyle = { padding: "11px 24px", background: "#fff", color: "#333", border: "1px solid #d4d4d8", borderRadius: 8, fontSize: 13.5, fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center" };