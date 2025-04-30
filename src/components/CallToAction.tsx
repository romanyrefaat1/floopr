"use client";

import WaitlistForm from "./WaitlistForm";
import { Button } from "./ui/button";

const CallToAction = () => {
  return (
    <section id="cta" className="section-container py-20 relative overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-8 animate-on-scroll">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Start Building Things Your Users will Love
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join our waitlist today and be the first to know when we launch!
        </p>

        <div className="flex justify-center">
          <Button 
            className="bg-floopr-purple hover:bg-floopr-purple-dark text-white px-8 py-6 text-lg rounded-lg"
          >
            Join the Waitlist
          </Button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-6 text-center max-w-4xl mx-auto animate-on-scroll">
        <div className="p-4">
          <h3 className="font-bold mb-2">Pricing</h3>
          <p className="text-sm text-gray-600">Free plan available</p>
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-2">Privacy</h3>
          <p className="text-sm text-gray-600">Your data stays secure</p>
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-2">Support</h3>
          <p className="text-sm text-gray-600">24/7 customer service</p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
