import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import FeedbackItem from "./feedback-item";
import getFilteredFeedbacks from "@/actions/filter-feedback";

// Using the Firebase client SDK on the server is okay if your environment supports it.
// Alternatively, use the Firebase Admin SDK for pure server-side code.

export default async function FeedbackList({ productId, filterData }: { productId: string }) {
  try {
    const feedbacks = await getFilteredFeedbacks(productId, filterData)

    if (!feedbacks[0]) {
      <div className="text-red-500">
        Failed to load feedback. Please try again later.
      </div>
    }

    return (
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <FeedbackItem key={feedback.id} feedback={feedback} productId={productId} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return (
      <div className="text-red-500">
        Failed to load feedback. Please try again later.
      </div>
    );
  }
}
