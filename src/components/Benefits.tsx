"use client";

import FeatureCard from "./ui/FeatureCard";
import ScribbleHighlight from "./ui/ScribbleHighlight";
import { Sparkles, Users2, LineChart, Zap } from "lucide-react";

const BENEFITS = [
  {
    title: "Better Product Decisions",
    description:
      "Make informed decisions based on real user feedback and data, not guesswork.",
    icon: Sparkles,
    delay: 0,
  },
  {
    title: "Engage Your Community",
    description:
      "Build stronger relationships with users by actively listening to their needs.",
    icon: Users2,
    delay: 100,
  },
  {
    title: "Track Progress",
    description:
      "Monitor feedback trends and see how your product improvements impact user satisfaction.",
    icon: LineChart,
    delay: 200,
  },
  {
    title: "Save Time",
    description:
      "Automate feedback collection and organization, so you can focus on building.",
    icon: Zap,
    delay: 300,
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="section-container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Why choose <ScribbleHighlight>Floopr</ScribbleHighlight>?
        </h2>
        <p className="text-gray-600 text-lg">
          Build better products by understanding what your users really need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {BENEFITS.map(({ title, description, icon, delay }) => (
          <FeatureCard
            key={title}
            title={title}
            description={description}
            icon={icon}
            delay={delay}
          />
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-600">
          Join hundreds of product teams already using Floopr to build better
          products.
        </p>
      </div>
    </section>
  );
};

export default Benefits;
