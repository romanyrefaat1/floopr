"use client";

import SubscribeButton from "@/components/payment/subscribe-button";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Lock } from "lucide-react";
import Link from "next/link";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-white flex items=center justify-center">
      <div className="section-container py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Turn messy feedback into business plans
          </h1>
          <p className="text-lg text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="glass-card p-8 rounded-xl border border-gray-200">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-gray-600 mb-4">Perfect for getting started</p>
              <div className="text-4xl font-bold">$0</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-floopr-purple mt-1" />
                <span>Basic feedback collection</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-floopr-purple mt-1" />
                <span>Simple feedback organization</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-floopr-purple mt-1" />
                <span>Basic analytics</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-floopr-purple mt-1" />
                <span>Community support</span>
              </div>
            </div>

            <Link href="/home">
              <Button className="w-full" variant="outline">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Growth Plan */}
          <div className="glass-card relative select-none blur-[2px] hover:blur-[3px] transition p-8 rounded-xl border-2 border-floopr-purple relative">
            {/* Lock styling */}
            <div className="w-full h-4 bg-floopr-purple rounded" style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-6deg)',
  }}/>
         


<TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <Lock
  size={42}
  fill="#9E39FF"
  style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-6deg)',
    border: 'none',  // This ensures no border is applied
  }}
/>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>


            <div className="absolute -top-3 right-4 bg-floopr-purple text-white px-3 py-1 rounded-full text-sm">
              Recommended
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Growth</h3>
              <p className="text-gray-600 mb-4">For serious product teams</p>
              <div className="text-4xl font-bold">$9</div>
              <div className="text-sm text-gray-500">per month</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-floopr-purple mt-1" />
                <span>Everything in Basic</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-floopr-purple mt-1" />
                <span>AI-powered insights and analytics</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-floopr-purple mt-1" />
                <span>Priority support with 24/7 response</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-floopr-purple mt-1" />
                <span>Custom domain support</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-floopr-purple mt-1" />
                <span>Advanced AI tutor features</span>
              </div>
            </div>

            {/* <SubscribeButton
              label={`Get Started`}
              className={`w-full bg-floopr-purple hover:bg-floopr-purple-dark text-white`}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
