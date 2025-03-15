import React from 'react';
import Feature from './Feature';
import FeatureCard from './ui/FeatureCard';
import SectionTitle from './ui/SectionTitle';
import ScribbleHighlight from './ui/ScribbleHighlight';
import FeedbackWidget from './ui/illustrations/FeedbackWidget';
import FeedbackBoard from './ui/illustrations/FeedbackBoard';
import ProductRoadmap from './ui/illustrations/ProductRoadmap';
import Changelog from './ui/illustrations/Changelog';

const Features = () => {
  const mainFeatures = [
    {
      title: "Feedback Boards",
      description: "Gather user feedback and upvotes. Know what to build next. Let users submit feedback or upvote on posts on your own personalized boards.",
      image: <FeedbackBoard />,
      reversed: false
    },
    {
      title: "Feedback Widget",
      description: "Collect user feedback from everywhere. Embed it on your website, within your product, or anywhere you want! Users can describe problems with screenshots and more.",
      image: <FeedbackWidget />,
      reversed: true
    },
    {
      title: "Product Roadmap",
      description: "Share your progress in one single overview. Show users what you're working on and what they can expect next. Keep them informed about every step of your development process.",
      image: <ProductRoadmap />,
      callout: "Clear visibility into your product's future!",
      reversed: false
    },
    {
      title: "Changelog",
      description: "Share all of your releases and updates in one single overview. Instantly notify users when new releases are added to the Changelog and keep them engaged with your product journey.",
      image: <div className="relative w-full max-w-md mx-auto p-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-5 relative z-10">
          <div className="relative">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-floopr-purple text-white rounded-full px-4 py-2 flex items-center gap-2 z-20 shadow-md">
              <form className="flex items-center space-x-2">
                <input
                  type="email" 
                  placeholder="Enter your email"
                  className="px-3 py-1 text-sm text-black rounded-l-full border-0 focus:ring-1 focus:ring-floopr-purple"
                />
                <button className="bg-floopr-purple-dark hover:bg-floopr-purple-dark/90 text-white text-sm font-medium py-1 px-3 rounded-r-full">
                  Join
                </button>
              </form>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-500">November 14th</div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-gray-100 rounded px-2 py-0.5">8 comments</span>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4">
                <h4 className="font-bold text-lg">Auto-Eyeroll Camera</h4>
                <p className="text-sm text-gray-600 mt-2">Detects when someone is speaking complete nonsense to automatically roll your eyes, even when you're trying to be polite.</p>
              </div>
              <div className="h-40 bg-gray-200 relative overflow-hidden">
                <img 
                  src="/lovable-uploads/eb0ef237-6f6a-4500-a0fd-aed1f05e7788.png" 
                  alt="Eyeroll reaction" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute -right-12 top-0 transform">
          <div className="bg-white text-gray-800 font-medium p-2 rounded-xl shadow-md border border-gray-200">
            <span className="text-sm">All your releases in one place!</span>
          </div>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -left-10 top-4">
            <path d="M45,25 Q35,10 25,30" stroke="#555" strokeWidth="1.5" />
          </svg>
        </div>
        
        <div className="absolute -left-10 top-1/4 transform">
          <div className="bg-white text-gray-800 font-medium p-2 rounded-xl shadow-md border border-gray-200">
            <span className="text-sm">Instant updates for users!</span>
          </div>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -right-10 top-4">
            <path d="M5,25 Q15,10 25,30" stroke="#555" strokeWidth="1.5" />
          </svg>
        </div>
        
        <div className="absolute -left-3 -bottom-3 w-full h-full border-2 border-dashed border-gray-300 rounded-xl -z-10"></div>
        <div className="absolute -right-3 -top-3 w-full h-full border-2 border-dashed border-floopr-purple-light rounded-xl -z-10"></div>
      </div>,
      callout: "Keep your users informed about every update!",
      reversed: true
    }
  ];

  const additionalFeatures = [
    {
      title: "Feature Voting",
      description: "Let your users, your team or any stakeholders upvote on posts.",
      icon: "CheckCircle"
    },
    {
      title: "User SSO",
      description: "Automatically authenticate your users and give them access.",
      icon: "Key"
    },
    {
      title: "Moderation",
      description: "Approve new posts and/or comments first.",
      icon: "Shield"
    }
  ];

  return (
    <section id="features" className="section-container gradient-section">
      <SectionTitle 
        title="Elevate Your User Experience" 
        subtitle="Powerful tools to collect, organize, and act on user feedback"
        circleScribble={false}
      />
      
      <div className="space-y-20">
        {mainFeatures.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            callout={feature.callout}
            reversed={feature.reversed}
            index={index}
          />
        ))}
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 relative inline-block">
          <ScribbleHighlight>Literally, all the features you need!</ScribbleHighlight>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="glass-card p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-floopr-purple-bg flex items-center justify-center mb-4 mx-auto">
                <svg className="h-6 w-6 text-floopr-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-black">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a href="#cta" className="btn-primary">
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
