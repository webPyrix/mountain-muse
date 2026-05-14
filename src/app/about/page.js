"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Menu from "@/components/layout/Menu";
import { ButtonPrimary, ButtonGhost } from "@/components/ui/Button";
import { playfair, poppins } from "@/libs/Fonts";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: "7+", label: "Years in Ladakh" },
  { num: "120+", label: "Projects Delivered" },
  { num: "40+", label: "Elite Talents" },
  { num: "18", label: "Brand Campaigns" },
];

const values = [
  {
    num: "01",
    title: "Place First",
    body:
      "Ladakh is not a backdrop. Every project we take on starts with the landscape — its light, its altitude, its silence. The location isn't decoration. It's the story.",
  },
  {
    num: "02",
    title: "Fewer. Better.",
    body:
      "We take on a small number of projects each season. Not because we can't handle more — because the work demands full attention, and we refuse to dilute it.",
  },
  {
    num: "03",
    title: "Rooted Talent",
    body:
      "Our talent roster is built from people who live and breathe this region. Local faces, local energy, global standards. That combination is something no agency can manufacture.",
  },
  {
    num: "04",
    title: "End-to-End",
    body:
      "From the first permit call to the final grade, we handle everything. Clients come for the creative; they stay because we remove every obstacle between idea and image.",
  },
];

const team = [
  {
    name: "Pema",
    role: "Co-Founder — Talent & Network",
    img: "/images/models/model7.PNG",
    bio: "Pema founded Mountain Muse after years of modelling across India and building one of the only established talent networks in Ladakh. She knows this landscape and the people in it better than anyone. Every face on our roster came through her — personally scouted, personally vouched for.",
    detail:
      "Her eye for presence and her deep local roots are the backbone of everything we do on the talent side.",
  },
  {
    name: "Rahul",
    role: "Co-Founder — Creative Direction",
    img: "/images/models/model2.jpeg",
    bio: "Rahul spent a decade building and running Bombay Trooper, one of India's most recognised outdoor D2C brands. He has shot on Everest, skied the Himalayas, and spent years learning what it takes to turn extreme outdoor environments into brand stories that actually perform.",
    detail:
      "He brings the creative direction, the brand thinking, and the structure to make sure every project we take on is built to mean something beyond the frame.",
  },
];

const timeline = [
  { year: "2018", event: "Mountain Muse founded in Leh by Pema." },
  { year: "2019", event: "First brand campaign delivered for an outdoor apparel label." },
  { year: "2020", event: "Rahul joins as Creative Director. Line production arm launched." },
  { year: "2021", event: "Talent roster expands to 20+ models. First international client." },
  { year: "2022", event: "Shot three full brand films across Nubra, Pangong & Zanskar." },
  { year: "2023", event: "Creative Studio formalised. End-to-end campaign offering launched." },
  { year: "2024", event: "40+ talents on roster. Partnerships with 12 national brands." },
  { year: "2025", event: "Entering our most ambitious season yet." },
];

