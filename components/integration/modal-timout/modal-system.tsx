"use client"

import React, { useState, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPortal } from 'react-dom';

// Type definitions
type Rating = {
  label: string;
  emoji: string;
  value: number;
};

type InputField = {
  label: string;
  placeholder: string;
};

type ModalTimeoutProps = {
  title: string;
  parent?: React.RefObject<HTMLElement>;
  ratings: Rating[];
  inputs: InputField[];
  buttonText: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  timeoutDuration?: number;
};

// Modal component
function ModalTimeout({
  title,
  parent,
  ratings,
  inputs,
  buttonText,
  isOpen = true,
  onOpenChange,
  timeoutDuration = 0
}: ModalTimeoutProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [animate, setAnimate] = useState<number | null>(null);

  // Return null early if modal shouldn't be shown
  if (!isOpen) {
    return null;
  }

  // Auto-close the modal if timeoutDuration is set
  React.useEffect(() => {
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

  // The modal content (shared between both rendering methods)
  const modalContent = (
    <div className="p-6 w-full h-full bg-white rounded-lg shadow-lg">
      {/* Title and close button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button 
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 text-xl font-semibold"
        >
          ×
        </button>
      </div>

      {/* Rating options */}
      <div className="flex items-center justify-between mb-8 relative">
        {/* Line connecting the ratings */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300" />
        
        {ratings.map((rating, index) => (
          <div key={index} className="flex flex-col items-center z-10">
            <button
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg 
                ${selectedRating === rating.value ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-gray-300'} 
                border-2 transition-all duration-300 relative`}
              onClick={() => handleRatingClick(rating.value)}
            >
              <span className={`transition-all duration-500 transform ${animate === rating.value ? 'scale-125' : 'scale-100'}`}>
                {rating.emoji}
              </span>
              {animate === rating.value && (
                <span className="absolute inset-0 rounded-full bg-blue-300 opacity-50 animate-ping" />
              )}
            </button>
            <span className="text-sm text-gray-600 mt-2">{rating.label}</span>
          </div>
        ))}
      </div>

      {/* Feedback inputs */}
      {inputs.map((input, index) => (
        <div key={index} className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">{input.label}</label>
          <input
            type="text"
            placeholder={input.placeholder}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      ))}

      {/* Footer */}
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-md flex items-center">
          <span className="mr-1">✏️</span> Made by <span className="text-blue-500 ml-1">@Dearboard</span>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md font-medium transition-colors duration-200"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );

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

// Configuration and preview component
export default function FeedbackModalSystem() {
  const [currentStep, setCurrentStep] = useState('review');
  const [modalConfig, setModalConfig] = useState({
    title: "Got any feedback?",
    ratings: [
      { label: "Bad", value: 0, emoji: "😞" },
      { label: "Normal", value: 1, emoji: "😐" },
      { label: "Good", value: 2, emoji: "😊" }
    ],
    inputs: [
      { label: "Explain it here", placeholder: "Write your feedback..." }
    ],
    buttonText: "Save",
    timeoutDuration: 0,
    position: "sticky",
  });
  
  const [inContainerModalOpen, setInContainerModalOpen] = useState<boolean>(false);
  const [fullPageModalOpen, setFullPageModalOpen] = useState<boolean>(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Function to handle input changes
  const handleConfigChange = (field: string, value: any) => {
    setModalConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to handle rating changes
  const handleRatingChange = (index: number, field: string, value: string) => {
    const updatedRatings = [...modalConfig.ratings];
    updatedRatings[index] = {
      ...updatedRatings[index],
      [field]: field === 'value' ? parseInt(value) : value
    };
    setModalConfig(prev => ({
      ...prev,
      ratings: updatedRatings
    }));
  };

  // Function to handle input field changes
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedInputs = [...modalConfig.inputs];
    updatedInputs[index] = {
      ...updatedInputs[index],
      [field]: value
    };
    setModalConfig(prev => ({
      ...prev,
      inputs: updatedInputs
    }));
  };

  return (
    <Tabs defaultValue="review">
      <TabsList className="mb-4">
        <TabsTrigger 
          value="review" 
          onClick={() => setCurrentStep('review')}
          className={currentStep === 'review' ? 'font-bold' : ''}
        >Review step</TabsTrigger>
        <TabsTrigger 
          value="success" 
          onClick={() => setCurrentStep('success')}
          className={currentStep === 'success' ? 'font-bold' : ''}
        >Success step</TabsTrigger>
      </TabsList>
      
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="flex-1 border rounded-lg p-4">
          <TabsContent value="review">
            <div className="space-y-4">
              <div>
                <Label>How many seconds should it take for this modal to appear?</Label>
                <Input 
                  type="number"
                  value={modalConfig.timeoutDuration}
                  onChange={(e) => handleConfigChange('timeoutDuration', parseInt(e.target.value))}
                  min={0}
                  className="mt-2"
                />
              </div>
              
              <div className="border rounded-lg p-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Rating</h3>
                {modalConfig.ratings.map((rating, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <div className="w-1/2">
                      <Label>Icon</Label>
                      <Input 
                        value={rating.emoji}
                        onChange={(e) => handleRatingChange(index, 'emoji', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="w-1/2">
                      <Label>Label</Label>
                      <Input 
                        value={rating.label}
                        onChange={(e) => handleRatingChange(index, 'label', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border rounded-lg p-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Inputs</h3>
                {modalConfig.inputs.map((input, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <div className="w-1/2">
                      <Label>Title</Label>
                      <Input 
                        value={input.label}
                        onChange={(e) => handleInputChange(index, 'label', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="w-1/2">
                      <Label>Placeholder</Label>
                      <Input 
                        value={input.placeholder}
                        onChange={(e) => handleInputChange(index, 'placeholder', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border rounded-lg p-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Submit button</h3>
                <Label>Text</Label>
                <Input 
                  value={modalConfig.buttonText}
                  onChange={(e) => handleConfigChange('buttonText', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="border rounded-lg p-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Modal title</h3>
                <Label>Title</Label>
                <Input 
                  value={modalConfig.title}
                  onChange={(e) => handleConfigChange('title', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="border rounded-lg p-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Position</h3>
                <div className="flex gap-2">
                  <Button 
                    variant={modalConfig.position === "sticky" ? "default" : "outline"}
                    onClick={() => handleConfigChange('position', 'sticky')}
                  >
                    Sticky
                  </Button>
                  <Button 
                    variant={modalConfig.position === "modal" ? "default" : "outline"}
                    onClick={() => handleConfigChange('position', 'modal')}
                  >
                    Modal
                  </Button>
                </div>
              </div>
              
              <Button 
                className="mt-4 w-full" 
                onClick={() => setCurrentStep('success')}
              >
                Next
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="success">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button variant="outline">Image</Button>
                <Button variant="outline">Demo</Button>
              </div>
              <div className="border rounded-lg p-4 h-32 flex items-center justify-center text-gray-500">
                positioned {modalConfig.position}
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep('review')}
                >
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setInContainerModalOpen(true)}
                    variant="outline"
                  >
                    Preview in Container
                  </Button>
                  <Button 
                    onClick={() => setFullPageModalOpen(true)}
                  >
                    Preview Full Page
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
        
        <div 
          ref={previewContainerRef} 
          className="preview relative flex items-center justify-center w-full lg:w-1/2 min-h-[300px] border rounded-lg bg-gray-100"
        >
          {!inContainerModalOpen && (
            <p className="text-gray-500">Preview area - modal will appear here</p>
          )}
          
          {/* Modal inside the container */}
          <ModalTimeout
            title={modalConfig.title}
            parent={previewContainerRef}
            ratings={modalConfig.ratings}
            inputs={modalConfig.inputs}
            buttonText={modalConfig.buttonText}
            isOpen={inContainerModalOpen}
            onOpenChange={setInContainerModalOpen}
            timeoutDuration={modalConfig.timeoutDuration}
          />
        </div>
      </div>
      
      {/* Full page modal (outside the container) */}
      <ModalTimeout
        title={modalConfig.title}
        ratings={modalConfig.ratings}
        inputs={modalConfig.inputs}
        buttonText={modalConfig.buttonText}
        isOpen={fullPageModalOpen}
        onOpenChange={setFullPageModalOpen}
        timeoutDuration={modalConfig.timeoutDuration}
      />
    </Tabs>
  );
}