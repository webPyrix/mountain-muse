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
          padding: 0 52px 190px;
        }
        .fs-inner {
          max-width: 1500px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 60px;
          align-items: center;
        }

        .fs-visual {
          position: relative;
          height: 640px;
        }
        .fs-img-main {
          position: absolute;
          top: 0;
          left: 0;
          width: 78%;
          height: 560px;
          overflow: hidden;
        }
        .fs-img-main img { width: 100%; height: 100%; object-fit: cover; }
        .fs-img-tag {
          position: absolute;
          bottom: -34px;
          left: 0;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
        }
        .fs-badge {
          position: absolute;
          bottom: 40px;
          right: 0;
          background: #0a0a0a;
          color: #fff;
          padding: 28px 30px;
          width: 190px;
        }
        .fs-badge-num {
          font-size: 32px;
          font-family: inherit;
          color: #f4f4f2;
        }
        .fs-badge-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-top: 6px;
        }

        .fs-text { max-width: 540px; }
        .fs-tag {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(0,0,0,0.45);
          display: block;
          margin-bottom: 28px;
        }
        .fs-name { color: #111; margin-bottom: 4px; }
        .fs-role {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(0,0,0,0.45);
          margin-bottom: 36px;
          display: block;
        }
        .fs-teaser {
          font-style: italic;
          color: #111;
          border-left: 2px solid rgba(17,17,17,0.5);
          padding-left: 22px;
          margin-bottom: 40px;
        }
        .fs-brands {
          color: rgba(0,0,0,0.5);
          margin-bottom: 44px;
          line-height: 2;
        }
        .fs-brands b { color: rgba(0,0,0,0.75); font-weight: 500; }

        @media (max-width: 980px) {
          .fs-inner { grid-template-columns: 1fr; }
          .fs-visual { height: 460px; margin-bottom: 40px; }
          .fs-img-main { width: 100%; height: 100%; }
          .fs-badge { right: 0; bottom: -30px; }
        }
      `}</style>

      <div className="fs-inner">
        <div className="fs-visual">
          <div className="fs-img-main">
            <img src={founder.portrait} alt={founder.name} />
          </div>
          <span className={`fs-img-tag ${poppins.className}`}>Photographed in Leh, Ladakh</span>
          <div className={`fs-badge ${poppins.className}`}>
            <div className={`fs-badge-num ${playfair.className}`}>10+</div>
            <div className="fs-badge-label">Years in fashion &amp; modelling</div>
          </div>
        </div>

        <div className="fs-text">
          <span className={`sub_head fs-tag ${poppins.className}`}>The Founder</span>
          <h2 className={`fs-name ${playfair.className}`} style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
            {founder.name}
          </h2>
          <span className={`fs-role ${poppins.className}`}>{founder.role} · {founder.origin}</span>

          <p className={`fs-teaser ${playfair.className}`} style={{ fontSize: "19px" }}>
            {founder.teaser}
          </p>

          <p className={`fs-brands ${poppins.className}`} style={{ fontSize: "13px" }}>
            Worked with <b>{founder.brands.slice(0, 4).join(", ")}</b> and {founder.brands.length - 4}+ other brands and publications.
          </p>

          <ButtonPrimary label="Meet Pema" href="/founder" color="#000000" />
        </div>
      </div>
    </section>
  );
}