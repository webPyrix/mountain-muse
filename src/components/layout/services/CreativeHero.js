"use client";
import { useEffect, useRef } from "react";
import Menu from "@/components/layout/Menu";
import { playfair, poppins } from "@/libs/Fonts";

export default function CreativeHero() {
  const rootRef = useRef(null);

  useEffect(() => {
    let ctx;
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        tl.to(".ch-coords", { opacity: 1, duration: 0.9, ease: "power2.out" })
          .to(".ch-line", { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.09 }, "-=0.5")
          .to(".ch-side", { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.9")
          .to(".ch-scroll", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");
      }, rootRef);
    };
    load();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section className="ch-section" ref={rootRef}>
      <style>{`
        .ch-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          min-height: 700px;
          background: #0a0a0a;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }

        .ch-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .ch-vignette {
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

        .ch-coords {
          position: absolute;
          top: 44px;
          left: var(--site-px, 52px);
          z-index: 5;
          display: flex;
          gap: 28px;
          opacity: 0;
        }
        .ch-coords span {
          color: rgba(255,255,255,0.4);
        }
        .ch-coords span b {
          color: rgba(255,255,255,0.75);
          font-weight: 400;
        }

        .ch-side {
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

        .ch-content {
          position: relative;
          z-index: 5;
          padding: 0 var(--site-px, 52px) 120px;
          max-width: 900px;
        }

        .ch-eyebrow {
          color: rgba(255,255,255,0.45);
          margin-bottom: 24px;
          overflow: hidden;
        }

        .ch-title { color: #f4f4f2; }
        .ch-title em {
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(244,244,242,0.55);
        }

        .ch-line {
          opacity: 0;
          transform: translateY(28px);
        }

        .ch-sub {
          margin-top: 32px;
          max-width: 480px;
          color: rgba(255,255,255,0.55);
        }

        .ch-scroll {
          position: absolute;
          bottom: 44px;
          left: var(--site-px, 52px);
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 14px;
          opacity: 0;
        }
        .ch-scroll-text {
          color: rgba(255,255,255,0.4);
        }
        .ch-scroll-line {
          width: 44px;
          height: 1px;
          background: rgba(255,255,255,0.25);
          position: relative;
          overflow: hidden;
        }
        .ch-scroll-line::after {
          content: '';
          position: absolute;
          left: -100%;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.7);
          animation: chScroll 2.2s ease infinite;
        }
        @keyframes chScroll {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @media (max-width: 768px) {
          .ch-side { display: none; }
          .ch-coords { flex-wrap: wrap; }
        }
      `}</style>

      <Menu />

      <video
        className="ch-media"
        src="/videos/creative.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="ch-vignette" />

      {/* <div className="ch-coords">
        <span>Ladakh, India</span>
        <span>34°09′ N <b>77°34′ E</b></span>
      </div> */}

      {/* <span className="ch-side" aria-hidden="true">Mountain Muse — Creative Studio</span> */}

      <div className="ch-content">
        <div className={`ch-eyebrow sub_head ${poppins.className}`}>
          <span className="ch-line" style={{ display: "block" }}>Creative Studio</span>
        </div>
        <h1 className={`ch-title heading-hero ${playfair.className}`}>
          <span className="ch-line" style={{ display: "block" }}>We turn ideas</span>
          <span className="ch-line" style={{ display: "block" }}>into images.</span>
        </h1>
        <p className={`ch-sub para ${poppins.className} ch-line`}>
          Developing and producing visual stories for brands, designers, artists,
          photographers and filmmakers — from the first idea to the final frame.
        </p>
      </div>

      <div className="ch-scroll">
        <span className={`ch-scroll-text sub_head ${poppins.className}`}>Scroll</span>
        <span className="ch-scroll-line" />
      </div>
    </section>
  );
}