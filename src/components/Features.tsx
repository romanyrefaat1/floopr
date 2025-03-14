
import React from 'react';
import Feature from './Feature';
import FeedbackWidget from './ui/illustrations/FeedbackWidget';
import FeedbackBoard from './ui/illustrations/FeedbackBoard';
import ProductRoadmap from './ui/illustrations/ProductRoadmap';
import Changelog from './ui/illustrations/Changelog';

const Features = () => {
  const features = [
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
      reversed: false
    },
    {
      title: "Changelog",
      description: "Share all of your releases and updates in one single overview. Instantly notify users when new releases are added to the Changelog and keep them engaged with your product journey.",
      image: <Changelog />,
      reversed: true
    }
  ];

  return (
    <section id="features" className="section-container">
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative inline-block">
          Features
          <svg className="absolute -right-10 -top-10 w-24 h-24 opacity-20 text-floopr-purple" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30,10 Q50,5 70,20 Q90,40 80,70 Q70,90 40,85 Q10,80 10,50 Q10,20 30,10" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </h2>
        <p className="text-xl text-black max-w-3xl mx-auto">
          Powerful tools to collect, organize, and act on user feedback
        </p>
      </div>
      
      <div className="space-y-20">
        {features.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            reversed={feature.reversed}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
