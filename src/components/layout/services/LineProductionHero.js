"use client";
import { useEffect, useRef } from "react";
import Menu from "@/components/layout/Menu";
import { playfair, poppins } from "@/libs/Fonts";

export default function LineProductionHero() {
  const rootRef = useRef(null);

  useEffect(() => {
    let ctx;
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        tl.to(".lph-coords", { opacity: 1, duration: 0.9, ease: "power2.out" })
          .to(".lph-line", { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.09 }, "-=0.5")
          .to(".lph-side", { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.9")
          .to(".lph-scroll", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");
      }, rootRef);
    };
    load();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section className="lph-section" ref={rootRef}>
      <style>{`
        .lph-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          min-height: 700px;
          background: #0a0a0a;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }

        .lph-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .lph-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(6, 1, 1, 0.7) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.32) 100%
          );
          z-index: 1;
        }

        .lph-coords {
          position: absolute;
          top: 44px;
          left: var(--site-px, 52px);
          z-index: 5;
          display: flex;
          gap: 28px;
          opacity: 0;
        }
        .lph-coords span {
          color: rgba(255,255,255,0.4);
        }
        .lph-coords span b {
          color: rgba(255,255,255,0.75);
          font-weight: 400;
        }

        .lph-side {
          position: absolute;
          right: var(--site-px, 52px);
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          transform-origin: right center;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          white-space: nowrap;
          z-index: 5;
          opacity: 0;
        }

        .lph-content {
          position: relative;
          z-index: 5;
          padding: 0 var(--site-px, 52px) 120px;
          max-width: 900px;
        }

        .lph-eyebrow {
          color: rgba(255,255,255,0.45);
          margin-bottom: 24px;
          overflow: hidden;
        }

        .lph-title { color: #f4f4f2; }
        .lph-title em {
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(244,244,242,0.55);
        }

        .lph-line {
          opacity: 0;
          transform: translateY(28px);
        }

        .lph-sub {
          margin-top: 32px;
          max-width: 520px;
          color: rgba(255,255,255,0.55);
        }

        .lph-scroll {
          position: absolute;
          bottom: 44px;
          left: var(--site-px, 52px);
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 14px;
          opacity: 0;
        }
        .lph-scroll-text {
          color: rgba(255,255,255,0.4);
        }
        .lph-scroll-line {
          width: 44px;
          height: 1px;
          background: rgba(255,255,255,0.25);
          position: relative;
          overflow: hidden;
        }
        .lph-scroll-line::after {
          content: '';
          position: absolute;
          left: -100%;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.7);
          animation: lphScroll 2.2s ease infinite;
        }
        @keyframes lphScroll {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @media (max-width: 768px) {
          .lph-side { display: none; }
          .lph-coords { flex-wrap: wrap; }
        }
      `}</style>

      <Menu />

      <video
        className="lph-media"
        src="/images/index/filming/line-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="lph-vignette" />

      <div className="lph-coords">
      </div>


      <div className="lph-content">
        <div className={`lph-eyebrow sub_head ${poppins.className}`}>
          <span className="lph-line" style={{ display: "block" }}>Line Production</span>
        </div>
        <h1 className={`lph-title heading-hero ${playfair.className}`}>
          <span className="lph-line" style={{ display: "block" }}>Your vision.</span>
          <span className="lph-line" style={{ display: "block" }}>Our terrain.</span>
        </h1>
        <p className={`lph-sub para ${poppins.className} lph-line`}>
          Professional line production and on-ground production support across
          Ladakh — for brands, agencies, production houses, photographers and
          filmmakers from across the world.
        </p>
      </div>

      <div className="lph-scroll">
        <span className={`lph-scroll-text sub_head ${poppins.className}`}>Scroll</span>
        <span className="lph-scroll-line" />
      </div>
    </section>
  );
}