"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { ButtonPrimary, ButtonGhost } from "@/components/ui/Button";

// fonts
import { playfair, poppins } from '@/libs/Fonts';

export default function Cta() {

    useEffect(() => {
        const loadGSAP = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            // CTA entrance
            const tl = gsap.timeline({ delay: 0.2 });
            tl.to('#ctaTag', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
                .to('#ctaHeadline', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.5')
                .to('#ctaSub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
                .to('#ctaBtns', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
                .to('#ctaScroll', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');

            // BG cell scale
            gsap.fromTo('.cta-bg-cell img',
                { scale: 1.12 },
                { scale: 1.04, duration: 8, ease: 'power1.inOut', stagger: 0.3 }
            );

            // Cycle active cell
            const cells = document.querySelectorAll('.cta-bg-cell');
            let activeIdx = 0;
            cells[0].classList.add('active');
            const cycleInterval = setInterval(() => {
                cells[activeIdx].classList.remove('active');
                activeIdx = (activeIdx + 1) % cells.length;
                cells[activeIdx].classList.add('active');
            }, 2800);

            // CTA headline parallax
            gsap.to('#ctaHeadline', {
                scrollTrigger: { trigger: '#cta', start: 'top 100%', end: 'bottom top', scrub: true },
                y: -60,
                ease: 'none'
            });

            return () => {
                clearInterval(cycleInterval);
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        };

        loadGSAP();
    }, []);

    return (
        <>



            {/* ── CTA SECTION ── */}
            <div className="top_spacer" />
            <section className="cta-section" id="cta">


                <style>{`

    .top_spacer{
      padding-top: 140px;
      background-color: white;
    }
    .cta-section {
      position: relative;
      width: 100%;
      height: 100vh;
      min-height: 700px;
      overflow: hidden;
      background: #0a0a0a;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cta-bg-grid {
      position: absolute;
      inset: 0;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 3px;
      z-index: 1;
    }

    .cta-bg-cell {
      overflow: hidden;
      position: relative;
    }

    .cta-bg-cell img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.22;
      transition: opacity 1.8s ease, transform 8s ease;
      transform: scale(1.08);
    }

    .cta-bg-cell.active img {
      opacity: 0.38;
      transform: scale(1.0);
    }

    .cta-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.12) 60%, rgba(0, 0, 0, 0.3) 100%);
      z-index: 2;
    }

    .cta-content {
      position: relative;
      z-index: 5;
      text-align: center;
      padding: 0 40px;
      max-width: 900px;
    }

    .cta-tag {
      color: rgba(255,255,255,0.8);
      margin-bottom: 36px;
      display: block;
      opacity: 0;
      transform: translateY(20px);
    }

    .cta-headline { 
      color: #fff;
      margin-bottom: 32px;
      opacity: 0;
      transform: translateY(30px);
    }

    .cta-headline em {
      font-style: italic;
      color: transparent;
      -webkit-text-stroke: 1px rgba(255,255,255,0.45);
    }

    .cta-sub {
      color: rgba(255,255,255,0.8);
      margin-bottom: 56px;
      opacity: 0;
      transform: translateY(20px);
    }

    .cta-btn-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      opacity: 0;
      transform: translateY(20px);
    }

    .cta-btn {
      font-size: 9px;
      letter-spacing: 5px;
      text-transform: uppercase;
      color: #111;
      background: #fff;
      border: none;
      padding: 18px 44px;
      cursor: pointer;
      transition: color 0.3s;
      position: relative;
      overflow: hidden;
    }

    .cta-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: #111;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.77,0,0.175,1);
    }

    .cta-btn:hover::before { transform: scaleX(1); }
    .cta-btn:hover { color: #fff; }
    .cta-btn span { position: relative; z-index: 2; }

    .cta-btn-ghost {
      font-size: 9px;
      letter-spacing: 5px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.5);
      background: transparent;
      border: 1px solid rgba(255,255,255,0.18);
      padding: 18px 44px;
      cursor: pointer;
      transition: border-color 0.3s, color 0.3s;
    }

    .cta-btn-ghost:hover {
      border-color: rgba(255,255,255,0.5);
      color: #fff;
    }

    .cta-scroll-line {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 5;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      opacity: 0;
    }

    .cta-scroll-label {
      font-size: 8px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.3);
    }

    .cta-scroll-bar {
      width: 1px;
      height: 48px;
      background: rgba(255,255,255,0.15);
      position: relative;
      overflow: hidden;
    }

    .cta-scroll-bar::after {
      content: '';
      position: absolute;
      top: -100%;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,0.6);
      animation: scrollPulse 2s ease infinite;
    }

    @keyframes scrollPulse {
      0% { top: -100%; }
      100% { top: 100%; }
    }
  `}</style>

                <div className="cta-bg-grid" id="bgGrid">
                    <div className="cta-bg-cell" id="cell0">
                        <img src="/images/index/about.jpeg" alt="" />
                    </div>
                    <div className="cta-bg-cell" id="cell1">
                        <img src="/images/models/model1.jpg" alt="" />
                    </div>
                    <div className="cta-bg-cell" id="cell2">
                        <img src="/images/models/model4.jpg" alt="" />
                    </div>
                    <div className="cta-bg-cell" id="cell3">
                        <img src="/images/models/model3.jpg" alt="" />
                    </div>
                    <div className="cta-bg-cell" id="cell4">
                        <img src="/images/models/model7.PNG" alt="" />
                    </div>
                    <div className="cta-bg-cell" id="cell5">
                        <img src="/images/models/model2.jpeg" alt="" />
                    </div>
                </div>

                <div className="cta-overlay" />

                <div className="cta-content">
                    <span className={`sub_head cta-tag ${poppins.className}`} id="ctaTag">05 — Begin</span>
                    <h2 className={`cta-headline ${playfair.className}`} id="ctaHeadline">
                        Let's make<br />something <em>real.</em>
                    </h2>
                    <p className={`cta-sub ${poppins.className}`} id="ctaSub">
                        We take on a small number of projects each season.<br />
                        If you have a story worth telling in Ladakh — reach out.
                    </p>
                    <div className="cta-btn-wrap" id="ctaBtns">
                        <ButtonPrimary label="Start A project" />
                    </div>
                </div>

                <div className="cta-scroll-line" id="ctaScroll">
                  <span className="scroll-text">Scroll</span>
                        <div className="cta-scroll-bar" />
                </div>
            </section>
        </>
    );
}