"use client";

import { RedirectToSignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    return RedirectToSignUp({ redirectUrl: `subscription` });
  }

  const email = user.emailAddresses[0].emailAddress;
  const userId = user.id; // Assuming you have the user ID from Clerk

  const handleSubscribe = async () => {
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
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Subscribe for $9/month"}
      </button>
    </>
  );
}
