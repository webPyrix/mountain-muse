"use client";
import { useState } from "react";
import { ButtonPrimary } from "@/components/ui/Button";
import { poppins } from "@/libs/Fonts";
import { API_BASE } from "@/libs/api";

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sentName, setSentName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/contact/create.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setSentName(form.name.split(" ")[0] || "there");
        setShowModal(true);
        setForm(initialState);
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Could not send message — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form className="cf-form" onSubmit={handleSubmit}>
        <div className="cf-row">
          <div className={`cf-field ${poppins.className}`}>
            <label className="cf-label">Full Name</label>
            <input className="cf-input" type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className={`cf-field ${poppins.className}`}>
            <label className="cf-label">Email</label>
            <input className="cf-input" type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="cf-row">
          <div className={`cf-field ${poppins.className}`}>
            <label className="cf-label">Phone Number</label>
            <input className="cf-input" type="tel" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div className={`cf-field ${poppins.className}`}>
            <label className="cf-label">Purpose of Enquiry</label>
            <select className="cf-input cf-select" name="subject" value={form.subject} onChange={handleChange} required>
              <option value="" disabled>Select an option</option>
              <option value="Talents">Talents</option>
              <option value="Line Production">Line Production</option>
              <option value="Creative Studio">Creative Studio</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        <div className={`cf-field ${poppins.className}`}>
          <label className="cf-label">Message</label>
          <textarea
            className="cf-input cf-textarea"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>

        {errorMsg && (
          <p style={{ color: "#f87171", fontSize: 12.5 }}>{errorMsg}</p>
        )}

        <div className="cf-submit-wrap">
          <ButtonPrimary
            label={submitting ? "Sending..." : "Send Message"}
            color="#ffffff"
            onClick={handleSubmit}
          />
        </div>

        <style>{`
          .cf-form { display: flex; flex-direction: column; gap: 32px; }

          .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }

          .cf-field { display: flex; flex-direction: column; }

          .cf-label {
            font-size: 9px;
            letter-spacing: 2.5px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.4);
            margin-bottom: 12px;
          }

          .cf-input {
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
          .cf-input::placeholder { color: rgba(255,255,255,0.3); }
          .cf-input:focus { border-color: rgba(255,255,255,0.7); }
          .cf-input:-webkit-autofill {
            -webkit-text-fill-color: #f4f4f2;
            -webkit-box-shadow: 0 0 0px 1000px transparent inset;
            transition: background-color 5000s ease-in-out 0s;
          }

          .cf-select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            cursor: pointer;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1L5 5L9 1' stroke='rgba(255,255,255,0.5)' stroke-width='1.3' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>");
            background-repeat: no-repeat;
            background-position: right 2px center;
            padding-right: 20px;
          }
          .cf-select option {
            background: #0a0a0a;
            color: #f4f4f2;
          }

          .cf-textarea {
            resize: none;
            font-family: inherit;
            line-height: 1.6;
          }

          .cf-submit-wrap { margin-top: 8px; }

          @media (max-width: 640px) {
            .cf-row { grid-template-columns: 1fr, 1fr; gap: 24px; }
          }
        `}</style>
      </form>

      {/* ── Success modal ── */}
      {/* ── Success modal ── */}
      {showModal && (
        <div className="cf-modal-overlay" onClick={closeModal}>
          <div className={`cf-modal-card ${poppins.className}`} onClick={(e) => e.stopPropagation()}>
            <button className="cf-modal-close" onClick={closeModal} aria-label="Close">
              ×
            </button>
            <span className="cf-modal-tag">Message Sent</span>
            <h2 className="cf-modal-title">Thank you, {sentName}.</h2>
            <p className="cf-modal-body">
              We've received your message and will get back to you as soon as
              possible — usually within 1–2 business days.
            </p>
            <button className="cf-modal-btn" onClick={closeModal}>Close</button>
          </div>

          <style>{`
            .cf-modal-overlay {
              position: fixed;
              inset: 0;
              background: rgba(0,0,0,0.75);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
              padding: 20px;
              animation: cfFadeIn 0.2s ease;
            }
            @keyframes cfFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            .cf-modal-card {
              position: relative;
              background: #0a0a0a;
              color: #f4f4f2;
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 10px;
              padding: 44px 40px;
              max-width: 440px;
              width: 100%;
              box-shadow: 0 30px 70px rgba(0,0,0,0.6);
              animation: cfPopIn 0.25s cubic-bezier(0.23,1,0.32,1);
            }
            @keyframes cfPopIn {
              from { opacity: 0; transform: translateY(12px) scale(0.98); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }

            .cf-modal-close {
              position: absolute;
              top: 16px;
              right: 16px;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              border: 1px solid rgba(255,255,255,0.15);
              background: transparent;
              color: rgba(255,255,255,0.6);
              font-size: 18px;
              line-height: 1;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
            }
            .cf-modal-close:hover {
              background: #fff;
              color: #111;
              border-color: #fff;
            }

            .cf-modal-tag {
              font-size: 9px;
              letter-spacing: 3px;
              text-transform: uppercase;
              color: rgba(255,255,255,0.45);
              display: block;
              margin-bottom: 18px;
            }
            .cf-modal-title {
              font-size: clamp(22px, 3vw, 28px);
              color: #f4f4f2;
              margin-bottom: 16px;
              font-weight: 600;
            }
            .cf-modal-body {
              color: rgba(255,255,255,0.6);
              font-size: 13.5px;
              line-height: 1.8;
              margin-bottom: 28px;
            }
            .cf-modal-btn {
              padding: 11px 26px;
              background: #fff;
              color: #111;
              border: none;
              border-radius: 8px;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              transition: background 0.2s ease;
            }
            .cf-modal-btn:hover {
              background: rgba(255,255,255,0.85);
            }
          `}</style>
        </div>
      )}
    </>
  );
}