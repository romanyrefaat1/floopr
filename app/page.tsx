"use client";

import BeforeAndAfterSection from "@/src/components/BeforeAndAfterSection";
import Benefits from "../src/components/Benefits";
import CallToAction from "../src/components/CallToAction";
import FavoriteTestimonials from "../src/components/FavoriteTestimonials";
import Features from "../src/components/Features";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import Hero from "../src/components/Hero";
import { useEffect, useRef } from "react";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    const animatedElements =
      mainRef.current?.querySelectorAll(".animate-on-scroll");
    animatedElements?.forEach((el) => observer.observe(el));
    return () => {
      if (animatedElements) {
        animatedElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen overflow-hidden bg-white">
      <Header />
      <main className="relative pt-20">
        {/* Gradient background */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-floopr-purple-bg via-white to-white -z-10" /> */}

        {/* Hero Section */}
        <Hero />
        <div className="background-line-class-definer relative">
        <div className="absolute top-0 left-0 dj -z-1 w-full h-full">
  <svg 
    viewBox="0 0 600 2000" 
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    preserveAspectRatio="none"
  >
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <path d="M155 100
             C180 200, 250 300, 350 400
             C450 500, 400 600, 350 700
             C300 800, 450 850, 520 900"
          fill="none" 
          stroke="#4285F4" 
          stroke-width="4.5" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          filter="url(#glow)" />
  </svg>
</div>


        <BeforeAndAfterSection />
        

        {/* Features Section */}
        <div className="relative mt-24 md:mt-40">
          <Features />
        </div>

        </div>

        {/* Testimonials Section */}
        {/* <div className="relative mt-24 md:mt-40">
          <FavoriteTestimonials />
        </div> */}

        {/* Benefits Section */}
        <div className="relative mt-24 md:mt-40">
          <Benefits />
        </div>

        {/* CTA Section */}
        <div className="relative mt-24 md:mt-40 mb-20">
          <CallToAction />
        </div>
      </main>
      <Footer />
    </div>
  );
}
