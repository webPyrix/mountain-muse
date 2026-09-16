"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Nav from "@/components/layout/Nav";
import Menu from "@/components/layout/Menu";
import TalentGrid from "@/components/layout/models/TalentGrid";
import Footer from "@/components/layout/Footer";
import { femaleTalents } from "@/app/data/Talents";

gsap.registerPlugin(ScrollTrigger);

export default function FemaleModelsPage() {
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
      <Menu />
      <TalentGrid
        tag="Talent Roster — Women"
        title="Women."
        talents={femaleTalents}
        base="/models/female"
      />
      <Footer />
    </>
  );
}