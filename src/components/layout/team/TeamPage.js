"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonPrimary } from "@/components/ui/Button";
import { playfair, poppins } from "@/libs/Fonts";
import { founderCard } from "@/app/data/Team";
import { API_BASE, IMG_HOST } from "@/libs/api";


gsap.registerPlugin(ScrollTrigger);

export default function TeamPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/team/list.php`)
      .then((res) => res.json())
      .then((data) => setTeam(Array.isArray(data) ? data : []))
      .catch(() => setTeam([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;

    const items = document.querySelectorAll(".tm-reveal");
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
            trigger: ".tm-grid",
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
  }, [loading]);

  return (
    <section className="tm-section">
      <style>{`
        .tm-section {
          background: #0a0a0a;
          color: #f4f4f2;
        }

        /* ── Hero ── */
        .tm-hero {
          padding: 200px var(--site-px, 52px) 0;
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
        }
        .tm-hero-tag {
          color: rgba(255,255,255,0.45);
          margin-bottom: 24px;
          display: block;
        }
        .tm-hero-title {
          color: #f4f4f2;
          margin-bottom: 24px;
        }
        .tm-hero-sub {
          color: rgba(255,255,255,0.55);
          max-width: 560px;
          margin: 0 auto;
        }

        /* ── Founder — featured card ── */
        .tm-founder-wrap {
          max-width: 1100px;
          margin: 100px auto 0;
          padding: 0 var(--site-px, 52px);
        }
        .tm-founder-card {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
        }
        .tm-founder-img {
          position: relative;
          height: 100%;
          min-height: 380px;
        }
        .tm-founder-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .tm-founder-content {
          padding: 56px 56px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .tm-founder-tag {
          color: rgba(255,255,255,0.4);
          margin-bottom: 20px;
          display: block;
        }
        .tm-founder-name {
          color: #f4f4f2;
          margin-bottom: 8px;
        }
        .tm-founder-role {
          color: rgba(255,255,255,0.5);
          margin-bottom: 24px;
          display: block;
        }
        .tm-founder-desc {
          color: rgba(255,255,255,0.65);
          margin-bottom: 32px;
          max-width: 420px;
        }

        /* ── Team grid intro ── */
        .tm-grid-intro {
          max-width: 1200px;
          margin: 130px auto 0;
          padding: 0 var(--site-px, 52px);
          text-align: center;
        }
        .tm-grid-tag {
          color: rgba(255,255,255,0.4);
          margin-bottom: 16px;
          display: block;
        }
        .tm-grid-title {
          color: #f4f4f2;
        }

        /* ── Team grid ── */
        .tm-grid {
          max-width: 1200px;
          margin: 56px auto 0;
          padding: 0 var(--site-px, 52px) 180px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .tm-card {
          border-radius: 8px;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .tm-card:hover {
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-4px);
        }
        .tm-card-img {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
        }
        .tm-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .tm-card:hover .tm-card-img img {
          transform: scale(1.06);
        }
        .tm-card-body {
          padding: 22px 22px 26px;
        }
        .tm-card-name {
          color: #f4f4f2;
          margin-bottom: 6px;
        }
        .tm-card-role {
          color: rgba(255,255,255,0.45);
          display: block;
        }

        .tm-empty {
          text-align: center;
          color: rgba(255,255,255,0.4);
          padding: 40px 0 120px;
        }

        .tm-founder-content a{
            width: fit-content;
        }

        @media (max-width: 980px) {
          .tm-founder-card { grid-template-columns: 1fr; }
          .tm-founder-img { min-height: 320px; }
          .tm-founder-content { padding: 40px 32px; }
          .tm-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .tm-hero { padding: 150px var(--site-px, 24px) 0; }
          .tm-founder-wrap { margin-top: 70px; }
          .tm-grid-intro { margin-top: 90px; }
          .tm-grid { grid-template-columns: 1fr; gap: 20px; padding-bottom: 120px; }
        }
      `}</style>

      {/* Hero */}
      <div className="tm-hero">
        <span className={`sub_head tm-hero-tag ${poppins.className}`}>Our Team</span>
        <h1 className={`tm-hero-title heading-hero ${playfair.className}`}>The people behind M3.</h1>
        <p className={`tm-hero-sub para ${poppins.className}`}>
          A small, dedicated team of creatives, producers and local experts —
          the people who bring every project to life across Ladakh.
        </p>
      </div>

      {/* Founder — featured */}
      <div className="tm-founder-wrap">
        <div className="tm-founder-card">
          <div className="tm-founder-img">
            <img src="/images/founder/pema.webp" alt={founderCard.name} />
          </div>
          <div className={`tm-founder-content ${poppins.className}`}>
            <span className={`sub_head tm-founder-tag ${poppins.className}`}>Founder</span>
            <h2 className={`tm-founder-name heading-sub ${playfair.className}`}>{founderCard.name}</h2>
            <span className={`sub_head tm-founder-role ${poppins.className}`}>{founderCard.role}</span>
            <p className={`tm-founder-desc para ${poppins.className}`}>{founderCard.desc}</p>
            <ButtonPrimary label="Meet Pema" href="/founder" color="#ffffff" />
          </div>
        </div>
      </div>

      {/* Team grid intro */}
      <div className="tm-grid-intro">
        <h2 className={`tm-grid-title heading-sub ${playfair.className}`}>Meet the team.</h2>
      </div>

      {/* Team grid */}
      {!loading && team.length === 0 ? (
        <p className={`tm-empty ${poppins.className}`}>Team members coming soon.</p>
      ) : (
        <div className="tm-grid">
          {team.map((member) => (
            <div key={member.id} className="tm-card tm-reveal">
              <div className="tm-card-img">
                {member.image && (
                  <img src={`${IMG_HOST}${member.image}`} alt={member.name} />
                )}
              </div>
              <div className={`tm-card-body ${poppins.className}`}>
                <h3 className={`tm-card-name heading-h3 ${playfair.className}`}>{member.name}</h3>
                <span className={`sub_head tm-card-role ${poppins.className}`}>{member.designation}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}