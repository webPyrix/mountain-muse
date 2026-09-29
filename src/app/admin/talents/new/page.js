"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE, IMG_HOST } from "@/libs/api";
import { uploadImage } from "@/libs/upload";

// Prefix for displaying images saved by the PHP backend

export default function NewTalentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: "",
    name: "",
    gender: "female",
    main_image: "",
    hover_image: "",
    height: "",
    bust_or_chest: "",
    waist: "",
    hips: "",
    shoe_size: "",
    sort_order: 0,
  });
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingHover, setUploadingHover] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/talents/create.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        router.push(`/admin/talents/${data.id}`);
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

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <Link href="/admin/talents" style={backLinkStyle}>← Back to Talents</Link>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#111", marginTop: 12 }}>Add New Talent</h1>
        <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
          Create a new roster entry. You can add gallery photos after saving.
        </p>
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
              <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} placeholder="e.g. Kunzang Dolma" />
            </Field>
            <Field label="Slug" hint="Used in the URL, lowercase, no spaces" required>
              <input name="slug" value={form.slug} onChange={handleChange} required style={inputStyle} placeholder="e.g. kunzang" />
            </Field>
          </FieldRow>

          <FieldRow>
            <Field label="Gender" required>
              <select name="gender" value={form.gender} onChange={handleChange} style={inputStyle}>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </Field>
            <Field label="Sort Order" hint="Lower numbers appear first">
              <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} style={inputStyle} />
            </Field>
          </FieldRow>
        </Section>

        {/* ── Images — real file upload with square previews ── */}
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

        <Section title="Measurements">
          <FieldRow>
            <Field label="Height">
              <input name="height" value={form.height} onChange={handleChange} style={inputStyle} placeholder={`5'7" / 170 cm`} />
            </Field>
            <Field label={form.gender === "male" ? "Chest" : "Bust"}>
              <input name="bust_or_chest" value={form.bust_or_chest} onChange={handleChange} style={inputStyle} placeholder={`28" / 71 cm`} />
            </Field>
          </FieldRow>
          <FieldRow>
            <Field label="Waist">
              <input name="waist" value={form.waist} onChange={handleChange} style={inputStyle} placeholder={`22" / 56 cm`} />
            </Field>
            <Field label="Hips">
              <input name="hips" value={form.hips} onChange={handleChange} style={inputStyle} placeholder={`34" / 86 cm`} />
            </Field>
          </FieldRow>
          <FieldRow single>
            <Field label="Shoe Size">
              <input name="shoe_size" value={form.shoe_size} onChange={handleChange} style={inputStyle} placeholder="9 us / 40 eu" />
            </Field>
          </FieldRow>
        </Section>

        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <button type="submit" disabled={submitting || uploadingMain || uploadingHover} style={submitBtnStyle}>
            {submitting ? "Saving..." : "Save Talent"}
          </button>
          <Link href="/admin/talents" style={cancelBtnStyle}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}

/* ── Image upload box — square preview + hidden file input ── */
function ImageUploadBox({ path, uploading, onSelect }) {
  const displayUrl = path ? `${IMG_HOST}${path}` : null;

  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 140,
        height: 140,
        border: "1.5px dashed #d4d4d8",
        borderRadius: 10,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        background: "#fafafa",
      }}
    >
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

/* ── Small reusable pieces ── */

function Section({ title, hint, children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 10, padding: 24, marginBottom: 20 }}>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{title}</h2>
        {hint && <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{hint}</p>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </div>
  );
}

function FieldRow({ children, single }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: single ? "1fr" : "1fr 1fr", gap: 16 }}>
      {children}
    </div>
  );
}

function Field({ label, hint, required, children }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ fontSize: 12.5, fontWeight: 500, color: "#333", display: "block", marginBottom: 6 }}>
        {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
      </span>
      {children}
      {hint && <span style={{ fontSize: 11, color: "#999", display: "block", marginTop: 4 }}>{hint}</span>}
    </label>
  );
}

/* ── Shared styles ── */

const backLinkStyle = { fontSize: 12.5, color: "#666", textDecoration: "none" };

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  fontSize: 13.5,
  border: "1px solid #d4d4d8",
  borderRadius: 7,
  outline: "none",
  color: "#111",
  background: "#fff",
  boxSizing: "border-box",
};

const submitBtnStyle = {
  padding: "11px 24px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 13.5,
  fontWeight: 500,
  cursor: "pointer",
};

const cancelBtnStyle = {
  padding: "11px 24px",
  background: "#fff",
  color: "#333",
  border: "1px solid #d4d4d8",
  borderRadius: 8,
  fontSize: 13.5,
  fontWeight: 500,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
};