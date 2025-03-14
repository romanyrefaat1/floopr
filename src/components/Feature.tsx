
import React from 'react';
import ScribbleHighlight from './ui/ScribbleHighlight';
import CircleScribble from './ui/CircleScribble';
import DoobleArrow from './ui/DoobleArrow';

interface FeatureProps {
  title: string;
  description: string;
  image: React.ReactNode;
  reversed?: boolean;
  index: number;
}

const Feature = ({ title, description, image, reversed = false, index }: FeatureProps) => {
  return (
    <div 
      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 lg:gap-16 py-16 animate-on-scroll`} 
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex-1">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 relative">
          <ScribbleHighlight>{title}</ScribbleHighlight>
          <CircleScribble className={`-z-10 opacity-20 ${reversed ? '-right-10 top-1/2 -translate-y-1/2' : '-left-10 top-1/2 -translate-y-1/2'}`} />
        </h3>
        <p className="text-lg text-black leading-relaxed mb-8">{description}</p>
        
        <div className="flex items-center">
          <a href="#" className="font-medium text-floopr-purple flex items-center">
            Learn more
            <DoobleArrow className="ml-2 w-8 h-5" />
          </a>
        </div>
      </div>
      
      <div className="flex-1 relative">
        {image}
        <DoobleArrow 
          className={`absolute ${reversed ? '-left-12 top-1/2 -translate-y-1/2' : '-right-12 top-1/2 -translate-y-1/2'} hidden md:block`} 
          direction={reversed ? 'left' : 'right'}
        />
      </div>
    </div>
  );
};

export default Feature;
