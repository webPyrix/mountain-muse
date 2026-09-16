"use client";
import { useState } from "react";
import { ButtonPrimary } from "@/components/ui/Button";
import { poppins } from "@/libs/Fonts";

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
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSubmitting(true);
    // TODO: wire this up to a real API route / email service.
    await new Promise((res) => setTimeout(res, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="cf-success">
        <span className={`cf-success-tag ${poppins.className}`}>Message Sent</span>
        <h2 className="cf-success-title">Thank you, {form.name.split(" ")[0] || "there"}.</h2>
        <p className={`cf-success-body ${poppins.className}`}>
          We've received your message and will get back to you as soon as
          possible — usually within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
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
          <label className="cf-label">Subject</label>
          <input className="cf-input" type="text" name="subject" value={form.subject} onChange={handleChange} required />
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

        .cf-textarea {
          resize: none;
          font-family: inherit;
          line-height: 1.6;
        }

        .cf-submit-wrap { margin-top: 8px; }

        .cf-success { padding: 20px 0; }
        .cf-success-tag {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          display: block;
          margin-bottom: 20px;
        }
        .cf-success-title {
          color: #f4f4f2;
          font-size: clamp(26px, 3vw, 38px);
          margin-bottom: 20px;
        }
        .cf-success-body {
          color: rgba(255,255,255,0.6);
          font-size: 13.5px;
          line-height: 1.9;
          max-width: 420px;
        }

        @media (max-width: 640px) {
          .cf-row { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>
    </form>
  );
}