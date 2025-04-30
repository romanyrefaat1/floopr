"use client";

const FeedbackWidget = () => {
  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-5 relative z-10">
        <div className="mb-4">
          <h4 className="font-bold text-lg mb-2">Send us your feedback</h4>
          <p className="text-sm text-gray-600">
            Help us improve your experience
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              What needs improvement?
            </label>
            <textarea
              className="w-full h-24 rounded-lg border border-gray-200 p-3 text-sm resize-none focus:ring-2 focus:ring-floopr-purple focus:border-floopr-purple"
              placeholder="Describe your issue or suggestion..."
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Add a screenshot (optional)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-floopr-purple transition-colors">
              <div className="text-sm text-gray-500">
                Drag and drop an image here, or click to select
              </div>
            </div>
          </div>

          <button className="w-full bg-floopr-purple hover:bg-floopr-purple-dark text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Send Feedback
          </button>
        </div>
      </div>

      <div className="absolute -right-12 top-0 transform">
        <div className="bg-white text-gray-800 font-medium p-2 rounded-xl shadow-md border border-gray-200">
          <span className="text-sm">Easy to embed anywhere!</span>
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
          <span className="text-sm">Collect rich feedback!</span>
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

export default FeedbackWidget;
