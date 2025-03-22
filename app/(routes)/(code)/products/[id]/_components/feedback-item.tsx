"use client";

import CommentButton from "../feedback/[feedbackId]/_components/comment-button";
import LikeButton from "../feedback/[feedbackId]/_components/like-button";
import { Product } from "../page";
import {
  AdvancedFeedbackItemDataProps,
  SimpleFeedbackItemDataProps,
} from "@/actions/add-feedback";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DotSquareIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";

type FeedbackDataProps = {
  id: string;
  title: string;
  content: string;
  type: string;
  sentiment: string;
  username: string;
  profilePicture?: string;
  createdAt: string | null;
  updatedAt: string | null;
  status?: string;
  socialData?: {
    comments: {
      count: number;
      data: any[];
    };
    likes: {
      count: number;
      data: any[];
    };
  };
};

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
  feedbackData: FeedbackDataProps;
  isOwner?: boolean;
}) {
  const productId = productData.docId;

  return (
    <Card>
      <CardHeader>
        {!isSimple && (
          <>
            <Link
              className="hover:underline"
              href={`/products/${productId}/feedback/${feedbackId}`}
            >
              <CardTitle className="truncate max-w-[1030ch]">
                {feedbackData.title}
              </CardTitle>
            </Link>
            <CardDescription>{feedbackData.username}</CardDescription>
          </>
        )}
        {isSimple && (
          <Link
            className="hover:underline"
            href={`/products/${productId}/feedback/${feedbackId}`}
          >
            <CardTitle className="truncate max-w-[20ch]">
              {feedbackData.content}
            </CardTitle>
          </Link>
        )}
      </CardHeader>
      <CardDescription className="px-6 truncate max-w-[100ch]">
        {feedbackData.content}
      </CardDescription>
      <CardFooter>
        <Button variant="outline">
          <LikeButton feedbackId={feedbackId} productId={productId} />
        </Button>
        <CommentButton productId={productId} feedbackId={feedbackId} />
        {/* {isOwner && <AdminDropdownOnFeedback />} */}
      </CardFooter>
    </Card>
  );
}
