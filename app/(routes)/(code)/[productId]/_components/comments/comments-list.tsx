"use client";

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

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return <div className="space-y-4">{JSON.stringify(comments, null, 2)}</div>;
}
