"use client";
import { ButtonPrimary, ButtonGhost } from "@/components/ui/Button";



// fonts
import { playfair, poppins } from '@/libs/Fonts';

export default function creative() {
    return (
        <>

            {/* ── CREATIVE STUDIO SECTION ── */}
            <section className="cs-section">
                <style>{`
    .cs-section {
      position: relative;
      background: #fff;
      color: #111;
      padding: 140px 0px 180px;
    }

    /* ── Grain overlay ── */
    .cs-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.02;
      pointer-events: none;
      z-index: 1;
    }

    /* ── Top Rule ── */
    .cs-top-rule {
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 0 52px;
      height: 64px;
      position: relative;
      z-index: 2;
    }

    .cs-tag {
      color: rgba(0,0,0,0.8);
    }



    .cs-rule-year {
      font-size: 9px;
      letter-spacing: 3px;
      color: #bbb;
    }

    /* ── Main Layout ── */
    .cs-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      position: relative;
      z-index: 2;
    }

    /* ── Left — Sticky Visual Panel ── */
    .sticky_parent_cretive{
      height: 100%;
    }

    .cs-visual {
      position: sticky;
      top: 0px;
      height: 100vh;
    }

    .cs-visual-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.75;
      transition: opacity 1.2s ease;
    }

    .cs-vertical-label {
      position: absolute;
      left: -15%;
      top: 50%;
      transform: translateY(-50%) rotate(-90deg);
      transform-origin: center center;
      font-size: 8px;
      letter-spacing: 6px;
      text-transform: uppercase;
      color: rgba(17,17,17,0.6);
      white-space: nowrap;
      z-index: 5;
    }

    .cs-visual-watermark {
      position: absolute;
      bottom: 0px;
      left: -10px;
      font-size: clamp(80px, 12vw, 160px);
      line-height: 1;
      font-style: italic;
      color: transparent;
      -webkit-text-stroke: 1px rgba(17,17,17,0.3);
      white-space: nowrap;
      pointer-events: none;
      z-index: 4;
      letter-spacing: -2px;
    }

    

    /* ── Right — Content Panel ── */
    .cs-content {
      padding: 140px 72px 180px 80px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      position: relative;
      z-index: 2;
    }

    /* Headline */
    .cs-headline {
      margin-bottom: 80px;
    }

    .cs-headline-eyebrow {
      font-size: 9px;
      letter-spacing: 5px;
      text-transform: uppercase;
      color: #999;
      margin-bottom: 32px;
      display: block;
    }

    .cs-title {
      color: #111;
      margin-bottom: 0;
    }

    .cs-title em {
      font-style: italic;
      color: transparent;
      -webkit-text-stroke: 1px #aaa;
    }

    /* Hook line — matched to lp-body / models-subtitle sizing */
    .cs-hook {
      color: rgba(0,0,0,0.8);
      margin-bottom: 64px;
      max-width: 560px;
      border-left: 2px solid rgba(17,17,17,0.5);
      padding-left: 24px;
    }

    .cs-hook strong {
      color: #111;
      font-weight: 500;
    }

    /* Divider */
    .cs-divider {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 56px;
    }

    .cs-divider-label {
      color: rgba(0,0,0,0.8);
      white-space: nowrap;
    }

    .cs-divider-line {
      flex: 1;
      height: 1px;
      background: rgba(17,17,17,0.08);
    }

    /* Founder Bios */
    .cs-bios {
      display: flex;
      flex-direction: column;
      gap: 48px;
      margin-bottom: 72px;
    }

    .cs-bio {
      display: grid;
      grid-template-columns: 48px 1fr;
      gap: 24px;
      align-items: start;
    }

    .cs-bio-index {
      font-size: 9px;
      letter-spacing: 2px;
      color: rgba(0,0,0,0.5);
      padding-top: 4px;
    }

    .cs-bio-name {
      color: #999;
      margin-bottom: 12px;
    }

    .cs-bio-name span {
      color: #111;
    }

    /* Paragraph — matched to lp-body: 14px, 1.95, #555, weight 300 */
    .cs-bio-text {
      color: #555;
    }

    .cs-bio-text em {
      font-style: italic;
      color: rgba(0,0,0,0.8);
      font-weight: 500
    }

    /* Closing statement */
    .cs-closing {
      border: 1px solid rgba(235, 235, 190, 0.9);
      padding: 40px 40px 36px;
      margin-bottom: 64px;
      position: relative;
      background-color: rgba(235, 221, 190, 0.3);
    }

    .cs-closing::before {
      content: '"';
      position: absolute;
      top: 15px;
      left: 18px;
      font-size: 80px;
      font-style: italic;
      line-height: 1;
      color: rgba(17,17,17,0.7);
    }

    .cs-closing-text {
      color: #555;
      font-style: italic;
    }

    .cs-closing-text strong {
      color: #111;
      font-style: normal;
      font-weight: 600;
    }

    

    /* ── Offerings Strip ── */
    .cs-offerings {
      position: relative;
      z-index: 2;
      border-top: 1px solid rgba(17,17,17,0.08);
      border-bottom: 1px solid rgba(17,17,17,0.08);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    .cs-offering-item {
      padding: 64px 52px;
      border-right: 1px solid rgba(17,17,17,0.08);
      position: relative;
      transition: background 0.4s ease;
    }

    .cs-offering-item:last-child {
      border-right: none;
    }

    .cs-offering-item:hover {
      background-color: rgba(235, 221, 190, 0.3);
    }

    .cs-offering-num {
      font-size: 9px;
      letter-spacing: 3px;
      color: rgba(0, 0, 0, 0.41);
      margin-bottom: 28px;
    }

    .cs-offering-title {
      color: #111;
      margin-bottom: 20px;
    }

    .cs-offering-title em {
      font-style: italic;
      color: #a0a0a0;
    }

    /* Offering desc — matched to 13px models-subtitle / lp-service-name style */
    .cs-offering-desc {
      color: rgba(0,0,0,0.8);
    }

    .cs-offering-arrow {
      position: absolute;
      bottom: 40px;
      right: 40px;
      font-size: 18px;
      color: rgba(17,17,17,0.12);
      transition: color 0.3s, transform 0.3s;
    }

    .cs-offering-item:hover .cs-offering-arrow {
      color: rgba(17,17,17,0.4);
      transform: translate(4px, -4px);
    }




    /* Responsive */
    @media (max-width: 1024px) {
      .cs-body { grid-template-columns: 1fr; }
      .cs-visual { position: relative; height: 60vh; }
      .cs-content { padding: 80px 40px; }
      .cs-offerings { grid-template-columns: 1fr; }
      .cs-offering-item { border-right: none; border-bottom: 1px solid rgba(17,17,17,0.08); }
    }

    @media (max-width: 640px) {
      .cs-top-rule, .cs-bottom-rule { padding: 0 24px; }
      .cs-content { padding: 60px 24px; }
      .cs-offering-item { padding: 48px 24px; }
    }
  `}</style>

                {/* Top Rule */}
                <div className="cs-top-rule">
                    <span className="sub_head cs-tag">04 — Creative Studio</span>
                </div>

                {/* Main Body */}
                <div className="cs-body">

                    {/* LEFT — Sticky Visual */}

                    <div className="sticky_parent_cretive">
                        <div className="cs-visual">
                            <div className="cs-visual-bg" />
                            <img
                                className="cs-visual-img"
                                src="/images/index/about.jpeg"
                                alt="Creative Studio — Mountain Muse"
                            />
                            <span className="cs-vertical-label">Mountain Muse — Creative Studio — Ladakh</span>
                            <div className={`cs-visual-watermark ${playfair.className}`}>Studio</div>
                            {/* <div className="cs-founders-bar">
        <div className="cs-founder-chip">
          <div className="cs-founder-avatar">
            <img src="/images/models/model7.PNG" alt="Pema" />
          </div>
          <div>
            <div className={`cs-founder-name ${poppins.className}`}>Pema</div>
            <div className={`cs-founder-role ${poppins.className}`}>Talent & Network</div>
          </div>
        </div>
        <div className="cs-founder-chip">
          <div className="cs-founder-avatar">
            <img src="/images/models/model2.jpeg" alt="Rahul" />
          </div>
          <div>
            <div className={`cs-founder-name ${poppins.className}`}>Rahul</div>
            <div className={`cs-founder-role ${poppins.className}`}>Creative Direction</div>
          </div>
        </div>
      </div> */}
                        </div>
                    </div>

                    {/* RIGHT — Content */}
                    <div className="cs-content">

                        <div className="cs-headline">
                            <h2 className={`cs-title ${playfair.className}`}>
                                Creative <br /> Studio
                            </h2>
                        </div>

                        <p className={`cs-hook ${poppins.className}`}>
                            Most brands that come to Ladakh get a location.<br />
                            They leave with <strong>pretty pictures and not much else.</strong><br /><br />
                            The Creative Studio exists for brands that want more than that.
                        </p>

                        <div className="cs-divider">
                            <span className={`sub_head cs-divider-label ${poppins.className}`}>The Founders</span>
                            <div className="cs-divider-line" />
                        </div>

                        <div className="cs-bios">
                            <div className="cs-bio">
                                <div className={`cs-bio-index ${poppins.className}`}>01</div>
                                <div>
                                    <div className={`sub_head cs-bio-name ${poppins.className}`}><span>Pema</span> — Talent & Network</div>
                                    <p className={`cs-bio-text ${poppins.className}`}>
                                        Pema founded Mountain Muse after years of modelling and building one of the
                                        only established talent networks in Ladakh. She knows <em>this landscape and the
                                            people in it better than anyone.</em>
                                    </p>
                                </div>
                            </div>

                            <div className="cs-bio">
                                <div className={`cs-bio-index ${poppins.className}`}>02</div>
                                <div>
                                    <div className={`sub_head cs-bio-name ${poppins.className}`}><span>Rahul</span> — Creative Direction</div>
                                    <p className={`cs-bio-text ${poppins.className}`}>
                                        Rahul spent a decade building and running Bombay Trooper, one of India's most
                                        recognised outdoor D2C brands. He has shot on Everest, <em>skied the Himalayas,</em>
                                        and spent years understanding what it takes to turn outdoor environments into brand
                                        stories that actually perform. He brings the creative direction, the brand thinking,
                                        and the structure to make sure every project we take on is built to mean something.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="cs-divider">
                            <span className={`sub_head cs-divider-label ${poppins.className}`}>The Work</span>
                            <div className="cs-divider-line" />
                        </div>

                        <div className="cs-closing">
                            <p className={`cs-closing-text ${playfair.className}`}>
                                Together we take on a <strong>small number of projects each season.</strong> Full brand
                                campaigns, outdoor films, and visual content built around Ladakh — rather than
                                just shot in front of it. <strong>Concept to delivery, handled end to end.</strong>
                            </p>
                        </div>

                        <div className="cs-cta">
                            <ButtonPrimary label={"Read More"} color="#000000"></ButtonPrimary>
                        </div>

                    </div>
                </div>

                {/* Offerings Strip */}
                <div className="cs-offerings">
                    {[
                        {
                            num: "01",
                            title: <>Full Brand<br /><em>Campaigns</em></>,
                            desc: "End-to-end brand storytelling. Concept, casting, location strategy, shoot, and delivery. Built around Ladakh, not just in it."
                        },
                        {
                            num: "02",
                            title: <>Outdoor<br /><em>Films</em></>,
                            desc: "Documentary and branded outdoor films. Shot in extreme conditions with crews that know the terrain — because we built them."
                        },
                        {
                            num: "03",
                            title: <>Visual<br /><em>Content</em></>,
                            desc: "Campaign-grade stills and motion content for D2C and lifestyle brands. Performance-driven creative with a distinct editorial eye."
                        },
                    ].map((item, i) => (
                        <div key={i} className="cs-offering-item">
                            <div className={`cs-offering-num ${poppins.className}`}>{item.num}</div>
                            <h3 className={`cs-offering-title ${playfair.className}`}>{item.title}</h3>
                            <p className={`cs-offering-desc ${poppins.className}`}>{item.desc}</p>
                            <span className="cs-offering-arrow">↗</span>
                        </div>
                    ))}
                </div>

            </section>
        </>
    );
}