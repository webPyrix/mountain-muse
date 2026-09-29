"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonPrimary } from "@/components/ui/Button";
import { playfair, poppins } from "@/libs/Fonts";
import { lineProductionServices } from "@/app/data/Services";

gsap.registerPlugin(ScrollTrigger);

// ── Masonry images ──
// `shape` controls the height (width is always the same):
// "tall" | "portrait" | "square" | "landscape"
const masonryImages = [
  { name: "",          img: "/images/linepro/line.webp",     shape: "tall" },
  { name: "", img: "/images/linepro/line3.webp",      shape: "landscape" },
  { name: "", img: "/images/linepro/line2.webp",    shape: "portrait" },
  { name: "",      img: "/images/linepro/line4.webp",   shape: "square" },
  { name: "",        img: "/images/linepro/line5.webp",    shape: "portrait" },
  { name: "",   img: "/images/linepro/line6.webp",    shape: "tall" },
  { name: "",     img: "/images/linepro/line7.webp",    shape: "square" },
  { name: "",  img: "/images/linepro/line8.webp",    shape: "landscape" },
  { name: "",       img: "/images/linepro/line9.webp",   shape: "tall" },
  { name: "",        img: "/images/linepro/line10.webp",    shape: "landscape" },
  { name: "",        img: "/images/index/creative.webp",   shape: "portrait" },
  { name: "",       img: "/images/index/sheep.webp",      shape: "square" },
];

// Top offset (px) for each column — this makes the top edge uneven.
// Column 1, 2, 3, 4 (on desktop). Adjust to taste.
const COLUMN_OFFSETS = [0, 80, 32, 112];

// 4 columns on desktop, 3 on tablet, 2 on mobile
function useColumnCount() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w <= 640 ? 2 : w <= 980 ? 3 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

