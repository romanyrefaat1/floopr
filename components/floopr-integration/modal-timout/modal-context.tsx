"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Type definitions
export type Rating = {
  label: string;
  emoji: string;
  value: number;
};

export type InputField = {
  label: string;
  placeholder: string;
  value: string;
  id: number;
};

export type ModalConfig = {
  title: string;
  ratings: Rating[];
  inputs: InputField[];
  buttonText: string;
  timeoutDuration: number;
  position: "sticky" | "modal";
};

type FeedbackModalContextType = {
  modalConfig: ModalConfig;
  setModalConfig: React.Dispatch<React.SetStateAction<ModalConfig>>;
  inContainerModalOpen: boolean;
  setInContainerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fullPageModalOpen: boolean;
  setFullPageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep: 'review' | 'success';
  setCurrentStep: React.Dispatch<React.SetStateAction<'review' | 'success'>>;
};

const defaultConfig: ModalConfig = {
  title: "Got any feedback?",
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
};

const FeedbackModalContext = createContext<FeedbackModalContextType | undefined>(undefined);

export const FeedbackModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>(defaultConfig);
  const [inContainerModalOpen, setInContainerModalOpen] = useState<boolean>(false);
  const [fullPageModalOpen, setFullPageModalOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<'review' | 'success'>('review');

  return (
    <FeedbackModalContext.Provider
      value={{
        modalConfig,
        setModalConfig,
        inContainerModalOpen,
        setInContainerModalOpen,
        fullPageModalOpen,
        setFullPageModalOpen,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </FeedbackModalContext.Provider>
  );
};

export const useFeedbackModal = () => {
  const context = useContext(FeedbackModalContext);
  if (context === undefined) {
    throw new Error('useFeedbackModal must be used within a FeedbackModalProvider');
  }
  return context;
};