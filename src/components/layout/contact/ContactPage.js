"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "./ContactForm";
import { playfair, poppins } from "@/libs/Fonts";

gsap.registerPlugin(ScrollTrigger);

const infoItems = [
  {
    label: "Email",
    value: "hello@mountainmuse.in",
    href: "mailto:hello@mountainmuse.in",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M3 5h18v14H3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 6l9 7 9-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Phone / WhatsApp",
    value: "+91 94191 XXXXX",
    href: "tel:+9194191XXXXX",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Studio",
    value: "Leh, Ladakh — India",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Hours",
    value: "Mon – Sat, 10am – 6pm IST",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const socials = [
  {
    label: "Instagram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.5 10v7M7.5 7.2v.1M12 17v-4.5c0-1.4 1-2.5 2.3-2.5 1.2 0 2.2 1 2.2 2.5V17"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Behance",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M3 7h6.5M3 12h7.5M3 17h6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 12c0-2.8 1.8-5 4-5s4 2.2 4 5-1.8 5-4 5-4-2.2-4-5z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  useEffect(() => {
    const items = document.querySelectorAll(".ct-reveal");
    if (items.length > 0) {
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".ct-map",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="ct-section">
      <style>{`
        .ct-section {
          background: #0a0a0a;
          color: #f4f4f2;
        }

        /* ── Hero ── */
        .ct-hero {
          padding: 200px var(--site-px, 52px) 0;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .ct-hero-tag {
          color: rgba(255,255,255,0.45);
          margin-bottom: 24px;
          display: block;
        }
        .ct-hero-title {
          color: #f4f4f2;
          margin-bottom: 24px;
          font-size: clamp(34px, 4.6vw, 68px);
        }
        .ct-hero-sub {
          color: rgba(255,255,255,0.55);
          font-size: 14px;
          line-height: 1.9;
          max-width: 560px;
          margin: 0 auto;
        }

        /* ── Body — form + info ── */
        .ct-body {
          align-items: center;
          max-width: 1300px;
          margin: 120px auto 0;
          padding: 0 var(--site-px, 52px);
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 80px;
        }

        /* ── White info card ── */
        .ct-info-card {
          background: #fdfdfc;
          border-radius: 10px;
          padding: 44px 40px;
          box-shadow: 0 30px 70px rgba(0,0,0,0.35);
        }

        /* Status pill */
        .ct-info-status {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
        }
        .ct-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #408803;
          animation: ctBlink 2.2s ease infinite;
        }
        @keyframes ctBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .ct-status-text {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(0,0,0,0.5);
        }

        .ct-info-tag {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
          display: block;
          margin-bottom: 30px;
        }

        .ct-info-list {
          display: flex;
          flex-direction: column;
        }
        .ct-info-item {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(17,17,17,0.08);
        }

        .ct-info-icon {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(17,17,17,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(0,0,0,0.55);
          transition: background 0.25s ease, color 0.25s ease;
        }
        .ct-info-item:hover .ct-info-icon {
          background: #111;
          color: #fff;
        }

        .ct-info-text { padding-top: 2px; }
        .ct-info-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
          margin-bottom: 6px;
          display: block;
        }
        .ct-info-value {
          font-size: 14.5px;
          color: #111;
          text-decoration: none;
          transition: color 0.25s ease;
        }
        a.ct-info-value:hover { color: rgba(0,0,0,0.55); }

        .ct-socials {
          display: flex;
          gap: 12px;
          margin-top: 36px;
        }
        .ct-social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(17,17,17,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(0,0,0,0.55);
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
        }
        .ct-social-btn:hover {
          background: #111;
          color: #fff;
          border-color: #111;
          transform: translateY(-2px);
        }

        /* ── Full-bleed map ── */
        .ct-map {
          margin-top: 150px;
          width: 100vw;
          height: 90vh;
          min-height: 560px;
          position: relative;
          filter: grayscale(1) invert(0.92) contrast(0.9);
        }
        .ct-map iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }
        .ct-map-overlay {
          position: absolute;
          top: 40px;
          left: var(--site-px, 52px);
          z-index: 2;
          filter: invert(1) grayscale(1) contrast(1.1);
          background: rgba(10,10,10,0.85);
          padding: 20px 26px;
          border-radius: 4px;
          pointer-events: none;
        }
        .ct-map-overlay-tag {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          display: block;
          margin-bottom: 8px;
        }
        .ct-map-overlay-title {
          color: #f4f4f2;
          font-size: 18px;
        }

        @media (max-width: 980px) {
          .ct-body { grid-template-columns: 1fr; gap: 60px; }
          .ct-map { height: 60vh; }
          .ct-info-card { padding: 36px 28px; }
        }
        @media (max-width: 640px) {
          .ct-hero { padding: 150px var(--site-px, 24px) 0; }
          .ct-body { padding: 0 var(--site-px, 24px); margin-top: 90px; }
          .ct-map-overlay { top: 24px; padding: 16px 20px; }
        }
      `}</style>

      {/* Hero */}
      <div className="ct-hero">
        <span className={`sub_head ct-hero-tag ${poppins.className}`}>Get In Touch</span>
        <h1 className={`ct-hero-title ${playfair.className}`}>Let's create something.</h1>
        <p className={`ct-hero-sub ${poppins.className}`}>
          Whether it's a campaign, a production, or a question about working
          with us — we'd love to hear from you. Fill in the form below or
          reach out directly.
        </p>
      </div>

      {/* Body */}
      <div className="ct-body">
        <div>
          <ContactForm />
        </div>

        <div>
          <div className="ct-info-card">
            <div className="ct-info-status">
              <span className="ct-status-dot" />
              <span className={`ct-status-text ${poppins.className}`}>Accepting new projects</span>
            </div>
            <div className={`ct-info-list ${poppins.className}`}>
              {infoItems.map((item) => (
                <div key={item.label} className="ct-info-item">
                  <div className="ct-info-icon">{item.icon}</div>
                  <div className="ct-info-text">
                    <span className="ct-info-label">{item.label}</span>
                    {item.href ? (
                      <a className="ct-info-value" href={item.href}>{item.value}</a>
                    ) : (
                      <span className="ct-info-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="ct-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="ct-social-btn"
                  onClick={(e) => e.preventDefault()}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed map */}
      <div className="ct-map">
        <div className="ct-map-overlay ct-reveal">
          <span className={`ct-map-overlay-tag ${poppins.className}`}>Find Us</span>
          <div className={`ct-map-overlay-title ${playfair.className}`}>Leh, Ladakh — India</div>
        </div>
        <iframe
          src="https://www.google.com/maps?q=Leh,Ladakh,India&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}