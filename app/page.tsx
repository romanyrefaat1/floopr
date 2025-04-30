"use client";

import Benefits from "../src/components/Benefits";
import CallToAction from "../src/components/CallToAction";
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-floopr-purple-bg via-white to-white -z-10" />

        {/* Hero Section */}
        <div className="relative">
          <Hero />
        </div>

        {/* Features Section */}
        <div className="relative mt-20 md:mt-32">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] aspect-square">
            <div className="w-full h-full bg-gradient-radial from-floopr-purple/5 via-transparent to-transparent opacity-70" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Features />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="relative mt-20 md:mt-32">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] aspect-square">
            <div className="w-full h-full bg-gradient-radial from-floopr-purple/5 via-transparent to-transparent opacity-70" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Benefits />
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative mt-20 md:mt-32 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CallToAction />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
