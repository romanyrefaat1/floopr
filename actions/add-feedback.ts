import updateBasicAnalyticsFromNewFeedback from "./basic-analytics/update/update-basic-analytics-from-new-feedback";
import { db } from "@/lib/firebase";
import { analyzeSentiment } from "@/services/analyze-sentiment";
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";

export type SimpleFeedbackItemData = {
  feedback: {
    title: string;
    content: string | null;
    isRich: boolean;
    type: `idea` | `feature` | `issue` | `other`;
  };
  productId: string;
  userInfo?: {
    userId?: string;
    username?: string;
    profilePicture?: string;
  };
};

export type AdvancedFeedbackItemData = {
  title: string;
  description: string;
  userId: string;
  username: string;
};

export type FeedbackComponentModalInputs = {
  label: string;
  placeholder: string;
  id: number;
  value: string;
};

// Type for the modal component feedback
type AddComponentFeedbackProps = {
  inputs: FeedbackComponentModalInputs[];
  productId: string;
  componentRefId: string;
  rating: number;
  userInfo?: {
    userId?: string;
    username?: string;
    profilePicture?: string | null;
  } | null;
};

/**
 * Adds a simple feedback entry to a product with real-time updates
 */
export async function addSimpleFeedback(feedbackData: SimpleFeedbackItemData) {
  const { feedback, productId, componentRefId, userInfo } = feedbackData;
  console.log(`addFeedback`, feedbackData);

  try {
    // Example usage with default topics
    const sentimentResult = await analyzeSentiment(
      `${feedback.title}. ${feedback.content || ``}`
    );
    console.log(`sentimentResult`, sentimentResult);
    // const topicClassification = await classifyTopic(
    //   `${feedback.title}. ${feedback.content}`
    // );
    const topicClassification = [`No topic`, `No topic`, `No topic`];
    console.log(`topicClassification addismeple feedback`, topicClassification);

    // 1. Ensure the product document exists in the "products" collection
    await setDoc(
      doc(db, "products", productId),
      {
        productId,
        updatedAt: serverTimestamp(), // Adding this helps with real-time sorting
      },
      { merge: true }
    );

    const feedbackId = crypto.randomUUID();
    await setDoc(doc(db, "products", productId, "feedbacks", feedbackId), {
      type: feedback.type || `other`,
      sentiment: {
        sentiment: sentimentResult.sentiment,
        score: sentimentResult.score,
        text: sentimentResult.text,
      },
      topic: topicClassification,
      socialData: {
        likes: {
          count: 0,
          data: [],
        },
        comments: {
          count: 0,
          data: [],
        },
      },
      // In your addSimpleFeedback function
      feedback: {
        title: feedback.title || "Untitled",
        content: feedback.content || null,
        isRich: feedback.isRich || true,
      },
      feedbackId,
      productId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: "Sent", // Adding status can help with filtering in real-time listeners
      // Component
      componentRefId: componentRefId || null,
      isComponent: null,
      userInfo,
    });

    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      feedbackCount: (await import("firebase/firestore")).increment(1),
      lastFeedbackAt: serverTimestamp(),
    });

    // Update basic analytics
    console.log(`start update basic analytics`);
    const isUpdateBasicAnalyticsSuccess =
      await updateBasicAnalyticsFromNewFeedback({
        productId,
        sentimentResult,
        topicClassification,
      });
    console.log(`end update basic analytics`);

    console.log(`isUpdateBasicAnalyticsSuccess`, isUpdateBasicAnalyticsSuccess);

    return { success: true, feedbackId };
  } catch (error) {
    console.error("Error adding feedback:", error);
    return { success: false, error };
  }
}

/**
 * Adds feedback from a component (like modal)
 */
export async function addComponentFeedback({
  inputs,
  productId,
  componentRefId,
  rating,
  userInfo = null,
}: AddComponentFeedbackProps) {
  try {
    // Log the inputs for debugging
    console.log("Adding component feedback with:", {
      inputs,
      productId,
      componentRefId,
      rating,
      userInfo,
    });

    // Create the feedback document
    const feedbackData = {
      feedback: {
        inputs,
        isRich: false,
      },
      type: "feedback",
      status: "Sent",
      // Component
      isComponent: true,
      componentRefId,
      componentId: `modal-timeout`,
      componentName: `Modal Timeout`,

      rating,
      userInfo: userInfo || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      socialData: {
        likes: { count: 0, data: [] },
        comments: { count: 0, data: [] },
      },
    };

    // Get the collection reference
    const feedbacksCollectionRef = collection(
      db,
      "products",
      productId,
      "feedbacks"
    );

    // Add the document
    const docRef = await addDoc(feedbacksCollectionRef, feedbackData);

    console.log("Component feedback added successfully with ID:", docRef.id);

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding component feedback:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Adds an advanced feedback entry with title and description
 */
export async function addAdvancedFeedback(
  productId: string,
  feedbackData: AdvancedFeedbackItemData
) {
  const { title, description, userId, username } = feedbackData;

  try {
    // 1. Ensure the product document exists in the "products" collection
    await setDoc(
      doc(db, "products", productId),
      {
        productId,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    // 2. Generate a unique ID and create a feedback document
    const feedbackId = crypto.randomUUID();
    await setDoc(doc(db, "products", productId, "feedbacks", feedbackId), {
      title,
      description,
      userId,
      username,
      feedbackId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: "Sent",
    });

    // 3. Update the product document with feedback count
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      feedbackCount: (await import("firebase/firestore")).increment(1),
      lastFeedbackAt: serverTimestamp(),
    });

    // Update basic feedback in product
    await updateDoc(productRef, {
      feedbackCount: (await import("firebase/firestore")).increment(1),
      lastFeedbackAt: serverTimestamp(),
    });

    return { success: true, feedbackId };
  } catch (error) {
    console.error("Error adding feedback:", error);
    return { success: false, error };
  }
}
