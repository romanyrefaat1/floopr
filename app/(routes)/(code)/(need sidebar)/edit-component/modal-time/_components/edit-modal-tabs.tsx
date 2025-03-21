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
import { useRouter } from 'next/navigation';
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
  
  const myComponentId = isComponentExists ? componentId : crypto.randomUUID()
  
  const [currentStep, setCurrentStep] = useState('review');
  const [modalConfig, setModalConfig] = useState({
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
    position: "sticky",
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
      router.push(`/products/${productId}/my-components/${componentId}`);
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
        <TabsList className="mb-4">
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
  
  // return (
  //   <Tabs defaultValue="review" className="max-w-full mx-auto">
  //     <TabsList className="mb-4">
  //       <TabsTrigger 
  //         value="review" 
  //         onClick={() => setCurrentStep('review')}
  //         className={currentStep === 'review' ? 'font-bold' : ''}
  //       >Review step</TabsTrigger>
  //       <TabsTrigger 
  //         value="preview" 
  //         onClick={() => setCurrentStep('preview')}
  //         className={currentStep === 'preview' ? 'font-bold' : ''}
  //       >Preview step</TabsTrigger>
  //     </TabsList>
      
  //     <div className="flex flex-col lg:flex-row gap-4 w-full">
  //       <div className="flex-1 border rounded-lg p-4">
  //         <TabsContent value="review">
  //           {/* Timeout */}
  //           <Accordion type="single" collapsible className="space-y-4">
  //     {/* Timeout Section */}
  //     <AccordionItem value="timeout">
  //       <AccordionTrigger>
  //         <span>Timeout Duration</span>
  //       </AccordionTrigger>
  //       <AccordionContent>
  //         <div>
  //           <Label>How many seconds should it take for this modal to appear?</Label>
  //           <Input 
  //             type="number"
  //             value={modalConfig.timeoutDuration}
  //             onChange={(e) => handleConfigChange('timeoutDuration', parseInt(e.target.value) || 0)}
  //             min={0}
  //             className="mt-2"
  //           />
  //           <p className="text-sm text-gray-500 mt-1">
  //             Set to 0 for immediate display, or enter seconds for delayed appearance
  //           </p>
  //         </div>
  //       </AccordionContent>
  //     </AccordionItem>

  //     {/* Ratings Section */}
  //     <AccordionItem value="ratings">
  //       <AccordionTrigger>
  //         <span>Rating Options</span>
  //       </AccordionTrigger>
  //       <AccordionContent>
  //         <div className="border rounded-lg p-4 mt-4">
  //           <div className="flex justify-between items-center mb-2">
  //             <h3 className="text-lg font-medium">Rating Options</h3>
  //             <Button variant="outline" size="sm" onClick={addRating}>
  //               Add Rating
  //             </Button>
  //           </div>
  //           {modalConfig.ratings.map((rating, index) => (
  //             <div key={index} className="flex items-center gap-2 mb-2 border-b pb-2">
  //               <div className="w-1/3">
  //                 <Label>Emoji</Label>
  //                 <Input 
  //                   value={rating.emoji}
  //                   onChange={(e) => handleRatingChange(index, 'emoji', e.target.value)}
  //                   className="mt-1"
  //                 />
  //               </div>
  //               <div className="w-1/3">
  //                 <Label>Label</Label>
  //                 <Input 
  //                   value={rating.label}
  //                   onChange={(e) => handleRatingChange(index, 'label', e.target.value)}
  //                   className="mt-1"
  //                 />
  //               </div>
  //               <div className="w-1/6">
  //                 <Label>Value</Label>
  //                 <Input 
  //                   type="number"
  //                   value={rating.value}
  //                   onChange={(e) => handleRatingChange(index, 'value', e.target.value)}
  //                   className="mt-1"
  //                 />
  //               </div>
  //               <div className="w-1/6 flex items-end justify-end h-full">
  //                 <Button 
  //                   variant="ghost" 
  //                   size="sm" 
  //                   onClick={() => removeRating(index)}
  //                   disabled={modalConfig.ratings.length <= 1}
  //                 >
  //                   <X size={16} />
  //                 </Button>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </AccordionContent>
  //     </AccordionItem>

  //     {/* Inputs Section */}
  //     <AccordionItem value="inputs">
  //       <AccordionTrigger>
  //         <span>Input Fields</span>
  //       </AccordionTrigger>
  //       <AccordionContent>
  //         <div className="border rounded-lg p-4 mt-4">
  //           <div className="flex justify-between items-center mb-2">
  //             <h3 className="text-lg font-medium">Input Fields</h3>
  //             <Button variant="outline" size="sm" onClick={addInput}>
  //               Add Input
  //             </Button>
  //           </div>
  //           {modalConfig.inputs.map((input, index) => (
  //             <div key={index} className="flex items-center gap-2 mb-2 border-b pb-2">
  //               <div className="w-full">
  //                 <Label>Label</Label>
  //                 <Input 
  //                   value={input.label}
  //                   onChange={(e) => handleInputChange(index, 'label', e.target.value)}
  //                   className="mt-1"
  //                 />
  //               </div>
  //               <div className="w-full">
  //                 <Label>Placeholder</Label>
  //                 <Input 
  //                   value={input.placeholder}
  //                   onChange={(e) => handleInputChange(index, 'placeholder', e.target.value)}
  //                   className="mt-1"
  //                 />
  //               </div>
  //               <div className="w-1/5 flex items-end justify-end h-full">
  //                 <Button 
  //                   variant="ghost" 
  //                   size="sm" 
  //                   onClick={() => removeInput(index)}
  //                   disabled={modalConfig.inputs.length <= 1}
  //                 >
  //                   <X size={16} />
  //                 </Button>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </AccordionContent>
  //     </AccordionItem>

  //     {/* Submit Button Section */}
  //     <AccordionItem value="submit">
  //       <AccordionTrigger>
  //         <span>Submit Button</span>
  //       </AccordionTrigger>
  //       <AccordionContent>
  //         <div className="border rounded-lg p-4 mt-4">
  //           <h3 className="text-lg font-medium mb-2">Submit Button</h3>
  //           <Label>Button Text</Label>
  //           <Input 
  //             value={modalConfig.buttonText}
  //             onChange={(e) => handleConfigChange('buttonText', e.target.value)}
  //             className="mt-1"
  //           />
  //         </div>
  //       </AccordionContent>
  //     </AccordionItem>

  //     {/* Modal Title Section */}
  //     <AccordionItem value="title">
  //       <AccordionTrigger>
  //         <span>Modal Title</span>
  //       </AccordionTrigger>
  //       <AccordionContent>
  //         <div className="border rounded-lg p-4 mt-4">
  //           <h3 className="text-lg font-medium mb-2">Modal Title</h3>
  //           <Label>Title Text</Label>
  //           <Input 
  //             value={modalConfig.title}
  //             onChange={(e) => handleConfigChange('title', e.target.value)}
  //             className="mt-1"
  //           />
  //         </div>
  //       </AccordionContent>
  //     </AccordionItem>

  //     {/* Position Section */}
  //     <AccordionItem value="position">
  //       <AccordionTrigger>
  //         <span>Position</span>
  //       </AccordionTrigger>
  //       <AccordionContent>
  //         <div className="border rounded-lg p-4 mt-4">
  //           <h3 className="text-lg font-medium mb-2">Position</h3>
  //           <div className="flex gap-2">
  //             <Button 
  //               variant={modalConfig.position === "sticky" ? "default" : "outline"}
  //               onClick={() => handleConfigChange('position', 'sticky')}
  //             >
  //               Sticky
  //             </Button>
  //             <Button 
  //               variant={modalConfig.position === "modal" ? "default" : "outline"}
  //               onClick={() => handleConfigChange('position', 'modal')}
  //             >
  //               Modal
  //             </Button>
  //           </div>
  //           <p className="text-sm text-gray-500 mt-2">
  //             Sticky: Modal appears within a container. Modal: Full-page overlay.
  //           </p>
  //         </div>
  //       </AccordionContent>
  //     </AccordionItem>

  //     {/* Navigation Button */}
  //     <Button className="mt-4 w-full" onClick={() => setCurrentStep('preview')}>
  //       Next
  //     </Button>
  //   </Accordion></TabsContent>
          
  //         {/* Preview step */}
  //         <TabsContent value="preview">
  //           <div className="space-y-4">
  //             {/* <div className="flex gap-2">
  //               <Button variant="outline">Image</Button>
  //               <Button variant="outline">Demo</Button>
  //             </div> */}
              
  //             {/* <div className="border rounded-lg p-4 h-32 flex items-center justify-center text-gray-500">
  //               Position: {modalConfig.position}
  //             </div> */}
              
  //             <div className="border rounded-lg p-4">
  //               <h3 className="font-medium mb-2">Configuration Summary</h3>
  //               <ul className="text-sm text-gray-600 space-y-1">
  //                 <li><strong>Title:</strong> {modalConfig.title}</li>
  //                 <li><strong>Button Text:</strong> {modalConfig.buttonText}</li>
  //                 <li><strong>Timeout:</strong> {modalConfig.timeoutDuration} seconds</li>
  //                 <li><strong>Ratings:</strong> {modalConfig.ratings.length}</li>
  //                 <li><strong>Inputs:</strong> {modalConfig.inputs.length}</li>
  //               </ul>
  //             </div>
              
  //             <div className="flex justify-between items-center flex-col md:flex-row mt-4">
  //               <div className="flex gap-2">
  //                 <Button 
  //                   onClick={() => setInContainerModalOpen(true)}
  //                   variant="outline"
  //                 >
  //                   Preview in Container
  //                 </Button>
  //                 <Button 
  //                 variant='outline'
  //                   onClick={() => setFullPageModalOpen(true)}
  //                 >
  //                   Preview Full Page
  //                 </Button>
  //               </div>
  //               <Button  
  //                 onClick={handleSaveComponent}
  //               >
  //                 Next
  //               </Button>
  //             </div>
  //           </div>
  //         </TabsContent>
  //       </div>
        
  //       {/* Left Preview */}
  //       <div 
  //         ref={previewContainerRef} 
  //         className="preview relative flex items-center justify-center w-full lg:w-1/2 min-h-[400px] border rounded-lg bg-gray-100"
  //       >
  //         {!inContainerModalOpen && (
  //           <p className="text-gray-500 text-center">Preview area - if modal doesn't appear here, click on <span className='text-black'>Preview Step>Preview In container</span></p>
  //         )}
          
  //         {/* Modal inside the container */}
  //         <ModalTimeout
  //         className={`sticky`}
  //           title={modalConfig.title}
  //           parent={previewContainerRef}
  //           ratings={modalConfig.ratings}
  //           inputs={modalConfig.inputs}
  //           buttonText={modalConfig.buttonText}
  //           isOpen={inContainerModalOpen}
  //           onOpenChange={setInContainerModalOpen}
  //           timeoutDuration={modalConfig.timeoutDuration}
  //         />
  //       </div>
  //     </div>
      
  //     {/* Full page modal (outside the container) */}
  //     <ModalTimeout
  //       title={modalConfig.title}
  //       ratings={modalConfig.ratings}
  //       inputs={modalConfig.inputs}
  //       buttonText={modalConfig.buttonText}
  //       isOpen={fullPageModalOpen}
  //       onOpenChange={setFullPageModalOpen}
  //       timeoutDuration={0}
  //     />
  //   </Tabs>
  // );

// }