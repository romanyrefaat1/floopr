"use client";

import { MessageSquare, BarChart3, Zap, Users, LineChart, Layers } from "lucide-react";

const Benefits = () => {
  return (
    <section id="benefits" className="section-container py-20">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Supercharge Your<br />Product Feedback
        </h2>
        <p className="text-lg text-gray-600">
          Everything you need to gather, analyze, and act on user feedback
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll">
        {/* First Row */}
        <div className="glass-card p-8">
          <div className="w-12 h-12 rounded-full bg-floopr-purple-bg flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-floopr-purple" />
          </div>
          <h3 className="text-xl font-bold mb-2">Collect Feedback</h3>
          <p className="text-gray-600">Gather insights from users through customizable forms and widgets</p>
        </div>

        <div className="glass-card p-8">
          <div className="w-12 h-12 rounded-full bg-floopr-purple-bg flex items-center justify-center mb-4">
            <BarChart3 className="h-6 w-6 text-floopr-purple" />
          </div>
          <h3 className="text-xl font-bold mb-2">Insightful Categories</h3>
          <p className="text-gray-600">Automatically organize feedback into actionable categories</p>
        </div>

        <div className="glass-card p-8">
          <div className="w-12 h-12 rounded-full bg-floopr-purple-bg flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-floopr-purple" />
          </div>
          <h3 className="text-xl font-bold mb-2">API Support</h3>
          <p className="text-gray-600">Integrate with your existing tools and workflows seamlessly</p>
        </div>

        {/* Second Row */}
        <div className="glass-card p-8">
          <div className="w-12 h-12 rounded-full bg-floopr-purple-bg flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-floopr-purple" />
          </div>
          <h3 className="text-xl font-bold mb-2">Highly Customizable</h3>
          <p className="text-gray-600">Tailor the experience to match your brand and specific needs</p>
        </div>

        <div className="glass-card p-8">
          <div className="w-12 h-12 rounded-full bg-floopr-purple-bg flex items-center justify-center mb-4">
            <LineChart className="h-6 w-6 text-floopr-purple" />
          </div>
          <h3 className="text-xl font-bold mb-2">User Voting</h3>
          <p className="text-gray-600">Let users vote on features to help prioritize your roadmap</p>
        </div>

        <div className="glass-card p-8">
          <div className="w-12 h-12 rounded-full bg-floopr-purple-bg flex items-center justify-center mb-4">
            <Layers className="h-6 w-6 text-floopr-purple" />
          </div>
          <h3 className="text-xl font-bold mb-2">Moderation</h3>
          <p className="text-gray-600">Control what feedback is visible and manage user submissions</p>
        </div>
      </div>

      <div className="text-center mt-12 animate-on-scroll">
        <p className="text-lg text-gray-600">
          All with amazing customizable features for you and your team!
        </p>
      </div>
    </section>
  );
}

export default Benefits;
