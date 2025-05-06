import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

async function getAllFeedbacks() {
  const feedbackCol = collection(db, "feedback");
  const snapshot = await getDocs(feedbackCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export default async function FeedbacksPage() {
  const feedbacks = await getAllFeedbacks();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Feedbacks</h1>
      {feedbacks.length === 0 ? (
        <p>No feedbacks found.</p>
      ) : (
        <ul className="space-y-2">
          {feedbacks.map((feedback) => (
            <li key={feedback.id} className="border p-2 rounded">
              <div className="font-semibold">
                {feedback.title || feedback.id}
              </div>
              <div>{feedback.content || feedback.text || ""}</div>
              <div className="text-xs text-gray-500 mt-1">
                Product: {feedback.productId || "Unknown"}
              </div>
              <div className="text-xs text-gray-500">
                By: {feedback.userEmail || feedback.userId || "Unknown"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
