
import React from 'react';
import { Button } from '@/components/ui/button';
import CircleScribble from './ui/CircleScribble';
import DoobleArrow from './ui/DoobleArrow';

const CallToAction = () => {
  return (
    <section className="py-20 md:py-32 overflow-hidden relative" id="cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 relative inline-block">
          Start Building 
          <br />
          Things Your Users
          <br />
          <span className="relative inline-block">
            will Love
            <CircleScribble className="absolute -z-10 -right-5 -bottom-3 w-full h-full opacity-30" />
          </span>
        </h2>
        
        <div className="relative inline-block mt-10 md:mt-14">
          <Button 
            size="lg"
            className="bg-floopr-purple hover:bg-floopr-purple-dark text-white text-lg px-10 py-6 h-auto rounded-full relative z-10"
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            START YOUR FREE TRIAL
          </Button>
          
          <DoobleArrow className="absolute -left-16 top-1/2 -translate-y-1/2" />
          <DoobleArrow className="absolute -right-16 top-1/2 -translate-y-1/2" direction="left" />
        </div>
        
        <p className="mt-6 text-black font-medium">
          No Credit Card Needed - 14-day free trial
        </p>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-floopr-purple opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-floopr-purple opacity-5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default CallToAction;
