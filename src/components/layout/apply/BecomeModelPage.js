"use client";
import Link from "next/link";
import BecomeModelForm from "./BecomeModelForm";
import { playfair, poppins } from "@/libs/Fonts";

const referenceImages = [
  {  img: "/images/models/rigzin.jpg" },
  { img: "/images/models/kunzang.PNG" },
  { img: "/images/models/lobzang.jpeg" },
];

export default function BecomeModelPage() {
  return (
    <section className="bmp-section">
      <style>{`
        .bmp-section {
          background: #0a0a0a;
          color: #f4f4f2;
        }

        .bmp-layout {
        max-width: 1440px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          margin: 0 auto;
        }

        /* ── Left — form column ── */
        .bmp-form-col {
          padding: 220px 100px 100px 30px;
        }

        .bmp-back {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          padding-bottom: 4px;
          transition: color 0.25s, border-color 0.25s;
          display: inline-block;
          margin-bottom: 48px;
        }
        .bmp-back:hover { color: #fff; border-color: rgba(255,255,255,0.6); }

        .bmp-tag {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          display: block;
          margin-bottom: 18px;
        }
        .bmp-title {
          color: #f4f4f2;
          font-size: clamp(30px, 3.4vw, 42px);
          margin-bottom: 40px;
        }

        /* ── Right — sticky, centered white card ── */
        .bmp-visual {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
          
        }

        .bmp-card {
          background: #fdfdfc;
          box-shadow: 0 40px 80px rgba(0,0,0,0.45);
          width: 100%;
          height: 80vh;
          padding: 30px 16px;
          margin-top: 20%;
        }

        .bmp-card-grid {
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 8px;
        }

        .bmp-card-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 0;
        }

        .bmp-card-item-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(0,0,0,0.45);
          flex-shrink: 0;
        }

        .bmp-card-item-img {
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }
        .bmp-card-item-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ── The 4th slot — instructions instead of an image ── */
        .bmp-card-instructions {
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: rgba(0,0,0,0.1);
          border-radius: 6px;
          padding: 22px;
        }
        .bmp-instructions-title {
          color: #111;
          font-size: 16px;
          margin-bottom: 14px;
        }
        .bmp-instructions-body {
          color: rgba(0,0,0,0.6);
          font-size: 11.5px;
          line-height: 1.75;
        }
        .bmp-instructions-body ul {
          margin-top: 10px;
        }
        .bmp-instructions-body li {
          margin-bottom: 6px;
        }

        @media (max-width: 980px) {
          .bmp-layout { grid-template-columns: 1fr; }
          .bmp-visual {
            position: relative;
            height: auto;
            order: 1;
            padding: 40px var(--site-px, 24px);
          }
          .bmp-card { height: 640px; width: 100%; margin-top: 0; }
          .bmp-form-col { order: 2; padding: 60px var(--site-px, 24px) 80px; max-width: 100%; }
        }

        @media (max-width: 600px){
            .bmp-back{
                margin-bottom: 25px;
            }
        }

        @media (max-width: 480px) {
          .bmp-card { padding: 20px; height: 560px; }
          .bmp-card-grid { gap: 14px; }
        }
      `}</style>

      <div className="bmp-layout">
        {/* Left — form */}
        <div className="bmp-form-col">
          <Link href="/models" className={`bmp-back ${poppins.className}`}>
            ← Talent Roster
          </Link>

          <h1 className={`bmp-title ${playfair.className}`}>Want to become a model? Tell us more.</h1>

          <BecomeModelForm />
        </div>

        {/* Right — sticky white card with 3 example images + instructions */}
        <div className="bmp-visual">
          <div className="bmp-card">
            <div className={`bmp-card-grid ${poppins.className}`}>
              {referenceImages.map((ex) => (
                <div key={ex.label} className="bmp-card-item">
                  <div className="bmp-card-item-img">
                    <img src={ex.img} alt={ex.label} />
                  </div>
                </div>
              ))}

              <div className="bmp-card-item">
                <div className="bmp-card-instructions">
                  <h3 className={`bmp-instructions-title ${playfair.className}`}>How to shoot your photos</h3>
                  <div className="bmp-instructions-body">
                    <ul>
                      <li>Plain background, natural daylight</li>
                      <li>No filters or heavy edits</li>
                      <li>Fitted clothing, hair off the face</li>
                      <li>Recent photos, taken within 3 months</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}