"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playfair, poppins } from "@/libs/Fonts";
import { founder } from "@/app/data/Founder";

gsap.registerPlugin(ScrollTrigger);

export default function FounderPage() {
  useEffect(() => {
    const items = document.querySelectorAll(".fp-reveal");
    if (items.length > 0) {
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".fp-article",
            start: "top 85%",
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
    <section className="fp-section">
      <style>{`
        .fp-section {
          background: #0a0a0a;
          color: #f4f4f2;
        }

        /* Hero image, compact blog style */
        .fp-hero {
          padding: 200px var(--site-px, 52px) 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .fp-hero-tag {
          color: rgba(255,255,255,0.4);
          margin-bottom: 20px;
        }
        .fp-hero-name {
          color: #f4f4f2;
          margin-bottom: 44px;
          text-align: center;
        }
        .fp-hero-img {
          width: 85vw;
          height: 75vh;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }
        .fp-hero-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .fp-hero-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 35%);
        }
        .fp-hero-caption {
          position: absolute;
          bottom: 26px;
          left: 32px;
          z-index: 2;
          color: rgba(255,255,255,0.75);
        }

        /* Byline row, meta strip under the hero */
        .fp-byline {
          max-width: 1000px;
          margin: 56px auto 0;
          padding: 0 var(--site-px, 52px);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .fp-byline-item {
          padding: 22px 24px;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .fp-byline-item:last-child { border-right: none; }
        .fp-byline-label {
          color: rgba(255,255,255,0.4);
          display: block;
          margin-bottom: 8px;
        }
        .fp-byline-value {
          color: #f4f4f2;
          font-size: 13px;
        }

        /* Article, single column */
        .fp-article {
          max-width: 1000px;
          margin: 0 auto;
          padding: 100px var(--site-px, 52px) 180px;
        }

        .fp-content { min-width: 0; }

        .fp-eyebrow {
          color: rgba(255,255,255,0.4);
          display: block;
          margin-bottom: 18px;
        }
        .fp-section-title {
          color: #f4f4f2;
          margin-bottom: 24px;
        }
        .fp-content p {
          color: rgba(255,255,255,0.66);
          margin-bottom: 18px;
        }

        .fp-block { margin-bottom: 76px; }
        .fp-block:last-child { margin-bottom: 0; }

        /* Brands worked with, inline in the story */
        .fp-brands {
          margin-top: 36px;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .fp-brands-label {
          color: rgba(255,255,255,0.4);
          display: block;
          margin-bottom: 16px;
        }
        .fp-brands-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 8px;
        }
        .fp-brand {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 7px 16px;
        }

        /* Statement, big pull quote with oversized quote glyph */
        .fp-statement {
          position: relative;
          margin: 70px 0;
          padding-left: 4px;
        }
        .fp-statement-mark {
          font-size: 64px;
          line-height: 0.6;
          color: rgba(255,255,255,0.15);
          display: block;
          margin-bottom: 6px;
        }
        .fp-statement-text {
          color: #f4f4f2;
          line-height: 1.35;
        }

        /* Personal quote block */
        .fp-quote {
          margin: 70px 0;
          padding: 40px 36px;
          background: rgba(255,255,255,0.03);
          border-left: 2px solid rgba(255,255,255,0.3);
        }
        .fp-quote-mark {
          font-size: 50px;
          line-height: 0.5;
          color: rgba(255,255,255,0.25);
          display: block;
          margin-bottom: 12px;
        }
        .fp-quote p {
          color: #f4f4f2;
          font-style: italic;
          margin: 0;
        }

        /* Closing */
        .fp-closing {
          margin-top: 90px;
          padding-top: 56px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .fp-closing-title {
          color: #f4f4f2;
          margin-bottom: 22px;
        }
        .fp-closing-sign {
          color: rgba(255,255,255,0.4);
          margin-top: 36px;
          display: block;
        }

        @media (max-width: 900px) {
          .fp-hero { padding: 150px var(--site-px, 24px) 0; }
          .fp-hero-img { width: 100%; height: 56vh; border-radius: 10px; }
          .fp-byline { grid-template-columns: repeat(2, 1fr); margin-top: 40px; }
          .fp-byline-item:nth-child(2) { border-right: none; }
          .fp-byline-item:nth-child(3), .fp-byline-item:nth-child(4) {
            border-top: 1px solid rgba(255,255,255,0.1);
          }
          .fp-article { padding-top: 70px; }
          .fp-statement, .fp-quote { margin: 50px 0; }
        }

        @media (max-width: 480px) {
          .fp-hero-img { height: 46vh; }
          .fp-quote { padding: 28px 24px; }
          .fp-brand { padding: 6px 14px; font-size: 11px; }
        }
      `}</style>

      {/* Hero */}
      <div className="fp-hero">
        <span className={`sub_head fp-hero-tag ${poppins.className}`}>Founder</span>
        <h1 className={`fp-hero-name heading-hero ${playfair.className}`}>{founder.name}</h1>
        <div className="fp-hero-img">
          <img src="/images/founder/pema-detail.webp" alt={founder.name} />
          <span className={`sub_head fp-hero-caption ${poppins.className}`}>Photographed in Leh, Ladakh</span>
        </div>
      </div>

      {/* Byline strip */}
      <div className={`fp-byline ${poppins.className}`}>
        <div className="fp-byline-item">
          <span className="sub_head fp-byline-label">Role</span>
          <span className="fp-byline-value">{founder.role}</span>
        </div>
        <div className="fp-byline-item">
          <span className="sub_head fp-byline-label">Origin</span>
          <span className="fp-byline-value">{founder.origin}</span>
        </div>
        <div className="fp-byline-item">
          <span className="sub_head fp-byline-label">Experience</span>
          <span className="fp-byline-value">10+ Years</span>
        </div>

      </div>

      {/* Article */}
      <div className="fp-article">
        <div className={`fp-content ${poppins.className}`}>

          <div className="fp-block fp-reveal">
            <span className={`sub_head fp-eyebrow ${poppins.className}`}>01. Origin</span>
            <h2 className={`fp-section-title heading-sub ${playfair.className}`}>
              From Zanskar to the world of fashion.
            </h2>
            <p className="para">
              Pema Chosdon, Founder &amp; CEO of Mountain Muse Management, comes from
              the remote and beautiful Zanskar Valley in Ladakh.
            </p>
            <p className="para">Her journey into modelling was never planned.</p>
            <p className="para">
              While pursuing her studies in Bangalore, modelling simply found her.
              She was scouted on the streets of Bangalore by a member of the team
              at ZARA. What began as an unexpected opportunity soon became
              something she genuinely enjoyed, being in front of the camera,
              expressing herself through movement, fashion and photographs.
            </p>
          </div>

          <div className="fp-block fp-reveal">
            <p className="para">
              What started almost by accident grew into a career spanning more
              than a decade in the modelling and fashion industry.
            </p>
            <p className="para">
              Over the years, Pema worked with leading modelling agencies,
              photographers, designers and brands, building experience across
              fashion, advertising and commercial work.
            </p>
            <p className="para">
              After completing her studies in Bangalore, Pema moved to Delhi to
              continue pursuing modelling for a year or two. She spent several
              years learning not only what it meant to be in front of the
              camera, but also what happens behind it: the people, processes,
              relationships and opportunities that bring a creative project
              together.
            </p>

            <div className="fp-brands">
              <span className="sub_head fp-brands-label">Selected Work</span>
              <div className="fp-brands-list">
                {founder.brands.map((b) => (
                  <span key={b} className="fp-brand">{b}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="fp-block fp-reveal">
            <p className="para">Eventually, the mountains called her home.</p>
            <p className="para">Pema returned to Ladakh with a growing realisation.</p>
          </div>

          <div className="fp-statement fp-reveal">
            <span className={`fp-statement-mark ${playfair.className}`}>"</span>
            <h2 className={`fp-statement-text heading-sub ${playfair.className}`}>
              There was so much talent here.<br />But not enough opportunity.
            </h2>
          </div>

          <div className="fp-block fp-reveal">
            <p className="para">
              She had experienced the modelling industry from the inside and
              understood how difficult it could be for someone from a remote
              region to find access to professional opportunities,
              representation and the right creative networks.
            </p>
            <p className="para">
              At the same time, she saw an increasing number of brands,
              photographers, filmmakers and production teams coming to Ladakh
              to create. And she began to wonder, what if the two could meet?
            </p>
            <p className="para">
              What if the young faces, artists and creative talent from Ladakh
              could be discovered and given a platform? What if brands coming
              to the mountains could find authentic local talent through a
              professional agency that understood both worlds?
            </p>
            <p className="para">That idea became Mountain Muse Management.</p>
          </div>

          <div className="fp-block fp-reveal">
            <span className={`sub_head fp-eyebrow ${poppins.className}`}>02. Vision</span>
            <h2 className={`fp-section-title heading-sub ${playfair.className}`}>
              Building a bridge.
            </h2>
            <p className="para">
              For Pema, Mountain Muse is more than a modelling agency. It is a
              bridge between Ladakh and the wider creative industry, a platform
              where local talent can be discovered, developed and represented
              and where brands, photographers, filmmakers and creative teams can
              discover the people and stories that make the region unique.
            </p>
            <p className="para">
              Through Mountain Muse, Pema continues to scout new faces and
              emerging talent from Ladakh and the Himalayas, creating
              opportunities for them to step in front of the camera, build
              their portfolios and work with professionals from across India
              and beyond.
            </p>
            <p className="para">
              But her vision goes further than modelling. She wants to build a
              creative ecosystem where models, photographers, filmmakers, hair
              &amp; makeup artists, stylists, artists, designers and other young
              creatives from the region can find opportunities and grow
              alongside the industry.
            </p>
          </div>

          <div className="fp-quote fp-reveal">
            <span className={`fp-quote-mark ${playfair.className}`}>"</span>
            <p className="heading-h3">
              I know what it feels like to come from a place where the
              opportunities feel far away.
            </p>
          </div>

          <div className="fp-block fp-reveal">
            <p className="para">
              And perhaps that is what makes the vision behind Mountain Muse so
              personal. Pema's own journey began unexpectedly, far from home,
              when someone saw potential in her and that simply gave her a
              confidence in life she needed.
            </p>
            <p className="para">
              Today, she wants to be that person for someone else, to look at
              a young face from a village in Ladakh and say: there is something
              here. Let's see where it can take you.
            </p>
          </div>

          <div className="fp-closing fp-reveal">
            <h2 className={`fp-closing-title heading-sub ${playfair.className}`}>
              From one unexpected opportunity<br />to a platform for many more.
            </h2>
            <p className="para">
              Mountain Muse is her way of giving back to the place she comes
              from, while building something that can reach far beyond it.
            </p>
            <span className={`sub_head fp-closing-sign ${poppins.className}`}>
              This is the story of Mountain Muse Management
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}