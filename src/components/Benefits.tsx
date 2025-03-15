
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
import CircleScribble from './ui/CircleScribble';

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
    <section id="benefits" className="section-container relative">
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-floopr-purple/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-floopr-purple/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 relative inline-block">
          <span className="relative">
            Supercharge Your 
            <CircleScribble className="absolute -z-10 right-0 top-0 w-full h-full opacity-20" />
          </span> <ScribbleHighlight>Product Feedback</ScribbleHighlight>
        </h2>
        <p className="text-xl text-black max-w-2xl mx-auto font-medium">
          Everything you need to gather, organize, and analyze user feedback
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

      <div className="mt-16 text-center">
        <h3 className="text-3xl font-bold mb-6">
          <ScribbleHighlight>All with amazing customizable features for you and your team</ScribbleHighlight>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
          <div className="glass-card p-8 text-center flex flex-col items-center">
            <h4 className="text-2xl font-bold mb-4">Multi-Projects</h4>
            <p className="text-black">Manage all of your projects in one single dashboard.</p>
            {/* <div className="mt-6 h-40 w-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src="/lovable-uploads/134bb789-6f30-4816-aba0-0ac863415f3d.png"
                alt="Multi-project management" 
                className="w-full h-full object-cover"
              />
            </div> */}
          </div>
          
          <div className="glass-card p-8 text-center flex flex-col items-center">
            <h4 className="text-2xl font-bold mb-4">Moderation</h4>
            <p className="text-black">Auto-approve or manually approve new posts</p>
            {/* <div className="mt-6 h-40 w-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src="/lovable-uploads/f0ea91ad-42a6-4213-9787-46f5223d7cb5.png"
                alt="Content moderation" 
                className="w-full h-full object-cover"
              />
            </div> */}
          </div>
          
          <div className="glass-card p-8 text-center flex flex-col items-center">
            <h4 className="text-2xl font-bold mb-4">Custom Statuses</h4>
            <p className="text-black">Edit existing or add new custom statuses</p>
            {/* <div className="mt-6 h-40 w-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src="/lovable-uploads/06552887-5bfc-4284-8a73-760dabd5b456.png"
                alt="Custom status configuration" 
                className="w-full h-full object-cover"
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
