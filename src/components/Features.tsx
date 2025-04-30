"use client";

import Changelog from "./ui/illustrations/Changelog";
import FeedbackWidget from "./ui/illustrations/FeedbackWidget";
import ProductRoadmap from "./ui/illustrations/ProductRoadmap";
import ScribbleHighlight from "./ui/ScribbleHighlight";

const FEATURES = [
  {
    title: "Feedback Widget",
    description:
      "Collect user feedback effortlessly with a customizable widget that matches your brand.",
    illustration: FeedbackWidget,
    delay: 0,
  },
  {
    title: "Product Roadmap",
    description:
      "Keep users informed about what's coming next and what you're working on.",
    illustration: ProductRoadmap,
    delay: 200,
  },
  {
    title: "Changelog",
    description:
      "Share product updates and keep your users excited about new features.",
    illustration: Changelog,
    delay: 400,
  },
];

const Features = () => {
  return (
    <section id="features" className="section-container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Everything you need to{" "}
          <ScribbleHighlight>manage feedback</ScribbleHighlight>
        </h2>
        <p className="text-gray-600 text-lg">
          A complete toolkit for collecting and organizing user feedback,
          helping you build better products.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {FEATURES.map(
          ({ title, description, illustration: Illustration, delay }) => (
            <div
              key={title}
              className="animate-on-scroll"
              style={{ animationDelay: `${delay}ms` }}
            >
              <div className="mb-8">
                <Illustration />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Features;
