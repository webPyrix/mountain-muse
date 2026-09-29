"use client";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Nav from "@/components/layout/Nav";
import Menu from "@/components/layout/Menu";
import TalentDetail from "@/components/layout/models/TalentDetail";
import Footer from "@/components/layout/Footer";
import { API_BASE, IMG_HOST } from "@/libs/api";

gsap.registerPlugin(ScrollTrigger);


export default function TalentDetailPage({ params }) {
  const { gender, id } = use(params);

  const [talent, setTalent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

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

  useEffect(() => {
    if (gender !== "male" && gender !== "female") {
      setNotFoundFlag(true);
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/talents/get.php?slug=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error || data.gender !== gender) {
          setNotFoundFlag(true);
        } else {
          // Map DB shape into what TalentDetail expects
          setTalent({
            name: data.name,
            img: `${IMG_HOST}${data.main_image}`,
            stats: {
              height: data.height,
              [data.gender === "male" ? "chest" : "bust"]: data.bust_or_chest,
              waist: data.waist,
              hips: data.hips,
              shoe: data.shoe_size,
            },
            gallery: (data.gallery || []).map((g) => `${IMG_HOST}${g.image_path}`),
          });
        }
      })
      .catch(() => setNotFoundFlag(true))
      .finally(() => setLoading(false));
  }, [gender, id]);

  if (loading) return null; // or a loading spinner if you want one
  if (notFoundFlag) notFound();

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