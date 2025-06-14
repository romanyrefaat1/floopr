"use client";

import getComponentData from "@/actions/component-data/get-component-data";
import LikeButton from "../../products/[id]/feedback/[feedbackId]/_components/like-button";
import FeedbackItemReferenceLink from "./feedback-item-reference-link";
import { FeedbackItemInDB } from "./feedback-list";
import FinalStatus from "./final-status";
import DeleteDropdown from "@/components/delete-dropdown";
import LoaderSpinner from "@/components/loader-spinner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import PlainTextViewer from "@/components/ui/plain-text-viewer";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/firebase";
import makeFirstLetterUppercase from "@/lib/make-first-letter-uppercase";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";
import { formatDistanceToNow } from "date-fns";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
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
  className,
}: {
  feedback: FeedbackItemInDB;
  productId: string;
  isOwner: boolean;
  className: string;
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
  const { title, content } = feedbackData || {};
  const [componentName, setComponentName] = useState(``);
  const [isComponentNameLoading, setIsComponentNameLoading] = useState(true);
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [isAllowsDelete, setIsAllowsDelete] = useState(isOwner);
  const [isAllowsEdit, setIsAllowsEdit] = useState(false);

  const [componentData, setComponentData] = useState({});


  // Find component name
  useEffect(() => {
    const fetcComponentName = async () => {
      setIsComponentNameLoading(true);
      if (isComponent) {
        const data = await getDoc(
          doc(db, `products/${productId}/components/${componentRefId}`)
        );
        if (data.exists()) {
          const componentData = data.data();
          if (componentData) {
            setComponentName(
              componentData.componentDisplayName ||
                componentData.title ||
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


  useEffect(() => {
    if (isSignedIn && isLoaded) {
      if (userId === feedback.userInfo?.userId) {
        setIsAllowsDelete(true);
      }
    }
  }, [isAllowsEdit, userId, isLoaded, isSignedIn]);

  useEffect(()=> {
    if(isComponent) {
      const fetchComponentData = async () => {
        const componentData = await getComponentData(productId, componentRefId);
        setComponentData(componentData)
      }
      fetchComponentData();
    }
  },[isComponent, componentName])

  const myData = {
    title: ``,
    content: `` || {},
    topic: ``,
    status: ``,
    userName: ``,
    profilePicture: ``,
    timeAgo: `Unkown date`,
    type: ``,
    header: ``,
  };

  // if (!isComponent) {
    myData.title = title || "No Title";
    myData.content = content;
  // }
  if (isComponent && componentName === "modal-time" && componentData) {    
    myData.title = feedbackData.inputs[0].value;
    myData.content = feedbackData.inputs[1]?.value || `No description`;
    myData.referenceLink = feedbackData.referenceLink;
    myData.header = componentData.componentData?.metaData?.name || "Unkown header";
    myData.questions = {
      q1: feedbackData.inputs[0].label || "Unkown question",
      q2: feedbackData.inputs[1]?.label || "Unkown question",
    };
  } else if (isComponent && componentName === "float-button" && componentData) {    
    // myData.title = "Feedback from Float Button";
    // myData.content = feedbackData.inputs[1]?.value || `No description`;
    myData.referenceLink = feedbackData.referenceLink;
    myData.header = componentData.componentData?.type || "Unkown header";
  }

  // Applies to isComponent and !isComponent
  myData.status = status || "Sent";
  myData.topic = topic?.topTopic || "No topic";
  myData.userName = userInfo?.username || "Anonymous User";
  myData.profilePicture = userInfo?.profilePicture || null;
  myData.timeAgo = "Unknown date";
  // if (createdAt) {
  //   // Firestore timestamp => convert to JS Date
  //   // const date = createdAt.toDate();
  //   myData.timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
  //   myData.timeAgo =
  //     myData.timeAgo.charAt(0).toUpperCase() + myData.timeAgo.slice(1);
  //   // e.g. "3 days ago"
  // }
  myData.type = feedback.type
    ? makeFirstLetterUppercase(feedback.type)
    : "Other";
  return (
    <Link href={`/${productId}/${feedback.id}`}>
      <div className={cn("", className)}>
        <div className="border relative pt-11 hover:bg-mutedBackground transition-all rounded-xl p-4 bg-secondaryBackground text-foreground">
          <div>
            <div className="flex items-center justify-between">
              {isComponent ? (
                isComponentNameLoading ? (
                  <Skeleton className="w-[40px] h-[10px] bg-mutedBackground mb-4" />
                ) : (
                  <>
                    <FeedbackItemReferenceLink
                      productId={productId}
                      feedbackId={feedback.id}
                    />
                    {isComponent && componentData.componentData?.metaData?.name.trim() !== "" &&<Badge className="mb-4" >
                     {componentData.componentData?.metaData?.name}
                    </Badge>}
                  </>
                )
              ) : (
                <></>
              )}
              {/* Delete Dropdown */}
              {isAllowsDelete && (
                <div
                  role={`button`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <DeleteDropdown
                    docRef={doc(
                      db,
                      `products/${productId}/feedbacks/${feedbackData.docId}`
                    )}
                    onDeleteSuccess={async () => {
                      // Update basic analytics
                      const productRef = doc(db, `products/${productId}`);
                      await updateDoc(productRef, {
                        feedbackCount: increment(-1),
                      });
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex">
              {/* Title & description */}
              <div className="mb-2 flex-1">
                {myData.header && <span className="text-xs text-gray-500">
                  {myData.header || "No header"}{componentName === "modal-time"&& ": "+myData.title}
                </span>}
                <h3 className="font-semibold text-lg mb-1">{myData.title}</h3>
                {/* <p className="text-sm text-secondaryForeground">{truncatedDescription}</p> */}
                {/* <RichTextViewer content={content} /> */}
                <PlainTextViewer content={myData.type === "modal-time" ? myData.questions.q2+": "+myData.content : myData.content} truncate={100} />
              </div>
              {/* Like Button */}
              <LikeButton feedbackId={feedback.id} productId={productId} />
            </div>
            {/* Bottom row with user info, status, topic, etc. */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-0">
              {/* User & time */}
              <div className=" self-start text-xs text-gray-500 flex gap-2 items-center space-x-2 mt-6 mb-4 md:mb-0">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={myData.profilePicture} />
                </Avatar>{" "}
                {myData.userName} &middot; {myData.timeAgo}
              </div>

              {/* Status & topic side by side */}
              <div className="  self-end flex items-center space-x-2">
                <FinalStatus
                  finalStatus={myData.status}
                  isOwner={isOwner}
                  productId={productId}
                  feedbackId={feedback.id}
                  feedbackTitle={myData.title}
                  feedbackUsername={myData.userName}
                />
                <div className="text-xs bg-background px-2 py-1 rounded">
                  {myData.type}
                </div>
                <div className="text-xs bg-primary px-2 py-1 rounded">
                  {myData.topic}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
