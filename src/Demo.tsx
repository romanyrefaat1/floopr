import React from 'react';

const DemoSection = () => {
  return (
    <section className="p-8 rounded-lg shadow-lg my-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">See Floopr in Action</h2>
      <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
        <iframe
          src="https://www.youtube.com/watch?v=LMWVVWSKDEs&list=PLo0UbjvW5l8sVUIiLJMdPVzCn3dvGfX7j"
          width="100%"
          height="400"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Demo Video"
        ></iframe>
      </div>
    </section>
  );
};

export default DemoSection;
