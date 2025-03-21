'use client';

import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ModalTimeoutProps = {
  title: string;
  parent?: React.RefObject<HTMLElement>;
  ratings: {
    label: string;
    emoji: string;
    value: number;
  }[];
  inputs: {
    label: string;
    placeholder: string;
  }[];
  buttonText: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  timeoutDuration?: number;
  customStyles?: Record<string, string>; // Optional custom styles prop
};

// Modal component
export default function ModalTimeout({
  title,
  parent,
  ratings,
  inputs,
  buttonText,
  isOpen = true,
  onOpenChange,
  timeoutDuration = 0,
  customStyles = {}
}: ModalTimeoutProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [animate, setAnimate] = useState<number | null>(null);

  const [styles, setStyles] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#f3f4f6',
    accentColor: '#dbeafe',
    backgroundColor: 'white',
    textColor: '#1f2937',
    fontFamily: 'inherit',
    fontSize: '1rem',
    borderRadius: '0.375rem',
    shadowStyle: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    spacing: '1.5rem'
  });

  // Get CSS variables from root on client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rootStyle = getComputedStyle(document.documentElement);
      
      setStyles({
        primaryColor: rootStyle.getPropertyValue('--modal-primary-color').trim() || styles.primaryColor,
        secondaryColor: rootStyle.getPropertyValue('--modal-secondary-color').trim() || styles.secondaryColor,
        accentColor: rootStyle.getPropertyValue('--modal-accent-color').trim() || styles.accentColor,
        backgroundColor: rootStyle.getPropertyValue('--modal-background-color').trim() || styles.backgroundColor,
        textColor: rootStyle.getPropertyValue('--modal-text-color').trim() || styles.textColor,
        fontFamily: rootStyle.getPropertyValue('--modal-font-family').trim() || styles.fontFamily,
        fontSize: rootStyle.getPropertyValue('--modal-font-size').trim() || styles.fontSize,
        borderRadius: rootStyle.getPropertyValue('--modal-border-radius').trim() || styles.borderRadius,
        shadowStyle: rootStyle.getPropertyValue('--modal-shadow-style').trim() || styles.shadowStyle,
        spacing: rootStyle.getPropertyValue('--modal-spacing').trim() || styles.spacing
      });
    }
  }, []);

  // Auto-close the modal if timeoutDuration is set
  useEffect(() => {
    if (timeoutDuration > 0 && isOpen) {
      const timer = setTimeout(() => {
        if (onOpenChange) {
          onOpenChange(false);
        }
      }, timeoutDuration * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onOpenChange, timeoutDuration]);

  const handleRatingClick = (value: number) => {
    setSelectedRating(value);
    setAnimate(value);
    setTimeout(() => setAnimate(null), 800);
  };

  const handleSave = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  // Sort ratings by value to ensure they appear in the correct order
  const sortedRatings = [...ratings].sort((a, b) => a.value - b.value);

  // The modal content (shared between both rendering methods)
  const modalContent = (
    <div 
      className="w-full h-full bg-white rounded-lg shadow-lg"
      style={{
        padding: styles.spacing,
        backgroundColor: styles.backgroundColor,
        color: styles.textColor,
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        borderRadius: styles.borderRadius,
        boxShadow: styles.shadowStyle,
      }}
    >
      {/* Title and close button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold" style={{ color: styles.primaryColor }}>{title}</h2>
        <button 
          onClick={handleClose}
          className="hover:text-gray-700 text-xl font-semibold"
          style={{ color: styles.textColor }}
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Rating options */}
      <div className="flex items-center justify-between mb-8 relative">
        {/* Line connecting the ratings */}
        <div className="absolute top-1/2 left-0 w-full h-px" style={{ backgroundColor: styles.secondaryColor }} />
        
        {sortedRatings.map((rating, index) => (
          <div key={index} className="flex flex-col items-center z-10">
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300 relative"
              style={{
                backgroundColor: selectedRating === rating.value ? styles.accentColor : styles.secondaryColor,
                borderColor: selectedRating === rating.value ? styles.primaryColor : styles.secondaryColor
              }}
              onClick={() => handleRatingClick(rating.value)}
            >
              <span className={`transition-all duration-500 transform ${animate === rating.value ? 'scale-125' : 'scale-100'}`}>
                {rating.emoji}
              </span>
              {animate === rating.value && (
                <span 
                  className="absolute inset-0 rounded-full opacity-50 animate-ping" 
                  style={{ backgroundColor: styles.primaryColor }}
                />
              )}
            </button>
            <span className="text-sm mt-2" style={{ color: styles.textColor }}>{rating.label}</span>
          </div>
        ))}
      </div>

      {/* Feedback inputs */}
      {inputs.map((input, index) => (
        <div key={index} className="mb-6">
          <label className="block mb-2 font-medium" style={{ color: styles.textColor }}>{input.label}</label>
          <input
            type="text"
            placeholder={input.placeholder}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
            style={{
              borderColor: styles.secondaryColor,
              color: styles.textColor,
              borderRadius: styles.borderRadius,
            }}
          />
        </div>
      ))}

      {/* Footer */}
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm font-medium px-3 py-1 rounded-md flex items-center"
          style={{ 
            backgroundColor: styles.secondaryColor,
            color: styles.textColor
          }}
        >
          <span className="mr-1">✏️</span> Made by <span style={{ color: styles.primaryColor }} className="ml-1">@Dearboard</span>
        </div>
        <button
          onClick={handleSave}
          className="hover:bg-blue-600 text-white px-5 py-2 rounded-md font-medium transition-colors duration-200"
          style={{
            backgroundColor: styles.primaryColor,
            borderRadius: styles.borderRadius,
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );

  // Return null early if modal shouldn't be shown
  if (!isOpen) {
    return null;
  }

  // Mode 1: In-container modal
  if (parent && parent.current) {
    return createPortal(
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        {modalContent}
      </div>,
      parent.current
    );
  }

  // Mode 2: Full-page modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="max-w-md w-full">
        {modalContent}
      </div>
    </div>
  );
}