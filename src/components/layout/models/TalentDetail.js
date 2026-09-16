"use client";
import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playfair, poppins } from "@/libs/Fonts";

gsap.registerPlugin(ScrollTrigger);

export default function TalentDetail({ talent, backHref, genderLabel }) {
  useEffect(() => {
    const items = document.querySelectorAll(".td-reveal");
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
            trigger: ".td-gallery",
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
  }, [talent.id]);

  const statRows = Object.entries(talent.stats || {}).map(([key, value]) => ({
    label:
      key === "chest" ? "Chest" :
      key === "bust" ? "Bust" :
      key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  const gallery = talent.gallery && talent.gallery.length > 0 ? talent.gallery : [talent.img];

  return (
    <section className="td-section">
      <style>{`
        .td-section {
          background: #0a0a0a;
          color: #f4f4f2;
        }

        .td-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .td-layout {
          display: grid;
          grid-template-columns: 30% 70%;
          gap: 48px;
          align-items: start;
        }

        .td-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          padding: 140px 0 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .td-back {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          padding-bottom: 4px;
          transition: color 0.25s, border-color 0.25s;
          align-self: flex-start;
        }
        .td-back:hover { color: #fff; border-color: rgba(255,255,255,0.6); }

        /* ── Mobile-only avatar image — hidden on desktop ── */
        .td-mobile-avatar {
          display: none;
        }

        .td-name-block { margin-top: 32px; }
        .td-tag {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          display: block;
          margin-bottom: 14px;
        }
        .td-name {
          color: #f4f4f2;
          font-size: clamp(26px, 2.4vw, 36px);
          line-height: 1;
        }

        /* ── Stats — plain on desktop, no background/border ── */
        .td-stats {
          margin-top: 28px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .td-stat-tile {
          padding: 14px 14px 12px;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .td-stat-tile:hover {
          background: rgba(255,255,255,0.07);
        }
        .td-stat-label {
          font-size: 8px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 6px;
          display: block;
        }
        .td-stat-value {
          font-size: 12px;
          letter-spacing: 0.2px;
          color: rgba(255,255,255,0.9);
          line-height: 1.3;
        }

        .td-gallery {
          padding: 140px 0 140px;
          padding-left: 48px;
        }

        .td-gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .td-gallery-item {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 4px;
        }
        .td-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.9s cubic-bezier(0.23,1,0.32,1);
        }
        .td-gallery-item:hover img { transform: scale(1.07); }

        .td-gallery-item.wide {
          grid-column: span 2;
          aspect-ratio: 16 / 9;
        }

        .td-gallery-index {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 8px;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.6);
          background: rgba(0,0,0,0.35);
          padding: 3px 7px;
          border-radius: 3px;
        }

        @media (max-width: 980px) {
          .td-layout { grid-template-columns: 1fr; gap: 0; }
          .td-sticky {
            position: relative;
            height: auto;
            padding: 110px 0 40px;
          }

          /* ── Show avatar image just above the name on mobile ── */
          .td-mobile-avatar {
            display: block;
            width: 100%;
            aspect-ratio: 4 / 5;
            max-width: 320px;
            margin: 28px auto 0;
            border-radius: 6px;
            overflow: hidden;
          }
          .td-mobile-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .td-name-block { text-align: center; }

          /* ── Stats — 2 per row, rounded faint tiles with gaps, mobile only ── */
          .td-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .td-stat-tile {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 6px;
          }
          .td-stat-tile:hover {
            border-color: rgba(255,255,255,0.16);
          }

          .td-gallery {
            padding: 40px 0 100px;
            padding-top: 40px;
          }
          .td-gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .td-gallery-item.wide { grid-column: span 2; }
        }

        @media (max-width: 480px) {
          .td-container { padding: 0 20px; }
          .td-gallery-grid { grid-template-columns: 1fr; gap: 12px; }
          .td-gallery-item.wide { grid-column: span 1; }
        }
      `}</style>

      <div className="td-container">
        <div className="td-layout">
          <div className="td-sticky">
            <div>
              <Link href={backHref} className={`td-back ${poppins.className}`}>
                ← {genderLabel}
              </Link>

              {/* Mobile-only avatar — hidden above 980px */}
              <div className="td-mobile-avatar">
                <img src={talent.img} alt={talent.name} />
              </div>

              <div className="td-name-block">
                <span className={`td-tag ${poppins.className}`}>Talent Profile</span>
                <h1 className={`td-name ${playfair.className}`}>{talent.name}</h1>
              </div>

              <div className={`td-stats ${poppins.className}`}>
                {statRows.map((row) => (
                  <div key={row.label} className="td-stat-tile">
                    <span className="td-stat-label">{row.label}</span>
                    <span className="td-stat-value">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="td-gallery">
            <div className="td-gallery-grid">
              {gallery.map((src, i) => (
                <div
                  key={i}
                  className={`td-gallery-item td-reveal ${i === 0 ? "wide" : ""}`}
                >
                  <img src={src} alt={`${talent.name} — ${i + 1}`} />
                  <span className={`td-gallery-index ${poppins.className}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}