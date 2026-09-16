"use client";
import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Nav from "@/components/layout/Nav";
import Menu from "@/components/layout/Menu";
import TalentDetail from "@/components/layout/models/TalentDetail";
import Footer from "@/components/layout/Footer";
import { maleTalents, femaleTalents } from "@/app/data/Talents";

gsap.registerPlugin(ScrollTrigger);

export default function TalentDetailPage({ params }) {
  const { gender, id } = use(params);

  const list = gender === "male" ? maleTalents : gender === "female" ? femaleTalents : null;
  const talent = list?.find((t) => t.id === id);

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

  if (!list || !talent) {
    notFound();
  }

  return (
    <>
      <Nav />
      <Menu />
      <TalentDetail
        talent={talent}
        backHref={`/models/${gender}`}
        genderLabel={gender === "male" ? "Men" : "Women"}
      />
      <Footer />
    </>
  );
}