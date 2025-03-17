import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp,updateDoc } from "firebase/firestore";

export type SimpleFeedbackItemData = {
  content: string;
  productId: string;
  componentRefId?: string;
  userInfo?: {
    userId?: string;
    username?: string;
    profilePicture?: string;
  };
}

export type AdvancedFeedbackItemData = {
  title: string;
  description: string;
  userId: string;
  username: string;
}

/**
 * Adds a simple feedback entry to a product with real-time updates
 */
export async function addSimpleFeedback(feedbackData: SimpleFeedbackItemData) {
  const { content, productId, componentRefId, userInfo } = feedbackData;
  console.log(`addFeedback`, feedbackData);

  try {
    // 1. Ensure the product document exists in the "products" collection
    await setDoc(
      doc(db, "products", productId), 
      { 
        productId,
        updatedAt: serverTimestamp() // Adding this helps with real-time sorting
      }, 
      { merge: true }
    );

    const feedbackId = crypto.randomUUID();
    await setDoc(
      doc(db, "products", productId, "feedbacks", feedbackId),
      {
        type: `simple`,
        socialData: {
          likes: {
            count: 0,
            data: []
          },
          comments: {
            count: 0,
            data: []
          }
        },
        content,
        feedbackId,
        productId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: "active", // Adding status can help with filtering in real-time listeners
        // Component
        componentRefId,
        userInfo,
      }
    );

    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      feedbackCount: (await import("firebase/firestore")).increment(1),
      lastFeedbackAt: serverTimestamp()
    });

    return { success: true, feedbackId };
  } catch (error) {
    console.error("Error adding feedback:", error);
    return { success: false, error };
  }
}

/**
 * Adds an advanced feedback entry with title and description
 */
export async function addAdvancedFeedback(productId: string, feedbackData: AdvancedFeedbackItemData) {
  const { title, description, userId, username } = feedbackData;
  
  try {
    // 1. Ensure the product document exists in the "products" collection
    await setDoc(
      doc(db, "products", productId), 
      { 
        productId,
        updatedAt: serverTimestamp()
      }, 
      { merge: true }
    );

    // 2. Generate a unique ID and create a feedback document
    const feedbackId = crypto.randomUUID();
    await setDoc(
      doc(db, "products", productId, "feedbacks", feedbackId),
      {
        title,
        description,
        userId,
        username,
        feedbackId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: "active"
      }
    );

    // 3. Update the product document with feedback count
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      feedbackCount: (await import("firebase/firestore")).increment(1),
      lastFeedbackAt: serverTimestamp()
    });

    return { success: true, feedbackId };
  } catch (error) {
    console.error("Error adding feedback:", error);
    return { success: false, error };
  }
}