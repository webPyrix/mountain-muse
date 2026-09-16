"use client";
import DragCarousel from "@/components/ui/Dragcarousel";
import {ButtonPrimary, ButtonGhost} from "@/components/ui/Button";

import { playfair, poppins } from '@/libs/Fonts';




export default function Line(){
    return(

        <>
             {/* ── LINE PRODUCTION SECTION ── */}
<section className="lp-section">
  <style>{`
    .lp-section {
      position: relative;
      background: #ffffff;
      overflow: hidden;
      color: #111;
    }

    .lp-grid {
      padding: 140px var(--site-px, 52px) 0px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      margin: 0 auto;
      align-items: stretch;
    }

    .lp-left {
      padding-right: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .lp-tag {
      color: rgba(0,0,0,0.8);
      margin-bottom: 32px;
      display: block;
    }

    .lp-title {
      color: #111;
      margin-bottom: 48px;
    }

    .lp-title em {
      font-style: italic;
      color: transparent;
      -webkit-text-stroke: 1px #aaa;
    }

    .lp-body {
      color: rgba(0,0,0,0.8);
      max-width: 440px;
      margin-bottom: 20px;
    }

    .lp-body strong {
      color: #111;
      font-weight: 500;
    }

    .lp-right {
      display: grid;
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      height: 680px;
    }

    .lp-img {
      position: relative;
      overflow: hidden;
      border-radius: 2px;
    }

    .lp-img:nth-child(1) { grid-column: 1 / 3; grid-row: 1; }
    .lp-img:nth-child(2) { grid-column: 1; grid-row: 2; }
    .lp-img:nth-child(3) { grid-column: 2; grid-row: 2; }

    .lp-img img, .lp-img video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.9s cubic-bezier(0.23,1,0.32,1);
    }

    .lp-img:hover img,
    .lp-img:hover video {
      transform: scale(1.05);
    }

    .lp-img-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.65) 30%, transparent 70%);
      z-index: 2;
    }

    .lp-img-label {
      position: absolute;
      bottom: 16px;
      left: 18px;
      font-size: 8px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #fff;
      z-index: 5;
    }


    /* Services Grid */
    .lp-services-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      border: 1px solid rgba(17,17,17,0.08);
    }

    .lp-service-item {
      padding: 28px 24px;
      border-right: 1px solid rgba(17,17,17,0.08);
      transition: background 0.35s;
    }

    .lp-service-item:hover {
      background: #f8f8f8;
    }

    .lp-service-icon {
      font-size: 18px;
      margin-bottom: 14px;
      color: #666;
    }

    .lp-service-name {
      font-size: clamp(9px , 1vw, 11px);
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #666;
      line-height: 1.5;
    }

    /* Services strip wrapper */
    .lp-services-wrap {
      max-width: 1400px;
      margin: 80px auto 0;
      padding: 30px var(--site-px, 52px) 0;
      border-top: 1px solid rgba(17,17,17,0.08);
    }

    /* Stats Strip */
    .lp-stat-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border: 1px solid rgba(17,17,17,0.08);
      margin-top: 80px;
      max-width: 1400px;
      margin-left: auto;
      margin-right: auto;
    }

    .lp-stat {
      padding: 48px 40px;
      border-right: 1px solid rgba(17,17,17,0.08);
    }

    .lp-stat:last-child {
      border-right: none;
    }

    .lp-stat .num {
      font-size: clamp(48px, 5vw, 72px);
      line-height: 1;
      letter-spacing: 2px;
      color: #111;
      margin-bottom: 8px;
    }

    .lp-stat .unit {
      font-size: clamp(28px, 3vw, 42px);
      color: #999;
    }

    .lp-stat .desc {
      font-size: 9px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #777;
      margin-top: 6px;
    }

    /* ── Responsive — video section stacks below text ── */
    @media (max-width: 900px) {
      .lp-grid {
        grid-template-columns: 1fr;
        padding-top: 110px;
      }
      .lp-left {
        padding-right: 0;
        margin-bottom: 48px;
      }
      .lp-right {
        height: auto;
        grid-template-rows: 220px 220px;
        grid-template-columns: 1fr 1fr;
        
      }

      .lp-title{margin-bottom: 17px}

      .lp-service-item{
        padding: 20px;
      }
    }

@media (max-width: 640px) {
  .lp-right {
    grid-template-columns: 1fr;
    grid-template-rows: 240px 200px 200px;
  }
  .lp-img:nth-child(1) { grid-column: 1; grid-row: 1; }
  .lp-img:nth-child(2) { grid-column: 1; grid-row: 2; }
  .lp-img:nth-child(3) { grid-column: 1; grid-row: 3; }

  .lp-services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .lp-service-item {
    border-right: 1px solid rgba(17,17,17,0.08);
    border-bottom: 1px solid rgba(17,17,17,0.08);
    padding: 24px 20px;
  }
  /* Remove right border on every 2nd item (right column) */
  .lp-service-item:nth-child(2n) {
    border-right: none;
  }
  /* Remove bottom border on the last row (items 5 and 6) */
  .lp-service-item:nth-last-child(-n+2) {
    border-bottom: none;
  }




}



.
  `}</style>

  <div className="lp-grid">
    <div className="lp-left">
      
      <div>
        <span className={`sub_head lp-tag ${poppins.className}`}>03 — Line Production</span>
        <h2 className={`lp-title heading-sub ${playfair.className}`}>
          Line<br />Production.
        </h2>
        <p className={`lp-body para ${poppins.className}`}>
          End to end production support including <strong>locations, permits, logistics, crew, accommodation, transport, and equipment</strong> support across Ladakh. <br /> <br />
          Ensuring seamless execution at the most remote and demanding landscapes of ladakh
        </p>
        <ButtonGhost label="Start a project" color="#000000"/>
      </div>
    </div>

    <div className="lp-right">
      <div className="lp-img">
        <video src="/images/index/filming/video1.MOV" autoPlay muted loop playsInline />
        {/* <div className="lp-img-overlay" /> */}
        <span className="lp-img-label">Altitude · Terrain</span>
      </div>
      <div className="lp-img">
        <video src="/images/index/filming/shoot2.mp4" autoPlay muted loop playsInline />
        {/* <div className="lp-img-overlay" /> */}
        <span className="lp-img-label">Crew · Equipment</span>
      </div>
      <div className="lp-img">
        <video src="/images/index/filming/shoot3.mp4" autoPlay muted loop playsInline />
        {/* <div className="lp-img-overlay" /> */}
        <span className="lp-img-label">Locations · Permits</span>
      </div>
    </div>
  </div>

  {/* Services grid */}
  <div className="lp-services-wrap">
    <span className={`sub_head lp-tag ${poppins.className}`}>What we handle on the ground</span>
    <div className="lp-services-grid">
      {[
        { icon: "◈", name: "Location\nScouting" },
        { icon: "◉", name: "Permits &\nClearances" },
        { icon: "◐", name: "Crew &\nCasting" },
        { icon: "◑", name: "Transport &\nLogistics" },
        { icon: "◓", name: "Accommodation\n& Catering" },
        { icon: "◒", name: "Equipment\nSourcing" },
      ].map((s, i) => (
        <div key={i} className="lp-service-item">
          <div className="lp-service-icon">{s.icon}</div>
          <div className={`lp-service-name ${poppins.className}`}>{s.name.replace("\n", "\u000A")}</div>
        </div>
      ))}
    </div>
  </div>

{/* Engaging Full-Width Image Carousel */}
<DragCarousel />
</section>
        </>
    )
}