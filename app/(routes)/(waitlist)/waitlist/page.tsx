"use client";

import Head from "next/head";
import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        // Set error from API response if available
        setError(data.error || "Something went wrong");
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <Head>
        <title>Coming Soon | Join Our Waitlist</title>
        <meta
          name="description"
          content="Join our waitlist pto be the first to know when we launch."
        />
      </Head>

      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Join Ideaboard&apos;s Waitlist.
          </h1>
          <p className="text-gray-600">
            We&apos;re working hard to help you make your side project earn money. Join our
            waitlist to be the first to know when we launch, and earn 2 weeks free trial.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-[12px]">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-[#122] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[black]-500 ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Join Waitlist"}
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-gray-900">
              Thank you!
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You&apos;ve been added to our waitlist. We&apos;ll notify you when we
              launch!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
