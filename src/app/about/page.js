"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Nav from "@/components/layout/Nav";
import AboutHero from "@/components/layout/about/AboutHero";
import FounderSection from "@/components/layout/about/FounderSection";
import AboutStory from "@/components/layout/about/AboutStory";
import Cta from "@/components/layout/home/Cta";
import Footer from "@/components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
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

  return (
    <>
      <Nav />
      <AboutHero />
      
      <AboutStory />
      
      <Footer />
    </>
  );
}