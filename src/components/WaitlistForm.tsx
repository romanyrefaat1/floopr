"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@")) {
      toast("Please enter a valid email");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Thanks for joining our waitlist!");
        setEmail("");
      } else {
        const error = await response.text();
        console.log(`error:`, error);
        toast.error(error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to join waitlist");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-floopr-purple/50"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="px-6 py-2 bg-floopr-purple text-white rounded-lg hover:bg-floopr-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-floopr-purple disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  );
}
