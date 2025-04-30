"use client";

import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const FeatureCard = ({ title, description, icon: Icon, delay = 0 }: FeatureCardProps) => {
  return (
    <div 
      className="glass-card p-8 animate-on-scroll"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-full bg-floopr-purple-bg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-floopr-purple" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-black">{description}</p>
      
      <div className="mt-6 h-1 w-12 bg-gradient-to-r from-floopr-purple to-floopr-purple-light rounded-full"></div>
    </div>
  );
};

export default FeatureCard;