export default function LineProductionBody() {
  const cols = useColumnCount();

  // Distribute images across columns (left → right, row by row)
  const columns = Array.from({ length: cols }, () => []);
  masonryImages.forEach((item, i) => columns[i % cols].push({ ...item, index: i }));

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

  // Masonry reveal — re-runs when the column count changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tiles = gsap.utils
        .toArray(".lpb-masonry-item")
        .sort((a, b) => a.dataset.index - b.dataset.index);

      if (tiles.length > 0) {
        gsap.fromTo(
          tiles,
          { y: 60, opacity: 0, clipPath: "inset(12% 0% 0% 0%)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: {
              trigger: ".lpb-masonry",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [cols]);

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

        /* ── Masonry (Pinterest style, uneven top + bottom) ── */

        .paddings{
            --offset-scale: 1;
            max-width: 1200px;
            margin: 90px auto 0px;
            padding: 0 var(--site-px, 52px);
        }

        .paddings .lpb-break-title{
            margin-bottom: 20px
        }
        .lpb-masonry {
          --offset-scale: 1;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .lpb-masonry-col {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: calc(var(--offset, 0) * var(--offset-scale) * 1px);
        }
        .lpb-masonry-item {
          position: relative;
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
          display: block;
          background: #eee;
          cursor: pointer;
        }
        .lpb-masonry-item.tall      { aspect-ratio: 3 / 4.6; }
        .lpb-masonry-item.portrait  { aspect-ratio: 3 / 4; }
        .lpb-masonry-item.square    { aspect-ratio: 1 / 1; }
        .lpb-masonry-item.landscape { aspect-ratio: 4 / 3; }

        .lpb-masonry-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          filter: saturate(0.85);
          transition: transform 1.1s cubic-bezier(0.23,1,0.32,1), filter 0.8s ease;
        }
        .lpb-masonry-item:hover img {
          transform: scale(1.1);
          filter: saturate(1.1);
        }

        /* soft gradient that deepens on hover */
        .lpb-masonry-item::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 45%, transparent 70%);
          opacity: 0.55;
          transition: opacity 0.6s ease;
          pointer-events: none;
        }
        .lpb-masonry-item:hover::after { opacity: 1; }

        /* thin inner frame that draws in on hover */
        .lpb-masonry-item::before {
          content: '';
          position: absolute;
          inset: 12px;
          border: 1px solid rgba(255,255,255,0.55);
          border-radius: 2px;
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.23,1,0.32,1);
          z-index: 2;
          pointer-events: none;
        }
        .lpb-masonry-item:hover::before {
          opacity: 1;
          transform: scale(1);
        }

        .lpb-masonry-num {
          position: absolute;
          top: 20px;
          left: 22px;
          z-index: 3;
          color: rgba(255,255,255,0.85);
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .lpb-masonry-item:hover .lpb-masonry-num {
          opacity: 1;
          transform: translateY(0);
        }

        .lpb-masonry-name {
          position: absolute;
          bottom: 18px;
          left: 22px;
          z-index: 3;
          color: #fff;
          transform: translateY(4px);
          transition: transform 0.6s cubic-bezier(0.23,1,0.32,1);
        }
        .lpb-masonry-item:hover .lpb-masonry-name { transform: translateY(-4px); }

        .lpb-masonry-arrow {
          position: absolute;
          bottom: 18px;
          right: 22px;
          z-index: 3;
          color: #fff;
          font-size: 16px;
          opacity: 0;
          transform: translate(-6px, 6px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .lpb-masonry-item:hover .lpb-masonry-arrow {
          opacity: 1;
          transform: translate(0, 0);
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
    padding: 250px var(--site-px, 52px) 250px;
    text-align: center;
    position: relative;
    overflow: hidden;
    isolation: isolate;
    background-color: black;
}

.lpb-closing::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/linepro/camera.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -2;
}

.lpb-closing::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 10, 0.51);
    z-index: -1;
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
          .lpb-masonry { margin-top: 70px; --offset-scale: 0.8; }
        }
        @media (max-width: 640px) {
          .lpb-services-grid { grid-template-columns: 1fr; }
          .lpb-services-grid { margin-top: 20px; }
          .lpb-services-grid { padding: 0px var(--site-px, 52px) 110px; }
          .lpb-intro { padding-top: 100px }
          .lpb-break { margin-top: 20px; }
          .lpb-masonry { gap: 10px; margin-top: 50px; --offset-scale: 0.5; }
          .lpb-masonry-col { gap: 10px; }
          .lpb-masonry-name { left: 14px; bottom: 12px; }
          .lpb-masonry-num, .lpb-masonry-arrow { display: none; }
          .lpb-masonry-item::before { inset: 8px; }
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
            larger production across multiple locations Mountain Muse can help
            bring the project together.
          </p>
        </div>
        <div className="lpb-break-media">
          <video src="/images/index/filming/video1.mp4" autoPlay muted loop playsInline />
        </div>
      </div>

      {/* Masonry gallery — each column starts at a different height */}

      <div className="paddings"> 
      <h2 className={`lpb-break-title heading-sub ${playfair.className}`}>
            Locations
          </h2>
      <div className="lpb-masonry">
        {columns.map((col, c) => (
          <div
            key={c}
            className="lpb-masonry-col"
            style={{ "--offset": COLUMN_OFFSETS[c % COLUMN_OFFSETS.length] }}
          >
            {col.map((item) => (
              <div
                key={`${item.name}-${item.index}`}
                data-index={item.index}
                className={`lpb-masonry-item ${item.shape}`}
              >
                <img src={item.img} alt={item.name} loading="lazy" />
                <span className={`sub_head lpb-masonry-num ${poppins.className}`}>
                  {String(item.index + 1).padStart(2, "0")}
                </span>
                <span className={`sub_head lpb-masonry-name ${poppins.className}`}>{item.name}</span>
                <span className="lpb-masonry-arrow">↗</span>
              </div>
            ))}
          </div>
        ))}
      </div>
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

      </div>

      {/* Closing */}
      <div className="lpb-closing">
        <h2 className={`lpb-closing-title heading-sub ${playfair.className}`}>
          Plan your shoot.
        </h2>
        <ButtonPrimary label="Plan A Production" href="/contact" color="#ffffff" />
      </div>
    </section>
  );
}