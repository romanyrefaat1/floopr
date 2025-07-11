"use client"

import React, { useState, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import ModalTimeout from '@/components/floopr-integration/modal-timout/modal-timeout';
import { ReviewStep } from './review-step';
import { PreviewStep } from './preview-step';
import { ProductStyle } from '@/app/(routes)/(code)/[productId]/page';
import { usePricing } from '@/context/pricing-context';

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

  const {tier, openModal} = usePricing()
  
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
  
  
  const [inContainerModalOpen, setInContainerModalOpen] = useState(true);
  const [fullPageModalOpen, setFullPageModalOpen] = useState(false);
  const previewContainerRef = useRef(null);

  // Save component in DB
  const handleSaveComponent = async () => {
    try {
      if (tier === 'free') {
        openModal({
          error: 'Modal Time component is the only one allowed for Builder+ users',})
        return;
      }
      
      const loadingToast = toast.loading('Saving component...');

      const response = await fetch('/api/save-component', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          componentData: {...modalConfig, plan: "builder"},
          cUserData: {
            uTitle: decodeURIComponent(userTitle),
            uDesc: decodeURIComponent(userDescription)
          },
          productId: productId,
          componentType: 'modal-time'
        }),
      });

      if (response.status === 403) {
        openModal({
          error: 'Modal Time component is the only one allowed for Builder+ users',})
          toast.dismiss(loadingToast)
        return;
      }

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

  const getPaddingValue = (size: "xs" | "sm" | "md" | "lg" | "xl") => {
    if (size === "xs") {
      return 10;
    } else if (size === "sm") {
      return 12;
    } else if (size === "md") {
      return 18;
    } else if (size === "lg") {
      return 22;
    } else if (size === "xl") {
      return 24;
    } else {
      return 18;
    }
  };

   const getRoundedValue = (size: "xs" | "sm" | "md" | "lg" | "xl") => {
    if (size === "xs") {
      return 6;
    } else if (size === "sm") {
      return 10;
    } else if (size === "md") {
      return 16;
    } else if (size === "lg") {
      return 20;
    } else if (size === "xl") {
      return 22;
    } else {
      return 16;
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
            padding={getPaddingValue(modalConfig.padding)}
            rounded={getRoundedValue(modalConfig.rounded)}
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
         padding={getPaddingValue(modalConfig.padding)}
            rounded={getRoundedValue(modalConfig.rounded)}
      />
    </div>
  );
}