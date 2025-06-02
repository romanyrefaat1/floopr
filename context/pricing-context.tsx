import PricingModal from "@/components/payment/PricingModal";
import React, { createContext, useContext, useState, ReactNode } from "react";

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
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("annual"); // default to annual
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    tier: "free",
    trialActive: false,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
