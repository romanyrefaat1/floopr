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
  feedback_last_reset_date?: string;
  chatbot_messages_monthly?: number;
  limit_chatbot_messages_monthly?: number;
  // Add more fields as needed for future plans
}

interface PricingContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectedPlan: PlanType;
  setSelectedPlan: (plan: PlanType) => void;
  userSubscription: UserSubscription;
  setUserSubscription: (sub: UserSubscription) => void;
  isExceededFeedbackLimit: boolean;
  isExceededChatbotLimit: boolean;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("annual"); // default to annual
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    tier: "free",
    trialActive: false,
    feedback_count_monthly: 0,
    feedback_last_reset_date: new Date().toISOString(),
    chatbot_messages_monthly: 0,
    limit_chatbot_messages_monthly: 10,
  });

  // Check and reset feedback count monthly
  // useEffect(() => {
  //   const checkAndResetFeedbackCount = () => {
  //     // Ensure we have a feedback_last_reset_date to work with
  //     // PricingInitializer should provide a default if it's missing from DB
  //     if (!userSubscription.feedback_last_reset_date) {
  //       // This case should be rare if PricingInitializer sets a default.
  //       // If it occurs, set a baseline to prevent errors with new Date(null).
  //       console.warn('[PricingProvider] feedback_last_reset_date is missing. Initializing count and date.');
  //       setUserSubscription((prev) => ({
  //         ...prev,
  //         feedback_count_monthly: prev.feedback_count_monthly ?? 0, // Keep existing count or default to 0
  //         feedback_last_reset_date: new Date().toISOString(),
  //       }));
  //       return;
  //     }

  //     const lastResetDate = new Date(userSubscription.feedback_last_reset_date);
  //     const currentDate = new Date();

  //     // Reset if the year or month has changed.
  //     if (
  //       lastResetDate.getFullYear() !== currentDate.getFullYear() ||
  //       lastResetDate.getMonth() !== currentDate.getMonth()
  //     ) {
  //       console.log('[PricingProvider] Month/Year changed. Resetting feedback count.');
  //       setUserSubscription((prev) => ({
  //         ...prev,
  //         feedback_count_monthly: 0,
  //         feedback_last_reset_date: currentDate.toISOString(),
  //       }));
  //     }
  //   };

  //   checkAndResetFeedbackCount();
  //   const interval = setInterval(checkAndResetFeedbackCount, 3600000); // 1 hour

  //   return () => clearInterval(interval);
  // }, [userSubscription.feedback_last_reset_date, setUserSubscription]);

  // Calculate feedback limit status
  const isExceededFeedbackLimit =
    userSubscription.tier === "free"
      ? userSubscription.feedback_count_monthly >= 50
      : userSubscription.feedback_count_monthly >= 350;

  const isExceededChatbotLimit = userSubscription.chatbot_messages_monthly >= userSubscription.limit_chatbot_messages_monthly;
  // const isExceededChatbotLimit = true;
      
  // Set limits
  useEffect(()=>{
    if(userSubscription.tier === "free"){
      setUserSubscription((prev)=>({
        ...prev,
        limit_chatbot_messages_monthly: 10,
      }))
    } else {
      setUserSubscription((prev)=>({
        ...prev,
        limit_chatbot_messages_monthly: 100,
      }))
    }
  },[userSubscription.chatbot_messages_monthly, userSubscription.tier])
  useEffect(()=>{
    if(userSubscription.tier === "free"){
      setUserSubscription((prev)=>({
        ...prev,
        limit_feedback_count_monthly: 50,
      }))
    } else {
      setUserSubscription((prev)=>({
        ...prev,
        limit_feedback_count_monthly: 350,
      }))
    }
  },[userSubscription.tier, userSubscription.feedback_count_monthly])

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      }}
    >
      {children}
      {isModalOpen && <PricingModal />}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error("usePricing must be used within a PricingProvider");
  return ctx;
};
