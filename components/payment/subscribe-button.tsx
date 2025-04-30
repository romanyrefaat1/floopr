"use client";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { RedirectToSignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SubscribeButton({
  className = ``,
  label = `Subscribe Now`,
}: {
  className?: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();

  const handleSubscribe = async () => {
    if (!user || !isLoaded || !isSignedIn) {
      return RedirectToSignUp({ redirectUrl: `subscription` });
    }

    const email = user.emailAddresses[0].emailAddress;
    const userId = user.id;

    setLoading(true);
    try {
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, email, userName: user.fullName }),
      });

      const { checkoutUrl } = await response.json();
      router.push(checkoutUrl);
    } catch (error) {
      console.error(error);
      alert("Subscription failed to initialize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleSubscribe}
        disabled={loading}
        className={cn(
          className?.length > 0
            ? className
            : "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        )}
      >
        {loading ? "Processing..." : label}
      </Button>
    </>
  );
}
