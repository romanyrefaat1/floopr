
import React from 'react';

const ProductRoadmap = () => {
  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      <div className="flex gap-4 relative z-10">
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-md p-4">
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
            <span className="text-sm font-medium">In Review</span>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <h5 className="text-sm font-medium">Battery Blackmail Mode</h5>
              <p className="text-xs text-gray-500 mt-1">6 months ago</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <h5 className="text-sm font-medium">Panic Fake Call</h5>
              <p className="text-xs text-gray-500 mt-1">6 months ago</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <h5 className="text-sm font-medium">Battery Last Wish Mode</h5>
              <p className="text-xs text-gray-500 mt-1">Launch Date: 2025</p>
              <p className="text-xs text-gray-500 mt-1">1 year ago</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-md p-4">
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
            <span className="text-sm font-medium">In Progress</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex justify-between items-start">
              <h5 className="text-sm font-medium">Integrate Cursor AI into my iPhone</h5>
              <div className="text-xs font-medium bg-gray-200 rounded-md px-1">22</div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Launch Date: 2025</p>
            <p className="text-xs text-gray-500 mt-1">6 months ago</p>
          </div>
          
          <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
            <h5 className="text-sm font-medium">Mood-Dependent Keyboard</h5>
            <p className="text-xs text-gray-500 mt-1">1 year ago</p>
          </div>
        </div>
      </div>
      
      <div className="absolute -right-5 top-10 transform text-gray-600 z-20">
        <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,20 Q30,10 50,25 Q70,40 90,20" stroke="#555" strokeWidth="1.5" />
          <text x="30" y="15" fontFamily="Arial" fontSize="14" fill="#555">single...</text>
        </svg>
      </div>
      
      <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 -rotate-10 text-gray-600 z-20">
        <svg width="110" height="60" viewBox="0 0 110 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,30 Q40,20 20,25 Q10,30 5,15" stroke="#555" strokeWidth="1.5" />
          <text x="0" y="10" fontFamily="Arial" fontSize="14" fill="#555">Share every...</text>
        </svg>
      </div>
      
      <div className="absolute right-1/4 bottom-1/4 transform rotate-10 text-gray-600 z-20">
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,10 Q20,30 30,50 Q35,60 45,70" stroke="#555" strokeWidth="1.5" />
          <text x="30" y="75" fontFamily="Arial" fontSize="14" fill="#555">step!</text>
        </svg>
      </div>
      
      <div className="absolute -right-3 -bottom-3 w-full h-full border-2 border-dashed border-gray-300 rounded-xl -z-10"></div>
      <div className="absolute -left-3 -top-3 w-full h-full border-2 border-dashed border-floopr-purple-light rounded-xl -z-10"></div>
    </div>
  );
};

export default ProductRoadmap;
