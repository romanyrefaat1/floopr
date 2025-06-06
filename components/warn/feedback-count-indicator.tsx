"use client";

import CircularProgress from "../circular-bar";
import { usePricing } from "@/context/pricing-context";

export default function FeedbackCountIndicator() {
  const { userSubscription } = usePricing();
  const { tier, feedback_count_monthly } = userSubscription;
  // const feedback_count_monthly = 90

  const FEEDBACK_LIMIT_FREE = 50;
  const FEEDBACK_LIMIT_PAID = 350;

  const limit = tier === "free" ? FEEDBACK_LIMIT_FREE : FEEDBACK_LIMIT_PAID;
  const remaining = limit - feedback_count_monthly;
  const percentage = (feedback_count_monthly / limit) * 100;

  return (
    <CircularProgress
      value={percentage}
      feedback_count_monthly={feedback_count_monthly}
      limit={limit}
      size={`xs`}
    />
  );
}
