"use client";

import PricingModal from "@/components/payment/PricingModal";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Types for subscription and plan
export type SubscriptionTier =
  | "free"
  | "builder_monthly"
  | "builder_annual"
  | string;
export type PlanType = "monthly" | "annual";

export interface UserSubscription {
  tier: SubscriptionTier;
  trialActive: boolean;
  trialEndsAt?: string; // ISO date string
  currentPeriodEnd?: string; // ISO date string

  feedback_count_monthly: number;
  limit_feedback_count_monthly: number;
  feedback_last_reset_date?: string; // ISO date string
  isExceededFeedbackCountLimit: boolean;

  chatbot_messages_monthly: number; // Renamed from optional
  limit_chatbot_messages_monthly: number; // Renamed from optional
  chatbot_last_reset_date?: string; // ISO date string - NEW
  isExceededChatbotMessagesLimit: boolean;

  group_feedback_count_daily_number: number; // NEW - was in state but not interface
  limit_group_feedback_count_daily: number; // NEW - was in getUserPricing but not interface
  group_feedback_last_reset_date?: string | null; // ISO date string or null - TYPO CORRECTED
  limit_last_group_feedback_count_dailytimeout?: number; // in hours
  isExceededGroupFeedbackLimit: boolean;
  
  // Add more fields as needed for future plans
}

export type ContentOfPricingModal ={
  plans: {
    free: {
      button: string
    }
  }
}

interface PricingContextType {
  isModalOpen: boolean;
  openModal: ({error, content}: {error?: string, content?: ContentOfPricingModal}) => void;
  closeModal: () => void;
  selectedPlan: PlanType;
  setSelectedPlan: (plan: PlanType) => void;
  userSubscription: UserSubscription;
  setUserSubscription: (sub: UserSubscription) => void;
  isExceededFeedbackLimit: boolean;
  isExceededChatbotLimit: boolean;
  isExceededGroupFeedbackLimit: boolean;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("annual"); // default to annual
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    tier: "free",
    trialActive: false,
    trialEndsAt: undefined,
    currentPeriodEnd: undefined,

    feedback_count_monthly: 0,
    limit_feedback_count_monthly: 50, // Default for free tier from getUserPricing
    feedback_last_reset_date: new Date().toISOString(),
    isExceededFeedbackCountLimit: false,

    chatbot_messages_monthly: 0,
    limit_chatbot_messages_monthly: 10, // Default for free tier from getUserPricing
    chatbot_last_reset_date: new Date().toISOString(),
    isExceededChatbotMessagesLimit: false,

    group_feedback_count_daily_number: 0,
    limit_group_feedback_count_daily: 5, // Default for free tier from getUserPricing
    group_feedback_last_reset_date: new Date().toISOString(), // TYPO CORRECTED
    limit_last_group_feedback_count_dailytimeout: 24, // Default from getUserPricing
    isExceededGroupFeedbackLimit: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<ContentOfPricingModal | null>(null);

  // Server-side getUserPricing now handles resets and limit calculations.
  // The boolean flags from userSubscription are the source of truth.
  const isExceededFeedbackLimit = userSubscription.isExceededFeedbackCountLimit;
  const isExceededChatbotLimit = userSubscription.isExceededChatbotMessagesLimit;
  const isExceededGroupFeedbackLimit = userSubscription.isExceededGroupFeedbackLimit;

  // useEffect for tier change (kept for potential UI reactions, limit setting removed)
  useEffect(()=>{ 
    // console.log('User subscription tier changed on client:', userSubscription.tier);
  },[userSubscription.tier])

  // useEffect for feedback count change (kept for potential UI reactions, limit setting removed)
  useEffect(()=>{ 
    // console.log('User subscription feedback count changed on client:', userSubscription.feedback_count_monthly);
  },[userSubscription.tier, userSubscription.feedback_count_monthly])

  const openModal = ({error, content}: {error?: string, content?: ContentOfPricingModal}) => {
    setIsModalOpen(true);
    setError(error);
    setContent(content);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  console.log(`user subscription context:`, userSubscription);
  console.log(
    `user subscription isExceededFeedbackLimit:`,
    isExceededFeedbackLimit
  );

  return (
    <PricingContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        selectedPlan,
        setSelectedPlan,
        userSubscription,
        setUserSubscription,
        isExceededFeedbackLimit,
        isExceededChatbotLimit,
        isExceededGroupFeedbackLimit,
        error,
        content,
      }}
    >
      {children}
      {isModalOpen && <PricingModal error={error} content={content}/>}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error("usePricing must be used within a PricingProvider");
  return ctx;
};
