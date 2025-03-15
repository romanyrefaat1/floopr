
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
import SectionTitle from './ui/SectionTitle';
import BenefitCard from './ui/BenefitCard';

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

  const showcaseFeatures = [
    {
      title: "Multi-Projects",
      description: "Manage all of your projects in one single dashboard.",
      imageSrc: "/lovable-uploads/134bb789-6f30-4816-aba0-0ac863415f3d.png",
      imageAlt: "Multi-project management"
    },
    {
      title: "Moderation",
      description: "Auto-approve or manually approve new posts",
      imageSrc: "/lovable-uploads/f0ea91ad-42a6-4213-9787-46f5223d7cb5.png",
      imageAlt: "Content moderation"
    },
    {
      title: "Custom Statuses",
      description: "Edit existing or add new custom statuses",
      imageSrc: "/lovable-uploads/06552887-5bfc-4284-8a73-760dabd5b456.png",
      imageAlt: "Custom status configuration"
    }
  ];

  return (
    <section id="benefits" className="section-container relative">
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-floopr-purple/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-floopr-purple/5 rounded-full blur-3xl -z-10"></div>
      
      <SectionTitle 
        title="Supercharge Your Product Feedback" 
        subtitle="Everything you need to gather, organize, and analyze user feedback"
        highlightText="Product Feedback"
      />
      
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
          {showcaseFeatures.map((feature, index) => (
            <BenefitCard
              key={index}
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
              imageAlt={feature.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
