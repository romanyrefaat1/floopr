import { db } from "@/lib/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";


/**
 * Deletes a feedback entry (soft delete for real-time displays)
 */
export async function deleteFeedback(productId: string, feedbackId: string) {
    try {
      const feedbackRef = doc(db, "products", productId, "feedbacks", feedbackId);
      
      // Soft delete is better for real-time applications
      await updateDoc(feedbackRef, {
        status: "deleted",
        updatedAt: serverTimestamp()
      });
      
      // Update the product feedback count
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        feedbackCount: (await import("firebase/firestore")).increment(-1)
      });
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting feedback:", error);
      return { success: false, error };
    }
  }