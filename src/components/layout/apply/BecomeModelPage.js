"use client";
import Link from "next/link";
import BecomeModelForm from "./BecomeModelForm";
import { playfair, poppins } from "@/libs/Fonts";

/*
  ── Reference images for the "How to shoot your photos" card ──
  Currently showing instructions only, since we don't have real
  reference photos yet. To bring back the 2x2 image grid later:

  1. Add 3 real reference photos (side shot / front shot / full body)
     to /public/images/models/, e.g.:
     side-shot.jpg, front-shot.jpg, full-body-shot.jpg

  2. Uncomment the `referenceImages` array below and fill in the
     real paths + labels:

     const referenceImages = [
       { label: "Side Shot", img: "/images/models/side-shot.jpg" },
       { label: "Front Shot", img: "/images/models/front-shot.jpg" },
       { label: "Full Body", img: "/images/models/full-body-shot.jpg" },
     ];

  3. Inside the JSX below, swap the "instructions-only" card content
     block for the "with images" version (kept commented alongside
     it) — it lays out 3 image tiles + 1 instructions tile in a 2x2
     grid, matching the original design.
*/

// const referenceImages = [
//   { label: "Side Shot", img: "/images/models/side-shot.jpg" },
//   { label: "Front Shot", img: "/images/models/front-shot.jpg" },
//   { label: "Full Body", img: "/images/models/full-body-shot.jpg" },
// ];

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
            max-width: 420px;
            padding: 44px 40px;
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

        /* ── Instructions filling the whole card (no images yet) ── */
        .bmp-card-instructions-full {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .bmp-instructions-title {
          color: #111;
          font-size: 22px;
          margin-bottom: 22px;
        }
        .bmp-instructions-body {
          color: rgba(0,0,0,0.6);
          font-size: 13px;
          line-height: 1.9;
        }
        .bmp-instructions-body ul {
          margin-top: 14px;
        }
        .bmp-instructions-body li {
          margin-bottom: 10px;
          padding-left: 18px;
          position: relative;
        }
        .bmp-instructions-body li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: rgba(0,0,0,0.3);
        }

        @media (max-width: 980px) {
        .bmp-layout { grid-template-columns: 1fr; }
        .bmp-visual {
            position: relative;
            height: auto;
            order: 2;
            padding: 40px var(--site-px, 24px);
        }
        .bmp-card { width: 100%; max-width: 480px; }
        .bmp-form-col { order: 1; padding: 160px var(--site-px, 24px) 80px; max-width: 100%; }
        }

        @media (max-width: 600px){
            .bmp-back{
                margin-bottom: 25px;
            }
        }

        @media (max-width: 480px) {
        .bmp-card { padding: 28px 24px; }
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

        {/* Right — sticky white card. Currently instructions-only; see comment
            block at top of file for how to bring back the 3-image grid. */}
        <div className="bmp-visual">
          <div className="bmp-card">
            <div className={`bmp-card-instructions-full ${poppins.className}`}>
              <h3 className={`bmp-instructions-title ${playfair.className}`}>How to shoot your photos</h3>
              <div className="bmp-instructions-body">
                <ul>
                  <li>Plain background, natural daylight</li>
                  <li>No filters or heavy edits</li>
                  <li>Fitted clothing, hair off the face</li>
                  <li>Recent photos, taken within 3 months</li>
                  <li>Include a side shot, a front shot, and a full body shot</li>
                </ul>
              </div>
            </div>

            {/* ── With-images version (kept for later) ──
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
            */}
          </div>
        </div>
      </div>
    </section>
  );
}