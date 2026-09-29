"use client";
import { useState } from "react";
import { ButtonPrimary } from "@/components/ui/Button";
import { playfair, poppins } from "@/libs/Fonts";
import { API_BASE } from "@/libs/api";

const initialState = {
  name: "",
  phone: "",
  email: "",
  dob: "",
  height: "",
  gender: "",
  city: "",
  profession: "",
};

const uploadFields = [
  { id: "side", label: "Side Shot" },
  { id: "full", label: "Full Body Shot" },
  { id: "head", label: "Headshot" },
];

export default function BecomeModelForm() {
  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState({ side: null, full: null, head: null });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (key, e) => {
    const file = e.target.files?.[0] || null;
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const uploadOne = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${API_BASE}/applications/upload.php`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Upload failed");
    return data.path;
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!files.side || !files.full || !files.head) {
      setErrorMsg("Please upload all 3 photos.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const [sidePath, fullPath, headPath] = await Promise.all([
        uploadOne(files.side),
        uploadOne(files.full),
        uploadOne(files.head),
      ]);

      const res = await fetch(`${API_BASE}/applications/create.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          side_image: sidePath,
          full_image: fullPath,
          head_image: headPath,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSubmittedName(form.name.split(" ")[0] || "there");
        setSubmitted(true);
        setForm(initialState);
        setFiles({ side: null, full: null, head: null });
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Submission failed — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => setSubmitted(false);

  return (
    <>
      <form className="bm-form" onSubmit={handleSubmit}>
        <div className={`bm-field ${poppins.className}`}>
          <label className="bm-label">Full Name</label>
          <input className="bm-input" type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="bm-row">
          <div className={`bm-field ${poppins.className}`}>
            <label className="bm-label">Phone Number</label>
            <input className="bm-input" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className={`bm-field ${poppins.className}`}>
            <label className="bm-label">Email</label>
            <input className="bm-input" type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="bm-row">
          <div className={`bm-field ${poppins.className}`}>
            <label className="bm-label">Date of Birth</label>
            <input className="bm-input" type="date" name="dob" value={form.dob} onChange={handleChange} required />
          </div>
          <div className={`bm-field ${poppins.className}`}>
            <label className="bm-label">Height (cm)</label>
            <input className="bm-input" type="number" name="height" value={form.height} onChange={handleChange} min="120" max="230" required />
          </div>
        </div>

        <div className="bm-row">
          <div className={`bm-field ${poppins.className}`}>
            <label className="bm-label">Gender</label>
            <select className="bm-input bm-select" name="gender" value={form.gender} onChange={handleChange} required>
              <option value="" disabled>Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div className={`bm-field ${poppins.className}`}>
            <label className="bm-label">City</label>
            <input className="bm-input" type="text" name="city" value={form.city} onChange={handleChange} required />
          </div>
        </div>

        <div className={`bm-field ${poppins.className}`}>
          <label className="bm-label">Current Profession / Education</label>
          <input className="bm-input" type="text" name="profession" value={form.profession} onChange={handleChange} required />
        </div>

        {/* Uploads */}
        <div className="bm-uploads">
          <span className={`bm-uploads-tag ${poppins.className}`}>Upload Your Photos</span>

          <div className="bm-upload-row">
            {uploadFields.map((u) => (
              <label key={u.id} className="bm-upload-square">
                <input type="file" accept="image/jpeg,image/png" onChange={(e) => handleFile(u.id, e)} required />
                {files[u.id] ? (
                  <img className="bm-upload-preview" src={URL.createObjectURL(files[u.id])} alt={u.label} />
                ) : (
                  <span className="bm-upload-plus">+</span>
                )}
                <span className={`bm-upload-square-label ${poppins.className}`}>{u.label}</span>
              </label>
            ))}
          </div>
        </div>

        {errorMsg && (
          <p style={{ color: "#f87171", fontSize: 12.5 }}>{errorMsg}</p>
        )}

        <div className="bm-submit-wrap">
          <ButtonPrimary
            label={submitting ? "Submitting..." : "Submit Application"}
            color="#ffffff"
            onClick={handleSubmit}
          />
        </div>

        <style>{`
          .bm-form { display: flex; flex-direction: column; gap: 36px; }

          .bm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }

          .bm-field { display: flex; flex-direction: column; }

          .bm-label {
            font-size: 9px;
            letter-spacing: 2.5px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.4);
            margin-bottom: 14px;
          }

          .bm-input {
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            border-radius: 0;
            padding: 4px 0 12px;
            font-size: 14px;
            color: #f4f4f2;
            outline: none;
            box-shadow: none;
            -webkit-appearance: none;
            transition: border-color 0.25s ease;
          }
          .bm-input::placeholder { color: rgba(255,255,255,0.3); }
          .bm-input:focus { border-color: rgba(255,255,255,0.7); }
          .bm-input:-webkit-autofill {
            -webkit-text-fill-color: #f4f4f2;
            -webkit-box-shadow: 0 0 0px 1000px transparent inset;
            transition: background-color 5000s ease-in-out 0s;
          }
          .bm-input::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; }

          .bm-select {
            appearance: none;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='rgba(255,255,255,0.4)' stroke-width='1.4' fill='none' fill-rule='evenodd'/></svg>");
            background-repeat: no-repeat;
            background-position: right 4px center;
            cursor: pointer;
          }
          .bm-select option {
            background: #111;
            color: #f4f4f2;
          }

          /* ── Uploads — square, inline ── */
          .bm-uploads {
            display: flex;
            flex-direction: column;
            gap: 18px;
            padding-top: 8px;
          }
          .bm-uploads-tag {
            font-size: 9px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.4);
            margin-top: 24px;
          }

          .bm-upload-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .bm-upload-square {
            position: relative;
            aspect-ratio: 1 / 1;
            border: 1px dashed rgba(255,255,255,0.22);
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            cursor: pointer;
            overflow: hidden;
            transition: border-color 0.25s ease, background 0.25s ease;
          }
          .bm-upload-square:hover {
            border-color: rgba(255,255,255,0.5);
            background: rgba(255,255,255,0.03);
          }

          .bm-upload-square input[type="file"] {
            position: absolute;
            inset: 0;
            opacity: 0;
            cursor: pointer;
            z-index: 2;
          }

          .bm-upload-plus {
            font-size: 22px;
            font-weight: 300;
            color: rgba(255,255,255,0.4);
          }

          .bm-upload-preview {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
          }

          .bm-upload-square-label {
            position: relative;
            z-index: 2;
            font-size: 9px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.55);
            text-align: center;
            padding: 0 6px;
          }
          .bm-upload-square:has(.bm-upload-preview) .bm-upload-square-label {
            position: absolute;
            bottom: 8px;
            left: 0;
            right: 0;
            color: #fff;
            background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%);
            padding: 16px 6px 4px;
          }

          /* ── Submit ── */
          .bm-submit-wrap {
            margin-top: 12px;
          }

          @media (max-width: 640px) {
            .bm-row { grid-template-columns: 1fr; gap: 28px; }
          }

          @media (max-width: 480px) {
            .bm-upload-row { gap: 10px; }
          }
        `}</style>
      </form>

      {submitted && (
        <div className="bm-modal-overlay" onClick={closeModal}>
          <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bm-modal-close" onClick={closeModal} aria-label="Close">×</button>
            <span className={`bm-modal-tag ${poppins.className}`}>Application Received</span>
            <h2 className={`bm-modal-title ${playfair.className}`}>Thank you, {submittedName}.</h2>
            <p className={`bm-modal-body ${poppins.className}`}>
              We've received your application and photos. Our team reviews every
              submission personally — if there's a fit, we'll reach out directly
              on the email or phone number you provided.
            </p>
            <div className="bm-modal-btn-wrap">
              <ButtonPrimary label="Close" color="#111111" onClick={closeModal} />
            </div>
          </div>

          <style>{`
            .bm-modal-overlay {
              position: fixed;
              inset: 0;
              background: rgba(0,0,0,0.6);
              backdrop-filter: blur(4px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
              padding: 20px;
              animation: bmFadeIn 0.25s ease;
            }
            @keyframes bmFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            .bm-modal {
              position: relative;
              background: #111;
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 16px;
              max-width: 440px;
              width: 100%;
              padding: 44px 40px 36px;
              text-align: center;
              animation: bmPopIn 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            }
            @keyframes bmPopIn {
              from { opacity: 0; transform: scale(0.92) translateY(10px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }

            .bm-modal-close {
              position: absolute;
              top: 16px;
              right: 16px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: 1px solid rgba(255,255,255,0.15);
              background: rgba(255,255,255,0.04);
              color: rgba(255,255,255,0.6);
              font-size: 18px;
              line-height: 1;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: background 0.2s ease, color 0.2s ease;
            }
            .bm-modal-close:hover {
              background: rgba(255,255,255,0.1);
              color: #fff;
            }

            .bm-modal-tag {
              font-size: 9px;
              letter-spacing: 3px;
              text-transform: uppercase;
              color: rgba(255,255,255,0.45);
              display: block;
              margin-bottom: 18px;
            }
            .bm-modal-title {
              color: #f4f4f2;
              font-size: clamp(24px, 4vw, 30px);
              margin-bottom: 16px;
            }
            .bm-modal-body {
              color: rgba(255,255,255,0.6);
              font-size: 13.5px;
              line-height: 1.8;
              margin-bottom: 28px;
            }
            .bm-modal-btn-wrap {
              display: flex;
              justify-content: center;
            }

            @media (max-width: 480px) {
              .bm-modal { padding: 36px 24px 30px; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}