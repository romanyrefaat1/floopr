"use client";

import Image from "next/image";

const Features = () => {
  return (
    <section id="features" className="section-container py-20">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Smart Tools for Smarter Decisions
        </h2>
        <p className="text-lg text-gray-600">
          Transform scattered feedback into structured business insights
        </p>
      </div>

      {/* Feedback Boards Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24 animate-on-scroll">
        <div>
          <h3 className="text-2xl font-bold mb-4">Feedback Boards</h3>
          <p className="text-gray-600 mb-6">
            Centralize and organize feedback in one place. Our smart categorization helps you identify patterns and opportunities.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Smart categorization</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Data-driven prioritization</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Business impact tracking</span>
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="glass-card p-6 shadow-lg rounded-xl overflow-hidden">
            <Image 
              src="/images/feedback-board-preview.png" 
              alt="Feedback Board" 
              width={500} 
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* AI Analytics Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24 animate-on-scroll">
        <div className="order-2 md:order-1 relative">
          <div className="glass-card p-6 shadow-lg rounded-xl overflow-hidden">
            <Image 
              src="/images/feedback-widget-preview.png" 
              alt="AI Analytics" 
              width={500} 
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h3 className="text-2xl font-bold mb-4">AI-Powered Analytics</h3>
          <p className="text-gray-600 mb-6">
            Get deep insights into your feedback with our advanced AI analysis. Understand trends, sentiment, and business opportunities.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Sentiment analysis</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Trend identification</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>ROI predictions</span>
            </li>
          </ul>
        </div>
      </div>

      {/* AI Tutor Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center animate-on-scroll">
        <div>
          <span className="inline-block bg-floopr-purple/10 text-floopr-purple px-3 py-1 rounded-full text-sm font-medium mb-4">
            Coming Soon
          </span>
          <h3 className="text-2xl font-bold mb-4">AI Tutor</h3>
          <p className="text-gray-600 mb-6">
            Your intelligent companion for product development. Get AI-powered suggestions for feature prioritization and strategic planning.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Interactive AI chat assistant</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Smart feature suggestions</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Strategic planning insights</span>
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="glass-card p-6 shadow-lg rounded-xl overflow-hidden">
            <Image 
              src="/images/roadmap-preview.png" 
              alt="AI Tutor" 
              width={500} 
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
