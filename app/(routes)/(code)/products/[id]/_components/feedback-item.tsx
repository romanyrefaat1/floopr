"use client";

import CommentButton from "../feedback/[feedbackId]/_components/comment-button";
import LikeButton from "../feedback/[feedbackId]/_components/like-button";
import { Product } from "../page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

function parseFeedbackContent(feedback: any) {
  if (!feedback) return "";

  // Rich content format with blocks
  if (feedback.isRich && Array.isArray(feedback.content?.blocks)) {
    return feedback.content.blocks
      .map((block: any) => block.text || "")
      .filter(Boolean)
      .join("\n");
  }

  // modal-timeout format with inputs
  if (feedback.inputs && Array.isArray(feedback.inputs)) {
    return feedback.inputs
      .map((input: any) => `${input.label}: ${input.value}`)
      .join("\n");
  }

  // Plain text
  return typeof feedback.content === "string" ? feedback.content : " Unkown";
}

export default function FeedbackItem({
  productData,
  feedbackData,
  isSimple = true,
  feedbackId,
  isOwner = false,
}: {
  productData: Product;
  feedbackId: string;
  isSimple?: boolean;
  feedbackData: {
    title: string;
    content: any;
    isRic?: boolean;
    inputs?: any[];
    username?: string;
  };
  isOwner?: boolean;
}) {
  const productId = productData.docId;
  const parsedContent = parseFeedbackContent(feedbackData);

  return (
    <Card>
      <CardHeader>
        {!isSimple && (
          <>
            <Link
              className="hover:underline"
              href={`/products/${productId}/feedback/${feedbackId}`}
            >
              <CardTitle className="break-words max-w-full text-wrap">
                {feedbackData.title}
              </CardTitle>
            </Link>
            <CardDescription>
              {feedbackData.username || `Anonymous user`}
            </CardDescription>
          </>
        )}
        {isSimple && (
          <Link
            className="hover:underline"
            href={`/products/${productId}/feedback/${feedbackId}`}
          >
            <CardTitle className="break-words max-w-full text-wrap">
              {parsedContent}
            </CardTitle>
          </Link>
        )}
      </CardHeader>
      <CardDescription className="px-6 break-words text-wrap whitespace-pre-line">
        {parsedContent}
      </CardDescription>
      <CardFooter className="flex flex-wrap gap-2">
        <LikeButton
          feedbackId={feedbackId}
          productId={productId}
          variant={`outline`}
        />
        <CommentButton productId={productId} feedbackId={feedbackId} />
      </CardFooter>
    </Card>
  );
}
