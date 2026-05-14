"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Menu from "@/components/layout/Menu";
import DragCarousel from "@/components/ui/Dragcarousel";
import {ButtonPrimary, ButtonGhost} from "@/components/ui/Button";


import Nav from "@/components/layout/Nav";
import Hero from "@/components/layout/home/Hero";
import Models from "@/components/layout/home/Models";
import Line from "@/components/layout/home/Line_production";
import Creative from "@/components/layout/home/Creative";
import Cta from "@/components/layout/home/Cta";
import Footer from "@/components/layout/Footer";



// models images
gsap.registerPlugin(ScrollTrigger);


export default function HeroSection() {
















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



  return (
    <>
    <Nav />

    <Hero />

    <Models />

    <Line />

    <Creative />

    <Cta />

    <Footer />


     



 















    </>
  );
}