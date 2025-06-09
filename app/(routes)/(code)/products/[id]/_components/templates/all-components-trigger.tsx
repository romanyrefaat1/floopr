"use client";

import { TabsTrigger } from "@/components/ui/tabs";
import { useGuidedOnboarding } from "@/contexts/onboarding/onboarding-context";
import { cn } from "@/lib/utils";

export default function AllComponentsTrigger() {
  const { setCurrentStep } = useGuidedOnboarding();
  return (
    <TabsTrigger
      value="all-components"
      className={cn(
        "data-[state=active]:bg-primary",
        "data-[state=active]:text-primary-foreground"
      )}
      id="all-components-tab"
      onClick={() => setCurrentStep(4)}
    >
      All Components
    </TabsTrigger>
  );
}
