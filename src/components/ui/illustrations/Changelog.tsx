
import React from 'react';

const Changelog = () => {
  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-5 relative z-10">
        <div className="relative">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-floopr-purple text-white rounded-full px-4 py-1 flex items-center gap-2 z-20">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3.33334V8.00001L10.6667 9.33334M14.6667 8.00001C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00001C1.33334 4.31811 4.31811 1.33334 8.00001 1.33334C11.6819 1.33334 14.6667 4.31811 14.6667 8.00001Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-medium">Subscribe to Updates</span>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-500">November 14th</div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-gray-100 rounded px-2 py-0.5">8 comments</span>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4">
              <h4 className="font-bold text-lg">Auto-Eyeroll Camera</h4>
              <p className="text-sm text-gray-600 mt-2">Detects when someone is speaking complete nonsense to automatically roll your eyes, even when you're trying to be polite.</p>
            </div>
            <div className="h-40 bg-gray-200 relative overflow-hidden">
              <img 
                src="/lovable-uploads/eb0ef237-6f6a-4500-a0fd-aed1f05e7788.png" 
                alt="Eyeroll reaction" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -right-12 top-0 transform text-gray-600">
        <svg width="160" height="50" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5,25 Q25,10 45,30 Q65,50 85,25" stroke="#555" strokeWidth="1.5" />
          <text x="90" y="30" fontFamily="Arial" fontSize="14" fill="#555">All your releases!</text>
        </svg>
      </div>
      
      <div className="absolute -left-10 top-1/4 transform text-gray-600">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M80,30 Q60,10 40,30 Q20,50 5,25" stroke="#555" strokeWidth="1.5" />
          <text x="0" y="20" fontFamily="Arial" fontSize="14" fill="#555">Instant updates!</text>
        </svg>
      </div>
      
      <div className="absolute -left-3 -bottom-3 w-full h-full border-2 border-dashed border-gray-300 rounded-xl -z-10"></div>
      <div className="absolute -right-3 -top-3 w-full h-full border-2 border-dashed border-floopr-purple-light rounded-xl -z-10"></div>
    </div>
  );
};

export default Changelog;
