"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "@/components/layout/Menu";
import { ButtonPrimary, ButtonGhost } from "@/components/ui/Button";

// Fonts
import { playfair, poppins } from '@/libs/Fonts';

const slides = [
    { label: "01 — MODELS", title: "Models.", tagline: "Distinctive faces from across Ladakh." },
    { label: "02 — PRODUCTION", title: "Production.", tagline: "End to end line production support" },
    { label: "03 — Creative", title: "Creative.", tagline: "Creative direction and visual storytelling" },
];

export default function Hero() {

    useEffect(() => {
        const photoImg = document.querySelector('.photo_sec img');
        if (!photoImg) return;
        gsap.to(photoImg, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: ".photo_sec",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
            },
        });
    }, []);

    const heroRef = useRef(null);
    const videoWrapRef = useRef(null);

    const [activeIdx, setActiveIdx] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    const autoTimerRef = useRef(null);

    // GSAP scroll animation — now gated: only runs on screens >=900px.
    // Below that, the video stays full screen and static — no
    // shrink/move-on-scroll effect, keeps small screens simple.
    // Nav hide-on-scroll is handled centrally in Nav.js — not here.
    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 900px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=100%",
                    scrub: 0.1,
                },
            });

            tl.to(".hero-ui", { opacity: 0, duration: 0.4, ease: "power2.out" }, 0);

            tl.to(videoWrapRef.current, {
                width: "40vw",
                height: "80vh",
                top: "90vh",
                left: "50%",
                xPercent: -50,
                borderRadius: "0px",
                ease: "power3.inOut",
                duration: 0.7,
            }, 0.25);

            tl.to(".video-landing-label", {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
            }, 0.88);
        });

        // Below 700px — no scroll-driven transform at all, just a
        // simple static full-screen video. Nothing to register here.
        mm.add("(max-width: 699px)", () => {
            // intentionally empty — static state handled entirely by CSS
        });

        return () => mm.revert();
    }, []);

    const startAutoTimer = useCallback(() => {
        if (autoTimerRef.current) clearTimeout(autoTimerRef.current);

        autoTimerRef.current = setTimeout(() => {
            if (!transitioning) {
                const next = (activeIdx + 1) % slides.length;
                setActiveIdx(next);
            }
        }, 10000);
    }, [activeIdx, transitioning]);

    const clearAutoTimer = useCallback(() => {
        if (autoTimerRef.current) {
            clearTimeout(autoTimerRef.current);
            autoTimerRef.current = null;
        }
    }, []);

    const changeSlide = (dir) => {
        if (transitioning) return;
        setTransitioning(true);
        clearAutoTimer();

        const next = (activeIdx + dir + slides.length) % slides.length;

        setTimeout(() => {
            setActiveIdx(next);
            setTimeout(() => {
                setTransitioning(false);
                startAutoTimer();
            }, 650);
        }, 180);
    };

    const goToSlide = (index) => {
        if (transitioning || index === activeIdx) return;
        setTransitioning(true);
        clearAutoTimer();

        setTimeout(() => {
            setActiveIdx(index);
            setTimeout(() => {
                setTransitioning(false);
                startAutoTimer();
            }, 650);
        }, 180);
    };

    useEffect(() => {
        startAutoTimer();
        return () => clearAutoTimer();
    }, [startAutoTimer]);

    return (
        <>
            <style>{`
                .hero-section {
                  position: relative;
                  width: 100vw;
                  height: 180vh;
                  background: #0e0e0e;
                }

                

                .video-wrap {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100vw;
                  height: 100vh;
                  border-radius: 0;
                  overflow: hidden;
                  z-index: 2;
                  will-change: top, left, width, height, border-radius;
                }

                .video-item {
                  position: absolute;
                  inset: 0;
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }

                .video-overlay {
                  position: absolute;
                  inset: 0;
                  background: linear-gradient(
                    to bottom,
                    rgba(6, 1, 1, 0.75) 0%,
                    rgba(0, 0, 0, 0.34) 50%,
                    rgba(0, 0, 0, 0.3) 100%
                  );
                  z-index: 3;
                }

                .video-landing-label {
                  position: absolute;
                  bottom: 28px;
                  left: 50%;
                  transform: translateX(-50%);
                  z-index: 10;
                  color: rgba(255,255,255,0.55);
                  white-space: nowrap;
                  opacity: 0;
                  translate: 0 12px;
                  pointer-events: none;
                }
                @media (max-width: 699px) {
                  /* No scroll animation to reveal this label on small screens — hide it */
                  .video-landing-label { display: none; }
                }

                .hero-ui {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100vh;
                  z-index: 20;
                  pointer-events: none;
                }
                .hero-ui > * {
                  pointer-events: auto;
                }

                .hero-heading {
                  position: absolute;
                  left: 52px;
                  top: 50%;
                  transform: translateY(-50%);
                  max-width: 50%;
                }
                .hero-heading .eyebrow {
                  display: block;
                  color: rgba(255,255,255,0.8);
                  margin-bottom: 18px;
                }
                .hero-heading h1 {
                  color: #fff;
                }

                .hero-para {
                  position: absolute;
                  right: 52px;
                  top: 50%;
                  transform: translateY(-50%);
                  max-width: 20%;
                  text-align: right;
                }
                .hero-para p {
                  color: rgb(255, 255, 255);
                  margin-bottom: 28px;
                }
                .hero-para .cta-link {
                  font-size: 9px;
                  letter-spacing: 4px;
                  text-transform: uppercase;
                  color: #fff;
                  text-decoration: none;
                  border-bottom: 1px solid rgba(255,255,255,0.35);
                  padding-bottom: 4px;
                  transition: border-color 0.25s;
                }
                .hero-para .cta-link:hover { border-color: #fff; }

                @media (max-width: 699px) {
                  .hero-heading, .hero-para {
                    position: static;
                    transform: none;
                    max-width: 100%;
                    text-align: left;
                    margin: 0 auto;
                  }
                  .hero-heading {
                    top: auto;
                    margin-top: 40vh;
                    padding: 0 24px;
                  }
                  .hero-para {
                    text-align: left;
                    padding: 0 24px;
                    margin-top: 20px;
                  }

                  
                }

                .video-controls {
                  position: absolute;
                  bottom: 48px;
                  left: 50%;
                  transform: translateX(-50%);
                  display: flex;
                  align-items: center;
                  gap: 4px;
                }
                .ctrl-btn {
                  background: none;
                  border: 1px solid rgba(255,255,255,0.8);
                  color: #fff;
                  font-size: 18px;
                  width: 38px;
                  height: 38px;
                  border-radius: 50%;
                  cursor: pointer;
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  transition: background 0.25s;
                }
                .ctrl-btn:hover { background: rgba(255,255,255,0.12); }
                .ctrl-label {
                  color: rgba(255,255,255,0.8);
                  margin: 0 14px;
                }

                .video-dots {
                  position: absolute;
                  bottom: 48px;
                  right: 52px;
                  display: flex;
                  gap: 8px;
                  align-items: center;
                }
                .dot {
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                  background: rgba(255,255,255,0.5);
                  cursor: pointer;
                  transition: all 0.25s;
                }
                .dot.active { background: #fff; transform: scale(1.45); }

                .scroll-hint {
                  position: absolute;
                  bottom: 48px;
                  left: 52px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 10px;
                }
                .scroll-line {
                  width: 1px;
                  height: 44px;
                  background: rgba(255,255,255,0.7);
                }
                .scroll-text {
                  color: rgba(255,255,255,0.8);
                }

                .showcase-section {
                  position: relative;
                  width: 100vw;
                  background: #0e0e0e;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                }
                .showcase-inner {
                  width: 100%;
                  max-width: 80%;
                  padding: 0 52px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  text-align: center;
                  gap: 24px;
                }
                .showcase-tag {
                  color: rgba(255,255,255,0.8);
                }
                .showcase-title {
                  color: #fff;
                }
                .showcase-desc {
                  color: white;
                  max-width: 70%;
                }

                .photo_sec {
                  height: 900px;
                  margin-top: 100px;
                  position: relative;
                  overflow: hidden;
                  width: 100vw;
                }
                .photo_sec img {
                  width: 100%;
                  height: 180%;
                  object-fit: cover;
                  position: absolute;
                  top: -10%;
                  left: 0;
                  will-change: transform;
                  object-position: center;
                }

                .about-section {
                  position: relative;
                  background: #ffffff;
                  padding: 140px 52px 160px;
                }
                .about-content {
                  width: 100%;
                  max-width: 1100px;
                  margin: 0 auto;
                }
                .about-top-row {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 60px;
                  padding-bottom: 24px;
                  border-bottom: 1px solid rgba(17,17,17,0.08);
                }
                .about-main {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 80px;
                  align-items: start;
                }



                /* Below 700px — hero is a simple, static full-screen block.
                   No 180vh scroll runway needed since there's no shrink animation. */
                @media (max-width: 899px) {
                  .hero-section {
                    height: 100vh;
                  }

                  .showcase-inner{
                    padding: 100px 50px 50px 50px;
                    max-width: 100%;
                  }

                  .showcase-desc{
                    max-width: 85%;
                  }

                  .scroll-hint{
                    left: 25px
                  }
                    .video-dots {
                        right: 25px;
                        bottom: 63px;
                    }
                }



                @media (max-width: 499px) {
                  .showcase-inner{
                    padding: 100px 10px 50px 10px;
                    max-width: 100%;
                  }

                  .showcase-desc{
                    max-width: 95%;
                  }

                  .photo_sec{
                    height: 600px;
                  }
                }


            `}</style>

            <Menu />

            {/* HERO */}
            <section className="hero-section" ref={heroRef}>

                {/* Single video — always playing */}
                <div className="video-wrap" ref={videoWrapRef}>
                    <video
                        className="video-item"
                        src="/videos/shoot1.mp4"
                        autoPlay muted loop playsInline
                    />
                    <div className="video-overlay" />
                    <span className={`video-landing-label sub_head ${poppins.className}`}>{slides[activeIdx].label}</span>
                </div>

                {/* HERO UI — text still cycles through slides */}
                <div className="hero-ui">

                    <div className="hero-heading">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, y: 36 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -28 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className={`eyebrow sub_head ${poppins.className}`}>{slides[activeIdx].label}</span>
                                <h1 className={`heading-hero ${playfair.className}`}>
                                    {slides[activeIdx].title}
                                </h1>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="hero-para">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -22 }}
                                transition={{ duration: 0.6, delay: 0.08 }}
                            >
                                <p className={`para ${poppins.className}`}>
                                    {slides[activeIdx].tagline}.
                                </p>
                                <ButtonGhost label={"Explore Work"} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="video-controls">
                        <button className="ctrl-btn" onClick={() => changeSlide(-1)}>&#8249;</button>
                        <span className={`ctrl-label sub_head ${poppins.className}`}>0{activeIdx + 1} / 0{slides.length}</span>
                        <button className="ctrl-btn" onClick={() => changeSlide(1)}>&#8250;</button>
                    </div>

                    <div className="video-dots">
                        {slides.map((_, i) => (
                            <div
                                key={i}
                                className={`dot ${i === activeIdx ? "active" : ""}`}
                                onClick={() => goToSlide(i)}
                            />
                        ))}
                    </div>

                    <div className="scroll-hint">
                        <span className={`scroll-text sub_head ${poppins.className}`}>Scroll</span>
                        <div className="cta-scroll-bar" />
                    </div>

                </div>
            </section>

            {/* SHOWCASE */}
            <section className="showcase-section">
                <div className="showcase-inner">
                    <span className={`sub_head showcase-tag ${poppins.className}`}>Mountain Muse Management — Est. 2023</span>

                    <h2 className={`showcase-title heading-sub ${playfair.className}`}>
                        If it's in Ladakh, it's M3
                    </h2>

                    <p className={`showcase-desc para ${poppins.className}`}>
                        Mountain Muse Management is a Ladakh-based talent, production, and creative company built for brands that want to do something real
                        in one of the world's most extraordinary landscapes. We are the people who know this place, know how to work in it,
                        and know how to turn it into something a brand can actually use.
                    </p>
                </div>
                <div className="photo_sec">
                    <img src="/images/index/about.jpeg" />
                </div>
            </section>
        </>
    );
}