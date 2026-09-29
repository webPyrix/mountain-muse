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
  { label: "Contact Us", href: "/contact" },
];

const studioLinks = [
  { label: "About M3", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Line Production", href: "/line-production" },
  { label: "Creative Studio", href: "/creative-studio" },
  { label: "Meet The Founder", href: "/founder" },
];

const ArrowIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const currentYear = new Date().getFullYear();



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
            start: 'top 120%',
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

  
const getSeasonName = (month) => {
  if ([11, 0, 1].includes(month)) return "Winter";   // Dec, Jan, Feb
  if ([2, 3, 4].includes(month)) return "Spring";    // Mar, Apr, May
  if ([5, 6, 7].includes(month)) return "Summer";    // Jun, Jul, Aug
  return "Autumn";                                    // Sep, Oct, Nov
};

const getBookingSeason = () => {
  const now = new Date();
  const currentSeason = getSeasonName(now.getMonth());

  const future = new Date(now);
  future.setMonth(now.getMonth() + 3);
  const nextSeason = getSeasonName(future.getMonth());
  const year = future.getFullYear();

  return `${currentSeason} & ${nextSeason} ${year}`;
};

const bookingSeason = getBookingSeason();


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
        Accepting projects — {currentYear}
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
  <div className={`ft-season-v ${poppins.className}`}>{bookingSeason}</div>
</div>
  </div>

  <div className="ft-vd" />

  <div className="ft-col" id="fc1">
    <span className={`sub_head ft-col-tag ${poppins.className}`}>Talent</span>
    <ul className="ft-nav">
      {talentLinks.map(link => (
        <li key={link.label}>
          <Link href={link.href} className={poppins.className}>
            {link.label} <span className="ft-nav-arr"><ArrowIcon /></span>
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
            {link.label} <span className="ft-nav-arr"><ArrowIcon /></span>
          </Link>
        </li>
      ))}
    </ul>
  </div>

  <div className="ft-vd" />

<div className="ft-col" id="fc3">
  <span className={`sub_head ft-col-tag ${poppins.className}`}>Connect</span>

  <div className="ft-ci">
    <div className={`ft-cl ${poppins.className}`}>Email</div>
    <a href="mailto:info@mountainmusemanagement.com" className={`ft-cv ${poppins.className}`}>
      info@mountainmusemanagement.com
    </a>
  </div>

  <div className="ft-ci">
    <div className={`ft-cl ${poppins.className}`}>WhatsApp</div>
    <a href="https://wa.me/917006492274" target="_blank" rel="noopener noreferrer" className={`ft-cv ${poppins.className}`}>
      +91 70064 92274
    </a>
  </div>

  <div className="ft-soc ft-soc-inline">
    <a href="https://www.instagram.com/mountainmusemgmt/" target="_blank" rel="noopener noreferrer" className={poppins.className}>
      Instagram <span className="ft-nav-arr"><ArrowIcon /></span>
    </a>
    <a href="https://www.facebook.com/profile.php?id=61550630627159" target="_blank" rel="noopener noreferrer" className={poppins.className}>
      Facebook <span className="ft-nav-arr"><ArrowIcon /></span>
    </a>
  </div>
</div>

</div>

  {/* Bottom */}
  <div className="ft-bottom">
    <span className={`ft-copy ${poppins.className}`}>© {currentYear} Mountain Muse Management — All rights reserved</span>
    <span className={`ft-copy ${poppins.className}`}>Crafted with ❤️ by <a href="https://webpyrix.com" target="_blank">Webpyrix.</a></span>
  </div>

</footer>
        </>
    );
}