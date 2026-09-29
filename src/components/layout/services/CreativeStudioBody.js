"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonPrimary } from "@/components/ui/Button";
import { playfair, poppins } from "@/libs/Fonts";
import { creativeServices } from "@/app/data/Services";

gsap.registerPlugin(ScrollTrigger);

// ── Masonry images ──
// `shape` controls the height (width is always the same):
// "tall" | "portrait" | "square" | "landscape"
// Swap the `img` paths (and names) for your Creative Studio photos.
const masonryImages = [
  { name: "",    img: "/images/creative/creative.webp",    shape: "landscape" },
  { name: "",     img: "/images/creative/creative11.webp",     shape: "portrait" },
  { name: "",     img: "/images/creative/creative3.webp",     shape: "square" },
  { name: "", img: "/images/creative/creative4.webp",      shape: "portrait" },
  { name: "",      img: "/images/creative/creative5.webp",    shape: "tall" },
  { name: "",  img: "/images/creative/creative12.webp",     shape: "square" },
  { name: "",   img: "/images/creative/creative7.webp",       shape: "landscape" },
  { name: "",   img: "/images/creative/creative8.webp",     shape: "tall" },
  { name: "",  img: "/images/creative/creative13.webp",    shape: "landscape" },
  { name: "", img: "/images/creative/creative10.webp",  shape: "portrait" },
  { name: "",  img: "/images/creative/creative2.webp",     shape: "square" },
];

// Top offset (px) for each column — makes the top edge uneven.
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

export default function CreativeStudioBody() {
  const cols = useColumnCount();

  // Distribute images across columns (left → right, row by row)
  const columns = Array.from({ length: cols }, () => []);
  masonryImages.forEach((item, i) => columns[i % cols].push({ ...item, index: i }));

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

  // Masonry reveal — re-runs when the column count changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tiles = gsap.utils
        .toArray(".csb-masonry-item")
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
              trigger: ".csb-masonry",
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

        /* ── Masonry (Pinterest style, uneven top + bottom) ── */
        .paddings{
          --offset-scale: 1;
          max-width: 1200px;
          margin: 90px auto 0;
          padding: 0 var(--site-px, 52px);
          gap: 16px;
          text-align: center;
        }

        .paddings h2{
            margin-bottom: 50px;
        }
        .csb-masonry {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .csb-masonry-col {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: calc(var(--offset, 0) * var(--offset-scale) * 1px);
        }
        .csb-masonry-item {
          position: relative;
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
          display: block;
          background: #eee;
          cursor: pointer;
        }
        .csb-masonry-item.tall      { aspect-ratio: 3 / 4.6; }
        .csb-masonry-item.portrait  { aspect-ratio: 3 / 4; }
        .csb-masonry-item.square    { aspect-ratio: 1 / 1; }
        .csb-masonry-item.landscape { aspect-ratio: 4 / 3; }

        .csb-masonry-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          filter: saturate(0.85);
          transition: transform 1.1s cubic-bezier(0.23,1,0.32,1), filter 0.8s ease;
        }
        .csb-masonry-item:hover img {
          transform: scale(1.1);
          filter: saturate(1.1);
        }

        .csb-masonry-item::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 45%, transparent 70%);
          opacity: 0.55;
          transition: opacity 0.6s ease;
          pointer-events: none;
        }
        .csb-masonry-item:hover::after { opacity: 1; }

        .csb-masonry-item::before {
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
        .csb-masonry-item:hover::before {
          opacity: 1;
          transform: scale(1);
        }

        .csb-masonry-num {
          position: absolute;
          top: 20px;
          left: 22px;
          z-index: 3;
          color: rgba(255,255,255,0.85);
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .csb-masonry-item:hover .csb-masonry-num {
          opacity: 1;
          transform: translateY(0);
        }

        .csb-masonry-name {
          position: absolute;
          bottom: 18px;
          left: 22px;
          z-index: 3;
          color: #fff;
          transform: translateY(4px);
          transition: transform 0.6s cubic-bezier(0.23,1,0.32,1);
        }
        .csb-masonry-item:hover .csb-masonry-name { transform: translateY(-4px); }

        .csb-masonry-arrow {
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
        .csb-masonry-item:hover .csb-masonry-arrow {
          opacity: 1;
          transform: translate(0, 0);
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
          .csb-masonry { margin-top: 70px; --offset-scale: 0.8; }
        }
        @media (max-width: 640px) {
          .csb-services-grid { grid-template-columns: 1fr; }
          .csb-services-grid { margin-top: 20px; } 
          .csb-services-grid { padding: 0px var(--site-px, 52px) 110px; }
          .csb-intro {padding-top: 100px}
          .csb-bespoke { margin-top: 0 }
          .csb-masonry { gap: 10px; margin-top: 40px; --offset-scale: 0.5; }
          .csb-masonry-col { gap: 10px; }
          .csb-masonry-name { left: 14px; bottom: 12px; }
          .csb-masonry-num, .csb-masonry-arrow { display: none; }
          .csb-masonry-item::before { inset: 8px; }
          .csb-closing { margin-top: 100px }
          .csb-service-item { padding: 40px 15px;}
        }
      `}</style>

      {/* Intro */}
      <div className="csb-intro">
        <p className={`csb-intro-lead heading-sub ${playfair.className}`}>
          Your brand. Our creative ecosystem.
        </p>
        <p className={`csb-intro-body para ${poppins.className}`}>
          From concept to final frame, Mountain Muse Management brings together a complete creative and production team under one roof: creative directors, models, photographers, cinematographers, videographers, stylists, hair & makeup artists, line producer, production assistants and more.
        
            Whether you’re launching a collection, creating a campaign or looking to capture your brand in Ladakh, we manage the entire process , from creative direction and casting to locations, styling, production, shoot execution and final deliverables.

            Simply send us your garments, products or campaign brief. 
            We build the team, manage the production and bring your vision to life.

            No need to source multiple teams or coordinate different vendors. One creative partner, one seamless production, from start to finish.

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

      {/* Masonry gallery — each column starts at a different height */}
      <div className="paddings">
        <h2 className={`csb-bespoke-title heading-sub ${playfair.className}`}>Our Work</h2>
      <div className="csb-masonry">
        {columns.map((col, c) => (
          <div
            key={c}
            className="csb-masonry-col"
            style={{ "--offset": COLUMN_OFFSETS[c % COLUMN_OFFSETS.length] }}
          >
            {col.map((item) => (
              <div
                key={`${item.name}-${item.index}`}
                data-index={item.index}
                className={`csb-masonry-item ${item.shape}`}
              >
                <img src={item.img} alt={item.name} loading="lazy" />
                <span className={`sub_head csb-masonry-num ${poppins.className}`}>
                  {String(item.index + 1).padStart(2, "0")}
                </span>
                <span className={`sub_head csb-masonry-name ${poppins.className}`}>{item.name}</span>
                <span className="csb-masonry-arrow">↗</span>
              </div>
            ))}
          </div>
        ))}
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
          A Creative Force from the Mountains 🏔️
        </h2>
        <ButtonPrimary label="Contact Us" href="/contact" color="#ffffff" />
      </div>
    </section>
  );
}