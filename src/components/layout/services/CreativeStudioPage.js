"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonPrimary } from "@/components/ui/Button";
import { playfair, poppins } from "@/libs/Fonts";
import { creativeServices } from "@/app/data/Services";

gsap.registerPlugin(ScrollTrigger);

export default function CreativeStudioPage() {
  useEffect(() => {
    const items = document.querySelectorAll(".cst-reveal");
    if (items.length > 0) {
      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".cst-services-grid",
            start: "top 82%",
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
    <section className="cst-section">
      <style>{`
        .cst-section {
          background: #0a0a0a;
          color: #f4f4f2;
        }

        /* ── Hero ── */
        .cst-hero {
          padding: 200px 52px 120px;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .cst-hero-tag {
          color: rgba(255,255,255,0.45);
          margin-bottom: 28px;
          display: block;
        }
        .cst-hero-title {
          color: #f4f4f2;
          margin-bottom: 32px;
          font-size: clamp(34px, 4.4vw, 64px);
        }
        .cst-hero-body {
          color: rgba(255,255,255,0.65);
          font-size: 14px;
          line-height: 2;
          max-width: 680px;
          margin: 0 auto 16px;
        }

        /* ── Services grid ── */
        .cst-services-intro {
          max-width: 1200px;
          margin: 100px auto 0;
          padding: 0 52px;
        }
        .cst-services-tag {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          display: block;
          margin-bottom: 16px;
        }
        .cst-services-title {
          color: #f4f4f2;
          font-size: clamp(26px, 3vw, 40px);
        }

        .cst-services-grid {
          max-width: 1200px;
          margin: 56px auto 0;
          padding: 0 52px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(255,255,255,0.08);
          border-left: 1px solid rgba(255,255,255,0.08);
        }
        .cst-service-item {
          padding: 44px 32px;
          border-right: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
          transition: background 0.4s ease;
        }
        .cst-service-item:hover { background: rgba(255,255,255,0.04); }
        .cst-service-num {
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 22px;
        }
        .cst-service-title {
          color: #f4f4f2;
          font-size: 16px;
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .cst-service-desc {
          color: rgba(255,255,255,0.55);
          font-size: 12.5px;
          line-height: 1.7;
        }
        .cst-service-arrow {
          position: absolute;
          top: 40px;
          right: 28px;
          font-size: 16px;
          color: rgba(255,255,255,0.15);
          opacity: 0;
          transform: translate(-6px, 6px);
          transition: opacity 0.3s, transform 0.3s;
        }
        .cst-service-item:hover .cst-service-arrow {
          opacity: 1;
          transform: translate(0,0);
        }

        /* ── Bespoke experiences ── */
        .cst-bespoke {
          max-width: 1000px;
          margin: 140px auto 0;
          padding: 0 52px;
          text-align: center;
        }
        .cst-bespoke-tag {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          display: block;
          margin-bottom: 24px;
        }
        .cst-bespoke-title {
          color: #f4f4f2;
          font-size: clamp(26px, 3.2vw, 42px);
          margin-bottom: 32px;
        }
        .cst-bespoke-body {
          color: rgba(255,255,255,0.62);
          font-size: 13.5px;
          line-height: 2;
          max-width: 720px;
          margin: 0 auto 18px;
        }

        /* ── Image break ── */
        .cst-break {
          max-width: 1200px;
          margin: 90px auto 0;
          padding: 0 52px;
        }
        .cst-break-inner {
          position: relative;
          height: 480px;
          border-radius: 4px;
          overflow: hidden;
        }
        .cst-break-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .cst-break-inner::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.65) 0%, transparent 50%);
        }
        .cst-break-caption {
          position: absolute;
          bottom: 40px;
          left: 40px;
          right: 40px;
          z-index: 2;
        }
        .cst-break-eyebrow {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 14px;
          display: block;
        }
        .cst-break-title {
          color: #f7f6f3;
          font-size: clamp(22px, 2.6vw, 34px);
        }

        /* ── Beyond the postcard ── */
        .cst-postcard {
          max-width: 700px;
          margin: 110px auto 0;
          padding: 0 52px;
          text-align: center;
        }
        .cst-postcard-line {
          color: rgba(255,255,255,0.5);
          font-size: 15px;
          line-height: 1.8;
        }
        .cst-postcard-line strong {
          color: #f4f4f2;
          font-weight: 500;
          font-style: italic;
          font-family: ${playfair.className ? "inherit" : "inherit"};
        }

        /* ── Concept to frame ── */
        .cst-concept {
          max-width: 780px;
          margin: 110px auto 0;
          padding: 0 52px;
          text-align: center;
        }
        .cst-concept-tag {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          display: block;
          margin-bottom: 24px;
        }
        .cst-concept-title {
          color: #f4f4f2;
          font-size: clamp(24px, 2.8vw, 36px);
          margin-bottom: 24px;
        }
        .cst-concept-body {
          color: rgba(255,255,255,0.6);
          font-size: 13.5px;
          line-height: 2;
        }

        /* ── Closing ── */
        .cst-closing {
          margin-top: 140px;
          padding: 100px 52px 160px;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .cst-closing-title {
          color: #f4f4f2;
          font-size: clamp(24px, 2.6vw, 36px);
          margin-bottom: 40px;
        }
        .cst-closing-title em {
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(244,244,242,0.55);
        }

        @media (max-width: 980px) {
          .cst-services-grid { grid-template-columns: repeat(2, 1fr); }
          .cst-break-inner { height: 320px; }
        }
        @media (max-width: 640px) {
          .cst-services-grid { grid-template-columns: 1fr; }
          .cst-hero { padding: 150px 24px 80px; }
          .cst-services-intro, .cst-services-grid, .cst-bespoke, .cst-break, .cst-postcard, .cst-concept, .cst-closing {
            padding-left: 24px;
            padding-right: 24px;
          }
        }
      `}</style>

      {/* Hero */}
      <div className="cst-hero">
        <span className={`sub_head cst-hero-tag ${poppins.className}`}>Creative Studio</span>
        <h1 className={`cst-hero-title ${playfair.className}`}>
          We turn ideas <em style={{ fontStyle: "italic", color: "rgba(244,244,242,0.6)" }}>into images.</em>
        </h1>
        <p className={`cst-hero-body ${poppins.className}`}>
          Mountain Muse Creative Studio is our creative arm — developing and producing
          visual stories for brands, designers, artists, photographers, filmmakers
          and creative teams.
        </p>
        <p className={`cst-hero-body ${poppins.className}`}>
          We work across fashion, advertising, lifestyle, travel, tourism and culture,
          creating visual content that is contemporary, distinctive and rooted in a
          strong sense of place. From the first idea to the final frame, we bring
          together creative direction, concept, talent, locations, photography, film
          and production into one cohesive story.
        </p>
      </div>

      {/* Services */}
      <div className="cst-services-intro">
        <span className={`cst-services-tag ${poppins.className}`}>What We Do</span>
        <h2 className={`cst-services-title ${playfair.className}`}>Our Creative Services</h2>
      </div>

      <div className="cst-services-grid">
        {creativeServices.map((s) => (
          <div key={s.num} className="cst-service-item cst-reveal">
            <div className={`cst-service-num ${poppins.className}`}>{s.num}</div>
            <h3 className={`cst-service-title ${playfair.className}`}>{s.title}</h3>
            <p className={`cst-service-desc ${poppins.className}`}>{s.desc}</p>
            <span className="cst-service-arrow">↗</span>
          </div>
        ))}
      </div>

      {/* Bespoke experiences */}
      <div className="cst-bespoke">
        <span className={`cst-bespoke-tag ${poppins.className}`}>Bespoke Photography &amp; Film Experiences</span>
        <h2 className={`cst-bespoke-title ${playfair.className}`}>Ladakh, through a different lens.</h2>
        <p className={`cst-bespoke-body ${poppins.className}`}>
          Mountain Muse creates curated photography and filmmaking experiences across
          Ladakh for photographers, filmmakers, artists, brands and creative teams
          looking to create exceptional visual work in extraordinary landscapes.
        </p>
        <p className={`cst-bespoke-body ${poppins.className}`}>
          From intimate photography expeditions and fashion shoots to cinematic
          productions and bespoke creative journeys, we bring together locations,
          talent, local experiences and production support around your creative
          vision — whether that's a fashion story in the high altitude desert or a
          cinematic film across multiple locations.
        </p>
      </div>

      {/* Image break */}
      <div className="cst-break">
        <div className="cst-break-inner">
          <img src="/images/index/creative.jpg" alt="Ladakh creative production" />
          <div className="cst-break-caption">
            <span className={`cst-break-eyebrow ${poppins.className}`}>Rooted In Ladakh</span>
            <h3 className={`cst-break-title ${playfair.className}`}>
              Local knowledge, creative network, extraordinary landscapes.
            </h3>
          </div>
        </div>
      </div>

      {/* Beyond the postcard */}
      <div className="cst-postcard">
        <p className={`cst-postcard-line ${playfair.className}`}>
          We don't simply take you to beautiful places.<br />
          We help you create <em>something worth photographing.</em>
        </p>
      </div>

      {/* Concept to final frame */}
      <div className="cst-concept">
        <span className={`sub_head cst-concept-tag ${poppins.className}`}>From Concept To Final Frame</span>
        <h2 className={`cst-concept-title ${playfair.className}`}>
          Where a strong idea meets the right people, place and perspective.
        </h2>
        <p className={`cst-concept-body ${poppins.className}`}>
          Our creative studio can work with an existing brief or collaborate with you
          from the very beginning — developing the concept, sourcing talent, scouting
          locations and managing production through to the final visual output.
        </p>
      </div>

      {/* Closing */}
      <div className="cst-closing">
        <h2 className={`cst-closing-title ${playfair.className}`}>
          Rooted in Ladakh. <em>Created for everywhere.</em>
        </h2>
        <ButtonPrimary label="Explore Our Work" href="/portfolio" color="#ffffff" />
      </div>
    </section>
  );
}