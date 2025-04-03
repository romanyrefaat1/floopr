"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import RichTextViewer from "../ui/rich-text-viewer";
import CommentsSection from "./comments-section";
import LikeButton from "@/app/(routes)/(code)/products/[id]/feedback/[feedbackId]/_components/like-button";
import formatFirebaseTimestamp from "@/lib/formate-firebase-timestamp";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function FeedbackItem({ feedbackData, productId }) {
  const idea = {
    id: feedbackData.feedbackId,
    username: feedbackData?.userInfo?.username ?? `Anonymous`,
    title: feedbackData?.feedback?.title,
    isRich: feedbackData?.feedback?.isRich,
    date: formatFirebaseTimestamp(feedbackData.createdAt),
    text: feedbackData?.feedback?.content,
    likes: feedbackData?.socialData?.likes?.count,
    userProfilePic: feedbackData?.userInfo?.profilePicture ?? undefined,
  };
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-background p-4 rounded-md space-y-3 border border-border">
      {/* Idea Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 mb-[12px]">
          <Avatar>
            <AvatarImage
              src={idea.userProfilePic || undefined}
              alt={`${idea.username}'s profile`}
            />
            <AvatarFallback>{idea.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground text-sm">
              {idea.username}
            </p>
            <p className="text-mutedForeground text-sm">{idea.date}</p>
          </div>
        </div>
        <LikeButton productId={productId} feedbackId={idea.id} />
      </div>

      {/* Idea Content */}
      <div>
        <h2 className="font-semibold text-2xl text-foreground mb-2 max-w-full">
          {idea.title}
        </h2>
        <p
          className="text-foreground wrap flex-wrap"
          style={{ wordBreak: `break-word` }}
        >
          {!idea.isRich &&
            (isExpanded ? idea.text : `${idea.text.slice(0, 200)}...`)}
          {idea.isRich && (
            <RichTextViewer
              className="text-secondaryForeground"
              content={idea.text}
            />
          )}
        </p>
        {idea.text.length > 200 && (
          <Button
            variant="link"
            className="p-0 mt-2 text-primary"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Show More"}
          </Button>
        )}
      </div>

      {/* Comments Section */}
      <CommentsSection
        feedbackId={feedbackData.feedbackId}
        productId={productId}
      />
    </div>
  );
}
