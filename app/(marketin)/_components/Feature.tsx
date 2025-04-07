import React from "react";

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
        reversed ? "md:flex-row-reverse" : "md:flex-row pl-[50px]"
      } gap-8 md:gap-12 items-center animate-on-scroll`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="w-full md:w-1/2">
        <div className="max-w-lg">
          <h3 className="text-3xl font-bold mb-4 text-black">{title}</h3>
          <p className="text-lg text-black mb-6">{description}</p>

          {callout && (
            <div className="inline-block rounded-xl bg-floopr-purple/10 px-4 py-2 font-medium text-floopr-purple border border-floopr-purple/20 mt-4">
              {callout}
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
        {image}
      </div>
    </div>
  );
};

export default Feature;
