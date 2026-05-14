"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "@/components/layout/Menu";
import { ButtonPrimary, ButtonGhost } from "@/components/ui/Button";


// Fonts
import { playfair, poppins } from '@/libs/Fonts';


const videos = [
    { src: "/videos/model2.mp4", label: "01 — MODELS", title: "Models.", tagline: "Curated talent for global campaigns" },
    { src: "/videos/model1.mp4", label: "02 — PRODUCTION", title: "Production.", tagline: "Seamless execution in extreme locations" },
    { src: "/videos/model2.mp4", label: "03 — Creative", title: "Creative Studio.", tagline: "Crafting stories that leave a mark" },
];


export default function Hero() {

    useEffect(() => {
        const photoImg = document.querySelector('.photo_sec img');

        if (!photoImg) return;

        gsap.to(photoImg, {
            yPercent: -1,           // How much the image moves up (adjust this value)
            ease: "none",
            scrollTrigger: {
                trigger: ".photo_sec",
                start: "top bottom",     // Start when the top of the section reaches the bottom of viewport
                end: "bottom top",       // End when the bottom of the section leaves the top of viewport
                scrub: 1.2,              // Smoothness (higher = smoother but more delayed)
                // markers: true,        // Uncomment to debug the trigger area
            },
        });
    }, []);

    const heroRef = useRef(null);
    const videoWrapRef = useRef(null);
    const videoRefs = useRef([]);
    const modelsSectionRef = useRef(null);   // ← FIXED: Added this missing ref

    const [activeIdx, setActiveIdx] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    // New: Auto timer reference
    const autoTimerRef = useRef(null);


    // GSAP scroll animation - UNCHANGED
    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=100%",
                    scrub: 0.1,
                },
            });

            // Fade out entire hero UI wrapper at once
            tl.to(".hero-ui", { opacity: 0, duration: 0.4, ease: "power2.out" }, 0);
            tl.to(".nav-bar", { y: -80, opacity: 0, duration: 0.35 }, 0);

            // Video shrinks from full-screen to a tall centred card
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

            // Small label fades in once video settled as a card
            tl.to(".video-landing-label", {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
            }, 0.88);
        });
        return () => mm.revert();
    }, []);

    // Auto change video every 8 seconds
    const startAutoTimer = useCallback(() => {
        if (autoTimerRef.current) clearTimeout(cautoTimerRef.current);

        autoTimerRef.current = setTimeout(() => {
            if (!transitioning) {
                const next = (activeIdx + 1) % videos.length;
                setActiveIdx(next);
            }
        }, 10000);
    }, [activeIdx, transitioning]);

    // Clear timer
    const clearAutoTimer = useCallback(() => {
        if (autoTimerRef.current) {
            clearTimeout(autoTimerRef.current);
            autoTimerRef.current = null;
        }
    }, []);

    // Manual change video with arrows
    const changeVideo = (dir) => {
        if (transitioning) return;
        setTransitioning(true);
        clearAutoTimer();

        const next = (activeIdx + dir + videos.length) % videos.length;

        setTimeout(() => {
            setActiveIdx(next);
            setTimeout(() => {
                setTransitioning(false);
                startAutoTimer();
            }, 650);
        }, 180);
    };

    // Go to specific video via dots
    const goToVideo = (index) => {
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

    // Start auto timer when component mounts and when activeIdx changes
    useEffect(() => {
        startAutoTimer();
        return () => clearAutoTimer();
    }, [startAutoTimer]);
    return (
        <>

            <style>{`
        
                
        
                /* HERO — 200vh gives scroll room while section is un-pinned */
                .hero-section {
                  position: relative;
                  width: 100vw;
                  height: 180vh;
                  background: #0e0e0e;
                }
        
                .hero-section::before{
                  content: "";
                  height: 100%;
                  width: 100%;
                  left: 0;
                  top: 0;
                  
                }
        
                /* VIDEO WRAP — absolute, animates via GSAP */
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
                  font-size: 9px;
                  letter-spacing: 5px;
                  text-transform: uppercase;
                  color: rgba(255,255,255,0.55);
                  white-space: nowrap;
                  opacity: 0;
                  translate: 0 12px;
                  pointer-events: none;
                }
        
                /* ── HERO UI WRAPPER ── */
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
        
                /* HEADING — left, vertically centred */
                .hero-heading {
                  position: absolute;
                  left: 52px;
                  top: 50%;
                  transform: translateY(-50%);
                  max-width: 50%;
                }
                .hero-heading .eyebrow {
                  display: block;
                  font-size: 9px;
                  letter-spacing: 5px;
                  text-transform: uppercase;
                  color: rgba(255,255,255,0.8);
                  margin-bottom: 18px;
                }
                .hero-heading h1 {
                  color: #fff;
                }
        
                /* PARAGRAPH — right, vertically centred */
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
        
                /* CONTROLS — bottom centre */
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
                  font-size: 10px;
                  letter-spacing: 3px;
                  color: rgba(255,255,255,0.8);
                  margin: 0 14px;
                }
        
                /* DOTS — bottom right */
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
        
                /* SCROLL HINT — bottom left */
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
                  font-size: 8px;
                  letter-spacing: 4px;
                  text-transform: uppercase;
                  color: rgba(255,255,255,0.8);
                }
        
                /* SHOWCASE */
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
                  height: 900px;           /* or whatever height you prefer */
                  margin-top: 100px;
                  position: relative;
                  overflow: hidden;        /* ← Important: clips the image */
                  width: 100vw;
                }
        
                .photo_sec img {
                  width: 100%;
                  height: 180%;            /* ← Make image taller than container for parallax room */
                  object-fit: cover;
                  position: absolute;
                  top: -10%;               /* ← Start slightly above so it has space to move up */
                  left: 0;
                  will-change: transform;  /* Better performance */
                }
        
                /* ABOUT */
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
        
        
              `}</style>



            <Menu />

            {/* HERO */}
            <section className="hero-section" ref={heroRef}>

                {/* Video layer */}
                <div className="video-wrap" ref={videoWrapRef}>
                    <AnimatePresence mode="wait">
                        {videos.map((video, i) => (
                            <motion.video
                                key={i}
                                ref={(el) => (videoRefs.current[i] = el)}
                                className="video-item"
                                src={video.src}
                                autoPlay muted loop playsInline
                                initial={{ opacity: 0, scale: 1.1, filter: "blur(14px)" }}
                                animate={{
                                    opacity: i === activeIdx ? 1 : 0,
                                    scale: i === activeIdx ? 1 : 1.07,
                                    filter: i === activeIdx ? "blur(0px)" : "blur(14px)",
                                }}
                                exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                            />
                        ))}
                    </AnimatePresence>
                    <div className="video-overlay" />
                    <span className="video-landing-label">{videos[activeIdx].label}</span>
                </div>

                {/* HERO UI WRAPPER */}
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
                                <span className="eyebrow">{videos[activeIdx].label}</span>
                                <h1 className={playfair.className}>
                                    {videos[activeIdx].title}
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
                                <p className={poppins.className}>
                                    {videos[activeIdx].tagline}.
                                    Pushing boundaries in brand, motion, and experience design.
                                </p>
                                <ButtonGhost label={"Explore Work"} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="video-controls">
                        <button className="ctrl-btn" onClick={() => changeVideo(-1)}>&#8249;</button>
                        <span className="ctrl-label">0{activeIdx + 1} / 0{videos.length}</span>
                        <button className="ctrl-btn" onClick={() => changeVideo(1)}>&#8250;</button>
                    </div>

                    <div className="video-dots">
                        {videos.map((_, i) => (
                            <div
                                key={i}
                                className={`dot ${i === activeIdx ? "active" : ""}`}
                                onClick={() => goToVideo(i)}
                            />
                        ))}
                    </div>

                    <div className="scroll-hint">
                        <span className="scroll-text">Scroll</span>
                        <div className="cta-scroll-bar" />
                    </div>

                </div>

            </section>



            {/* SHOWCASE */}
            <section className="showcase-section">
                <div className="showcase-inner">
                    <span className="sub_head showcase-tag">Creative Studio — Est. 2018</span>

                    <h2 className={`showcase-title ${playfair.className}`}>
                        From Talent to Execution
                    </h2>

                    <p className={`showcase-desc ${poppins.className}`}>
                        From curated models to seamless line production and creative direction,
                        we deliver end-to-end solutions for brands and storytellers.
                        Rooted in Ladakh, we combine local expertise with global standards
                        to create visuals that leave a lasting impact.
                    </p>
                </div>
                <div className="photo_sec">
                    <img src="/images/index/about.jpeg" />
                </div>
            </section>
        </>
    );
}