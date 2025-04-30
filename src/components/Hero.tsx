"use client";

import WaitlistForm from "./WaitlistForm";
import CircleScribble from "./ui/CircleScribble";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="section-container">
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">
            Making user feedback
            <span className="relative inline-block mx-3">
              actionable
              <CircleScribble className="absolute -bottom-2 -right-3 w-32 h-12 text-floopr-purple opacity-20" />
            </span>
          </h1>

          <p
            className="text-xl text-gray-600 mb-8 animate-on-scroll"
            style={{ animationDelay: "100ms" }}
          >
            Collect, organize, and prioritize user feedback all in one place.
            Help your team build what users really want.
          </p>

          <div
            className="flex justify-center animate-on-scroll"
            style={{ animationDelay: "200ms" }}
          >
            <WaitlistForm />
          </div>
        </div>

        <div
          className="relative mt-16 animate-on-scroll"
          style={{ animationDelay: "300ms" }}
        >
          <div className="aspect-[16/9] max-w-5xl mx-auto">
            <div className="w-full h-full relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
              <Image
                src="/images/dashboard-preview.png"
                alt="Floopr Dashboard Preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute -inset-x-4 -bottom-4 bg-gradient-to-t from-white to-transparent h-20" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
