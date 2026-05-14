"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const IMAGES = [
  { src: "/images/index/about.jpeg",          caption: "Behind the Lens • Ladakh" },
  { src: "/images/models/model1.jpg",          caption: "Talent • Movement" },
  { src: "/images/models/model4.jpg",          caption: "Production • Extreme" },
  { src: "/images/index/filming/shoot1.mp4",   caption: "On Location • Altitude" },
  { src: "/images/models/model3.jpg",          caption: "Creative Direction" },
  { src: "/images/models/model7.PNG",          caption: "Final Frame" },
];

const ITEMS = [...IMAGES, ...IMAGES];

const AUTO_SPEED = 0.9;  // px/frame when idle — bump this if you want faster auto
const MAX_SPEED  = 6;    // max drag speed (increased from 3.5)
const LERP       = 0.06; // smoothing — lower = more buttery, higher = snappier

function lerp(a, b, t) { return a + (b - a) * t; }

export default function DragCarousel() {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const cursorRef   = useRef(null);
  const arrowRef    = useRef(null);
  const rafRef      = useRef(null);
  const posX        = useRef(0);
  const velRef      = useRef(AUTO_SPEED);
  const targetVel   = useRef(AUTO_SPEED);
  const mouseInside = useRef(false);
  const halfRef     = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    const cursor  = cursorRef.current;
    const arrow   = arrowRef.current;

    halfRef.current = track.scrollWidth / 2;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3.out" });

    const onMouseMove = (e) => {
      const rect  = section.getBoundingClientRect();
      const mx    = e.clientX - rect.left;
      const my    = e.clientY - rect.top;

      xTo(mx);
      yTo(my);

      // -1 (far left) → +1 (far right)
      const ratio = Math.max(-1, Math.min(1, (mx - rect.width / 2) / (rect.width * 0.45)));

      gsap.to(arrow, { rotation: ratio >= 0 ? 0 : 180, duration: 0.3, ease: "power2.out" });

      // ratio > 0 → scroll right → posX decreases → positive target vel
      targetVel.current = ratio * MAX_SPEED;
    };

    const onMouseEnter = () => {
      mouseInside.current = true;
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
    };

    const onMouseLeave = () => {
      mouseInside.current = false;
      targetVel.current = AUTO_SPEED;
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    };

    section.addEventListener("mousemove",  onMouseMove);
    section.addEventListener("mouseenter", onMouseEnter);
    section.addEventListener("mouseleave", onMouseLeave);

    const HALF = halfRef.current;

    const tick = () => {
      // When outside, always pull target back to AUTO_SPEED
      if (!mouseInside.current) {
        targetVel.current = AUTO_SPEED;
      }

      // Single lerp — no snapping, no friction toggle, perfectly continuous
      velRef.current = lerp(velRef.current, targetVel.current, LERP);

      posX.current -= velRef.current;

      if (posX.current <= -HALF) posX.current += HALF;
      if (posX.current >= 0)      posX.current -= HALF;

      gsap.set(track, { x: posX.current });
      rafRef.current = requestAnimationFrame(tick);
    };

    posX.current = -1;
    velRef.current = AUTO_SPEED;
    rafRef.current = requestAnimationFrame(tick);

    gsap.set(cursor, { x: 0, y: 0, scale: 0, opacity: 0 });

    return () => {
      section.removeEventListener("mousemove",  onMouseMove);
      section.removeEventListener("mouseenter", onMouseEnter);
      section.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        .drag-carousel-section {
          position: relative;
          width: 100vw;
          height: 90vh;
          overflow: hidden;
          background: #0d0d0d;
          margin-bottom: 180px;
          cursor: none;
        }
        .drag-cursor {
          position: absolute;
          top: 0;
          left: 0;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 100;
          transform: translate(-50%, -50%) scale(0);
          will-change: transform;
          mix-blend-mode: exclusion;
        }
        .drag-cursor-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          transform-origin: center;
        }
        .drag-cursor-arrow svg {
          width: 28px;
          height: 28px;
        }
        .drag-track {
          display: flex;
          height: 100%;
          width: max-content;
          will-change: transform;
        }
        .drag-item {
          position: relative;
          min-width: 100vw;
          height: 100%;
          overflow: hidden;
          flex-shrink: 0;
        }
        .drag-item img,
        .drag-item video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
          user-select: none;
        }
        .drag-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.08) 0%,
            transparent 40%,
            rgba(0,0,0,0.72) 100%
          );
          z-index: 2;
        }
        .drag-caption {
          position: absolute;
          bottom: 56px;
          left: 52px;
          color: rgba(255,255,255,0.78);
          z-index: 3;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          font-family: 'Courier New', monospace;
          pointer-events: none;
        }
        .drag-index {
          position: absolute;
          bottom: 56px;
          right: 52px;
          color: rgba(255,255,255,0.35);
          z-index: 3;
          font-size: 11px;
          letter-spacing: 2px;
          font-family: 'Courier New', monospace;
          pointer-events: none;
        }
        .drag-hint {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          color: rgba(255,255,255,0.22);
          font-size: 10px;
          letter-spacing: 5px;
          text-transform: uppercase;
          font-family: 'Courier New', monospace;
          padding-bottom: 20px;
          pointer-events: none;
        }
      `}</style>

      <div className="drag-carousel-section" ref={sectionRef}>
        <div className="drag-cursor" ref={cursorRef}>
          <div className="drag-cursor-arrow" ref={arrowRef}>
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 14H23M23 14L16 7M23 14L16 21"
                stroke="#0d0d0d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="drag-track" ref={trackRef}>
          {ITEMS.map(({ src, caption }, i) => {
            const isVideo = src.endsWith(".mp4");
            const idx     = (i % IMAGES.length) + 1;
            return (
              <div key={i} className="drag-item">
                {isVideo ? (
                  <video src={src} autoPlay muted loop playsInline />
                ) : (
                  <img src={src} alt={caption} draggable={false} />
                )}
                <div className="drag-overlay" />
                <div className="drag-caption">{caption}</div>
                <div className="drag-index">
                  {String(idx).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>

        <div className="drag-hint">drag to explore</div>
      </div>
    </>
  );
}