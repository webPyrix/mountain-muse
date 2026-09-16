"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ModelCard from "@/components/ui/ModelCard";
import { playfair, poppins } from "@/libs/Fonts";

gsap.registerPlugin(ScrollTrigger);

export default function TalentGrid({ tag, title, backHref = "/models", talents, base }) {

  useEffect(() => {
    const cards = document.querySelectorAll('.tg-grid .model-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 140, opacity: 0, scale: 0.93 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.1, ease: "power3.out", stagger: 0.09,
          scrollTrigger: {
            trigger: ".tg-grid",
            start: "top 75%",
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
    <section className="tg-section">
      <style>{`
        .tg-section {
          background: #0a0a0a;
          padding: 220px var(--site-px, 52px) 180px;
        }
        .tg-header {
          max-width: 1600px;
          margin: 0 auto 80px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .tg-tag { color: rgba(255,255,255,0.5); margin-bottom: 20px; display: block; }
        .tg-title { color: #f4f4f2; }
        .tg-back {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          padding-bottom: 4px;
          transition: color 0.25s, border-color 0.25s;
        }
        .tg-back:hover { color: #fff; border-color: rgba(255,255,255,0.6); }

        .tg-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
          max-width: 1600px;
          margin: 0 auto;
        }

        @media (max-width: 1200px) {
          .tg-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .tg-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 56px;
          }
        }
        @media (max-width: 640px) {
          .tg-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .tg-section { padding: 140px var(--site-px, 24px) 100px; }
        }
      `}</style>

      <div className="tg-header">
        <div>
          <span className={`sub_head tg-tag ${poppins.className}`}>{tag}</span>
          <h2 className={`tg-title heading-sub ${playfair.className}`}>{title}</h2>
        </div>
        <Link href={backHref} className={`tg-back ${poppins.className}`}>
          ← All Talent
        </Link>
      </div>

      <div className="tg-grid">
        {talents.map((t) => (
          <ModelCard
            key={t.id}
            name={t.name}
            img={t.img}
            hoverImg={t.hoverImg}
            href={`${base}/${t.id}`}
          />
        ))}
      </div>
    </section>
  );
}