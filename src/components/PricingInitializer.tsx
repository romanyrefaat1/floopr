"use client";

import { usePricing, UserSubscription } from "@/context/pricing-context";
import { db } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function PricingInitializer() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { setUserSubscription } = usePricing();

  // Fetch user data from Firestore after Clerk auth is loaded
  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoaded && user) {
        try {
          const userRef = doc(db, "users", user.id);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            
            const userTier = userData.subscription_tier ?? "free";
            // Determine limits based on fetched tier, defaulting to free tier limits for safety
            // This is a simplified client-side limit setting. getUserPricing is authoritative.
            const limits = {
              feedback: userTier === "free" ? 50 : 350,
              chatbot: userTier === "free" ? 10 : 100,
              group: userTier === "free" ? 5 : 10,
            };

            const feedbackCount = userData.feedback_count_monthly ?? 0;
            const chatbotCount = userData.chatbot_messages_monthly ?? 0;
            const groupFeedbackCount = userData.group_feedback_count_daily_number ?? 0;

            const subscriptionToSet: UserSubscription = {
              tier: userTier,
              trialActive: userData.trial_end
                ? new Date(userData.trial_end) > new Date()
                : false,
              trialEndsAt: userData.trial_end,
              currentPeriodEnd: userData.subscription_renewal,
              
              feedback_count_monthly: feedbackCount,
              limit_feedback_count_monthly: limits.feedback,
              feedback_last_reset_date: userData.feedback_last_reset_date ?? new Date().toISOString(),
              isExceededFeedbackCountLimit: feedbackCount >= limits.feedback,

              chatbot_messages_monthly: chatbotCount,
              limit_chatbot_messages_monthly: limits.chatbot,
              chatbot_last_reset_date: userData.chatbot_last_reset_date ?? new Date().toISOString(),
              isExceededChatbotMessagesLimit: chatbotCount >= limits.chatbot,

              group_feedback_count_daily_number: groupFeedbackCount,
              limit_group_feedback_count_daily: limits.group,
              group_feedback_last_reset_date: userData.group_feedback_last_resetdate ?? new Date().toISOString(),
              limit_last_group_feedback_count_dailytimeout: userData.limit_last_group_feedback_count_dailytimeout ?? 24,
              isExceededGroupFeedbackLimit: groupFeedbackCount >= limits.group,
            };
            
            setUserSubscription(subscriptionToSet);
          } else {
            // If user doc doesn't exist yet, default to free
            
            setUserSubscription({
              tier: "free",
              trialActive: false,
              trialEndsAt: undefined,
              currentPeriodEnd: undefined,
              feedback_count_monthly: 0,
              limit_feedback_count_monthly: 50,
              feedback_last_reset_date: new Date().toISOString(),
              isExceededFeedbackCountLimit: false,
              chatbot_messages_monthly: 0,
              limit_chatbot_messages_monthly: 10,
              chatbot_last_reset_date: new Date().toISOString(),
              isExceededChatbotMessagesLimit: false,
              group_feedback_count_daily_number: 0,
              limit_group_feedback_count_daily: 5,
              group_feedback_last_reset_date: new Date().toISOString(),
              limit_last_group_feedback_count_dailytimeout: 24,
              isExceededGroupFeedbackLimit: false,
            });
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          // Default to free on error
          setUserSubscription({
            tier: "free",
            trialActive: false,
            trialEndsAt: undefined,
            currentPeriodEnd: undefined,
            feedback_count_monthly: 0,
            limit_feedback_count_monthly: 50,
            feedback_last_reset_date: new Date().toISOString(),
            isExceededFeedbackCountLimit: false,
            chatbot_messages_monthly: 0,
            limit_chatbot_messages_monthly: 10,
            chatbot_last_reset_date: new Date().toISOString(),
            isExceededChatbotMessagesLimit: false,
            group_feedback_count_daily_number: 0,
            limit_group_feedback_count_daily: 5,
            group_feedback_last_reset_date: new Date().toISOString(),
            limit_last_group_feedback_count_dailytimeout: 24,
            isExceededGroupFeedbackLimit: false,
          });
        }
      } else if (isLoaded && !isSignedIn) {
        // User is not signed in, default to free
        setUserSubscription({
          tier: "free",
          trialActive: false,
          trialEndsAt: undefined,
          currentPeriodEnd: undefined,
          feedback_count_monthly: 0,
          limit_feedback_count_monthly: 50,
          feedback_last_reset_date: new Date().toISOString(),
          isExceededFeedbackCountLimit: false, // Or true if count is 0 and limit is 0, but 50 is free limit
          chatbot_messages_monthly: 0,
          limit_chatbot_messages_monthly: 10,
          chatbot_last_reset_date: new Date().toISOString(),
          isExceededChatbotMessagesLimit: false,
          group_feedback_count_daily_number: 0,
          limit_group_feedback_count_daily: 5,
          group_feedback_last_reset_date: new Date().toISOString(),
          limit_last_group_feedback_count_dailytimeout: 24,
          isExceededGroupFeedbackLimit: false,
        });
      }
    };

    fetchUserData();
  }, [isLoaded, user, isSignedIn, setUserSubscription]); // Rerun effect when auth state changes

  // This component doesn't render anything, it just handles data fetching/context update
  return null;
}
