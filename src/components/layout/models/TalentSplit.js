"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { playfair, poppins } from "@/libs/Fonts";
import { ButtonPrimary } from "@/components/ui/Button";

export default function TalentSplitV2() {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);
  const clipRef = useRef(null);
  const [side, setSide] = useState("male");
  const [isTouch, setIsTouch] = useState(false);
  const [activePanel, setActivePanel] = useState("male"); // touch: Men open by default

  // Desktop interaction only kicks in above 1200px AND with a real mouse
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1200px)");
    const update = () => setIsTouch(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

useEffect(() => {
  if (isTouch) return;
  const section = sectionRef.current;
  const cursor = cursorRef.current;
  if (!section || !cursor) return;

  gsap.set(cursor, { scale: 0, opacity: 0 });

  const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

  let isInside = false;

  const showCursor = () => {
    if (isInside) return;
    isInside = true;
    gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)", overwrite: "auto" });
  };

  const hideCursor = () => {
    if (!isInside) return;
    isInside = false;
    gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.25, ease: "power2.in", overwrite: "auto" });
    gsap.to(clipRef.current, {
      clipPath: `polygon(50% 0%, 100% 0%, 100% 100%, 44% 100%)`,
      duration: 0.6,
      ease: "power3.out",
    });
    setSide("male");
  };

  // Global listener — recalculates containment on every move, so it
  // works correctly regardless of where the cursor was when the page
  // mounted, and isn't dependent on native enter/leave event timing.
  const onWindowMove = (e) => {
    const rect = section.getBoundingClientRect();
    const withinBounds =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!withinBounds) {
      hideCursor();
      return;
    }

    showCursor();

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    xTo(mx);
    yTo(my);

    const pct = Math.max(0, Math.min(100, (mx / rect.width) * 100));
    const revealLeft = 100 - pct;

    gsap.to(clipRef.current, {
      clipPath: `polygon(${revealLeft}% 0%, 100% 0%, 100% 100%, ${revealLeft - 6}% 100%)`,
      duration: 0.5,
      ease: "power3.out",
    });

    setSide(pct < 50 ? "male" : "female");
  };

  window.addEventListener("mousemove", onWindowMove);

  return () => {
    window.removeEventListener("mousemove", onWindowMove);
  };
}, [isTouch]);

  const touchPanels = [
    { id: "male", label: "Men", img: "/images/models/rigzin.jpg", href: "/models/male" },
    { id: "female", label: "Women", img: "/images/models/kunzang.PNG", href: "/models/female" },
  ];

  return (
    <section ref={sectionRef} className={`tv2-section ${isTouch ? "is-touch" : ""}`}>
      <style>{`
        .tv2-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          min-height: 640px;
          background: #0a0a0a;
          overflow: hidden;
          cursor: none;
        }
        .tv2-section.is-touch {
          cursor: auto;
          height: 100vh;
        }

        .tv2-top {
          position: absolute;
          top: 44px;
          left: 52px;
          right: 52px;
          z-index: 5;
          display: flex;
          justify-content: space-between;
        }
        .tv2-top-tag {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .is-touch .tv2-top { top: 24px; left: 24px; right: 24px; }

        /* ── Desktop interaction (>=1200px + fine pointer only) ── */
        .tv2-base { position: absolute; inset: 0; }
        .tv2-base img {
          width: 100%; height: 100%; object-fit: cover;
          filter: grayscale(0.1) brightness(0.6);
        }
        .tv2-base::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.3) 100%);
        }
        .tv2-clip {
          position: absolute; inset: 0;
          clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 44% 100%);
          will-change: clip-path;
        }
        .tv2-clip img {
          width: 100%; height: 100%; object-fit: cover;
          filter: grayscale(0.1) brightness(0.6);
        }
        .tv2-clip::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.3) 100%);
        }
        .tv2-labels {
          position: absolute; inset: 0; z-index: 3;
          display: flex; pointer-events: none;
        }
        .tv2-label-col {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding-bottom: 100px;
          transition: opacity 0.4s ease;
        }
        .tv2-eyebrow {
          font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-bottom: 16px;
        }
        .tv2-label {
          color: #f4f4f2;
          font-size: clamp(46px, 6.5vw, 100px);
          line-height: 0.95;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .tv2-label-col.dim .tv2-label { opacity: 0.35; }
        .tv2-label-col.dim .tv2-eyebrow { opacity: 0.3; }
        .tv2-cursor {
          position: absolute; top: 0; left: 0;
          width: 96px; height: 96px; border-radius: 50%;
          background: rgba(255,255,255,0.95);
          display: flex; align-items: center; justify-content: center;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0; pointer-events: none; z-index: 10;
          mix-blend-mode: exclusion;
        }
        .tv2-cursor span {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: #0a0a0a; font-weight: 500;
        }

        /* ── Touch / narrow screens (<1200px OR touch device) — vertical scale panels ── */
        .tv2-touch-panels { display: none; }
        .is-touch .tv2-base,
        .is-touch .tv2-clip,
        .is-touch .tv2-cursor,
        .is-touch .tv2-labels {
          display: none;
        }
        .is-touch .tv2-touch-panels {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .tv2-touch-panel {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: flex-grow 0.6s cubic-bezier(0.23,1,0.32,1);
        }
        .tv2-touch-panel.open { flex-grow: 1.5; }
        .tv2-touch-panel.closed { flex-grow: 0.6; }

        .tv2-touch-panel img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          transform: scale(1.05);
          filter: grayscale(0.35) brightness(0.5);
          transition: transform 0.6s cubic-bezier(0.23,1,0.32,1), filter 0.5s ease;
        }
        .tv2-touch-panel.open img {
          transform: scale(1.12);
          filter: grayscale(0) brightness(0.78);
        }

        .tv2-touch-panel::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.3) 100%);
        }

        .tv2-touch-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 24px;
          padding-bottom: 32px;
          text-align: center;
        }

        .tv2-touch-eyebrow {
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 10px;
        }
        .tv2-touch-label {
          color: #f4f4f2;
          font-size: clamp(30px, 9vw, 48px);
          line-height: 0.95;
          transition: opacity 0.4s ease;
        }
        .tv2-touch-panel.closed .tv2-touch-label { opacity: 0.55; }

        .tv2-touch-btn {
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #0a0a0a;
          background: #f4f4f2;
          padding: 12px 24px;
          border-radius: 100px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(8px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .tv2-touch-panel.open .tv2-touch-btn {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        .tv2-touch-btn-arrow {
          width: 14px; height: 1px; background: #0a0a0a;
          position: relative;
        }
        .tv2-touch-btn-arrow::after {
          content: '';
          position: absolute; right: 0; top: -3px;
          width: 5px; height: 5px;
          border-top: 1px solid #0a0a0a;
          border-right: 1px solid #0a0a0a;
          transform: rotate(45deg);
        }


                .tv2-touch-btn-wrap {
          margin-top: 18px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(8px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .tv2-touch-panel.open .tv2-touch-btn-wrap {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
      `}</style>

      <div className="tv2-top">

      </div>

      {/* ── Desktop version (>=1200px + fine pointer) ── */}
      <div className="tv2-base">
        <img src="/images/split/male.jpg" alt="Men" />
      </div>
      <div ref={clipRef} className="tv2-clip">
        <img src="/images/split/female.jpg" alt="Women" />
      </div>
      <div className="tv2-labels">
        <div className={`tv2-label-col ${side === "female" ? "dim" : ""}`}>
          <h2 className={`tv2-label ${playfair.className}`}>Men</h2>
        </div>
        <div className={`tv2-label-col ${side === "male" ? "dim" : ""}`}>
          <h2 className={`tv2-label ${playfair.className}`}>Women</h2>
        </div>
      </div>
      {!isTouch && (
        <>
          <Link href="/models/male" style={{ position: "absolute", inset: "0 50% 0 0", zIndex: 4 }} aria-label="View Men" />
          <Link href="/models/female" style={{ position: "absolute", inset: "0 0 0 50%", zIndex: 4 }} aria-label="View Women" />
        </>
      )}
      <div ref={cursorRef} className="tv2-cursor">
        <span className={poppins.className}>{side === "male" ? "View Men" : "View Women"}</span>
      </div>

      {/* ── Touch / narrow-screen version — vertical flex-grow scale panels ── */}
      <div className="tv2-touch-panels">
        {touchPanels.map((panel) => {
          const isOpen = activePanel === panel.id;
          return (
            <div
              key={panel.id}
              className={`tv2-touch-panel ${isOpen ? "open" : "closed"}`}
              onClick={() => setActivePanel(panel.id)}
            >
              <img src={panel.img} alt={panel.label} />
              <div className="tv2-touch-content">
                <span className={`tv2-touch-eyebrow ${poppins.className}`}>05 Talents</span>
                <h2 className={`tv2-touch-label ${playfair.className}`}>{panel.label}</h2>
                <div
                  className="tv2-touch-btn-wrap"
                  onClick={(e) => { if (!isOpen) e.stopPropagation(); }}
                >
                  <ButtonPrimary
                    label="View Roster"
                    href={panel.href}
                    color="#ffffff"
                    onClick={(e) => { if (!isOpen) e.preventDefault(); }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}