"use client";

import CommentItem from "./comment-item";
import LoaderSpinner from "@/components/loader-spinner";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

type CommentsListProps = {
  productId: string;
  feedbackId: string;
};

export default function CommentsList({
  productId,
  feedbackId,
}: CommentsListProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const feedbackDocRef = doc(
          db,
          "products",
          productId,
          "feedbacks",
          feedbackId
        );
        const querySnap = await getDoc(feedbackDocRef);
        const feedbackData = querySnap.data();
        setComments(feedbackData?.socialData?.comments?.data || []);
      } catch (err) {
        setError("Failed to fetch comments");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [productId, feedbackId]);

  if (isLoading) return <LoaderSpinner className="mt-[30px]" />;
  if (error) return <div className="text-red-500">{error}</div>;

  if (comments.length === 0) {
    return (
      <div className="flex mt-[30px] items-center justify-center text-secondaryForeground">
        No comments available
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-[12px]">
      {comments.map((comment) => (
        <CommentItem key={comment.id} allData={comment} />
      ))}
    </div>
  );
}
