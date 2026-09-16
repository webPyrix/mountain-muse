"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonPrimary } from "@/components/ui/Button";
import { playfair, poppins } from "@/libs/Fonts";
import { lineProductionServices } from "@/app/data/Services";

gsap.registerPlugin(ScrollTrigger);

export default function LineProductionBody() {
  useEffect(() => {
    const items = document.querySelectorAll(".lpb-reveal");
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
            trigger: ".lpb-services-grid",
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
    <section className="lpb-section">
      <style>{`
        .lpb-section {
          background: #fff;
          color: #111;
        }

        /* ── Intro ── */
        .lpb-intro {
          padding: 130px var(--site-px, 52px) 0;
          max-width: 1240px;
          margin: 0 auto;
          text-align: center;
        }
        .lpb-intro-lead {
          color: #111;
          margin-bottom: 24px;
          line-height: 1.3;
        }
        .lpb-intro-body {
          color: rgba(0,0,0,0.62);
          max-width: 660px;
          margin: 0 auto 16px;
        }

        /* ── Services ── */
        .lpb-services-intro {
          max-width: 1200px;
          margin: 120px auto 0;
          padding: 0 var(--site-px, 52px);
        }
        .lpb-services-tag {
          color: rgba(0,0,0,0.4);
          display: block;
          margin-bottom: 16px;
        }
        .lpb-services-title {
          color: #111;
        }

        .lpb-services-grid {
          max-width: 1200px;
          margin: 56px auto 0;
          padding: 0 var(--site-px, 52px);
          display: grid;
          grid-template-columns: repeat(3, 1fr);

        }
        .lpb-service-item {
          padding: 44px 32px;
          border-bottom: 1px solid rgba(17,17,17,0.08);
          position: relative;
          overflow: hidden;
          transition: background 0.4s ease;
        }
        .lpb-service-item:hover { background: rgba(17,17,17,0.03); }
        .lpb-service-num {
          color: rgba(0,0,0,0.35);
          margin-bottom: 22px;
        }
        .lpb-service-title {
          color: #111;
          margin-bottom: 12px;
        }
        .lpb-service-desc {
          color: rgba(0,0,0,0.6);
        }
        .lpb-service-arrow {
          position: absolute;
          top: 40px;
          right: 28px;
          font-size: 16px;
          color: rgba(17,17,17,0.15);
          opacity: 0;
          transform: translate(-6px, 6px);
          transition: opacity 0.3s, transform 0.3s;
        }
        .lpb-service-item:hover .lpb-service-arrow {
          opacity: 1;
          transform: translate(0,0);
        }

        /* ── Shooting in Ladakh — video break ── */
        .lpb-break {
          max-width: 1200px;
          margin: 150px auto 0;
          padding: 0 var(--site-px, 52px);
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 20px;
          align-items: center;
        }
        .lpb-break-text {
          padding-right: 20px;
        }
        .lpb-break-tag {
          color: rgba(0,0,0,0.4);
          display: block;
          margin-bottom: 22px;
        }
        .lpb-break-title {
          color: #111;
          margin-bottom: 22px;
          line-height: 1.3;
        }
        .lpb-break-body {
          color: rgba(0,0,0,0.62);
          margin-bottom: 16px;
        }
        .lpb-break-media {
          position: relative;
          height: 480px;
          border-radius: 4px;
          overflow: hidden;
        }
        .lpb-break-media video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ── Locations strip ── */
        .lpb-locations {
          max-width: 1200px;
          margin: 90px auto 0;
          padding: 0 var(--site-px, 52px);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .lpb-location-item {
          position: relative;
          height: 220px;
          border-radius: 4px;
          overflow: hidden;
        }
        .lpb-location-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.9s cubic-bezier(0.23,1,0.32,1);
        }
        .lpb-location-item:hover img { transform: scale(1.08); }
        .lpb-location-item::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.65) 0%, transparent 55%);
        }
        .lpb-location-name {
          position: absolute;
          bottom: 16px;
          left: 16px;
          z-index: 2;
          color: #fff;
        }

        /* ── Playground statement ── */
        .lpb-playground {
          max-width: 900px;
          margin: 100px auto 0;
          padding: 0 var(--site-px, 52px);
          text-align: center;
        }
        .lpb-playground-tag {
          color: rgba(0,0,0,0.4);
          display: block;
          margin-bottom: 24px;
        }
        .lpb-playground-title {
          color: #111;
          margin-bottom: 24px;
          line-height: 1.3;
        }
        .lpb-playground-body {
          color: rgba(0,0,0,0.6);
          margin-bottom: 20px;
        }
        .lpb-playground-line {
          font-style: italic;
          color: #111;
        }

        /* ── Closing — dark ── */
        .lpb-closing {
          margin-top: 150px;
          padding: 110px var(--site-px, 52px) 130px;
          text-align: center;
          background: #0a0a0a;
        }
        .lpb-closing-title {
          color: #f4f4f2;
          margin-bottom: 40px;
        }
        .lpb-closing-title em {
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(244,244,242,0.55);
        }

        @media (max-width: 980px) {
          .lpb-services-grid { grid-template-columns: repeat(2, 1fr); }
          .lpb-break { grid-template-columns: 1fr; }
          .lpb-break-text { padding-right: 0; margin-bottom: 24px; }
          .lpb-break-media { height: 360px; }
          .lpb-locations { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .lpb-services-grid { grid-template-columns: 1fr; }
          .lpb-services-grid { margin-top: 20px; }
          .lpb-services-grid { padding: 0px var(--site-px, 52px) 110px; }
          .lpb-intro { padding-top: 100px }
          .lpb-break { margin-top: 20px; }
          .lpb-playground { margin-top: 100px }
          .lpb-playground-tag { margin-bottom: 15px;}
          .lpb-closing { margin-top: 100px }
          .lpb-service-item { padding: 40px 15px; }
        }
      `}</style>

      {/* Intro */}
      <div className="lpb-intro">
        <p className={`lpb-intro-lead heading-sub ${playfair.className}`}>
          Ladakh offers an extraordinary visual landscape — from high altitude
          deserts and dramatic mountain ranges to lakes, valleys, traditional
          villages, monasteries and unique cultural settings.
        </p>
        <p className={`lpb-intro-body para ${poppins.className}`}>
          But producing in Ladakh requires more than finding a beautiful location.
          It requires local knowledge, planning, relationships and an experienced
          team on the ground.
        </p>
        <p className={`lpb-intro-body para ${poppins.className}`}>
          That is where Mountain Muse comes in. We act as your local production
          partner, helping you navigate the practicalities of shooting in Ladakh
          while ensuring your creative vision remains at the centre of the
          production.
        </p>
      </div>

      {/* Services */}
      <div className="lpb-services-intro">
        <span className={`sub_head lpb-services-tag ${poppins.className}`}>What We Handle</span>
        <h2 className={`lpb-services-title heading-sub ${playfair.className}`}>Our Line Production Services</h2>
      </div>

      <div className="lpb-services-grid">
        {lineProductionServices.map((s) => (
          <div key={s.num} className="lpb-service-item lpb-reveal">
            <div className={`sub_head lpb-service-num ${poppins.className}`}>{s.num}</div>
            <h3 className={`lpb-service-title heading-h3 ${playfair.className}`}>{s.title}</h3>
            <p className={`lpb-service-desc para ${poppins.className}`}>{s.desc}</p>
            <span className="lpb-service-arrow">↗</span>
          </div>
        ))}
      </div>

      {/* Shooting in Ladakh — text + video */}
      <div className="lpb-break">
        <div className="lpb-break-text">
          <span className={`sub_head lpb-break-tag ${poppins.className}`}>Shooting In Ladakh</span>
          <h2 className={`lpb-break-title heading-sub ${playfair.className}`}>
            Every location comes with its own possibilities and challenges.
          </h2>
          <p className={`lpb-break-body para ${poppins.className}`}>
            Altitude, weather, distances, road conditions, seasonal accessibility
            and local regulations can all influence a production. Our local
            presence allows us to anticipate these realities and plan accordingly.
          </p>
          <p className={`lpb-break-body para ${poppins.className}`}>
            Whether you're planning a fashion campaign in Leh, a commercial shoot
            in Nubra, an editorial around Pangong Lake, a film in Zanskar or a
            larger production across multiple locations — Mountain Muse can help
            bring the project together.
          </p>
        </div>
        <div className="lpb-break-media">
          <video src="/images/index/filming/video1.MOV" autoPlay muted loop playsInline />
        </div>
      </div>

      {/* Locations strip */}
      <div className="lpb-locations">
        {[
          { name: "Leh", img: "/images/index/about.jpeg" },
          { name: "Nubra Valley", img: "/images/index/sheep.JPG" },
          { name: "Pangong Lake", img: "/images/index/gallery.jpg" },
          { name: "Zanskar", img: "/images/index/creative.jpg" },
        ].map((loc) => (
          <div key={loc.name} className="lpb-location-item">
            <img src={loc.img} alt={loc.name} />
            <span className={`sub_head lpb-location-name ${poppins.className}`}>{loc.name}</span>
          </div>
        ))}
      </div>

      {/* Playground statement */}
      <div className="lpb-playground">
        <span className={`sub_head lpb-playground-tag ${poppins.className}`}>Ladakh, Our Creative Playground</span>
        <h2 className={`lpb-playground-title heading-sub ${playfair.className}`}>
          Ladakh is our home.
        </h2>
        <p className={`lpb-playground-body para ${poppins.className}`}>
          We know its landscapes, people, seasons and production ecosystem — and
          we know that the most compelling stories often exist beyond the obvious
          locations.
        </p>
        <p className={`lpb-playground-line heading-h3 ${playfair.className}`}>
          Your idea. Our mountains.
        </p>
      </div>

      {/* Closing */}
      <div className="lpb-closing">
        <h2 className={`lpb-closing-title heading-sub ${playfair.className}`}>
          Plan a production <em>in Ladakh.</em>
        </h2>
        <ButtonPrimary label="Plan A Production" href="/contact" color="#ffffff" />
      </div>
    </section>
  );
}