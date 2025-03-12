import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import FeedbackItem from "./feedback-item";
import { db } from "@/lib/firebase";

// USE FIREBASE SERVER SDK
export default async function FeedbackList({ productId }) {
  try {
    const feedbacksRef = collection(db, "products", productId, "feedbacks");
    const q = query(feedbacksRef, orderBy("socialData.likes.count", "desc"));
    
    const querySnapshot = await getDocs(q);
    
    const feedbacks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    if (feedbacks.length === 0) {
      return <div>No feedbacks yet for this product.</div>;
    }
    
    return (
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
        //   <FeedbackItem 
        //     key={feedback.id} 
        //     feedback={feedback} 
        //     productId={productId}
        //   />
        <>feedback</>
        ))}
      </div>
    );
  } catch (error) {
    // Handle errors during data fetching
    console.error("Error fetching feedbacks:", error);
    return (
      <div className="text-red-500">
        Failed to load feedback. Please try again later.
      </div>
    );
  }
}