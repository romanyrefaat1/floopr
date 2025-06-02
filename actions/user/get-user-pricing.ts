"use server";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "@clerk/nextjs/server";
import { UserSubscription } from "@/context/pricing-context";

export default async function getUserPricing(): Promise<UserSubscription> {
  try {
    // Get the current user from Clerk
    const { userId } = await auth();
    
    if (!userId) {
      // User is not signed in, return default free subscription
      return {
        tier: "free",
        trialActive: false,
        feedback_count_monthly: 0,
        feedback_last_reset_date: new Date().toISOString(),
        chatbot_messages_monthly: 0,
        limit_chatbot_messages_monthly: 10,
      };
    }

    // Fetch user data from Firestore
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log('[getUserPricing] Fetched userData from Firestore:', userData);
      
      // Transform the data to match UserSubscription interface
      const subscription: UserSubscription = {
        tier: userData.subscription_tier ?? "free",
        trialActive: userData.trial_end
          ? new Date(userData.trial_end) > new Date()
          : false,
        trialEndsAt: userData.trial_end,
        currentPeriodEnd: userData.subscription_renewal,
        feedback_count_monthly: userData.feedback_count_monthly ?? 0,
        feedback_last_reset_date: userData.feedback_last_reset_date ?? new Date().toISOString(),
        chatbot_messages_monthly: userData.chatbot_messages_monthly ?? 0,
        limit_chatbot_messages_monthly: userData.subscription_tier === "free" ? 10 : 100,
      };
      
      console.log('[getUserPricing] Returning subscription data:', subscription);
      return subscription;
    } else {
      // If user doc doesn't exist yet, return default free subscription
      console.log('[getUserPricing] User doc does not exist in Firestore. Returning default free subscription.');
      return {
        tier: "free",
        trialActive: false,
        feedback_count_monthly: 0,
        feedback_last_reset_date: new Date().toISOString(),
        chatbot_messages_monthly: 0,
        limit_chatbot_messages_monthly: 10,
      };
    }
  } catch (error) {
    console.error("Error fetching user pricing data from Firestore:", error);
    
    // Return default free subscription on error
    return {
      tier: "free",
      trialActive: false,
      feedback_count_monthly: 0,
      feedback_last_reset_date: new Date().toISOString(),
      chatbot_messages_monthly: 0,
      limit_chatbot_messages_monthly: 10,
    };
  }
}