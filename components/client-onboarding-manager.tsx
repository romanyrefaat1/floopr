'use client';

import React, { useEffect, useState } from 'react';
import { useOnborda } from 'onborda';
import { allIdeaBoardTours } from '@/lib/onboarding-steps';

const ONBOARDING_COMPLETED_KEY = 'ideaboard_onborda_completed';

// This component will be rendered *inside* <Onborda> in layout.tsx
export function ClientOnboardingManager() {
  console.log('ClientOnboardingManager: Component rendered');
  const { startOnborda, isOnbordaVisible, currentStep, currentTour } = useOnborda(); // Assuming currentStep and currentTour are available for completion logic
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log('ClientOnboardingManager: Client side rendered');
  }, []);

  useEffect(() => {
    console.log('ClientOnboardingManager: Start effect triggered', { isClient, isOnbordaVisible });
    if (isClient) {
      const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_COMPLETED_KEY);
      console.log('ClientOnboardingManager: hasCompletedOnboarding?', hasCompletedOnboarding);
      if (!hasCompletedOnboarding && !isOnbordaVisible && allIdeaBoardTours.length > 0) {
        console.log('ClientOnboardingManager: Attempting to start Onborda with tour:', allIdeaBoardTours[0].tour);
        startOnborda(allIdeaBoardTours[0].tour);
      }
    }
  }, [isClient, startOnborda, isOnbordaVisible]);

  // Logic to mark tour as completed
  useEffect(() => {
    console.log('ClientOnboardingManager: Completion check effect', { isOnbordaVisible, currentStep, currentTour });
    if (isClient && !isOnbordaVisible && currentTour && currentStep === null) {
        // This condition implies the tour was visible (currentTour was set) but now it's not, and there's no currentStep (finished or closed)
        // We need a more reliable way from Onborda to detect actual completion vs. just closing the tour.
        // For now, if the tour was active and now it's not visible, we'll mark it.
        // Check if it was the main tour and if it's not already marked.
        if (localStorage.getItem(ONBOARDING_COMPLETED_KEY) !== 'true') {
            console.log('ClientOnboardingManager: Marking tour as completed in localStorage because it became not visible after being active.');
            localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
        }
    }
    // A more robust solution would be to use a specific callback or state from Onborda indicating completion/skip.
    // The `useOnborda` hook might provide `isTourCompleted` or `onTourFinish` type of states/callbacks.
    // Since the docs didn't show explicit onFinish/onExit props on the Provider/Component, we look to the hook.
    // If `currentStep` becomes `null` after being active, it might signify tour end.
  }, [isClient, isOnbordaVisible, currentStep, currentTour]);

  return null; // This component doesn't render any UI itself
}
