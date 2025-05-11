"use client"

import React, { useState, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import ModalTimeout from '@/components/floopr-integration/modal-timout/modal-timeout';
import { ReviewStep } from './review-step';
import { PreviewStep } from './preview-step';
import { ProductStyle } from '@/app/(routes)/(code)/[productId]/page';

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


// Configuration and preview component
export type FeedbackModalConfiguratorProps = {
  productId: string;
  isComponentExists?: boolean;
  componentId?: string;
  productStyles: ProductStyle;
};

export default function FeedbackModalConfigurator({productId, isComponentExists=false, componentId, productStyles}: FeedbackModalConfiguratorProps) {
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const searchParams = useSearchParams()
  const userTitle = searchParams.get('userTitle') || ''
  const userDescription = searchParams.get('userDescription') || ''
  
  const myComponentId = isComponentExists ? componentId : crypto.randomUUID()
  
  const [currentStep, setCurrentStep] = useState('review');
  const [modalConfig, setModalConfig] = useState({
    metaData: {
      name: decodeURIComponent(userTitle) || `Feedback Modal`,
      description: decodeURIComponent(userDescription) || `A customizable modal component that pops up after a set time on your website. you can change its design, content, and delay. users can use it to leave feedback.`,
      imageUrl: `/images/online/components/modal-timeout.PNG`
    },
    title: "Got any feedback?",
    productId,
    componentId: myComponentId,
    style: productStyles,
    ratings: [
      { label: "Bad", value: 0, emoji: "😞" },
      { label: "Normal", value: 1, emoji: "😐" },
      { label: "Good", value: 2, emoji: "😊" }
    ],
    inputs: [
      { label: "Explain it here", placeholder: "Write your feedback...", value: "", id: 1 }
    ],
    buttonText: "Save",
    timeoutDuration: 0,
    isDark: isDark,
  });
  console.log(`modalConfig`, modalConfig)
  
  const [inContainerModalOpen, setInContainerModalOpen] = useState(true);
  const [fullPageModalOpen, setFullPageModalOpen] = useState(false);
  const previewContainerRef = useRef(null);

  // Save component in DB
  const handleSaveComponent = async () => {
    try {
      const loadingToast = toast.loading('Saving component...');

      const response = await fetch('/api/save-component', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          componentData: modalConfig,
          cUserData: {
            uTitle: decodeURIComponent(userTitle),
            uDesc: decodeURIComponent(userDescription)
          },
          productId: productId,
          componentType: 'modal-time'
        }),
      });

      toast.dismiss(loadingToast)

      if (!response.ok) {
        toast.error('Failed to save component. Please try again');
        return;
      }
      toast.success('Component saved successfully');
      router.push(`/products/${productId}/#integrations`);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // Function to handle input changes
  const handleConfigChange = (field, value) => {
    setModalConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to handle rating changes
  const handleRatingChange = (index, field, value) => {
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
  const handleInputChange = (index, field, value) => {
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

  // Function to add a new rating
  const addRating = () => {
    const newRatings = [...modalConfig.ratings];
    newRatings.push({ label: "New", value: newRatings.length, emoji: "😀" });
    setModalConfig(prev => ({
      ...prev,
      ratings: newRatings
    }));
  };

  // Function to add a new input
  const addInput = () => {
    const newInputs = [...modalConfig.inputs];
    newInputs.push({ label: "New Input", placeholder: "Enter text...", id: newInputs.length + 1, value: "" });
    setModalConfig(prev => ({
      ...prev,
      inputs: newInputs
    }));
  };

  // Function to remove a rating
  const removeRating = (index) => {
    if (modalConfig.ratings.length > 1) {
      const newRatings = modalConfig.ratings.filter((_, i) => i !== index);
      setModalConfig(prev => ({
        ...prev,
        ratings: newRatings
      }));
    }
  };

  // Function to remove an input
  const removeInput = (index) => {
    if (modalConfig.inputs.length > 1) {
      const newInputs = modalConfig.inputs.filter((_, i) => i !== index);
      setModalConfig(prev => ({
        ...prev,
        inputs: newInputs
      }));
    }
  };

  return (
    <div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <Tabs defaultValue="review">
        <TabsList className="mb-4 bg-secondaryBackground text-secondaryForeground">
          <TabsTrigger 
            value="review" 
            onClick={() => setCurrentStep('review')}
            className={currentStep === 'review' ? 'font-bold' : ''}
          >Review step</TabsTrigger>
          <TabsTrigger 
            value="preview" 
            onClick={() => setCurrentStep('preview')}
            className={currentStep === 'preview' ? 'font-bold' : ''}
          >Preview step</TabsTrigger>
        </TabsList>
        <TabsContent value='review'>
        <ReviewStep
        setIsDark={setIsDark}
        isDark={isDark}
        config={modalConfig}
        onConfigChange={handleConfigChange}
        onRatingChange={handleRatingChange}
        onInputChange={handleInputChange}
        onAddRating={addRating}
        onRemoveRating={removeRating}
        onAddInput={addInput}
        onRemoveInput={removeInput}
        onNext={() => setCurrentStep('preview')}
      />
        </TabsContent>
        <TabsContent value='preview'>
        <PreviewStep
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        modalConfig={modalConfig}
        setModalConfig={setModalConfig}
        timeoutDuration={modalConfig.timeoutDuration}
        handleConfigChange={handleConfigChange}
        handleRatingChange={handleRatingChange}
        handleInputChange={handleInputChange}
        addRating={addRating}
        removeRating={removeRating}
        addInput={addInput}
        removeInput={removeInput}
        handleSaveComponent={handleSaveComponent}
        setInContainerModalOpen={setInContainerModalOpen}
        setFullPageModalOpen={setFullPageModalOpen}
      />
        </TabsContent>
      </Tabs>
      <div>

      <div 
        ref={previewContainerRef} 
        className="preview w-full relative flex items-center justify-center h-full min-h-[400px] border rounded-lg bg-gray-100"
      >
        {!inContainerModalOpen && (
          <p className="text-gray-500 text-center">Preview area - if modal doesn't appear here, click on <span className='text-black'>Preview Step>Preview In container</span></p>
        )}
          
        {/* Modal inside the container */}
        <ModalTimeout
          className={`sticky`}
          setIsDarkMode={setIsDark}
          isDarkMode={isDark}
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
      </div>
      
      {/* Full page modal (outside the container) */}
      <ModalTimeout
        title={modalConfig.title}
        ratings={modalConfig.ratings}
        inputs={modalConfig.inputs}
        buttonText={modalConfig.buttonText}
        isOpen={fullPageModalOpen}
        onOpenChange={setFullPageModalOpen}
        timeoutDuration={0}
      />
    </div>
  );
}