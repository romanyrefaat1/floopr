"use server";

import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore"; 
import { auth } from "@clerk/nextjs/server";
import { UserSubscription, SubscriptionTier } from "@/context/pricing-context"; 

// Define limits based on tiers
const LIMITS = {
  free: {
    feedback_count_monthly: 50,
    chatbot_messages_monthly: 10,
    group_feedback_count_daily: 1,
  },
  builder_monthly: { 
    feedback_count_monthly: 350,
    chatbot_messages_monthly: 100,
    group_feedback_count_daily: 2,
  },
  builder_annual: {
    feedback_count_monthly: 350,
    chatbot_messages_monthly: 100,
    group_feedback_count_daily: 2,
  },
  // Add other tiers like 'enterprise' if they exist
};

// Helper to get limits for a tier, defaulting to free tier limits
const getTierLimits = (tier: SubscriptionTier) => {
  const normalizedTier = tier.startsWith("builder") ? "builder_monthly" : tier; 
  return LIMITS[normalizedTier as keyof typeof LIMITS] || LIMITS.free;
};


export default async function getUserPricing(ownerId?: string): Promise<UserSubscription> {
  const now = new Date();
  const currentISODate = now.toISOString();
  const currentTimestamp = Timestamp.fromDate(now);

  const defaultFreeSubscription: UserSubscription = {
    tier: "free",
    trialActive: false,
    feedback_count_monthly: 0,
    limit_feedback_count_monthly: getTierLimits("free").feedback_count_monthly,
    feedback_last_reset_date: currentISODate,
    isExceededFeedbackCountLimit: false,
    chatbot_messages_monthly: 0,
    limit_chatbot_messages_monthly: getTierLimits("free").chatbot_messages_monthly,
    chatbot_last_reset_date: currentISODate,
    isExceededChatbotMessagesLimit: false,
    group_feedback_count_daily_number: 0,
    limit_group_feedback_count_daily: getTierLimits("free").group_feedback_count_daily,
    group_feedback_last_reset_date: currentISODate, // Typo corrected
    limit_last_group_feedback_count_dailytimeout: 24,
    isExceededGroupFeedbackLimit: false,
  };

  try {
    let userId = ownerId;
    if (!ownerId) {
      const { userId:clerkId } = await auth();
      userId = clerkId;
    }

    if (!userId) {
      return defaultFreeSubscription;
    }

    
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      let userData = userSnap.data();
      let firestoreUpdates: { [key: string]: any } = {};
      const userTier = userData.subscription_tier ?? "free";
      const tierLimits = getTierLimits(userTier);

      // --- Monthly Feedback Count Reset ---
      let feedbackCount = userData.feedback_count_monthly ?? 0;
      let feedbackLastReset = userData.feedback_last_reset_date ? new Date(userData.feedback_last_reset_date) : new Date(0); 
      if (now.getFullYear() > feedbackLastReset.getFullYear() || now.getMonth() > feedbackLastReset.getMonth()) {
        feedbackCount = 0;
        firestoreUpdates.feedback_count_monthly = 0;
        firestoreUpdates.feedback_last_reset_date = currentISODate;
        userData.feedback_last_reset_date = currentISODate; 
      }

      // --- Monthly Chatbot Messages Reset ---
      let chatbotCount = userData.chatbot_messages_monthly ?? 0;
      let chatbotLastReset = userData.chatbot_last_reset_date ? new Date(userData.chatbot_last_reset_date) : new Date(0);
      if (now.getFullYear() > chatbotLastReset.getFullYear() || now.getMonth() > chatbotLastReset.getMonth()) {
        chatbotCount = 0;
        firestoreUpdates.chatbot_messages_monthly = 0;
        firestoreUpdates.chatbot_last_reset_date = currentISODate;
        userData.chatbot_last_reset_date = currentISODate; 
      }
      
      // --- Daily Group Feedback Reset ---
      const rawGroupFeedbackCount = userData.group_feedback_count_daily_number;
      let groupFeedbackCount = rawGroupFeedbackCount ?? 0;
      const rawGroupFeedbackLastResetDate = userData.group_feedback_last_reset_date; // Assuming correct field name in Firestore
      let groupFeedbackLastReset = rawGroupFeedbackLastResetDate ? new Date(rawGroupFeedbackLastResetDate) : new Date(0);
      const groupFeedbackTimeoutHours = userData.limit_last_group_feedback_count_dailytimeout ?? 24;
      const hoursSinceLastGroupReset = (now.getTime() - groupFeedbackLastReset.getTime()) / (1000 * 60 * 60);

      
      
      
      :', groupFeedbackLastReset);
      
      
      const needsReset = hoursSinceLastGroupReset >= groupFeedbackTimeoutHours;
      

      if (needsReset) { // Typo corrected in condition variable
        
        groupFeedbackCount = 0;
        firestoreUpdates.group_feedback_count_daily_number = 0;
        firestoreUpdates.group_feedback_last_reset_date = currentISODate; // Typo corrected
        userData.group_feedback_last_reset_date = currentISODate; // Typo corrected 
      }

      // Persist updates to Firestore if any resets occurred
      if (Object.keys(firestoreUpdates).length > 0) {
        await updateDoc(userRef, firestoreUpdates);
        
      }
      
      const subscription: UserSubscription = {
        tier: userTier,
        trialActive: userData.trial_end ? new Date(userData.trial_end) > now : false,
        trialEndsAt: userData.trial_end,
        currentPeriodEnd: userData.subscription_renewal,

        feedback_count_monthly: feedbackCount,
        limit_feedback_count_monthly: tierLimits.feedback_count_monthly,
        feedback_last_reset_date: userData.feedback_last_reset_date ?? currentISODate,
        isExceededFeedbackCountLimit: feedbackCount >= tierLimits.feedback_count_monthly,

        chatbot_messages_monthly: chatbotCount,
        limit_chatbot_messages_monthly: tierLimits.chatbot_messages_monthly,
        chatbot_last_reset_date: userData.chatbot_last_reset_date ?? currentISODate,
        isExceededChatbotMessagesLimit: chatbotCount >= tierLimits.chatbot_messages_monthly,

        group_feedback_count_daily_number: groupFeedbackCount,
        limit_group_feedback_count_daily: tierLimits.group_feedback_count_daily,
        group_feedback_last_reset_date: userData.group_feedback_last_reset_date ?? currentISODate, // Typo corrected
        limit_last_group_feedback_count_dailytimeout: groupFeedbackTimeoutHours,
        isExceededGroupFeedbackLimit: groupFeedbackCount >= tierLimits.group_feedback_count_daily,
      };
      
      
      
      
      
      return subscription;
    } else {
      // If user doc doesn't exist yet, return default free subscription
      // The API route calling this should handle creating the initial user doc.
      
      return defaultFreeSubscription;
    }
  } catch (error) {
    console.error("Error fetching user pricing data from Firestore:", error);
    return defaultFreeSubscription; 
  }
}