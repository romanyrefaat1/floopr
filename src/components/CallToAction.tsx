"use client";

import JoinBetaForm from "./JoinBetaForm";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const CallToAction = () => {
  const { isSignedIn } = useUser();
  return (
    <section
      id="cta"
      className="section-container py-20 relative overflow-hidden"
    >
      <div className="text-center max-w-3xl mx-auto mb-8 animate-on-scroll">
        <span className="inline-block bg-floopr-purple/10 text-floopr-purple px-4 py-2 rounded-full text-sm font-medium mb-4">
          Get Started Today
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Transform Your Product Feedback Into Success
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of product teams making better decisions with
          data-driven insights
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/home">
            <Button
              variant="outline"
              className="px-8 py-6 text-lg rounded-lg w-full sm:w-auto"
            >
              Start Free
            </Button>
          </Link>
          <Link href="/pricing">
            <Button className="bg-floopr-purple hover:bg-floopr-purple-dark text-white px-8 py-6 text-lg rounded-lg w-full sm:w-auto">
              View Pricing
            </Button>
          </Link>

          {/* {isSignedIn ? (
            <>
              
            </>
          ) : (
            <JoinBetaForm />
          )} */}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto animate-on-scroll">
        <div className="glass-card p-6">
          <h3 className="font-bold mb-2">Free Plan Available</h3>
          <p className="text-sm text-gray-600">Start using Floopr at no cost</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-bold mb-2">AI-Powered</h3>
          <p className="text-sm text-gray-600">
            Get intelligent insights instantly
          </p>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-bold mb-2">Easy Integration</h3>
          <p className="text-sm text-gray-600">
            Works with your existing tools
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
