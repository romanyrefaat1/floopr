"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

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
            Centralize and organize feedback in one place. Our smart
            categorization helps you identify patterns and opportunities.
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
              src="/images/features/feedback-boards.png"
              alt="Feedback Board"
              width={500}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Custom Feedback Page Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24 animate-on-scroll">
        <div className="relative">
          <div className="glass-card p-6 shadow-lg rounded-xl overflow-hidden">
            <Image
              // src="/images/land/dashboard-preview.png"
              src="/images/features/custom-pa.png"

              alt="Floopr Dashboard Preview"
              width={500}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Custom Feedback Page</h3>
          <p className="text-gray-600 mb-6">
            Collect feedback with a beautiful, branded page tailored to your
            product and users.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Customizable design</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Easy sharing link</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Collect votes and comments</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Multiple Product Boards Section */}
      {/* <div className="grid md:grid-cols-2 gap-16 items-center mb-24 animate-on-scroll">
        <div>
          <h3 className="text-2xl font-bold mb-4">Multiple Product Boards</h3>
          <p className="text-gray-600 mb-6">
            Manage feedback for several products or teams, all in one place.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Create unlimited boards</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Switch between products easily</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Team-based access</span>
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="glass-card p-6 shadow-lg rounded-xl overflow-hidden">
            <Image
              src="/images/land/products-pa.png"
              alt="Multiple Product Boards"
              width={500}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div> */}

      {/* Embeddable Widgets Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24 animate-on-scroll">
        <div>
          <h3 className="text-2xl font-bold mb-4">Embeddable Widgets & Quick Setup</h3>
          <p className="text-gray-600 mb-6">
            Integrate feedback collection seamlessly into your product with our customizable widgets.
            Get started in under a minute with our simple documentation and ready-to-use components.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Edit and preview directly from our UI</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Make components fit to your brand identity</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Copy & Paste script tag into your website</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Get feedback directly from your site</span>
            </li>
          </ul>
        </div>
        <div className="relative h-[500px] group">
          {/* Background image */}
          <div className="absolute inset-8 transform translate-y-8 translate-x-8">
            <div className="glass-card p-6 shadow-xl rounded-xl overflow-hidden h-full opacity-40 blur-[2px]">
              <Image
                src="/images/features/component-doc.png"
                alt="Component Documentation"
                width={500}
                height={400}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Main card */}
          <div className="glass-card p-6 shadow-2xl rounded-xl overflow-hidden absolute inset-0 transform hover:-translate-y-2 transition-all duration-300">
            <Image
              src="/images/features/edit-component.png"
              alt="Widget Editor"
              width={500}
              height={400}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* AI Analytics Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24 animate-on-scroll">
        <div className="order-2 md:order-1 relative">
          <div className="glass-card p-6 shadow-lg rounded-xl overflow-hidden">
            {/* <Image 
              src="/images/feedback-widget-preview.png" 
              alt="AI Analytics" 
              width={500} 
              height={400}
              className="w-full h-auto rounded-lg"
            /> */}
            <div className="w-[500px] h-[400px] text-center flex items-center justify-center flex-col gap-2 mx-auto">
              <span className="inline-block bg-floopr-purple/10 text-floopr-purple px-3 py-1 rounded-full text-sm font-medium mb-4">
                Coming Soon
              </span>
              {/* <span className="w-full h-2 bg-floopr-purple-light rounded absolute" /> */}
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h3 className="text-2xl font-bold mb-4">AI-Powered Analytics</h3>
          <p className="text-gray-600 mb-6">
            Get deep insights into your feedback with our advanced AI analysis.
            Understand trends, sentiment, and business opportunities.
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
            In Progress
          </span>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-4">
            AI Tutor:{" "}
            <span className="text-floopr-purple-dark underline flex items-center">
              <Image
                src="/images/assistant-avatar/prey.png"
                alt="AI Analytics"
                width={20}
                height={20}
                className=" h-auto rounded-lg bg-floopr-purple-dark inline-block mr-2"
              />
              Prey
            </span>
          </h3>
          <p className="text-gray-600 mb-6">
            Talk with your feedbacks. Get AI-powered suggestions for feature
            prioritization and strategic planning.
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
              <span>Brainstorm with your new AI co-founder</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Strategic planning insights</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-floopr-purple-bg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-floopr-purple"></div>
              </div>
              <span>Prey adapts to talk like your users</span>
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="glass-card p-6 shadow-lg rounded-xl overflow-hidden">
            {/* <Image
              src="/images/land/ai-assistant.png"
              alt="AI Tutor"
              width={500}
              height={400}
              className="w-full h-auto rounded-lg"
            /> */}
            <video
              src="/videos/land/screen-capture (4).webm"
              className="w-full rounded-lg"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
