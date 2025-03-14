
import { 
  MessageSquare, 
  Layout, 
  Zap, 
  Settings, 
  Star, 
  Shield 
} from 'lucide-react';
import FeatureCard from './ui/FeatureCard';

const Features = () => {
  const features = [
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
    <section id="features" className="section-container">
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything you need to collect <span className="highlight-text">actionable feedback</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Floopr provides all the tools you need to gather, organize, and analyze user feedback.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            delay={index * 100}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
