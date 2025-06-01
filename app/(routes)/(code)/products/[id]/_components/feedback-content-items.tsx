"use client";

import FeedbackItem from "../../../[productId]/_components/feedback-item";
import { FeedbackItemInDB } from "../../../[productId]/_components/feedback-list";
import { FilterData, Product } from "../page";
import FeedbackItemSkeleton from "@/components/skeletons/feedback-item-skeleton";
import { useAllFeedback } from "@/contexts/all-feedback-context";
import { useChatbotContext } from "@/contexts/use-chatbot-context";
import { cn } from "@/lib/utils";
import React from "react";

interface FeedbackContentItemsProps {
  productData: Product;
  productId: string;
  filterData?: FilterData;
  isOwner?: boolean;
}

export default function FeedbackContentItems({
  productData,
  productId,
  isOwner = false,
  filterData = {},
}: FeedbackContentItemsProps) {
  const { feedbacks, loading, error } = useAllFeedback();
  const { isDrajable, startDraj, dropDraj, isDrain, drajedContext } =
    useChatbotContext();

  if (loading) {
    // Show 5 skeleton items
    return (
      <div className="space-y-4 py-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <FeedbackItemSkeleton key={idx} className="" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  }

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div
        className="text-center py-8"
        style={{ color: productData.style?.textColor }}
      >
        <p className="text-secondaryForeground">
          No feedback found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <div
          className={cn(
            "mb-4",
            drajedContext.some(
              (item) => item.feedbackId === feedback.feedbackId
            ) &&
              `bg-primary-muted-foreground dark:bg-floopr-purple-dark/20 rounded-xl`
          )}
          onDrag={() => startDraj(feedback)}
          onDragEnd={dropDraj}
          key={feedback.id}
        >
          <FeedbackItem
            className={cn(
              isDrajable && `cursor-grab`,
              isDrain && `cursor-grabbing`
            )}
            isOwner={isOwner}
            feedback={feedback}
            productId={productId}
            feedbackId={feedback.id}
          />
        </div>
      ))}
    </div>
  );
}
