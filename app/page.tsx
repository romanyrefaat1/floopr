"use client";

import Benefits from "../src/components/Benefits";
import CallToAction from "../src/components/CallToAction";
import Features from "../src/components/Features";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import Hero from "../src/components/Hero";
import FloatingFeedbackButton from "@/components/floopr-integration/float-button-circle/floating-feedback-button";
import Demo from "@/src/Demo";
import { ChangelogModalProvider } from "@/src/components/ChangelogModalContext";
import { useEffect, useRef } from "react";

export default function Home() {
  // Wrap everything in ChangelogModalProvider
  return (
    <ChangelogModalProvider>
      <HomeContent />
    </ChangelogModalProvider>
  );
}

function HomeContent() {
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
    <div ref={mainRef} className="min-h-screen overflow-hidden  bg-white">
      <style>
        {`
          .custom-selection::selection {
            background: #7c64f6;
            color: #fff;
          }
        `}
      </style>
      <Header />
      {/* <FloatingFeedbackButton
        isModal={false}
        backgroundColor="#ffffff"
        padding="lg"
        borderRadius="lg"
        isSecondSectionColorLikeFeatureType={false}
        componentId={`not_yet_implemented`}
        productId={`31a4fd3d-615a-409c-97ee-bda48bbbb8e2`}
      /> */}
      <main className="relative pt-20 custom-selection">
        {/* Gradient background */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-floopr-purple-bg via-white to-white -z-10" /> */}

        {/* Hero Section */}
        <Hero />
        {/* <BeforeAndAfterSection /> */}
        {/* Call to action */}
        {/* <div className="bg-gray-50 p-8 text-center">
          <div className="mb-2">
            <span className="text-2xl">💡</span>
          </div>
          <h3 className="text-2xl font-bold mb-6">Ready to stop guessing?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200"
            >
              Try Floopr — free for solo devs
            </Link>
            <a
              href="#"
              className="inline-block bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium py-2.5 px-6 rounded-lg transition-all duration-200"
            >
              View Pricing
            </a>
          </div>
        </div> */}

        {/* Features Section */}
        <div className="relative m">
          <Features />
        </div>
        <div className="relative mt-24 md:mt-40">
          <Demo />
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
      {/* SVG background moved here, under the content but above the root */}
      {/* <div className="background-line-class-definer pointer-events-none absolute top-0 left-0 w-full h-full -z-10">
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
          <path
            d="M155 100
                   C180 200, 250 300, 350 400
                   C450 500, 400 600, 350 700
                   C300 800, 450 850, 520 900"
            fill="none"
            stroke="#4285F4"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
        </svg>
      </div> */}
      <Footer />
    </div>
  );
}
