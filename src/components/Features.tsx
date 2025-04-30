"use client";

import Image from "next/image";

const Features = () => {
  return (
    <section id="features" className="section-container py-20">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Elevate Your User Experience
        </h2>
        <p className="text-lg text-gray-600">
          Powerful tools to collect, organize, and act on user feedback
        </p>
      </div>

      {/* Feedback Boards Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24 animate-on-scroll">
        <div>
          <h3 className="text-2xl font-bold mb-4">Feedback Boards</h3>
          <p className="text-gray-600 mb-6">
            Create custom boards to collect and organize feedback from your users. Categorize and prioritize feedback to make better product decisions.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Organize by category</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Prioritize important feedback</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Track status and progress</span>
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

      {/* Feedback Widgets Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24 animate-on-scroll">
        <div className="order-2 md:order-1 relative">
          <div className="glass-card p-6 shadow-lg rounded-xl overflow-hidden">
            <Image 
              src="/images/feedback-widget-preview.png" 
              alt="Feedback Widget" 
              width={500} 
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h3 className="text-2xl font-bold mb-4">Feedback Widgets</h3>
          <p className="text-gray-600 mb-6">
            Embed customizable feedback forms directly into your product. Collect user insights without disrupting their experience.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Easy to integrate</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Customizable to match your brand</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Collect structured data</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Product Roadmaps Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center animate-on-scroll">
        <div>
          <h3 className="text-2xl font-bold mb-4">Product Roadmaps</h3>
          <p className="text-gray-600 mb-6">
            Share your product vision and upcoming features with your users. Keep them engaged and excited about what's coming next.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Visualize your product direction</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Gather votes on upcoming features</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Keep users informed</span>
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="glass-card p-6 shadow-lg rounded-xl overflow-hidden">
            <Image 
              src="/images/roadmap-preview.png" 
              alt="Product Roadmap" 
              width={500} 
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-20 animate-on-scroll">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Literally, all the features you need!</h3>
      </div>
    </section>
  );
};

export default Features;
