"use client";

import FeedbackItem from "../../../[productId]/_components/feedback-item";
import { FilterData, Product } from "../page";
import { FeedbackItemInDB } from "@/actions/add-feedback";
import getFilteredFeedbacks from "@/actions/filter-feedback";
import { Timestamp } from "firebase/firestore";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

type FeedbackData = {
  id: string;
  feedback: {
    title: string;
    content: string;
  };
  type: string;
  sentiment: string;
  username: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  socialData: {
    comments: { count: number; data: any[] };
    likes: { count: number; data: any[] };
  };
};

export default function FeedbackContentItems({
  productData,
  productId,
  isOwner = false,
  filterData,
}: {
  productData: Product;
  productId: string;
  filterData?: FilterData;
  isOwner: boolean;
}) {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const data = await getFilteredFeedbacks(productId, filterData || {});

        // Handle the response data
        const feedbackArray = Array.isArray(data) ? data : [];
        setFeedbacks(feedbackArray);
      } catch (err) {
        setError("Failed to load feedback. Please try again later.");
        console.error("Error fetching feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [productId, filterData]);

  if (loading) {
    return (
      <div
        className="text-center py-8"
        style={{ color: productData.style?.textColor }}
      >
        Loading feedbacks...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="text-red-500 p-4 text-center"
        // style={{ color: productData.style?.accentColor }}
      >
        {error}
      </div>
    );
  }

  if (!feedbacks || !feedbacks.length) {
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

  console.log(`feedbacks`, feedbacks);

  // Prepare the feedback data with proper date serialization
  const serializedFeedbacks = feedbacks.map((feedback) => {
    // Convert the timestamp object back to a Date
    const createdAtDate = feedback.createdAt
      ? new Date(feedback.createdAt.seconds * 1000)
      : new Date();

    const updatedAtDate = feedback.updatedAt
      ? new Date(feedback.updatedAt.seconds * 1000)
      : createdAtDate;

    return {
      id: feedback.id,
      feedback: {
        title: feedback.feedback?.title || "Untitled Feedback",
        content: feedback.feedback?.content || "",
      },
      type: feedback.type || "other",
      sentiment: feedback.sentiment?.sentiment || "neutral",
      username: feedback.userInfo?.username || "Anonymous",
      profilePicture: feedback.userInfo?.profilePicture,
      createdAt: createdAtDate,
      updatedAt: updatedAtDate,
      status: feedback.status,
      socialData: feedback.socialData || {
        comments: { count: 0, data: [] },
        likes: { count: 0, data: [] },
      },
    };
  });

  return (
    <div
      className="space-y-4"
      // style={{
      //   backgroundColor: productData.style?.backgroundColor,
      //   color: productData.style?.textColor,
      // }}
    >
      {serializedFeedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          isOwner={isOwner}
          feedback={feedback}
          productData={productData}
          productId={productId}
          feedbackId={feedback.id}
        />
      ))}
    </div>
  );
}
