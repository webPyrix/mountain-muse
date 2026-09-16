"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Nav from "@/components/layout/Nav";
import LineProductionHero from "@/components/layout/services/LineProductionHero";
import LineProductionBody from "@/components/layout/services/LineProductionBody";
import Footer from "@/components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function LineProduction() {
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
      <LineProductionHero />
      <LineProductionBody />
      <Footer />
    </>
  );
}