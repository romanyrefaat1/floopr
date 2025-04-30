"use client";

import Image from "next/image";
import Link from "next/link";

interface FeatureProps {
  title: string;
  description: string;
  image: React.ReactNode;
  reversed?: boolean;
  index: number;
  callout?: string;
}

const Feature = ({
  title,
  description,
  image,
  reversed = false,
  index,
  callout,
}: FeatureProps) => {
  return (
    <div
      className={`flex flex-col ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 md:gap-16 items-center animate-on-scroll`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="w-full md:w-1/2">
        <div className="max-w-xl">
          <h3 className="text-4xl font-bold mb-6 text-black">{title}</h3>
          <p className="text-xl text-black mb-8 leading-relaxed">
            {description}
          </p>

          {callout && (
            <div className="inline-block rounded-xl bg-floopr-purple/10 px-6 py-3 font-medium text-floopr-purple border border-floopr-purple/20">
              {callout}
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-white p-6">
        {image}
      </div>
    </div>
  );
};

export default Feature;
