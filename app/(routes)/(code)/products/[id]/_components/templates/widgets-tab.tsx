"use client";

import { TabsTrigger } from "@/components/ui/tabs";
import { useGuidedOnboarding } from "@/contexts/onboarding/onboarding-context";

export default function WidgetsTab() {
  const { setCurrentStep } = useGuidedOnboarding();

  return (
    <TabsTrigger
      value="integrations"
      className="whitespace-nowrap flex-shrink-0"
      id="components-tab"
      onClick={() => setCurrentStep(3)}
    >
      Widgets
    </TabsTrigger>
  );
}
