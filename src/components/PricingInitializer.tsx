"use client";

import { usePricing } from "@/context/pricing-context";
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
            console.log('[PricingInitializer] Fetched userData from Firestore:', userData);
            const subscriptionToSet = {
              tier: userData.subscription_tier ?? "free",
              trialActive: userData.trial_end
                ? new Date(userData.trial_end) > new Date()
                : false,
              trialEndsAt: userData.trial_end,
              currentPeriodEnd: userData.subscription_renewal,
              feedback_count_monthly: userData.feedback_count_monthly ?? 0,
              feedback_last_reset_date: userData.feedback_last_reset_date ?? new Date().toISOString(),
              chatbot_messages_monthly: userData.chatbot_messages_monthly ?? 0,
            };
            console.log('[PricingInitializer] Setting userSubscription with:', subscriptionToSet);
            setUserSubscription(subscriptionToSet);
          } else {
            // If user doc doesn't exist yet, default to free
            console.log('[PricingInitializer] User doc does not exist in Firestore. Setting default free subscription.');
            setUserSubscription({
              tier: "free",
              trialActive: false,
              feedback_count_monthly: 0,
              feedback_last_reset_date: new Date().toISOString(),
              chatbot_messages_monthly: 0,
            });
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          // Default to free on error
          setUserSubscription({
            tier: "free",
            trialActive: false,
            feedback_count_monthly: 0,
            feedback_last_reset_date: new Date().toISOString(),
          });
        }
      } else if (isLoaded && !isSignedIn) {
        // User is not signed in, default to free
        setUserSubscription({
          tier: "free",
          trialActive: false,
          feedback_count_monthly: 0,
        });
      }
    };

    fetchUserData();
  }, [isLoaded, user, isSignedIn, setUserSubscription]); // Rerun effect when auth state changes

  // This component doesn't render anything, it just handles data fetching/context update
  return null;
}
