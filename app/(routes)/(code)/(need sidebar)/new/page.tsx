import NewProductFormClient from "./_components/NewProductFormClient";
import GuidedOnboardingPopover from "@/components/onboarding/GuidedOnboardingPopover";

export default function NewProductPage() {
  return (
    <div>
      <NewProductFormClient />
      {/* <GuidedOnboardingPopover stepIndex={1} /> */}
    </div>
  );
}
