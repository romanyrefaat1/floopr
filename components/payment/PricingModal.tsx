"use client";

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
import { ContentOfPricingModal, usePricing } from "@/context/pricing-context";
import { cn } from "@/lib/utils";
import { useUser, RedirectToSignIn, RedirectToSignUp } from "@clerk/nextjs";
import { Check, HelpCircle, Sparkles, XCircle, X, Loader2 } from "lucide-react";
import { Work_Sans } from "next/font/google";
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
      "10 AI chatbot messages/mo",
      "Limited sentiment & topic tagging",
      "2 product",
      "Unlimited changelog items",
      "Floopr badge on all embeds",
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
      "All features in Free plan",
      "Up to 500 feedback submissions/mo",
      "2 widget instances",
      "100 AI chatbot messages/mo",
      "Unlimited sentiment & topic tagging",
      "4 products",
      "Automatic release notes in changelog (In progress)",
      "Full branding control over widgets",
      "Email support (In progress)",
      "CSV export",
      "Priority feature access",
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
      "All features in Free plan",
      "Up to 500 feedback submissions/mo",
      "2 widget instances",
      "100 AI chatbot messages/mo",
      "Unlimited sentiment & topic tagging",
      "4 products",
      "Automatic release notes in changelog (In progress)",
      "Full branding control over widgets",
      "Email support (In progress)",
      "CSV export",
      "Priority feature access",
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

const font = Work_Sans({ subsets: ["latin"] });

export default function PricingModal({error=null, content=null}: {error: string|null, content: ContentOfPricingModal|null}) {
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
      RedirectToSignUp({
        redirectUrl: `/home`,
      });
    }
    router.push("/home");
  };

  // Builder plan handler
  const handleBuilder = async () => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      RedirectToSignUp({
        redirectUrl: `/?isPaymentModalOpen=true`,
      });
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
          plan: selectedPlan, // pass plan type from state
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
      <div className="relative w-full h-full">
 
</div>

      <DialogContent className="max-w-4xl overflow-hidden w-full p-0 bg-popover/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-floopr-purple">
      
        <ScrollArea className="md:h-[90vh] relative md:w-0vw] h-[80vh] w-full">

        <div 
    className="absolute top-0 left-0 opacity-50 w-full h-full bg-gradient-to-br from-white dark:from-black/10 via-purple-200 dark:via-purple-600/30 to-transparent z-[-1]" 
  />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-8 pt-8 pb-2">
            <div className="relative">

              <p className="text-destructive-foreground text-sm mb-4 bg-destructive p-2 rounded">
                {error}
                </p>

              <DialogTitle className={`text-5xl {font.className} md:text-7xl font-bold text-foreground leading-tight tracking-tight mb-2`}
              style={{lineHeight: `1em`}}
              >
                We remove the noise. <br className="hidden md:block" /> You focus on what matters.
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground">
                Choose the plan that best fits your needs
              </DialogDescription>
            </div>
            {/* <div className="flex items-center gap-2 mt-4 md:mt-0">
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
            </div> */}
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-8 py-12">
            {/* Free Plan */}
            <div className="glass-card p-8 rounded-3xl border border flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-muted-foreground mb-4">
                  Perfect for getting started
                </p>
                <div className="text-4xl font-bold">$0</div>
              </div>
              <ul className="space-y-3">
                {plans[0].features.map((feature, fIndex) => {
                  const isInProgress = feature.includes("(In progress)");
                  const isBuilderPlan = plans[0].key.startsWith("builder");
                  const isFreePlan = plans[0].key === "free";

                  let icon = <Check className="h-5 w-5 text-primary shrink-0" />;
                  let textStyle = "text-sm text-muted-foreground";

                  if (isInProgress) {
                    icon = (
                      <Loader2 className="h-5 w-5 text-warn-foreground animate-spin shrink-0" />
                    );
                    textStyle = "text-sm text-warn-foreground italic";
                  } else if (isBuilderPlan) { // This branch is effectively unused for the Free plan
                    icon = <Check className="h-5 w-5 text-accent-foreground shrink-0" />;
                  } else if (isFreePlan) {
                    const freePlanRedXFeatures = [
                      "10 AI chatbot messages/mo",
                      "Community support",
                      "Limited sentiment & topic tagging",
                      "2 product",
                    ];
                    if (freePlanRedXFeatures.includes(feature)) {
                      icon = <X className="h-5 w-5 text-destructive shrink-0" />;
                    }
                    // Other free plan features keep the default primary check icon
                  }

                  return (
                    <li key={fIndex} className="flex items-start gap-3">
                      {icon}
                      <span className={textStyle}>{feature}</span>
                    </li>
                  );
                })}
              </ul>
              <Button className="w-full mt-6" variant="secondary" onClick={handleFree}>
                {content?.plans.free.button ?? "Get Started"}
              </Button>
            </div>
            {/* Builder Plan */}
            <div className="glass-card relative select-none p-8 rounded-3xl border-2 border-floopr-purple flex flex-col">
            <div className="absolute inset-0 z-[-1] top-0 left-0 w-full rounded-3xl h-full bg-foreground opacity-10" />

<div className="relative z-10">
              <div className="absolute -top-3 right-4 bg-floopr-purple text-white px-3 py-1 rounded-full text-sm">
                Recommended
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Builder</h3>
                <p className="text-muted-foreground mb-4">
                  For indie devs & small teams
                </p>
                <div className="flex items-center gap-2">
                  <div className="text-4xl font-bold leading-tight tracking-tighter">
                    {builderPlan?.priceLabel}
                  </div>
                  {selectedPlan === "annual" && (
                    <span className="ml-2 bg-destructive text-destructive-foreground py-0.5 text-xs px-1 font-semibold rounded-full">
                      17% off
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedPlan === "annual" ? "/year" : "/month"}
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {builderPlan?.features.map((feature, fIndex) => {
                  const isInProgress = feature.includes("(In progress)");
                  let icon = <Check className="h-5 w-5 text-accent-foreground shrink-0" />;
                  let textStyle = "text-sm text-muted-foreground";

                  if (isInProgress) {
                    icon = <Loader2 className="h-5 w-5 text-warn-foreground animate-spin shrink-0" />;
                    textStyle = "text-sm text-warn-foreground italic";
                  }

                  return (
                    <li key={fIndex} className="flex items-start gap-3">
                      {icon}
                      <span className={textStyle}>{feature}</span>
                    </li>
                  );
                })}
              </div>
              <Button
                className="w-full bg-floopr-purple hover:bg-floopr-purple-dark text-white select-pointer cursor-pointer"
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
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}