
import React from 'react';

const FeedbackBoard = () => {
  return (
    <div className="relative w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 relative z-10">
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-lg bg-floopr-purple-bg flex items-center justify-center">
            <span className="text-floopr-purple font-bold">FB</span>
          </div>
          <div className="ml-3">
            <h4 className="font-semibold">Feedback Board</h4>
            <p className="text-sm text-gray-500">22 active suggestions</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex justify-between">
              <h5 className="font-medium">Integrate Cursor AI</h5>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center bg-white">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2.5V9.5M2.5 6H9.5" stroke="#7C65F6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium mt-1">22</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">I want to code on my iPhone.</p>
            <div className="mt-3 flex items-center">
              <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center text-[8px] font-bold text-purple-700">M</div>
              <span className="text-xs text-gray-500 ml-2">Mike Strives • 6 months ago</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex justify-between">
              <h5 className="font-medium">Add dark mode</h5>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center bg-white">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2.5V9.5M2.5 6H9.5" stroke="#7C65F6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium mt-1">18</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Please add dark mode for night coding.</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-gray-500">Feature Requests</div>
          <div className="text-xs text-gray-500">In Progress</div>
        </div>
      </div>
      
      <div className="absolute -left-3 -bottom-3 w-full h-full border-2 border-dashed border-gray-300 rounded-xl -z-10"></div>
      <div className="absolute -right-3 -top-3 w-full h-full border-2 border-dashed border-floopr-purple-light rounded-xl -z-10"></div>
    </div>
  );
};

export default FeedbackBoard;
