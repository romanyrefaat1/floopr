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
        <Hero />

        {/* Features Section */}
        <div className="relative mt-24 md:mt-40">
          <Features />
        </div>

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
