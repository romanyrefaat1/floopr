"use client";

import Image from "next/image";

const Changelog = () => {
  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-5 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-bold text-lg">Product Updates</h4>
            <p className="text-sm text-gray-600">
              Stay up to date with our latest changes
            </p>
          </div>
          <div className="bg-floopr-purple text-white text-sm px-3 py-1 rounded-full">
            New
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">April 25, 2024</div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Released
              </span>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-bold text-lg mb-2">Dark Mode Support 🌙</h5>
              <p className="text-sm text-gray-600 mb-4">
                We've added dark mode support to reduce eye strain during
                night-time usage. Toggle between light and dark themes easily
                from your settings.
              </p>
              <Image
                src="/lovable-uploads/dark-mode-preview.png"
                alt="Dark mode preview"
                width={300}
                height={150}
                className="w-full h-32 object-cover rounded-lg bg-gray-100"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">April 20, 2024</div>
              <span className="text-xs bg-floopr-purple-bg text-floopr-purple px-2 py-0.5 rounded-full">
                Beta
              </span>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-bold text-lg mb-2">API Documentation</h5>
              <p className="text-sm text-gray-600">
                Comprehensive API documentation is now available with examples
                and interactive playground.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -right-12 top-0 transform">
        <div className="bg-white text-gray-800 font-medium p-2 rounded-xl shadow-md border border-gray-200">
          <span className="text-sm">Keep users updated!</span>
        </div>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -left-10 top-4"
        >
          <path d="M45,25 Q35,10 25,30" stroke="#555" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute -left-12 bottom-0 transform">
        <div className="bg-white text-gray-800 font-medium p-2 rounded-xl shadow-md border border-gray-200">
          <span className="text-sm">Auto-notify users!</span>
        </div>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -right-10 top-4"
        >
          <path d="M5,25 Q15,10 25,30" stroke="#555" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute -left-3 -bottom-3 w-full h-full border-2 border-dashed border-gray-300 rounded-xl -z-10"></div>
      <div className="absolute -right-3 -top-3 w-full h-full border-2 border-dashed border-floopr-purple-light rounded-xl -z-10"></div>
    </div>
  );
};

export default Changelog;
