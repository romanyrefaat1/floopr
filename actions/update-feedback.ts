import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { SimpleFeedbackItemData } from "./add-feedback";
import { db } from "@/lib/firebase";

/**
 * Updates an existing feedback entry
 */
export async function updateFeedback(
    productId: string, 
    feedbackId: string, 
    updatedData: Partial<SimpleFeedbackItemData>
  ) {
    try {
      const feedbackRef = doc(db, "products", productId, "feedbacks", feedbackId);
      
      await updateDoc(feedbackRef, {
        ...updatedData,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      console.error("Error updating feedback:", error);
      return { success: false, error };
    }
  }
  