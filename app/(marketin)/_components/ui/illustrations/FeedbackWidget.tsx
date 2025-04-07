
import React from 'react';

const FeedbackWidget = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-5 relative z-10">
        <div className="mb-4 text-center">
          <h4 className="font-semibold">Share your feedback</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex bg-gray-50 rounded-full px-4 py-3 items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.33334V12.6667M3.33334 8H12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-gray-600">Feature Requests</span>
          </div>
          
          <div className="flex bg-gray-50 rounded-full px-4 py-3 items-center">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.33334V9.33334M8 12.6667V12.6733" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-gray-600">Bug report</span>
          </div>
          
          <div className="flex bg-gray-50 rounded-full px-4 py-3 items-center">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mr-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-gray-600">Custom Name</span>
          </div>
        </div>
        
        <div className="mt-5 px-3 py-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="14" height="10" rx="1" stroke="#555" strokeWidth="1.5" />
              <path d="M7 15H13" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          
          <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" stroke="#555" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="4" stroke="#555" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="absolute right-10 bottom-0 transform translate-y-3 z-20">
        <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,10 Q70,5 120,15 Q150,20 165,10" stroke="#7C65F6" strokeWidth="2" strokeDasharray="4 4" />
          <text x="170" y="20" fontFamily="Arial" fontSize="12" fill="#7C65F6">Capture feedback</text>
        </svg>
      </div>
      
      <div className="absolute -right-10 -bottom-10 text-sm font-medium transform rotate-5 text-gray-600">
        <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="5" y="15" fontFamily="Arial" fontSize="14" fill="#555">With images!</text>
          <path d="M5,20 Q20,25 40,15" stroke="#555" strokeWidth="1.5" />
        </svg>
      </div>
      
      <div className="absolute -left-5 -top-5 w-full h-full border-2 border-dashed border-floopr-purple-light rounded-xl -z-10"></div>
    </div>
  );
};

export default FeedbackWidget;
