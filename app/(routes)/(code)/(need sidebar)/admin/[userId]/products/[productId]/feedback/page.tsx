import { getAllFeedbacks } from "@/actions/get-all-feedbacks";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";

interface Props {
  params: { userId: string; productId: string };
}

async function getProductFeedbacks(productId: string) {
  const feedbackCol = collection(db, `products`, productId, "feedback");
  const q = query(feedbackCol, where("productId", "==", productId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export default async function ProductFeedbackPage({ params }: Props) {
  const { productId } = params;
  const feedbacks = await getAllFeedbacks(productId);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Feedback for Product: {productId}
      </h1>
      {feedbacks.length === 0 ? (
        <p>No feedback found for this product.</p>
      ) : (
        <ul className="space-y-2">
          {feedbacks.map((feedback) => (
            <li key={feedback.id} className="border p-2 rounded">
              <div className="font-semibold">
                {feedback.feedback.title || feedback.id}
              </div>
              <div>{feedback.content || feedback.text || ""}</div>
              <div className="text-xs text-gray-500 mt-1">
                By: {feedback.userEmail || feedback.userId || "Unknown"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
