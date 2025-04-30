"use client";

import WaitlistForm from "./WaitlistForm";
import DoobleArrow from "./ui/DoobleArrow";

const CallToAction = () => {
  return (
    <section id="cta" className="section-container relative overflow-hidden">
      {/* Background Decorations */}
      <DoobleArrow
        className="absolute left-0 top-1/4 -translate-x-1/2 w-24 h-24 opacity-50"
        direction="left"
      />
      <DoobleArrow className="absolute right-0 bottom-1/4 translate-x-1/2 w-24 h-24 opacity-50" />

      <div className="relative glass-card px-6 py-16 sm:p-16 text-center animate-on-scroll">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Ready to transform your feedback process?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join our waitlist and be among the first to experience Floopr when
            we launch.
          </p>

          <div className="flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
