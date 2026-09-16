"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ButtonPrimary } from "@/components/ui/Button";
import ModelCard from "@/components/ui/ModelCard";
import { playfair, poppins } from '@/libs/Fonts';
import { femaleTalents, maleTalents } from "@/app/data/Talents";

const femalePreview = femaleTalents.slice(0, 5);
const malePreview = maleTalents.slice(0, 5);

export default function Models() {

  useEffect(() => {
    const femaleCards = document.querySelectorAll('.female-grid .model-card');
    if (femaleCards.length > 0) {
      gsap.fromTo(
        femaleCards,
        { y: 140, opacity: 0, scale: 0.93 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.1, ease: "power3.out", stagger: 0.09,
          scrollTrigger: {
            trigger: ".female-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    const maleCards = document.querySelectorAll('.male-grid .model-card');
    if (maleCards.length > 0) {
      gsap.fromTo(
        maleCards,
        { y: 140, opacity: 0, scale: 0.93 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.1, ease: "power3.out", stagger: 0.09,
          scrollTrigger: {
            trigger: ".male-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const modelsSectionRef = useRef(null);

  return (
    <section className="models-section" ref={modelsSectionRef}>
      <style>{`
        .models-section {
          position: relative;
          background: #fff;
          padding: 140px var(--site-px) 180px;
          overflow: hidden;
        }
        .models-header {
          position: relative;
          z-index: 10;
          margin-bottom: 100px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          max-width: 1600px;
          margin-left: auto;
          margin-right: auto;
        }
        .models-tag { color: rgba(0,0,0,0.8); }
        .models-title { color: #111; margin-top: 32px;}
        .models-subtitle {
          max-width: 260px;
          color: rgba(0,0,0,0.8);
          text-align: right;
        }
        .models-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
          max-width: 1600px;
          margin: 0 auto;
        }
        .models-row-label {
          color: rgba(0,0,0,0.8);
          margin-bottom: 20px;
          padding-left: 4px;
          max-width: 1600px;
          margin-left: auto;
          margin-right: auto;
        }
        .vew-more-model-btn {
          display: flex;
          margin-top: 80px;
          align-items: center;
          justify-content: center;
        }

        /* ── Heading/subtitle stack on smaller screens ── */
        @media (max-width: 900px) {
          .models-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            margin-bottom: 64px;
          }
          .models-subtitle {
            max-width: 100%;
            text-align: left;
          }
        }

        @media (max-width: 1024px) {
          .models-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
        }

        @media (max-width: 750px){
          .models-section{
            padding-bottom: 0px;
          }

          .vew-more-model-btn{
            margin-top: 40px;
          }
        }

        @media (max-width: 640px) {
          .models-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .models-header {
            gap: 15px;
          }
          .models-title{
            margin-top: 20px;
          }
        }
      `}</style>

      <div className="models-header">
        <div>
          <span className={`sub_head models-tag ${poppins.className}`}>02 — Talent Roster</span>
          <h2 className={`models-title heading-sub ${playfair.className}`}>Our<br />Models.</h2>
        </div>
        <p className={`models-subtitle para ${poppins.className}`}>
          A curated roster of elite talent— selected for presence, versatility,
          and the rare ability to transcend the frame.
        </p>
      </div>

      <div>
        <div className={`sub_head models-row-label ${poppins.className}`}>FEMALE TALENT</div>
        <div className="models-grid female-grid">
          {femalePreview.map((t) => (
            <ModelCard key={t.id} name={t.name} img={t.img} hoverImg={t.hoverImg} href={`/models/female/${t.id}`} />
          ))}
        </div>
      </div>

      <div style={{ height: "100px" }} />

      <div>
        <div className={`sub_head models-row-label ${poppins.className}`}>MALE TALENT</div>
        <div className="models-grid male-grid">
          {malePreview.map((t) => (
            <ModelCard key={t.id} name={t.name} img={t.img} hoverImg={t.hoverImg} href={`/models/male/${t.id}`} />
          ))}
        </div>
      </div>

      <div className="vew-more-model-btn">
        <ButtonPrimary label={"Explore All Talents"} color="#000000" href="/models" />
      </div>
    </section>
  );
}