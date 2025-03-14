
import React from 'react';
import { 
  MessageSquare, 
  Layout, 
  Zap, 
  Settings, 
  Star, 
  Shield 
} from 'lucide-react';
import FeatureCard from './ui/FeatureCard';
import ScribbleHighlight from './ui/ScribbleHighlight';

const Benefits = () => {
  const benefits = [
    {
      title: "Collect Feedback",
      description: "Gather user feedback and feature requests through customizable forms and widgets.",
      icon: MessageSquare
    },
    {
      title: "Embeddable Components",
      description: "Add feedback forms to your website or app with just a few lines of code.",
      icon: Layout
    },
    {
      title: "API Rewards",
      description: "Reward users automatically after they submit feedback with our simple API.",
      icon: Zap
    },
    {
      title: "Highly Customizable",
      description: "Create and host feedback pages that match your brand's look and feel.",
      icon: Settings
    },
    {
      title: "User Voting",
      description: "Let users vote on features to help you prioritize your roadmap.",
      icon: Star
    },
    {
      title: "Moderation",
      description: "Approve content before it goes public to maintain quality.",
      icon: Shield
    }
  ];

  return (
    <section id="benefits" className="section-container">
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative inline-block">
          <ScribbleHighlight>Benefits</ScribbleHighlight>
          <svg className="absolute -right-10 -top-10 w-24 h-24 opacity-20 text-floopr-purple" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30,10 Q50,5 70,20 Q90,40 80,70 Q70,90 40,85 Q10,80 10,50 Q10,20 30,10" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </h2>
        <p className="text-xl text-black max-w-2xl mx-auto">
          Floopr provides all the tools you need to gather, organize, and analyze user feedback.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <FeatureCard
            key={index}
            title={benefit.title}
            description={benefit.description}
            icon={benefit.icon}
            delay={index * 100}
          />
        ))}
      </div>
    </section>
  );
};

export default Benefits;
