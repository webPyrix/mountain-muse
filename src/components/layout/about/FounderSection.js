"use client";
import { ButtonPrimary } from "@/components/ui/Button";
import { playfair, poppins } from "@/libs/Fonts";
import { founder } from "@/app/data/Founder";

export default function FounderSection() {
  return (
    <section className="fs-section">
      <style>{`
        .fs-section {
          background: #fff;
          color: #111;
          padding: 0px var(--site-px, 52px) 120px;
        }
        .fs-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 72px;
          align-items: center;
        }

        .fs-visual {
          position: relative;
        }
        .fs-img-frame {
          width: 100%;
          height: 700px;
          overflow: hidden;
          border-radius: 4px;
        }
        .fs-img-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .fs-img-caption {
          margin-top: 16px;
          color: rgba(0,0,0,0.4);
        }

        .fs-tag {
          color: rgba(0,0,0,0.45);
          display: block;
          margin-bottom: 24px;
        }
        .fs-name {
          color: #111;
          margin-bottom: 6px;
        }
        .fs-role {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(0,0,0,0.45);
          display: block;
          margin-bottom: 36px;
        }
        .fs-teaser {
          font-style: italic;
          color: #111;
          font-size: 18px;
          line-height: 1.6;
          border-left: 2px solid rgba(17,17,17,0.4);
          padding-left: 22px;
          margin-bottom: 28px;
          max-width: 480px;
        }
        .fs-story {
          color: rgba(0,0,0,0.62);
          max-width: 500px;
          margin-bottom: 40px;
        }

        .fs-stats {
          display: flex;
          gap: 48px;
          padding-top: 28px;
          border-top: 1px solid rgba(17,17,17,0.08);
          margin-bottom: 40px;
        }
        .fs-stat-num { font-size: 26px; color: #111; margin-bottom: 4px; }
        .fs-stat-label {
          color: rgba(0,0,0,0.45);
        }

        @media (max-width: 980px) {
          .fs-inner { grid-template-columns: 1fr; gap: 44px; }
          .fs-img-frame { height: 400px; }
        }
        
        @media (max-width: 600px) {
            .fs-section{
                padding-top: 100px;
            }
        }
      `}</style>

      <div className="fs-inner">
        <div className="fs-visual">
          <div className="fs-img-frame">
            <img src={founder.portrait} alt={founder.name} />
          </div>
          <span className={`sub_head fs-img-caption ${poppins.className}`}>Photographed in Leh, Ladakh</span>
        </div>

        <div className="fs-text">
          <span className={`sub_head fs-tag ${poppins.className}`}>The Founder</span>
          <h2 className={`fs-name heading-sub ${playfair.className}`}>{founder.name}</h2>
          <span className={`fs-role ${poppins.className}`}>{founder.role} · {founder.origin}</span>

          <p className={`fs-teaser heading-h3 ${playfair.className}`}>{founder.teaser}</p>
          <p className={`fs-story para ${poppins.className}`}>{founder.shortStory}</p>

          <div className={`fs-stats ${poppins.className}`}>
            <div>
              <div className={`fs-stat-num ${playfair.className}`}>10+</div>
              <div className={`sub_head fs-stat-label`}>Years in Fashion</div>
            </div>
            <div>
              <div className={`fs-stat-num ${playfair.className}`}>{founder.brands.length}+</div>
              <div className={`sub_head fs-stat-label`}>Brands &amp; Publications</div>
            </div>
          </div>

          <ButtonPrimary label="Meet Pema" href="/founder" color="#000000" />
        </div>
      </div>
    </section>
  );
}