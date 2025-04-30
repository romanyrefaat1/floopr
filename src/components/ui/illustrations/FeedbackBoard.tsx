"use client";

import Image from "next/image";

const FeedbackBoard = () => {
  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-5 relative z-10">
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold">Dark mode support</h4>
              <span className="text-sm bg-floopr-purple-bg text-floopr-purple px-2 py-0.5 rounded">
                Planned
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Add dark mode support to reduce eye strain during night time
              usage.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <button className="text-sm text-floopr-purple hover:text-floopr-purple-dark">
                12 upvotes
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                4 comments
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold">API Documentation</h4>
              <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded">
                In Progress
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Create comprehensive API documentation with examples.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <button className="text-sm text-floopr-purple hover:text-floopr-purple-dark">
                8 upvotes
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                2 comments
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -right-12 top-0 transform">
        <div className="bg-white text-gray-800 font-medium p-2 rounded-xl shadow-md border border-gray-200">
          <span className="text-sm">Collect and organize feedback!</span>
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
          <span className="text-sm">Track progress easily!</span>
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

export default FeedbackBoard;
