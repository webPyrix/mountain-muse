"use client";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { num: "01", label: "Home", sub: "Back to start" },
  { num: "02", label: "About", sub: "Our story & team" },
  { num: "03", label: "Services", sub: "What we offer" },
  { num: "04", label: "Portfolio", sub: "Selected work" },
  { num: "05", label: "Contact", sub: "Let's talk" },
];

const socials = ["Instagram", "Behance", "LinkedIn", "Twitter"];

export default function Menu() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef(null);

useEffect(() => {
    const checkScrolled = () => {
        const threshold = window.innerWidth <= 1000 ? 0 : 200;
        
        // Fixed: Use >= so button shows immediately on mobile/tablet
        setScrolled(window.scrollY >= threshold);
    };

    checkScrolled(); // initial check
    window.addEventListener("scroll", checkScrolled, { passive: true });
    window.addEventListener("resize", checkScrolled, { passive: true });

    return () => {
        window.removeEventListener("scroll", checkScrolled);
        window.removeEventListener("resize", checkScrolled);
    };
}, []);


useEffect(() => {
    const handler = () => handleOpen();
    window.addEventListener("open-menu", handler);
    return () => window.removeEventListener("open-menu", handler);
}, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && open) handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleOpen = () => {
    setClosing(false);
    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpen(true));
    });
  };

  const handleClose = () => {
    setClosing(true);
    setOpen(false);
    setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, 700);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;1,300&family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap');

        /* ─── SCROLL MENU BUTTON ─── */
        .menu-scroll-btn {
          position: fixed;
          top: 32px;
          // right: 52px;
          z-index: 9999;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1),
                      transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          pointer-events: none;
          right: var(--site-px, 52px);   /* ← was hardcoded 52px */
        }
        .menu-scroll-btn.visible {
          opacity: 1;
          transform: translateX(0);
          pointer-events: all;
        }
        .menu-scroll-btn .btn-dot {
          width: 6px;
          height: 6px;
          background: #ffffff;
          border-radius: 50%;
          animation: dot-pulse 2s ease-in-out infinite;
        }
        .menu-scroll-btn .btn-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 5px;
          color: #ffffff;
          line-height: 1;
          transition: letter-spacing 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .menu-scroll-btn:hover .btn-label { letter-spacing: 9px; }

        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%       { transform: scale(1.6); opacity: 1; }
        }

        /* ─── CLOSE BUTTON ─── */
        .menu-close-btn {
          position: absolute;
          top: 36px;
          right: 52px;
          z-index: 10001;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.4s, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          transition-delay: 0.05s;
        }
        .menu-close-btn.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .menu-close-btn .btn-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 5px;
          color: rgba(255, 255, 255, 0.65);
          transition: color 0.3s, letter-spacing 0.35s;
        }
        .menu-close-btn:hover .btn-label { color: #ffffff; letter-spacing: 9px; }
        .x-icon {
          width: 18px;
          height: 18px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .x-icon::before, .x-icon::after {
          content: '';
          position: absolute;
          width: 18px;
          height: 1px;
          background: rgba(255, 255, 255, 0.65);
          transition: background 0.3s;
        }
        .x-icon::before { transform: rotate(45deg); }
        .x-icon::after  { transform: rotate(-45deg); }
        .menu-close-btn:hover .x-icon::before,
        .menu-close-btn:hover .x-icon::after { background: #ffffff; }

        /* ─── OVERLAY ─── */
        .menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 80px 72px 44px 72px;
          overflow: hidden;
          pointer-events: none;
        }
        .menu-overlay.open  { pointer-events: all; }
        .menu-overlay.closing { pointer-events: none; }

        /* ─── BACKGROUND PANEL ─── */
        .menu-bg-panel {
          position: absolute;
          inset: 0;
          background: #080808;
          z-index: 0;
          transform-origin: top center;
          transform: scaleY(0);
          transition: transform 0.7s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .menu-overlay.open .menu-bg-panel {
          transform: scaleY(1);
        }
        .menu-overlay.closing .menu-bg-panel {
          transform: scaleY(0);
          transform-origin: bottom center;
          transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1);
        }

        /* Ghost background text */
        .menu-bg-text {
          position: absolute;
          bottom: -60px;
          right: -30px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(100px, 16vw, 260px);
          letter-spacing: 6px;
          color: rgba(255, 255, 255, 0.018);
          pointer-events: none;
          user-select: none;
          z-index: 1;
          line-height: 1;

          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1),
              transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .menu-overlay.open .menu-bg-text {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.60s; /* adjust for perfect sync */
}

.menu-overlay.closing .menu-bg-text {
  opacity: 0;
  transform: translateY(40px);
  transition-delay: 0s;
}

        /* Vertical side text */
        .menu-side-text {
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          transform-origin: center;
          font-size: 8px;
          letter-spacing: 7px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.055);
          font-family: 'DM Sans', sans-serif;
          z-index: 1;
          pointer-events: none;
          white-space: nowrap;
        }

        /* ─── TOP ROW ─── */
        .menu-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(-16px);
          transition: opacity 0.45s, transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
          transition-delay: 0.1s;
        }
        .menu-overlay.open .menu-top {
          opacity: 1;
          transform: translateY(0);
        }
        .menu-overlay.closing .menu-top {
          opacity: 0;
          transform: translateY(-16px);
          transition-delay: 0s;
        }
        .menu-top-label {
          font-size: 9px;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.2);
          font-family: 'DM Sans', sans-serif;
        }
        .menu-top-year {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.12);
          font-family: 'DM Sans', sans-serif;
        }

        /* ─── NAV LIST ─── */
        .nav-list {
          list-style: none;
          position: relative;
          z-index: 2;
          padding: 0;
          margin: 0;
        }
        .nav-list li {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1),
                      transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .nav-list li:last-child {
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        /* Stagger IN */
        .menu-overlay.open .nav-list li:nth-child(1) { opacity: 1; transform: translateY(0); transition-delay: 0.22s; }
        .menu-overlay.open .nav-list li:nth-child(2) { opacity: 1; transform: translateY(0); transition-delay: 0.30s; }
        .menu-overlay.open .nav-list li:nth-child(3) { opacity: 1; transform: translateY(0); transition-delay: 0.38s; }
        .menu-overlay.open .nav-list li:nth-child(4) { opacity: 1; transform: translateY(0); transition-delay: 0.46s; }
        .menu-overlay.open .nav-list li:nth-child(5) { opacity: 1; transform: translateY(0); transition-delay: 0.54s; }

        /* Stagger OUT (reverse) */
        .menu-overlay.closing .nav-list li:nth-child(5) { opacity: 0; transform: translateY(22px); transition-delay: 0.00s; }
        .menu-overlay.closing .nav-list li:nth-child(4) { opacity: 0; transform: translateY(22px); transition-delay: 0.04s; }
        .menu-overlay.closing .nav-list li:nth-child(3) { opacity: 0; transform: translateY(22px); transition-delay: 0.08s; }
        .menu-overlay.closing .nav-list li:nth-child(2) { opacity: 0; transform: translateY(22px); transition-delay: 0.12s; }
        .menu-overlay.closing .nav-list li:nth-child(1) { opacity: 0; transform: translateY(22px); transition-delay: 0.16s; }

        /* ─── NAV LINK ROW ─── */
        .nav-item-inner {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 16px 0;
          cursor: pointer;
          position: relative;
          transition: padding 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .nav-item-inner:hover { padding-left: 16px; }

        /* Number */
        .nav-link-num {
          font-size: 9px;
          letter-spacing: 4px;
          color: rgba(255, 255, 255, 0.18);
          font-family: 'DM Sans', sans-serif;
          min-width: 28px;
          transition: color 0.3s;
          position: relative;
          z-index: 1;
        }
        .nav-item-inner:hover .nav-link-num { color: rgba(255, 255, 255, 0.45); }

        /* Main text */
        .nav-link-main {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
          position: relative;
          z-index: 1;
        }
        .nav-link-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(32px, 5vw, 66px);
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.82);
          line-height: 1;
          transition: color 0.35s, letter-spacing 0.4s;
        }
        .nav-item-inner:hover .nav-link-title { color: #ffffff; letter-spacing: 5px; }
        .nav-link-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 13px;
          color: rgba(255, 255, 255, 0);
          transition: color 0.4s, transform 0.4s;
          transform: translateY(-4px);
        }
        .nav-item-inner:hover .nav-link-sub {
          color: rgba(255, 255, 255, 0.35);
          transform: translateY(0);
        }

        /* Arrow */
        .nav-link-arrow {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.12);
          opacity: 0;
          transform: translateX(-12px);
          transition: opacity 0.35s, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          margin-right: 4px;
          position: relative;
          z-index: 1;
        }
        .nav-item-inner:hover .nav-link-arrow { opacity: 1; transform: translateX(0); }

        /* ─── FOOTER ─── */
        .menu-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          position: relative;
          z-index: 2;
          padding-top: 28px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.45s, transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
          transition-delay: 0.62s;
        }
        .menu-overlay.open .menu-footer {
          opacity: 1;
          transform: translateY(0);
        }
        .menu-overlay.closing .menu-footer {
          opacity: 0;
          transform: translateY(16px);
          transition-delay: 0s;
        }

        .menu-socials { display: flex; gap: 24px; }
        .menu-socials a {
          font-size: 8px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.22);
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.3s;
          position: relative;
        }
        .menu-socials a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.4);
          transition: width 0.3s;
        }
        .menu-socials a:hover { color: rgba(255, 255, 255, 0.6); }
        .menu-socials a:hover::after { width: 100%; }
        .menu-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.1);
          letter-spacing: 1px;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 768px) {
          .menu-overlay { padding: 80px 32px 36px 32px; }
          .menu-scroll-btn, .menu-close-btn { right: 28px; }
          .menu-side-text { display: none; }
        }
      `}</style>

      {/* ─── FLOATING MENU TRIGGER ─── */}
      <button
        className={`menu-scroll-btn ${scrolled ? "visible" : ""}`}
        onClick={handleOpen}
        aria-label="Open menu"
      >
        <span className="btn-dot" />
        <span className="btn-label">MENU</span>
      </button>

      {/* ─── FULLSCREEN OVERLAY ─── */}
      {mounted && (
        <div
          ref={overlayRef}
          className={`menu-overlay ${open && !closing ? "open" : ""} ${closing ? "closing" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          {/* Background panel — wipes in from top */}
          <div className="menu-bg-panel" />

          {/* Ghost background text */}
          <span className="menu-bg-text" aria-hidden="true">MENU</span>

          {/* Vertical side label */}
          <span className="menu-side-text" aria-hidden="true">
            Creative Studio — Est. 2018
          </span>

          {/* Close button */}
          <button
            className={`menu-close-btn ${open && !closing ? "visible" : ""}`}
            onClick={handleClose}
            aria-label="Close menu"
          >
            <span className="btn-label">CLOSE</span>
            <span className="x-icon" />
          </button>

          {/* Top row */}
          <div className="menu-top">
            <span className="menu-top-label">Navigation</span>
            <span className="menu-top-year">© 2025</span>
          </div>

          {/* Nav links */}
          <nav>
            <ul className="nav-list">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <div
                    className="nav-item-inner"
                    role="button"
                    tabIndex={0}
                    onClick={handleClose}
                    onKeyDown={(e) => e.key === "Enter" && handleClose()}
                  >
                    <span className="nav-link-num">{item.num}</span>

                    <span className="nav-link-main">
                      <span className="nav-link-title">{item.label}</span>
                      <span className="nav-link-sub">{item.sub}</span>
                    </span>

                    <span className="nav-link-arrow" aria-hidden="true">→</span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="menu-footer">
            <div className="menu-socials">
              {socials.map((s) => (
                <a key={s} href="#" onClick={(e) => e.preventDefault()}>
                  {s}
                </a>
              ))}
            </div>
            <span className="menu-tagline">Bold Vision. Lasting Impact.</span>
          </div>
        </div>
      )}
    </>
  );
}