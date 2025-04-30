"use client";

const ProductRoadmap = () => {
  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-5 relative z-10">
        <div className="mb-6">
          <h4 className="font-bold text-lg mb-2">Product Roadmap</h4>
          <div className="flex space-x-4">
            <span className="inline-flex items-center text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              In Progress
            </span>
            <span className="inline-flex items-center text-sm">
              <span className="w-2 h-2 bg-floopr-purple rounded-full mr-2"></span>
              Planned
            </span>
            <span className="inline-flex items-center text-sm">
              <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
              Under Review
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h5 className="font-medium mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              In Progress
            </h5>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="font-medium mb-1">API Documentation</div>
              <p className="text-sm text-gray-600">
                Creating comprehensive API documentation with examples.
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-medium mb-3 flex items-center">
              <span className="w-2 h-2 bg-floopr-purple rounded-full mr-2"></span>
              Planned
            </h5>
            <div className="bg-floopr-purple-bg rounded-lg p-4 border border-floopr-purple/20">
              <div className="font-medium mb-1">Dark Mode Support</div>
              <p className="text-sm text-gray-600">
                Adding dark mode support for better night-time usage.
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-medium mb-3 flex items-center">
              <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
              Under Review
            </h5>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="font-medium mb-1">Mobile App</div>
              <p className="text-sm text-gray-600">
                Native mobile app for iOS and Android platforms.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -right-12 top-0 transform">
        <div className="bg-white text-gray-800 font-medium p-2 rounded-xl shadow-md border border-gray-200">
          <span className="text-sm">Track progress easily!</span>
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
          <span className="text-sm">Keep users informed!</span>
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

export default ProductRoadmap;
