"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

// fonts
import { playfair, poppins } from '@/libs/Fonts';

import "./Footer.css";

const talentLinks = [
  { label: "Home", href: "/" },
  { label: "Male Talents", href: "/models/male" },
  { label: "Female Talents", href: "/models/female" },
  { label: "Become A Model", href: "/become-a-model" },
];

const studioLinks = [
  { label: "About M3", href: "/about" },
  { label: "Line Production", href: "/line-production" },
  { label: "Creative Studio", href: "/creative-studio" },
  { label: "Meet The Founder", href: "/founder" },
];

export default function Footer(){

  useEffect(() => {
    let ctx;
    let cancelled = false;

    const load = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      ctx = gsap.context(() => {

        // Top section
        gsap.from('.ft-hero-top', {
          scrollTrigger: {
            trigger: '#footer',
            start: 'top 90%',
            end: 'top 70%',
            scrub: 2,
            invalidateOnRefresh: true,
          },
          opacity: 0,
          y: 40,
          ease: 'none'
        });

        // Coordinates (slightly after top)
        gsap.from('.ft-coords', {
          scrollTrigger: {
            trigger: '#footer',
            start: 'top 85%',
            end: 'top 65%',
            scrub: 2.5,
            invalidateOnRefresh: true,
          },
          opacity: 0,
          x: 40,
          ease: 'none'
        });

        // Middle columns (stagger via start positions)
        ['#fc0','#fc1','#fc2'].forEach((id, i) => {
          gsap.from(id, {
            scrollTrigger: {
              trigger: '.ft-mid',
              start: `top ${90 - i * 3}%`,
              end: `top ${70 - i * 3}%`,
              scrub: 3.5,
              invalidateOnRefresh: true,
            },
            opacity: 0,
            y: 50,
            ease: 'none'
          });
        });

        // Bottom section (last to appear)
        gsap.from('.ft-bottom', {
          scrollTrigger: {
            trigger: '.ft-bottom',
            start: 'top 110%',
            end: 'top 75%',
            scrub: 4,
            invalidateOnRefresh: true,
          },
          opacity: 0,
          y: 30,
          ease: 'none'
        });

        // Watermark horizontal scroll (slow parallax)
        gsap.to('.ft-wm', {
          scrollTrigger: {
            trigger: '#footer',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 5,
            invalidateOnRefresh: true,
          },
          x: -120,
          ease: 'none'
        });

      });

      const doRefresh = () => {
        if (!cancelled) ScrollTrigger.refresh();
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(doRefresh);
      });

      const logoImg = document.querySelector('.ft-logo-box img');
      if (logoImg) {
        if (logoImg.complete) {
          doRefresh();
        } else {
          logoImg.addEventListener('load', doRefresh, { once: true });
        }
      }

      setTimeout(doRefresh, 500);
    };

    load();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };

  }, []);


    return(
        <>
            {/* ── FOOTER ── */}
<footer className="ft" id="footer">
  {/* Hero */}
  <div className="ft-hero">
    <div className="ft-hero-top">
      <div className="ft-logo-zone">
        <div className="ft-logo-box">
          <img src="/images/logo.png" alt="Mountain Muse Management" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div className="ft-brand-name">
          <div className={`ft-brand-main ${poppins.className}`}>Mountain Muse Management</div>
          <div className={`sub_head ft-brand-sub ${poppins.className}`}>Leh, Ladakh — India</div>
        </div>
      </div>
      <div className={`sub_head ft-status-pill ${poppins.className}`}>
        <div className=" ft-status-dot" />
        Accepting projects — 2026
      </div>
    </div>
  </div>

{/* 4-col grid */}
<div className="ft-mid">

  <div className="ft-col" id="fc0">
    <span className={`sub_head ft-col-tag ${poppins.className}`}>The Studio</span>
    <p className={`ft-statement ${poppins.className}`}>
      We take on a <strong>small number of projects</strong> each season. Every project gets our full attention from concept to the final frame.
    </p>
    <div className="ft-season">
      <div className={`sub_head ft-season-l ${poppins.className}`}>Open for booking</div>
      <div className={`ft-season-v ${poppins.className}`}>Summer &amp; Autumn 2025</div>
    </div>
  </div>

  <div className="ft-vd" />

  <div className="ft-col" id="fc1">
    <span className={`sub_head ft-col-tag ${poppins.className}`}>Talent</span>
    <ul className="ft-nav">
      {talentLinks.map(link => (
        <li key={link.label}>
          <Link href={link.href} className={poppins.className}>
            {link.label} <span className="ft-nav-arr">↗</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>

  <div className="ft-vd" />

  <div className="ft-col" id="fc2">
    <span className={`sub_head ft-col-tag ${poppins.className}`}>Studio</span>
    <ul className="ft-nav">
      {studioLinks.map(link => (
        <li key={link.label}>
          <Link href={link.href} className={poppins.className}>
            {link.label} <span className="ft-nav-arr">↗</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>

  <div className="ft-vd" />

  <div className="ft-col" id="fc3">
    <span className={`sub_head ft-col-tag ${poppins.className}`}>Connect</span>

    {[
      { l: "Email",     v: "hello@mountainmuse.in" },
      { l: "WhatsApp", v: "+91 94191 XXXXX" },
    ].map(item => (
      <div className="ft-ci" key={item.l}>
        <div className={`ft-cl ${poppins.className}`}>{item.l}</div>
        <div className={`ft-cv ${poppins.className}`}>{item.v}</div>
      </div>
    ))}

    <div className="ft-soc ft-soc-inline">
      {["Instagram","LinkedIn"].map(s => (
        <a href="#" key={s} className={poppins.className} onClick={(e) => e.preventDefault()}>
          {s} <span className="ft-nav-arr">↗</span>
        </a>
      ))}
    </div>
  </div>

</div>

  {/* Bottom */}
  <div className="ft-bottom">
    <span className={`ft-copy ${poppins.className}`}>© 2025 Mountain Muse Management — All rights reserved</span>
    <span className={`ft-craft ${playfair.className}`}>Crafted in Ladakh.</span>
  </div>

</footer>
        </>
    );
}