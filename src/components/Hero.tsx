"use client";

import WaitlistForm from "./WaitlistForm";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-white">
      <div className="section-container">
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-on-scroll">
            Collect and manage
            <br />
            feedback effortlessly
          </h1>

          <p
            className="text-lg md:text-xl text-gray-600 mb-8 animate-on-scroll max-w-2xl mx-auto"
            style={{ animationDelay: "100ms" }}
          >
            The all-in-one platform to collect, organize, and act on user feedback. Help your team make better product decisions.
          </p>

          <div
            className="flex justify-center animate-on-scroll"
            style={{ animationDelay: "200ms" }}
          >
            <WaitlistForm />
          </div>
          
          <p className="text-sm text-gray-500 mt-4 animate-on-scroll" style={{ animationDelay: "300ms" }}>
            No credit card required • Free plan available
          </p>
        </div>

        <div
          className="relative mt-16 animate-on-scroll"
          style={{ animationDelay: "400ms" }}
        >
          <div className="aspect-[16/9] max-w-5xl mx-auto">
            <div className="w-full h-full relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
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
