"use client";

import LikeButton from "../../products/[id]/feedback/[feedbackId]/_components/like-button";
import { FeedbackItemInDB } from "./feedback-list";
import FinalStatus from "./final-status";
import LoaderSpinner from "@/components/loader-spinner";
import { Badge } from "@/components/ui/badge";
import PlainTextViewer from "@/components/ui/plain-text-viewer";
import { db } from "@/lib/firebase";
import makeFirstLetterUppercase from "@/lib/make-first-letter-uppercase";
import { formatDistanceToNow } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

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
export default function FeedbackItem({
  feedback,
  productId,
  isOwner,
}: {
  feedback: FeedbackItemInDB;
  productId: string;
  isOwner: boolean;
}) {
  const {
    feedback: feedbackData,
    status,
    topic,
    userInfo,
    createdAt,
    isComponent,
    componentRefId,
  } = feedback;
  const { title, content, inputs } = feedbackData || {};
  const [componentName, setComponentName] = useState(``);
  const [isComponentNameLoading, setIsComponentNameLoading] = useState(true);

  console.log(`feedback-item feedback`, feedback);

  const myData = {
    title: ``,
    content: `` || {},
    topic: ``,
    status: ``,
    userName: ``,
    timeAgo: `Unkown date`,
    type: ``,
  };

  if (!isComponent) {
    myData.title = title || "No Title";
    myData.content = content;
  }
  if (isComponent) {
    console.log(`is component true feedbackData:`, feedbackData);
    myData.title = feedbackData.inputs[0].value;
    myData.content = feedbackData.inputs[1]?.value || `No description`;
  }

  // Applies to isComponent and !isComponent
  myData.status = status || "Sent";
  myData.topic = topic?.topTopic || "No topic";
  myData.userName = userInfo?.username || "Anonymous User";
  myData.timeAgo = "Unknown date";
  if (createdAt) {
    // Firestore timestamp => convert to JS Date
    // const date = createdAt.toDate();
    myData.timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
    myData.timeAgo =
      myData.timeAgo.charAt(0).toUpperCase() + myData.timeAgo.slice(1);
    // e.g. "3 days ago"
  }
  myData.type = feedback.type
    ? makeFirstLetterUppercase(feedback.type)
    : "Other";

  // Find component name
  useEffect(() => {
    const fetcComponentName = async () => {
      setIsComponentNameLoading(true);
      if (isComponent) {
        const data = await getDoc(
          doc(db, "products", productId, "components", componentRefId)
        );
        if (data.exists()) {
          const componentData = data.data();
          if (componentData) {
            setComponentName(
              componentData.componentDisplayName ||
                componentData.componentType ||
                `Name not found`
            );
          }
        }
      }
      setIsComponentNameLoading(false);
    };
    fetcComponentName();
  }, [isComponent, componentRefId, productId]);

  return (
    <div className="border rounded-lg p-4 bg-secondaryBackground text-foreground">
      <div>
        {isComponent ? (
          isComponentNameLoading ? (
            <LoaderSpinner className="w-fit" size="sm" />
          ) : (
            <Badge>{isComponent && componentName}</Badge>
          )
        ) : (
          <></>
        )}
        <div className="flex">
          <Link href={`/${productId}/${feedback.id}`} className="mb-2 flex-1">
            {/* Title & description */}
            <div className="mb-2 flex-1">
              <h3 className="font-semibold text-lg mb-1">{myData.title}</h3>
              {/* <p className="text-sm text-secondaryForeground">{truncatedDescription}</p> */}
              {/* <RichTextViewer content={content} /> */}
              <PlainTextViewer content={myData.content} truncate={100} />
            </div>
          </Link>
          {/* Like Button */}
          <LikeButton feedbackId={feedback.id} productId={productId} />
        </div>
        {/* Bottom row with user info, status, topic, etc. */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          {/* User & time */}
          <div className="text-xs text-gray-500">
            {myData.userName} &middot; {myData.timeAgo}
          </div>

          {/* Status & topic side by side */}
          <div className="flex items-center space-x-2">
            <FinalStatus
              finalStatus={myData.status}
              isOwner={isOwner}
              productId={productId}
              feedbackId={feedback.id}
            />
            <div className="text-xs bg-input px-2 py-1 rounded">
              {myData.type}
            </div>
            <div className="text-xs bg-primary px-2 py-1 rounded">
              {myData.topic}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
