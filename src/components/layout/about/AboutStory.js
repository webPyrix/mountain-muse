"use client";
import { useEffect } from "react";
import { playfair, poppins } from "@/libs/Fonts";

const verticals = [
  {
    num: "01",
    title: <>Talent<br /><em>Management</em></>,
    desc: "Discovering, developing and representing distinctive models and talent from Ladakh, the Himalayas and beyond.",
  },
  {
    num: "02",
    title: <>Line<br /><em>Production</em></>,
    desc: "Professional on-ground production support for brands, agencies, photographers and filmmakers working across Ladakh.",
  },
  {
    num: "03",
    title: <>Creative<br /><em>Studio</em></>,
    desc: "Producing visual stories across fashion, photography, film, advertising, lifestyle and the landscapes of the Himalayas.",
  },
];

export default function AboutStory() {

  useEffect(() => {
    let ctx;

    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {

        document.querySelectorAll(".as-spread-images").forEach((wrap) => {
          const main = wrap.querySelector(".as-img-main");
          const offset = wrap.querySelector(".as-img-offset");

          gsap.fromTo(
            main,
            { y: 90, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrap,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.fromTo(
            offset,
            { y: 110, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              delay: 0.18,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrap,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        gsap.fromTo(
          ".as-break img",
          { y: 60, scale: 1.08, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".as-break",
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          ".as-v-item",
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".as-verticals",
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          ".as-place img",
          { y: 70, opacity: 0, scale: 1.06 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".as-place",
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

      });
    };

    load();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section className="as-section">
      <style>{`
        .as-section { background: #fff; color: #111; }

        /* Intro statement */
        .as-intro {
          padding: 160px var(--site-px, 52px) 0;
          max-width: 1240px;
          margin: 0 auto;
          text-align: center;
        }
        .as-intro-tag { color: rgba(0,0,0,0.5); margin-bottom: 32px; display: block; }
        .as-intro-lead { color: #111; line-height: 1.3; }

        /* ── SPREAD ── */
        .as-spread {
          position: relative;
          max-width: 1500px;
          margin: 170px auto 0;
          padding: 0 var(--site-px, 52px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        .as-spread.reverse { direction: rtl; }
        .as-spread.reverse > * { direction: ltr; }

        .as-spread-text {
          max-width: 460px;
        }
        .as-spread-tag {
          color: rgba(0,0,0,0.4);
          margin-bottom: 24px;
          display: block;
        }
        .as-spread-title {
          color: #111;
          margin-bottom: 24px;
        }
        .as-spread-title em { font-style: italic; color: #a0a0a0; }
        .as-spread-body p {
          color: rgba(0,0,0,0.7);
          margin-bottom: 16px;
        }

        /* ── Images ── */
        .as-spread-images {
          position: relative;
          height: 680px;
        }
        .as-img-main {
          position: absolute;
          top: 0;
          right: 0;
          width: 76%;
          height: 560px;
          overflow: hidden;
          will-change: transform, opacity;
        }
        .as-img-main img { width: 100%; height: 100%; object-fit: cover; }
        .as-img-offset {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50%;
          height: 340px;
          overflow: hidden;
          border: 8px solid #fff;
          box-shadow: 0 24px 50px rgba(0,0,0,0.14);
          will-change: transform, opacity;
        }
        .as-img-offset img { width: 100%; height: 100%; object-fit: cover; }

        .as-spread.reverse .as-img-main { right: auto; left: 0; }
        .as-spread.reverse .as-img-offset { left: auto; right: 0; }

        /* ── Full-bleed break image ── */
        .as-break {
          margin-top: 170px;
          width: 100vw;
          height: 75vh;
          min-height: 520px;
          position: relative;
          overflow: hidden;
        }
        .as-break img { width: 100%; height: 100%; object-fit: cover; }
        .as-break-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 45%);
          display: flex;
          align-items: flex-end;
          padding: var(--site-px, 52px);
        }
        .as-break-caption {
          color: #fff;
          opacity: 0.7;
        }

        /* Verticals */
        .as-verticals-intro {
          padding: 170px var(--site-px, 52px) 0;
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }
        .as-verticals-title { color: #111; margin-bottom: 20px; }
        .as-verticals-title em { font-style: italic; color: transparent; -webkit-text-stroke: 1px #aaa; }
        .as-verticals {
          margin-top: 56px;
          border-top: 1px solid rgba(17,17,17,0.08);
          border-bottom: 1px solid rgba(17,17,17,0.08);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
        }
        .as-v-item { padding: 56px 44px; border-right: 1px solid rgba(17,17,17,0.08); }
        .as-v-item:last-child { border-right: none; }
        .as-v-num { color: rgba(0,0,0,0.4); margin-bottom: 24px; }
        .as-v-title { color: #111; margin-bottom: 16px; }
        .as-v-title em { font-style: italic; color: #a0a0a0; }
        .as-v-desc { color: rgba(0,0,0,0.75); }

        /* Place */
        .as-place {
          position: relative;
          margin-top: 170px;
          min-height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .as-place img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }
        .as-place::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(8,8,8,0.6);
          z-index: 2;
        }
        .as-place-inner {
          position: relative;
          z-index: 3;
          max-width: 760px;
          padding: 0 32px;
          text-align: center;
        }
        .as-place-tag { color: rgba(255,255,255,0.5); display: block; margin-bottom: 28px; }
        .as-place-title { color: #f7f6f3; margin-bottom: 32px; }
        .as-place-body { color: rgba(255,255,255,0.72); margin-bottom: 14px; }
        .as-place-quote { margin-top: 44px; color: #f7f6f3; font-style: italic; }

        /* Closing */
        .as-closing {
          padding: 170px var(--site-px, 52px) 190px;
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
        }
        .as-closing-title { color: #111; margin-bottom: 28px; }
        .as-closing-body { color: rgba(0,0,0,0.6); }

        @media (max-width: 980px) {
          .as-spread, .as-spread.reverse { grid-template-columns: 1fr; direction: ltr; }
          .as-spread-images { height: 460px; margin-top: 40px; }
          .as-img-main { height: 380px; }
          .as-img-offset { height: 220px; }
          .as-verticals { grid-template-columns: 1fr; }
          .as-v-item { border-right: none; border-bottom: 1px solid rgba(17,17,17,0.08); }
        }

        @media (max-width: 600px){
          .as-intro {
            padding: 100px var(--site-px, 20px) 0;
          }
          .as-spread-images{
            margin-top: 0px;
          }
          .as-spread {
            margin-top: 100px
          }

          .as-closing-title{ line-height: 1.3}

          .as-closing-title{
            margin-bottom: 15px;
          }

          .as-closing{
            padding-top: 50px;
            padding-bottom: 50px;
          }
        }
      `}</style>

      {/* Intro */}
      <div className="as-intro">
        <span className={`sub_head as-intro-tag ${poppins.className}`}>Mountain Muse Management — Est. 2023</span>
        <p className={`as-intro-lead heading-sub ${playfair.className}`}>
          Founded in 2023 and formally registered in 2024, Mountain Muse began as Ladakh’s first modelling and talent management company, created to discover, develop and represent talent from Ladakh and the wider Himalayan region.
        </p>
      </div>

      {/* Spread 01 */}
      <div className="as-spread">
        <div className="as-spread-text">
          <span className={`sub_head as-spread-tag ${poppins.className}`}>01 — 2023 · 2024</span>
          <h3 className={`as-spread-title heading-sub ${playfair.className}`}>
            It started with <em>talent.</em>
          </h3>
          <div className={`as-spread-body ${poppins.className}`}>
            <p className="para">The first chapter of Mountain Muse was about faces.
            About discovering people who had never imagined themselves in front of a professional camera.
            About finding individuality in unexpected places.
            About creating opportunities for models from Ladakh and the Himalayas to enter an industry that had traditionally felt far away.
            
            </p>
            <p className="para">Mountain Muse began scouting fresh faces, developing talent and building a professional roster for fashion, advertising, editorial, commercial and creative projects. But the purpose was never simply to create a list of models.
            It was to create a platform.
            A platform where emerging talent could be discovered, developed and connected to opportunities  while brands and creative teams could discover a different kind of beauty and a new generation of Himalayan faces.</p>
          </div>
        </div>
        <div className="as-spread-images">
          <div className="as-img-main"><img src="/images/about/linepro4.webp" alt="" /></div>
          <div className="as-img-offset"><img src="/images/about/linepro1.webp" alt=""/></div> 
        </div>
      </div>

      {/* Spread 02 — reversed */}
      <div className="as-spread reverse">
        <div className="as-spread-text">
          <span className={`sub_head as-spread-tag ${poppins.className}`}>02 — On the ground</span>
          <h3 className={`as-spread-title heading-sub ${playfair.className}`}>
            Then came <em>line production.</em>
          </h3>
          <div className={`as-spread-body ${poppins.className}`}>
            <p className="para">As more creative teams looked toward Ladakh, the work changed. A beautiful location was only the beginning — productions needed people who understood the terrain, the seasons and the realities of working in the Himalayas.</p>
            <p className="para">Our Line Production arm grew from that need: location scouting, casting, local crew, permits, transport and on-ground coordination.</p>
          </div>
        </div>
        <div className="as-spread-images">
          <div className="as-img-main"><img src="/images/about/linepro.webp" alt="" /></div>
          <div className="as-img-offset"><img src="/images/about/line.webp" alt="" /></div>
          
        </div>
      </div>

      {/* Full-bleed break */}
      <div className="as-break">
        <img src="/images/about/landscape.webp" alt="" />
        <div className="as-break-overlay">
          <span className={`sub_head as-break-caption ${poppins.className}`}>From production to creative studio</span>
        </div>
      </div>

      {/* Spread 03 */}
      <div className="as-spread">
        <div className="as-spread-text">
          <span className={`sub_head as-spread-tag ${poppins.className}`}>03 — Full circle</span>
          <h3 className={`as-spread-title heading-sub ${playfair.className}`}>
            From production to <em>creative studio.</em>
          </h3>
          <div className={`as-spread-body ${poppins.className}`}>
            <p className="para">With experience came a deeper understanding of the creative process. We had the talent, we knew the locations, we understood production so we began to ask what it would look like to bring it all together.</p>
            <p className="para">That question became the Mountain Muse Creative Studio: photography, film, fashion and visual storytelling, from first concept to final expression.</p>
          </div>
        </div>
        <div className="as-spread-images">
          <div className="as-img-main"><img src="/images/about/linepro2.webp" alt="" /></div>
          <div className="as-img-offset"><img src="/images/about/linepro3.webp" alt="" /></div>
        </div>
      </div>

      {/* Verticals */}
      <div className="as-verticals-intro">
        <span className={`sub_head ${poppins.className}`} style={{ color: "rgba(0,0,0,0.5)" }}>Today</span>
        <h2 className={`as-verticals-title heading-sub ${playfair.className}`} style={{ marginTop: "20px" }}>
          Today, Mountain Muse Management is built around three interconnected verticals
        </h2>
        <p className={`para ${poppins.className}`} style={{ maxWidth: "560px", margin: "0 auto", color: "rgba(0,0,0,0.65)" }}>
          Each began from a different need. All are connected by the same purpose
          to bring the right people, ideas and places together.
        </p>
      </div>

      <div className="as-verticals">
        {verticals.map((v) => (
          <div key={v.num} className="as-v-item">
            <div className={`sub_head as-v-num ${poppins.className}`}>{v.num}</div>
            <h3 className={`as-v-title heading-h3 ${playfair.className}`}>{v.title}</h3>
            <p className={`as-v-desc para ${poppins.className}`}>{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}