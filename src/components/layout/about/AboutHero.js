"use client";
import { useEffect, useRef } from "react";
import Menu from "@/components/layout/Menu";

// fonts
import { playfair, poppins } from "@/libs/Fonts";

export default function AboutHero() {
  const rootRef = useRef(null);

  useEffect(() => {
    let ctx;
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        tl.to(".ah-coords", { opacity: 1, duration: 0.9, ease: "power2.out" })
          .to(
            ".ah-contour path",
            { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", stagger: 0.06 },
            "-=0.5"
          )
          .to(
            ".ah-line",
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.09 },
            "-=1.6"
          )
          .to(".ah-side", { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.9")
          .to(".ah-scroll", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");


      }, rootRef);
    };
    load();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section className="ah-section" ref={rootRef}>
      <style>{`
        .ah-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          min-height: 700px;
          background: #0a0a0a;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }

        .ah-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .ah-contour {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .ah-contour path {
          fill: none;
          stroke: rgba(255,255,255,0.09);
          stroke-width: 1;
          stroke-dasharray: 2400;
          stroke-dashoffset: 2400;
        }
        .ah-contour path:nth-child(3n) {
          stroke: rgba(255,255,255,0.15);
        }

        .ah-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(6, 1, 1, 0.75) 0%,
            rgba(0, 0, 0, 0.34) 50%,
            rgba(0, 0, 0, 0.3) 100%
          );
          z-index: 2;
        }

        /* Coordinates — top, aligned to site padding */
        .ah-coords {
          position: absolute;
          top: 44px;
          left: var(--site-px, 52px);
          z-index: 5;
          display: flex;
          gap: 28px;
          opacity: 0;
        }
        .ah-coords span {
          color: rgba(255,255,255,0.4);
        }
        .ah-coords span b {
          color: rgba(255,255,255,0.75);
          font-weight: 400;
        }

        /* Vertical side label */
        .ah-side {
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

        /* Headline block */
        .ah-content {
          position: relative;
          z-index: 5;
          padding: 0 var(--site-px, 52px) 120px;
          max-width: 900px;
        }

        .ah-eyebrow {
          color: rgba(255,255,255,0.45);
          margin-bottom: 24px;
          overflow: hidden;
        }

        .ah-title {
          color: #f4f4f2;
        }
        .ah-title em {
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(244,244,242,0.55);
        }

        .ah-line {
          opacity: 0;
          transform: translateY(28px);
        }

        .ah-sub {
          margin-top: 32px;
          max-width: 480px;
          color: rgba(255,255,255,0.55);
        }

        .ah-scroll {
          position: absolute;
          bottom: 44px;
          left: var(--site-px, 52px);
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 14px;
          opacity: 0;
        }
        .ah-scroll-text {
          color: rgba(255,255,255,0.4);
        }
        .ah-scroll-line {
          width: 44px;
          height: 1px;
          background: rgba(255,255,255,0.25);
          position: relative;
          overflow: hidden;
        }
        .ah-scroll-line::after {
          content: '';
          position: absolute;
          left: -100%;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.7);
          animation: ahScroll 2.2s ease infinite;
        }
        @keyframes ahScroll {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @media (max-width: 768px) {
          .ah-side { display: none; }
          .ah-coords { flex-wrap: wrap; }
        }
      `}</style>

      <Menu />

      <video
        className="ah-video"
        src="/videos/video2.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="ah-vignette" />

      <span className={`ah-side sub_head ${poppins.className}`} aria-hidden="true"></span>

      <div className="ah-content">
        <div className={`ah-eyebrow sub_head ${poppins.className}`}>
          <span className="ah-line" style={{ display: "block" }}>Our Story</span>
        </div>
        <h1 className={`ah-title heading-hero ${playfair.className}`}>
          <span className="ah-line" style={{ display: "block" }}>M3 began w/ a simple idea.</span>
        </h1>
        <p className={`ah-sub para ${poppins.className} ah-line`}>
          There is extraordinary talent in the mountains. 
          It deserves to be discovered and given a platform.
        </p>

      </div>

      <div className="ah-scroll">
        <span className={`ah-scroll-text sub_head ${poppins.className}`}>Scroll</span>
        <span className="ah-scroll-line" />
      </div>
    </section>
  );
}