export default function AboutPage() {

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Hero entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(".ab-hero-tag",    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .to(".ab-hero-h1",     { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, "-=0.45")
      .to(".ab-hero-sub",    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.55")
      .to(".ab-hero-scroll", { opacity: 1, duration: 0.6 }, "-=0.3");
  }, []);

  // Stats counter on scroll
  useEffect(() => {
    gsap.fromTo(
      ".ab-stat-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".ab-stats-strip", start: "top 80%" },
      }
    );
  }, []);

  // Values entrance
  useEffect(() => {
    gsap.fromTo(
      ".ab-value-row",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".ab-values-grid", start: "top 75%" },
      }
    );
  }, []);

  // Timeline line draw
  useEffect(() => {
    gsap.fromTo(
      ".ab-tl-line-inner",
      { scaleY: 0 },
      {
        scaleY: 1, duration: 1.4, ease: "power3.inOut",
        scrollTrigger: { trigger: ".ab-timeline", start: "top 70%" },
      }
    );
    gsap.fromTo(
      ".ab-tl-item",
      { opacity: 0, x: -28 },
      {
        opacity: 1, x: 0, duration: 0.75, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".ab-timeline", start: "top 68%" },
      }
    );
  }, []);

  // Team cards
  useEffect(() => {
    gsap.fromTo(
      ".ab-team-card",
      { opacity: 0, y: 60, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.0, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".ab-team-grid", start: "top 75%" },
      }
    );
  }, []);

  // Footer cols
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ["#afc0","#afc1","#afc2","#afc3"].forEach((id, i) => {
        gsap.from(id, {
          scrollTrigger: { trigger: ".ab-ft-mid", start: `top ${90 - i * 3}%`, end: `top ${70 - i * 3}%`, scrub: 3.5 },
          opacity: 0, y: 50, ease: "none",
        });
      });
      gsap.from(".ab-ft-bottom", {
        scrollTrigger: { trigger: ".ab-ft-bottom", start: "top 110%", end: "top 75%", scrub: 4 },
        opacity: 0, y: 30, ease: "none",
      });
    };
    load();
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { background: #0e0e0e; color: #111; }

        /* ── NAV ── */
        .nav-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          padding: 0px 52px;
        }
        .nav-logo img { height: 100px; }
        .nav-links { display: flex; gap: 40px; list-style: none; }
        .nav-links a {
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: #fff; text-decoration: none; opacity: 0.7; transition: opacity 0.25s;
        }
        .nav-links a:hover { opacity: 1; }

        /* ── HERO ── */
        .ab-hero {
          position: relative; width: 100vw; height: 100vh;
          background: #0b0b0b; overflow: hidden;
          display: flex; align-items: flex-end;
        }
        .ab-hero-bg {
          position: absolute; inset: 0; z-index: 1;
        }
        .ab-hero-bg img {
          width: 100%; height: 100%; object-fit: cover; opacity: 0.38;
          transform: scale(1.06);
        }
        .ab-hero-overlay {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(
            to bottom,
            rgba(11,11,11,0.55) 0%,
            rgba(11,11,11,0.25) 40%,
            rgba(11,11,11,0.75) 100%
          );
        }
        .ab-hero-content {
          position: relative; z-index: 5; padding: 0 52px 80px;
          width: 100%;
        }
        .ab-hero-tag {
          display: block; font-size: 9px; letter-spacing: 6px;
          text-transform: uppercase; color: rgba(255,255,255,0.7);
          margin-bottom: 28px; opacity: 0; transform: translateY(20px);
        }
        .ab-hero-h1 {
          font-size: clamp(56px, 9vw, 130px); line-height: 0.87;
          letter-spacing: 1px; color: #fff;
          max-width: 70%; opacity: 0; transform: translateY(40px);
          margin-bottom: 36px;
        }
        .ab-hero-h1 em {
          font-style: italic; color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.4);
        }
        .ab-hero-sub {
          font-size: 13px; line-height: 1.85; color: rgba(255,255,255,0.75);
          font-weight: 300; max-width: 480px;
          opacity: 0; transform: translateY(20px);
        }
        .ab-hero-scroll {
          position: absolute; bottom: 40px; right: 52px;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          opacity: 0;
        }
        .ab-scroll-line {
          width: 1px; height: 44px; background: rgba(255,255,255,0.5);
        }
        .ab-scroll-text {
          font-size: 8px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }

        /* ── STATS STRIP ── */
        .ab-stats-strip {
          background: #fff; border-bottom: 1px solid rgba(17,17,17,0.08);
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .ab-stat-item {
          padding: 64px 52px; border-right: 1px solid rgba(17,17,17,0.08);
          opacity: 0;
        }
        .ab-stat-item:last-child { border-right: none; }
        .ab-stat-num {
          font-size: clamp(52px, 5.5vw, 82px); line-height: 1;
          letter-spacing: -1px; color: #111; margin-bottom: 10px;
        }
        .ab-stat-label {
          font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(0,0,0,0.5);
        }

        /* ── MISSION SECTION ── */
        .ab-mission {
          background: #fff; padding: 140px 52px 160px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 100px;
          align-items: start; border-top: 1px solid rgba(17,17,17,0.08);
        }
        .ab-mission-left {}
        .ab-mission-tag {
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
          color: rgba(0,0,0,0.6); margin-bottom: 36px; display: block;
        }
        .ab-mission-title {
          font-size: clamp(48px, 6vw, 96px); line-height: 0.88;
          letter-spacing: 1px; color: #111; margin-bottom: 0;
        }
        .ab-mission-title em {
          font-style: italic; color: transparent;
          -webkit-text-stroke: 1px #bbb;
        }
        .ab-mission-right {
          padding-top: 20px;
        }
        .ab-mission-body {
          font-size: 15px; line-height: 1.95; color: rgba(0,0,0,0.75);
          font-weight: 300; margin-bottom: 36px;
        }
        .ab-mission-body strong { color: #111; font-weight: 500; }
        .ab-mission-quote {
          border-left: 2px solid rgba(17,17,17,0.5);
          padding-left: 28px;
          font-size: 18px; line-height: 1.55; color: #111;
          font-style: italic; margin-bottom: 52px;
        }

        /* ── VALUES ── */
        .ab-values {
          background: #0b0b0b; padding: 140px 52px 160px;
          color: #fff;
        }
        .ab-values-head {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 80px;
          padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .ab-values-tag {
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-bottom: 20px; display: block;
        }
        .ab-values-h2 {
          font-size: clamp(48px, 5.5vw, 88px); line-height: 0.88;
          letter-spacing: 1px; color: #fff;
        }
        .ab-values-sub {
          max-width: 280px; font-size: 13px; line-height: 1.85;
          color: rgba(255,255,255,0.55); font-weight: 300; text-align: right;
        }
        .ab-values-grid {}
        .ab-value-row {
          display: grid; grid-template-columns: 80px 1fr 1fr;
          gap: 0; padding: 44px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          align-items: start; opacity: 0;
        }
        .ab-value-row:first-child { border-top: 1px solid rgba(255,255,255,0.07); }
        .ab-value-num {
          font-size: 9px; letter-spacing: 3px;
          color: rgba(255,255,255,0.35); padding-top: 4px;
        }
        .ab-value-title {
          font-size: clamp(22px, 2.4vw, 34px); line-height: 1.0;
          letter-spacing: 0.5px; color: #fff;
        }
        .ab-value-body {
          font-size: 13px; line-height: 1.85;
          color: rgba(255,255,255,0.6); font-weight: 300;
          padding-left: 20px;
        }

        /* ── TEAM ── */
        .ab-team {
          background: #fff; padding: 140px 52px 160px;
        }
        .ab-team-head {
          margin-bottom: 80px;
        }
        .ab-team-tag {
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
          color: rgba(0,0,0,0.6); margin-bottom: 28px; display: block;
        }
        .ab-team-h2 {
          font-size: clamp(56px, 7vw, 110px); line-height: 0.88;
          letter-spacing: 1px; color: #111;
        }
        .ab-team-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
        }
        .ab-team-card {
          position: relative; overflow: hidden;
          border: 1px solid rgba(17,17,17,0.07);
          opacity: 0;
        }
        .ab-team-img-wrap {
          position: relative; height: 560px; overflow: hidden;
        }
        .ab-team-img-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.9s cubic-bezier(0.23,1,0.32,1);
        }
        .ab-team-card:hover .ab-team-img-wrap img { transform: scale(1.05); }
        .ab-team-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%);
          z-index: 2;
        }
        .ab-team-img-name {
          position: absolute; bottom: 24px; left: 28px; z-index: 5;
        }
        .ab-team-img-name-text {
          font-size: clamp(32px, 3.5vw, 52px); line-height: 1;
          letter-spacing: 1px; color: #fff;
        }
        .ab-team-img-role {
          font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(255,255,255,0.65); margin-top: 8px;
        }
        .ab-team-body { padding: 40px 36px 44px; background: #fff; }
        .ab-team-bio {
          font-size: 13px; line-height: 1.9; color: rgba(0,0,0,0.75);
          font-weight: 300; margin-bottom: 20px;
        }
        .ab-team-detail {
          font-size: 13px; line-height: 1.9; color: rgba(0,0,0,0.5);
          font-weight: 300; font-style: italic;
          border-top: 1px solid rgba(17,17,17,0.08); padding-top: 20px;
        }

        /* ── TIMELINE ── */
        .ab-timeline-section {
          background: #f8f8f6; padding: 140px 52px 160px;
        }
        .ab-timeline-head {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 80px;
        }
        .ab-timeline-tag {
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
          color: rgba(0,0,0,0.6); margin-bottom: 24px; display: block;
        }
        .ab-timeline-h2 {
          font-size: clamp(48px, 5.5vw, 88px); line-height: 0.88;
          letter-spacing: 1px; color: #111;
        }
        .ab-timeline-h2 em {
          font-style: italic; color: transparent;
          -webkit-text-stroke: 1px #ccc;
        }
        .ab-timeline { display: flex; gap: 0; }
        .ab-tl-line-wrap {
          width: 1px; position: relative; margin-right: 56px; flex-shrink: 0;
          background: rgba(17,17,17,0.1);
        }
        .ab-tl-line-inner {
          position: absolute; top: 0; left: 0; width: 100%;
          height: 100%; background: #111;
          transform-origin: top; transform: scaleY(0);
        }
        .ab-tl-list { flex: 1; }
        .ab-tl-item {
          display: grid; grid-template-columns: 80px 1fr;
          gap: 32px; padding: 32px 0;
          border-bottom: 1px solid rgba(17,17,17,0.07);
          align-items: start; opacity: 0;
        }
        .ab-tl-year {
          font-size: 9px; letter-spacing: 3px; color: rgba(0,0,0,0.4);
          padding-top: 3px;
        }
        .ab-tl-event {
          font-size: 15px; line-height: 1.65; color: #111; font-weight: 300;
        }
        .ab-tl-item:last-child .ab-tl-event { color: rgba(0,0,0,0.5); font-style: italic; }

        /* ── LOCATION ── */
        .ab-location {
          position: relative; height: 700px; overflow: hidden;
          background: #0b0b0b;
        }
        .ab-location-img {
          width: 100%; height: 130%; object-fit: cover;
          position: absolute; top: -15%; left: 0; opacity: 0.55;
          will-change: transform;
        }
        .ab-location-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(11,11,11,0.85) 0%, rgba(11,11,11,0.3) 60%, rgba(11,11,11,0.1) 100%);
          z-index: 2;
        }
        .ab-location-content {
          position: absolute; left: 52px; top: 50%;
          transform: translateY(-50%); z-index: 5;
          max-width: 520px;
        }
        .ab-location-tag {
          font-size: 9px; letter-spacing: 5px; text-transform: uppercase;
          color: rgba(255,255,255,0.6); margin-bottom: 28px; display: block;
        }
        .ab-location-h2 {
          font-size: clamp(42px, 5vw, 80px); line-height: 0.9;
          letter-spacing: 1px; color: #fff; margin-bottom: 32px;
        }
        .ab-location-body {
          font-size: 13px; line-height: 1.85;
          color: rgba(255,255,255,0.7); font-weight: 300; margin-bottom: 44px;
        }
        .ab-location-coords {
          display: flex; gap: 32px;
        }
        .ab-coord-block { }
        .ab-coord-label {
          font-size: 8px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(255,255,255,0.4); margin-bottom: 5px;
        }
        .ab-coord-val {
          font-size: 13px; letter-spacing: 1px; color: rgba(255,255,255,0.8);
        }

        /* ── CTA STRIP ── */
        .ab-cta {
          background: #fff; padding: 140px 52px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
          border-top: 1px solid rgba(17,17,17,0.06);
        }
        .ab-cta-h2 {
          font-size: clamp(48px, 5.5vw, 88px); line-height: 0.88;
          letter-spacing: 1px; color: #111;
        }
        .ab-cta-h2 em {
          font-style: italic; color: transparent;
          -webkit-text-stroke: 1px #ccc;
        }
        .ab-cta-right { }
        .ab-cta-body {
          font-size: 15px; line-height: 1.9; color: rgba(0,0,0,0.7);
          font-weight: 300; margin-bottom: 48px;
        }
        .ab-cta-body strong { color: #111; font-weight: 500; }
        .ab-cta-btns { display: flex; gap: 16px; align-items: center; }

        /* ── FOOTER ── */
        .ab-ft {
          background: #0b0b0b; color: #fff;
          position: relative; overflow: hidden;
        }
        .ab-ft-hero {
          padding: 80px 60px 60px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .ab-ft-hero-top {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 0;
        }
        .ab-ft-logo-zone { display: flex; align-items: center; gap: 28px; }
        .ab-ft-logo-box {
          width: 56px; height: 56px;
          border: 1px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
        }
        .ab-ft-brand-main {
          font-size: 15px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(255,255,255,0.85); font-weight: 400;
        }
        .ab-ft-brand-sub {
          font-size: 8px; letter-spacing: 5px; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-top: 4px;
        }
        .ab-ft-status {
          display: flex; align-items: center; gap: 8px;
          border: 1px solid rgba(255,255,255,0.4); padding: 10px 22px;
          font-size: 8px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(255,255,255,0.8);
        }
        .ab-ft-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #9dba84;
          animation: abBlink 2.2s ease infinite;
        }
        @keyframes abBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        .ab-ft-mid {
          display: grid;
          grid-template-columns: 1.6fr 1px 1fr 1px 1fr 1px 1fr;
          position: relative; z-index: 2;
        }
        .ab-ft-vd { background: rgba(255,255,255,0.1); }
        .ab-ft-col { padding: 56px 48px; }
        .ab-ft-col-tag {
          font-size: 8px; letter-spacing: 5px; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-bottom: 36px; display: block;
        }
        .ab-ft-statement {
          font-size: clamp(15px, 1.8vw, 20px); line-height: 1.2;
          color: rgba(255,255,255,1); max-width: 380px;
        }
        .ab-ft-statement strong { color: rgba(255,255,255,0.6); }
        .ab-ft-season { margin-top: 48px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.06); }
        .ab-ft-season-l { font-size: 8px; letter-spacing: 4px; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 7px; }
        .ab-ft-season-v { font-size: 12px; color: rgba(255,255,255,0.8); letter-spacing: 0.5px; }
        .ab-ft-nav { list-style: none; display: flex; flex-direction: column; }
        .ab-ft-nav li { border-bottom: 1px solid rgba(255,255,255,0.1); }
        .ab-ft-nav a {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 0; font-size: 13px; color: rgba(255,255,255,0.8);
          text-decoration: none; transition: color 0.25s, padding-left 0.3s;
        }
        .ab-ft-nav a:hover { color: #fff; padding-left: 5px; }
        .ab-ft-arr { font-size: 11px; opacity: 0.2; transition: opacity 0.25s, transform 0.25s; }
        .ab-ft-nav a:hover .ab-ft-arr { opacity: 0.6; transform: translate(3px, -3px); }
        .ab-ft-ci { margin-bottom: 26px; }
        .ab-ft-cl { font-size: 8px; letter-spacing: 4px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 6px; }
        .ab-ft-cv { font-size: 13px; color: rgba(255,255,255,0.8); letter-spacing: 0.3px; line-height: 1.6; }
        .ab-ft-soc { display: flex; flex-direction: column; }
        .ab-ft-soc a {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
          font-size: 13px; color: rgba(255,255,255,0.8); text-decoration: none;
          transition: color 0.25s, padding-left 0.3s;
        }
        .ab-ft-soc a:hover { color: #fff; padding-left: 5px; }
        .ab-ft-bottom {
          padding: 22px 50px; display: flex; align-items: end;
          justify-content: space-between; height: 180px; position: relative; z-index: 2;
        }
        .ab-ft-copy { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.8); }
        .ab-ft-craft { font-style: italic; font-size: 11px; color: rgba(255,255,255,0.3); letter-spacing: 0.5px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ab-mission { grid-template-columns: 1fr; gap: 60px; }
          .ab-team-grid { grid-template-columns: 1fr; }
          .ab-cta { grid-template-columns: 1fr; gap: 48px; }
          .ab-value-row { grid-template-columns: 60px 1fr; }
          .ab-value-body { grid-column: 2; padding-left: 0; padding-top: 12px; }
          .ab-stats-strip { grid-template-columns: 1fr 1fr; }
          .ab-stat-item:nth-child(2) { border-right: none; }
          .ab-ft-mid { grid-template-columns: 1fr; }
          .ab-ft-vd { display: none; }
        }
        @media (max-width: 640px) {
          .ab-stats-strip { grid-template-columns: 1fr; }
          .ab-stat-item { border-right: none; border-bottom: 1px solid rgba(17,17,17,0.08); }
          .ab-values-head { flex-direction: column; align-items: flex-start; gap: 24px; }
          .ab-values-sub { text-align: left; max-width: 100%; }
          .ab-hero-content { padding: 0 24px 64px; }
          .ab-mission, .ab-values, .ab-team, .ab-timeline-section, .ab-cta { padding-left: 24px; padding-right: 24px; }
          .ab-location-content { left: 24px; right: 24px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav-bar grid grid-cols-3">
        <div className="nav-logo flex">
          <img src="/images/logo.png" alt="Mountain Muse" />
        </div>
        <ul className="nav-links flex items-center justify-center">
          {["Home", "About", "Services", "Portfolio"].map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center justify-end">
          <ButtonPrimary label={"contact us"} color="#ffffff" />
        </div>
      </nav>

      <Menu />

      {/* ── HERO ── */}
      <section className="ab-hero">
        <div className="ab-hero-bg">
          <img src="/images/index/about.jpeg" alt="Mountain Muse — Ladakh" />
        </div>
        <div className="ab-hero-overlay" />
        <div className="ab-hero-content">
          <span className={`ab-hero-tag ${poppins.className}`}>Mountain Muse Management — About</span>
          <h1 className={`ab-hero-h1 ${playfair.className}`}>
            Where Talent<br />Meets <em>Terrain.</em>
          </h1>
          <p className={`ab-hero-sub ${poppins.className}`}>
            A talent agency, line production house, and creative studio built from the ground up in Leh, Ladakh. 
            We don't import our expertise — we grew it here.
          </p>
        </div>
        <div className="ab-hero-scroll">
          <div className="ab-scroll-line" />
          <span className={`ab-scroll-text ${poppins.className}`}>Scroll</span>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="ab-stats-strip">
        {stats.map((s, i) => (
          <div key={i} className="ab-stat-item">
            <div className={`ab-stat-num ${playfair.className}`}>{s.num}</div>
            <div className={`ab-stat-label ${poppins.className}`}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── MISSION ── */}
      <section className="ab-mission">
        <div className="ab-mission-left">
          <span className={`ab-mission-tag ${poppins.className}`}>01 — Who We Are</span>
          <h2 className={`ab-mission-title ${playfair.className}`}>
            Built<br />in<br /><em>Ladakh.</em>
          </h2>
        </div>
        <div className="ab-mission-right">
          <p className={`ab-mission-body ${poppins.className}`}>
            Mountain Muse Management was founded in Leh with one belief — that <strong>the most compelling visual work 
            in this region could only come from people who were already part of it.</strong>
            <br /><br />
            We are not a Delhi agency with a Ladakh office. We are not a production company that flies in 
            to shoot and leaves. We are a team that lives and works at altitude — season after season.
          </p>
          <blockquote className={`ab-mission-quote ${playfair.className}`}>
            "We built the agency because no one else was doing it right. 
             The talent was here. The landscape was extraordinary. 
             What was missing was the infrastructure."
          </blockquote>
          <ButtonGhost label="Meet the Team" color="#000000" />
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="ab-values">
        <div className="ab-values-head">
          <div>
            <span className={`ab-values-tag ${poppins.className}`}>02 — What We Stand For</span>
            <h2 className={`ab-values-h2 ${playfair.className}`}>
              How We<br />Work.
            </h2>
          </div>
          <p className={`ab-values-sub ${poppins.className}`}>
            Four principles that shape every project we take on.
          </p>
        </div>
        <div className="ab-values-grid">
          {values.map((v, i) => (
            <div key={i} className="ab-value-row">
              <span className={`ab-value-num ${poppins.className}`}>{v.num}</span>
              <h3 className={`ab-value-title ${playfair.className}`}>{v.title}</h3>
              <p className={`ab-value-body ${poppins.className}`}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="ab-team">
        <div className="ab-team-head">
          <span className={`ab-team-tag ${poppins.className}`}>03 — The Founders</span>
          <h2 className={`ab-team-h2 ${playfair.className}`}>
            The People<br />Behind It.
          </h2>
        </div>
        <div className="ab-team-grid">
          {team.map((member, i) => (
            <div key={i} className="ab-team-card">
              <div className="ab-team-img-wrap">
                <img src={member.img} alt={member.name} />
                <div className="ab-team-img-overlay" />
                <div className="ab-team-img-name">
                  <div className={`ab-team-img-name-text ${playfair.className}`}>{member.name}</div>
                  <div className={`ab-team-img-role ${poppins.className}`}>{member.role}</div>
                </div>
              </div>
              <div className="ab-team-body">
                <p className={`ab-team-bio ${poppins.className}`}>{member.bio}</p>
                <p className={`ab-team-detail ${poppins.className}`}>{member.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="ab-timeline-section">
        <div className="ab-timeline-head">
          <div>
            <span className={`ab-timeline-tag ${poppins.className}`}>04 — Our Story</span>
            <h2 className={`ab-timeline-h2 ${playfair.className}`}>
              Seven Years<br />in the <em>Making.</em>
            </h2>
          </div>
        </div>
        <div className="ab-timeline">
          <div className="ab-tl-line-wrap">
            <div className="ab-tl-line-inner" />
          </div>
          <div className="ab-tl-list">
            {timeline.map((item, i) => (
              <div key={i} className="ab-tl-item">
                <span className={`ab-tl-year ${poppins.className}`}>{item.year}</span>
                <span className={`ab-tl-event ${poppins.className}`}>{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section className="ab-location">
        <img className="ab-location-img" src="/images/index/about.jpeg" alt="Ladakh landscape" />
        <div className="ab-location-overlay" />
        <div className="ab-location-content">
          <span className={`ab-location-tag ${poppins.className}`}>05 — Where We Are</span>
          <h2 className={`ab-location-h2 ${playfair.className}`}>
            Leh,<br />Ladakh.
          </h2>
          <p className={`ab-location-body ${poppins.className}`}>
            3,500 metres above sea level. One of the most visually dramatic landscapes on earth. 
            That's home. Not a location we fly into — a place we've built careers in.
          </p>
          <div className="ab-location-coords">
            <div className="ab-coord-block">
              <div className={`ab-coord-label ${poppins.className}`}>Latitude</div>
              <div className={`ab-coord-val ${poppins.className}`}>34°09′ N</div>
            </div>
            <div className="ab-coord-block">
              <div className={`ab-coord-label ${poppins.className}`}>Longitude</div>
              <div className={`ab-coord-val ${poppins.className}`}>77°34′ E</div>
            </div>
            <div className="ab-coord-block">
              <div className={`ab-coord-label ${poppins.className}`}>Altitude</div>
              <div className={`ab-coord-val ${poppins.className}`}>3,500 m asl</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ab-cta">
        <h2 className={`ab-cta-h2 ${playfair.className}`}>
          Ready to<br />make something <em>real?</em>
        </h2>
        <div className="ab-cta-right">
          <p className={`ab-cta-body ${poppins.className}`}>
            We take on a <strong>small number of projects each season.</strong> If you have a story worth telling in 
            Ladakh — whether it needs talent, production support, or full creative direction — we want to hear it.
          </p>
          <div className="ab-cta-btns">
            <ButtonPrimary label={"Start a Project"} color="#000000" />
            <ButtonGhost label={"View Our Work"} color="#000000" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ab-ft" id="ab-footer">
        <div className="ab-ft-hero">
          <div className="ab-ft-hero-top">
            <div className="ab-ft-logo-zone">
              <div className="ab-ft-logo-box">
                <img src="/images/logo.png" alt="Mountain Muse" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div>
                <div className={`ab-ft-brand-main ${poppins.className}`}>Mountain Muse Management</div>
                <div className={`ab-ft-brand-sub ${poppins.className}`}>Leh, Ladakh — India</div>
              </div>
            </div>
            <div className={`ab-ft-status ${poppins.className}`}>
              <div className="ab-ft-dot" />
              Accepting projects — 2026
            </div>
          </div>
        </div>

        <div className="ab-ft-mid">
          <div className="ab-ft-col" id="afc0">
            <span className={`ab-ft-col-tag ${poppins.className}`}>The Studio</span>
            <p className={`ab-ft-statement ${poppins.className}`}>
              We take on a <strong>small number of projects</strong> each season. Every project gets our full attention — from concept to the final frame.
            </p>
            <div className="ab-ft-season">
              <div className={`ab-ft-season-l ${poppins.className}`}>Open for booking</div>
              <div className={`ab-ft-season-v ${poppins.className}`}>Summer &amp; Autumn 2026</div>
            </div>
          </div>
          <div className="ab-ft-vd" />
          <div className="ab-ft-col" id="afc1">
            <span className={`ab-ft-col-tag ${poppins.className}`}>Navigate</span>
            <ul className="ab-ft-nav">
              {["Talent Roster", "Line Production", "Creative Studio", "Our Work"].map(link => (
                <li key={link}>
                  <a href="#" className={poppins.className}>
                    {link} <span className="ab-ft-arr">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="ab-ft-vd" />
          <div className="ab-ft-col" id="afc2">
            <span className={`ab-ft-col-tag ${poppins.className}`}>Contact</span>
            {[
              { l: "Email", v: "hello@mountainmuse.in" },
              { l: "WhatsApp", v: "+91 94191 XXXXX" },
              { l: "Season", v: "May — October" },
            ].map(item => (
              <div className="ab-ft-ci" key={item.l}>
                <div className={`ab-ft-cl ${poppins.className}`}>{item.l}</div>
                <div className={`ab-ft-cv ${poppins.className}`}>{item.v}</div>
              </div>
            ))}
          </div>
          <div className="ab-ft-vd" />
          <div className="ab-ft-col" id="afc3">
            <span className={`ab-ft-col-tag ${poppins.className}`}>Follow</span>
            <div className="ab-ft-soc">
              {["Instagram", "LinkedIn"].map(s => (
                <a href="#" key={s} className={poppins.className}>
                  {s} <span className="ab-ft-arr">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="ab-ft-bottom">
          <span className={`ab-ft-copy ${poppins.className}`}>© 2025 Mountain Muse Management — All rights reserved</span>
          <span className={`ab-ft-craft ${playfair.className}`}>Crafted in Ladakh.</span>
        </div>
      </footer>
    </>
  );
}