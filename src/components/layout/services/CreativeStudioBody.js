"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonPrimary } from "@/components/ui/Button";
import { playfair, poppins } from "@/libs/Fonts";
import { creativeServices } from "@/app/data/Services";

gsap.registerPlugin(ScrollTrigger);

export default function CreativeStudioBody() {
  useEffect(() => {
    const items = document.querySelectorAll(".csb-reveal");
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
            trigger: ".csb-services-grid",
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
    <section className="csb-section">
      <style>{`
        .csb-section {
          background: #fff;
          color: #111;
        }

        /* ── Intro statement ── */
        .csb-intro {
          padding: 130px var(--site-px, 52px) 0;
          max-width: 1240px;
          margin: 0 auto;
          text-align: center;
        }
        .csb-intro-lead {
          color: #111;
          margin-bottom: 24px;
          line-height: 1.3;
        }
        .csb-intro-body {
          color: rgba(0,0,0,0.62);
          max-width: 660px;
          margin: 0 auto;
        }

        /* ── Services ── */
        .csb-services-intro {
          max-width: 1200px;
          margin: 120px auto 0;
          padding: 0 var(--site-px, 52px);
        }
        .csb-services-tag {
          color: rgba(0,0,0,0.4);
          display: block;
          margin-bottom: 16px;
        }
        .csb-services-title {
          color: #111;
        }

        .csb-services-grid {
          max-width: 1200px;
          margin: 56px auto 0;
          padding: 0 var(--site-px, 52px);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .csb-service-item {
          padding: 44px 32px;
          border-bottom: 1px solid rgba(17,17,17,0.08);
          position: relative;
          overflow: hidden;
          transition: background 0.4s ease;
        }
        .csb-service-item:hover { background: rgba(17,17,17,0.03); }
        .csb-service-num {
          color: rgba(0,0,0,0.35);
          margin-bottom: 22px;
        }
        .csb-service-title {
          color: #111;
          margin-bottom: 12px;
        }
        .csb-service-desc {
          color: rgba(0,0,0,0.6);
        }
        .csb-service-arrow {
          position: absolute;
          top: 40px;
          right: 28px;
          font-size: 16px;
          color: rgba(17,17,17,0.15);
          opacity: 0;
          transform: translate(-6px, 6px);
          transition: opacity 0.3s, transform 0.3s;
        }
        .csb-service-item:hover .csb-service-arrow {
          opacity: 1;
          transform: translate(0,0);
        }

        /* ── Bespoke experiences ── */
        .csb-bespoke {
          max-width: 900px;
          margin: 150px auto 0;
          padding: 0 var(--site-px, 52px);
          text-align: center;
        }
        .csb-bespoke-tag {
          color: rgba(0,0,0,0.4);
          display: block;
          margin-bottom: 24px;
        }
        .csb-bespoke-title {
          color: #111;
          margin-bottom: 32px;
        }
        .csb-bespoke-body {
          color: rgba(0,0,0,0.62);
          max-width: 700px;
          margin: 0 auto 18px;
        }

        /* ── Image + video break ── */
        .csb-break {
          max-width: 1200px;
          margin: 90px auto 0;
          padding: 0 var(--site-px, 52px);
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 20px;
        }
        .csb-break-main, .csb-break-side {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
        }
        .csb-break-main { height: 480px; }
        .csb-break-side { height: 480px; }
        .csb-break-main img, .csb-break-main video,
        .csb-break-side img, .csb-break-side video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .csb-break-main::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 50%);
        }
        .csb-break-caption {
          position: absolute;
          bottom: 32px;
          left: 32px;
          right: 32px;
          z-index: 2;
        }
        .csb-break-eyebrow {
          color: rgba(255,255,255,0.7);
          margin-bottom: 12px;
          display: block;
        }
        .csb-break-title {
          color: #f7f6f3;
        }

        /* ── Beyond the postcard ── */
        .csb-postcard {
          margin: 100px auto 0;
          padding: 0 var(--site-px, 52px);
          text-align: center;
        }
        .csb-postcard-line {
          color: rgba(0,0,0,0.7);
        }
        .csb-postcard-line em {
          font-style: italic;
          color: #111;
        }

        /* ── Concept to frame ── */
        .csb-concept {
          max-width: 780px;
          margin: 130px auto 0;
          padding: 0 var(--site-px, 52px);
          text-align: center;
        }
        .csb-concept-tag {
          color: rgba(0,0,0,0.4);
          display: block;
          margin-bottom: 24px;
        }
        .csb-concept-title {
          color: #111;
          margin-bottom: 24px;
          line-height: 1.3;
        }
        .csb-concept-body {
          color: rgba(0,0,0,0.6);
        }

        /* ── Closing — dark break for contrast ── */
        .csb-closing {
          margin-top: 150px;
          padding: 110px var(--site-px, 52px) 130px;
          text-align: center;
          background: #0a0a0a;
        }
        .csb-closing-title {
          color: #f4f4f2;
          margin-bottom: 40px;
        }
        .csb-closing-title em {
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(244,244,242,0.55);
        }

        @media (max-width: 980px) {
          .csb-services-grid { grid-template-columns: repeat(2, 1fr); }
          .csb-break { grid-template-columns: 1fr; }
          .csb-break-main, .csb-break-side { height: 320px; }
        }
        @media (max-width: 640px) {
          .csb-services-grid { grid-template-columns: 1fr; }
          .csb-services-grid { margin-top: 20px; } 
          .csb-services-grid { padding: 0px var(--site-px, 52px) 110px; }
          .csb-intro {padding-top: 100px}
          .csb-bespoke { margin-top: 0 }
          .csb-break {margin-top: 20px;}
          .csb-closing { margin-top: 100px }
          .csb-service-item { padding: 40px 15px;}
        }
      `}</style>

      {/* Intro */}
      <div className="csb-intro">
        <p className={`csb-intro-lead heading-sub ${playfair.className}`}>
          Mountain Muse Creative Studio is our creative arm — developing and
          producing visual stories for brands, designers, artists, photographers,
          filmmakers and creative teams.
        </p>
        <p className={`csb-intro-body para ${poppins.className}`}>
          We work across fashion, advertising, lifestyle, travel, tourism and
          culture, creating visual content that is contemporary, distinctive and
          rooted in a strong sense of place. From the first idea to the final
          frame, we bring together creative direction, concept, talent, locations,
          photography, film and production into one cohesive story.
        </p>
      </div>

      {/* Services */}
      <div className="csb-services-intro">
        <span className={`sub_head csb-services-tag ${poppins.className}`}>What We Do</span>
        <h2 className={`csb-services-title heading-sub ${playfair.className}`}>Our Creative Services</h2>
      </div>

      <div className="csb-services-grid">
        {creativeServices.map((s) => (
          <div key={s.num} className="csb-service-item csb-reveal">
            <div className={`sub_head csb-service-num ${poppins.className}`}>{s.num}</div>
            <h3 className={`csb-service-title heading-h3 ${playfair.className}`}>{s.title}</h3>
            <p className={`csb-service-desc para ${poppins.className}`}>{s.desc}</p>
            <span className="csb-service-arrow">↗</span>
          </div>
        ))}
      </div>

      {/* Bespoke experiences */}
      <div className="csb-bespoke">
        <span className={`sub_head csb-bespoke-tag ${poppins.className}`}>Bespoke Photography &amp; Film Experiences</span>
        <h2 className={`csb-bespoke-title heading-sub ${playfair.className}`}>Ladakh, through a different lens.</h2>
        <p className={`csb-bespoke-body para ${poppins.className}`}>
          Mountain Muse creates curated photography and filmmaking experiences
          across Ladakh for photographers, filmmakers, artists, brands and creative
          teams looking to create exceptional visual work in extraordinary
          landscapes.
        </p>
        <p className={`csb-bespoke-body para ${poppins.className}`}>
          From intimate photography expeditions and fashion shoots to cinematic
          productions and bespoke creative journeys, we bring together locations,
          talent, local experiences and production support around your creative
          vision.
        </p>
      </div>

      {/* Image + video break */}
      <div className="csb-break">
        <div className="csb-break-main">
          <video src="/images/index/filming/shoot2.mp4" autoPlay muted loop playsInline />
          <div className="csb-break-caption">
            <span className={`sub_head csb-break-eyebrow ${poppins.className}`}>On Location</span>
            <h3 className={`csb-break-title heading-h3 ${playfair.className}`}>Local knowledge, creative network.</h3>
          </div>
        </div>
        <div className="csb-break-side">
          <img src="/images/index/creative.jpg" alt="Ladakh creative production" />
        </div>
      </div>

      {/* Beyond the postcard */}
      <div className="csb-postcard">
        <p className={`csb-postcard-line heading-h3 ${playfair.className}`}>
          We don't simply take you to beautiful places.<br />
          We help you create <em>something worth photographing.</em>
        </p>
      </div>

      {/* Concept to final frame */}
      <div className="csb-concept">
        <span className={`sub_head csb-concept-tag ${poppins.className}`}>From Concept To Final Frame</span>
        <h2 className={`csb-concept-title heading-sub ${playfair.className}`}>
          Where a strong idea meets the right people, place and perspective.
        </h2>
        <p className={`csb-concept-body para ${poppins.className}`}>
          Our creative studio can work with an existing brief or collaborate with
          you from the very beginning — developing the concept, sourcing talent,
          scouting locations and managing production through to the final visual
          output.
        </p>
      </div>

      {/* Closing */}
      <div className="csb-closing">
        <h2 className={`csb-closing-title heading-sub ${playfair.className}`}>
          Rooted in Ladakh. <em>Created for everywhere.</em>
        </h2>
        <ButtonPrimary label="Explore Our Work" href="/portfolio" color="#ffffff" />
      </div>
    </section>
  );
}