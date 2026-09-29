"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Nav from "@/components/layout/Nav";
import Menu from "@/components/layout/Menu";
import TalentGrid from "@/components/layout/models/TalentGrid";
import Footer from "@/components/layout/Footer";
import { API_BASE, IMG_HOST } from "@/libs/api";

gsap.registerPlugin(ScrollTrigger);


export default function MaleModelsPage() {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    fetch(`${API_BASE}/talents/list.php?gender=male`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((t) => ({
          id: t.slug,
          name: t.name,
          img: `${IMG_HOST}${t.main_image}`,
          hoverImg: t.hover_image ? `${IMG_HOST}${t.hover_image}` : `${IMG_HOST}${t.main_image}`,
        }));
        setTalents(mapped);
      })
      .catch((err) => console.error("Failed to load talents:", err))
      .finally(() => setLoading(false));

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Nav />
      <Menu />
      {!loading && (
        <TalentGrid
          tag="Talent Roster — Men"
          title="Men."
          talents={talents}
          base="/models/male"
        />
      )}
      <Footer />
    </>
  );
}