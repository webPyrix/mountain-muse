"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import {ButtonPrimary, ButtonGhost} from "@/components/ui/Button";



// fonts
import { playfair, poppins } from '@/libs/Fonts';


export default function Models(){



    // Models Section - Independent Scroll Animations
useEffect(() => {
  // Female row animation
  const femaleCards = document.querySelectorAll('.female-grid .model-card');
  
  if (femaleCards.length > 0) {
    gsap.fromTo(
      femaleCards,
      { 
        y: 140, 
        opacity: 0, 
        scale: 0.93 
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: ".female-grid",
          start: "top 75%",                  // Adjust if needed (70% ~ 80%)
          toggleActions: "play none none reverse",
          // markers: true,                  // Uncomment to debug trigger position
        },
      }
    );
  }

  // Male row animation - completely separate trigger
  const maleCards = document.querySelectorAll('.male-grid .model-card');
  
  if (maleCards.length > 0) {
    gsap.fromTo(
      maleCards,
      { 
        y: 140, 
        opacity: 0, 
        scale: 0.93 
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: ".male-grid",             // ← Trigger on male grid only
          start: "top 75%",                  // Adjust if needed
          toggleActions: "play none none reverse",
          // markers: true,
        },
      }
    );
  }
}, []);

  const modelsSectionRef = useRef(null);



    return(
        <>

         {/* ── MODELS SECTION ── */}
      <section className="models-section" ref={modelsSectionRef}>

        <style>{`
          .models-section {
            position: relative;
            background: #fff;
            padding: 140px 52px 180px;
            overflow: hidden;
          }

          .models-header {
            position: relative;
            z-index: 10;
            margin-bottom: 100px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .models-tag {
            color: rgba(0,0,0,0.8);
          }
          .models-title {
            color: #111;
          }
          .models-subtitle {
            max-width: 260px;
            color: rgba(0,0,0,0.8);
            text-align: right;
          }

          /* Grid Container */
          .models-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 24px;
            max-width: 1600px;
            margin: 0 auto;
          }

          /* Single Model Card */
          .model-card {
            position: relative;
            overflow: hidden;
            border-radius: 4px;
            aspect-ratio: 3 / 4;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
            will-change: transform;
          }

          .model-card:hover {
            transform: translateY(-12px);
          }

          .model-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.9s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .model-card:hover img {
            transform: scale(1.08);
          }

          /* Hover Overlay */
          .model-hover-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 32px 24px 24px;
            background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 70%);
            z-index: 3;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .model-card:hover .model-hover-info {
            opacity: 1;
            transform: translateY(0);
          }

          .model-hover-info .name {
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 1px;
            color: #fff;
            margin-bottom: 4px;
          }

          .model-hover-info .agency {
            font-size: 10px;
            letter-spacing: 2px;
            color: rgba(255,255,255,0.7);
          }

          /* Section Labels */
          .models-row-label {
            color: rgba(0,0,0,0.8);
            margin-bottom: 20px;
            padding-left: 4px;
          }

          .vew-more-model-btn{
            display: flex;
            margin-top: 80px;
            align-items: center;
            justify-content: center;
          }

          @media (max-width: 1024px) {
            .models-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }
          }

          @media (max-width: 640px) {
            .models-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
            }
          }
        `}</style>

        <div className="models-header">
          <div>
            <span className="sub_head models-tag">02 — Talent Roster</span>
            <h2 className={`models-title ${playfair.className}`}>
              Our<br />Models.
            </h2>
          </div>
          <p className={`models-subtitle ${poppins.className}`}>
            A curated roster of elite talent— 
            selected for presence, versatility, 
            and the rare ability to transcend the frame.
          </p>
        </div>

        {/* Female Models Row */}
        <div>
          <div className="sub_head models-row-label">FEMALE TALENT</div>
          <div className="models-grid female-grid">
            {[
              { name: "Stanzin", img: "/images/models/model1.jpg" },
              { name: "Angmo", img: "/images/models/model4.jpg" },
              { name: "Lanzes", img: "/images/models/model3.jpg" },
              { name: "Pema", img: "/images/models/model7.PNG" },
              { name: "Stanzin", img: "/images/models/model6.PNG" },
            ].map((model, i) => (
              <div key={i} className="model-card" data-speed="0.18">
                <img src={model.img} alt={model.name} />
                <div className="model-hover-info">
                  <span className="name">{model.name}</span>
                  <span className="agency">{model.agency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div style={{ height: "100px" }} />

        {/* Male Models Row */}
        <div>
          <div className="sub_head models-row-label">MALE TALENT</div>
          <div className="models-grid male-grid">
            {[
              { name: "Rigzin", img: "/images/models/model2.jpeg" },
              { name: "Stanzin", img: "/images/models/model5.jpg" },
              { name: "Thinley", img: "/images/models/model2.jpeg" },
              { name: "Jimmy", img: "/images/models/model2.jpeg" },
              { name: "Nubu", img: "/images/models/model2.jpeg" },
            ].map((model, i) => (
              <div key={i} className="model-card" data-speed="0.25">
                <img src={model.img} alt={model.name} />
                <div className="model-hover-info">
                  <span className="name">{model.name}</span>
                  <span className="agency">{model.agency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      <div className="vew-more-model-btn">
        <ButtonPrimary label={"Explore All Talents"} color="#000000"/>
      </div>
        
      </section>

        
        </>
    );
}