import { ScrollArea } from "../ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { usePricing } from "@/context/pricing-context";
import { cn } from "@/lib/utils";
import { useUser, RedirectToSignIn, RedirectToSignUp } from "@clerk/nextjs";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const plans = [
  {
    key: "free",
    name: "Free",
    price: 0,
    priceLabel: "$0",
    description: "Perfect for getting started",
    features: [
      "Up to 50 feedback submissions/mo",
      "1 widget (floating button only)",
      "Floopr badge on all embeds",
      "Basic AI summaries",
      "Community support",
    ],
    cta: "Get Started",
    highlight: false,
    trial: false,
  },
  {
    key: "builder_monthly",
    name: "Builder",
    price: 15,
    priceLabel: "$15",
    description: "For indie devs & small teams",
    features: [
      "Up to 500 feedback submissions/mo",
      "Full branding control",
      "2 widget instances",
      "Basic AI chatbot (100 msg/mo)",
      "Sentiment & topic tagging",
      "CSV export",
      "Priority roadmap access",
    ],
    cta: "Start 7-day free trial",
    highlight: true,
    trial: true,
    annual: false,
  },
  {
    key: "builder_annual",
    name: "Builder Annual",
    price: 150,
    priceLabel: "$150",
    description: "Save 17% with annual billing",
    features: [
      "Up to 500 feedback submissions/mo",
      "Full branding control",
      "2 widget instances",
      "Basic AI chatbot (100 msg/mo)",
      "Sentiment & topic tagging",
      "CSV export",
      "Priority roadmap access",
    ],
    cta: "Get Started",
    highlight: true,
    trial: false,
    annual: true,
  },
];

const featureList = [
  "Feedback submissions/mo",
  "Widget instances",
  "Branding control",
  "Floopr badge",
  "AI summaries",
  "AI chatbot (msg/mo)",
  "Sentiment & topic tagging",
  "CSV export",
  "Priority roadmap access",
  "Support",
];

const planFeatures = {
  free: [
    "50",
    "1 (floating only)",
    "No",
    "Yes",
    "Basic",
    "-",
    "No",
    "No",
    "No",
    "Community",
  ],
  builder: [
    "500",
    "2",
    "Yes",
    "No",
    "Advanced",
    "100",
    "Yes",
    "Yes",
    "Yes",
    "Email (48h)",
  ],
};

export default function PricingModal() {
  const { isModalOpen, closeModal, selectedPlan, setSelectedPlan } =
    usePricing();
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Pick the correct Builder plan based on toggle
  const builderPlan =
    selectedPlan === "annual"
      ? plans.find((p) => p.key === "builder_annual")
      : plans.find((p) => p.key === "builder_monthly");

  // Switch logic: checked = annual, unchecked = monthly
  const handleSwitch = (checked: boolean) => {
    setSelectedPlan(checked ? "annual" : "monthly");
  };

  // Free plan handler
  const handleFree = () => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      // Redirect to sign-in, then to /home
      return router.push("/sign-in?redirectUrl=/home");
    }
    router.push("/home");
  };

  // Builder plan handler
  const handleBuilder = async () => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      // Redirect to sign-up, then after sign-up, start subscription
      return router.push("/sign-up?redirectUrl=/subscription");
    }
    // Start subscription flow
    setLoading(true);
    try {
      const email = user.emailAddresses[0].emailAddress;
      const userId = user.id;
      const userName = user.fullName;
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          email,
          userName,
          plan: selectedPlan, // pass plan type
        }),
      });
      const { checkoutUrl } = await response.json();
      if (checkoutUrl) {
        router.push(checkoutUrl);
      } else {
        alert("Subscription failed to initialize");
      }
    } catch (error) {
      console.error(error);
      alert("Subscription failed to initialize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl w-full p-0 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-floopr-purple">
        <ScrollArea className="md:h-[90vh] md:w-0vw] h-[80vh] w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-8 pt-8 pb-2">
            <div>
              <DialogTitle className="text-4xl md:text-5xl font-bold text-floopr- mb-2">
                Turn messy feedback into business plans
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-600">
                Choose the plan that best fits your needs
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Switch
                id="annual-switch"
                checked={selectedPlan === "annual"}
                onCheckedChange={handleSwitch}
                className="data-[state=checked]:bg-floopr-purple"
              />
              <Label
                htmlFor="annual-switch"
                className={cn(
                  "text-floopr- opacity-80 transition font-semibold cursor-pointer",
                  selectedPlan === "annual" &&
                    "text-floopr-purple-dark opacity-100"
                )}
              >
                Annually
              </Label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-8 py-12">
            {/* Free Plan */}
            <div className="glass-card p-8 rounded-xl border border-gray-200 flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-gray-600 mb-4">
                  Perfect for getting started
                </p>
                <div className="text-4xl font-bold">$0</div>
              </div>
              <div className="space-y-4 mb-8">
                {plans[0].features.map((feature, i) => (
                  <div className="flex items-start gap-3" key={i}>
                    <Check className="h-5 w-5 text-floopr-purple mt-1" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full" variant="outline" onClick={handleFree}>
                Get Started
              </Button>
            </div>
            {/* Builder Plan */}
            <div className="glass-card relative select-none p-8 rounded-xl border-2 border-floopr-purple flex flex-col">
              <div className="absolute -top-3 right-4 bg-floopr-purple text-white px-3 py-1 rounded-full text-sm">
                Recommended
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Builder</h3>
                <p className="text-gray-600 mb-4">
                  For indie devs & small teams
                </p>
                <div className="flex items-center gap-2">
                  <div className="text-4xl font-bold">
                    {builderPlan?.priceLabel}
                  </div>
                  {selectedPlan === "annual" && (
                    <span className="ml-2 bg-muted-destructive text-white py-0.5 text-xs px-1 font-semibold rounded-full">
                      17% off
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {selectedPlan === "annual" ? "/year" : "/month"}
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {builderPlan?.features.map((feature, i) => (
                  <div className="flex items-start gap-3" key={i}>
                    <Check className="h-5 w-5 text-floopr-purple mt-1" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full bg-floopr-purple hover:bg-floopr-purple-dark text-white"
                onClick={handleBuilder}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : selectedPlan === "monthly"
                  ? "Start 7-day free trial"
                  : "Get Started"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
