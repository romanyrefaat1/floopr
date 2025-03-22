"use client";

import { Button } from "@/components/ui/button";
import { useIsUserLiked } from "@/hooks/feedback/feedback";
import { addLikeToFeedbackItem, isUserLiked } from "@/lib/feedback-item/like-to-feedback-item";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpNarrowWide } from "lucide-react";
import Link from "next/link";
import { FeedbackItemInDB } from "./feedback-list";
import FinalStatus from "./final-status";
import RichTextViewer from "@/components/ui/rich-text-viewer";

/**
 * FeedbackItem props
 * feedback object structure (example):
 * {
 *   id: string;
 *   feedback: {
 *     title: string;
 *     content?: string;
 *   };
 *   status?: string; // e.g. "active" or "in review"
 *   topic?: {
 *     topTopic?: string; // e.g. "Technology"
 *   };
 *   userInfo?: {
 *     username?: string; // e.g. "Romany Refaat"
 *   };
 *   createdAt?: any; // Firestore timestamp
 *   ...other fields...
 * }
 */
export default function FeedbackItem({ feedback, productId, isOwner }: { feedback: FeedbackItemInDB, productId: string, isOwner: boolean }) {
  const { feedback: feedbackData, status, topic, userInfo, createdAt } = feedback;
  const { title, content } = feedbackData || {};
  console.log(`productId from feedback-item:`, productId);
  const isUser = !!feedback.userInfo?.userId;
  const isLiked = useIsUserLiked(productId, feedback.feedbackId, feedback.userInfo?.userId )

  // 1. Title
  const finalTitle = title || "No Title";

  // 2. Truncate description or show "No description"
  function getTruncatedDescription(text: string | undefined, maxLength = 50) {
    if (!text) return "No description";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }
  const truncatedDescription = getTruncatedDescription(content);

  // 3. Status (default to "Sent")
  const finalStatus = status || "Sent";

  // 4. Topic (the user wants the topTopic as .topic[0] fallback)
  const finalTopic = topic?.topTopic || "No topic";

  // 5. User info (fallback to "Anonymous User")
  const finalUsername = userInfo?.username || "Anonymous User";

  // 6. Time ago (if createdAt exists)
  let timeAgo = "Unknown date";
  if (createdAt) {
    // Firestore timestamp => convert to JS Date
    // const date = createdAt.toDate();
    timeAgo = formatDistanceToNow(createdAt, { addSuffix: true }); 
    timeAgo = timeAgo.charAt(0).toUpperCase() + timeAgo.slice(1);
    // e.g. "3 days ago"
    console.log(`timeAgo:`, timeAgo);
  }

  return (
    <div className="border rounded-lg p-4 bg-secondaryBackground text-foreground">
      <div>
      <div className="flex">
        <Link href={`/${productId}/${feedback.id}`} className="mb-2 flex-1">
      {/* Title & description */}
      <div className="mb-2 flex-1">
        <h3 className="font-semibold text-lg mb-1">{finalTitle}</h3>
        {/* <p className="text-sm text-secondaryForeground">{truncatedDescription}</p> */}
        <RichTextViewer content={truncatedDescription} />
      </div>
      </Link>
      {/* Like Button */}
      <Button variant="ghost" onClick={()=> addLikeToFeedbackItem(feedback.id, {productId: productId})} className="flex border-r-[4px] flex-col items-center justify-center">
        <ArrowUpNarrowWide />
        {isUserLiked(feedback.id, productId) ? `liked`: `4[/fetced]`}
      </Button>
      </div>
      {/* Bottom row with user info, status, topic, etc. */}
      <div className="flex items-center justify-between">
        {/* User & time */}
        <div className="text-xs text-gray-500">
          {finalUsername} &middot; {timeAgo}
        </div>

        {/* Status & topic side by side */}
        <div className="flex items-center space-x-2">
          <FinalStatus finalStatus={finalStatus} isOwner={isOwner} productId={productId} feedbackId={feedback.id}/>
          <div className="text-xs bg-secondaryForeground px-2 py-1 rounded">
            {finalTopic}
          </div>
        </div>
      </div>
     
      </div>
    </div>
  );
}
