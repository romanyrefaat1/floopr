"use client";

import FeedbackItem from "../../../[productId]/_components/feedback-item";
import { FeedbackItemInDB } from "../../../[productId]/_components/feedback-list";
import { FilterData, Product } from "../page";
import getFilteredFeedbacks from "@/actions/filter-feedback";
import FeedbackItemSkeleton from "@/components/skeletons/feedback-item-skeleton";
import { useChatbotContext } from "@/contexts/use-chatbot-context";
import serializeFirestoreData from "@/lib/serialize-firestore-data";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

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
  const [feedbacks, setFeedbacks] = useState<FeedbackItemInDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isDrajable, startDraj, dropDraj, isDrain, drajedContext } =
    useChatbotContext();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchFeedbacks = async () => {
      try {
        const data = await getFilteredFeedbacks(productId, filterData, true);
        console.log(`filtered feedback data from feedback-content-items`, data);
        const list = Array.isArray(data) ? data : [];
        const serialized: FeedbackItemInDB[] = list.map(
          (f) => serializeFirestoreData(f) as FeedbackItemInDB
        );
        setFeedbacks(serialized);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [productId, JSON.stringify(filterData)]);

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

  if (feedbacks.length === 0) {
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
