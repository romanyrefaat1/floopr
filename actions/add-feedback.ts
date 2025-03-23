import { FeedbackItemInDB } from "@/app/(routes)/(code)/[productId]/_components/feedback-list";
import { db } from "@/lib/firebase";
import { analyzeSentiment } from "@/services/analyze-sentiment";
import classifyTopic from "@/services/classify-topic";
import { doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import updateBasicAnalyticsFromNewFeedback from "./basic-analytics/update/update-basic-analytics-from-new-feedback";

export type SimpleFeedbackItemData = {
  feedback: {
    title: string;
    content: string;
    type: `idea` | `feature` | `issue` | `other`
  };
  productId: string;
  componentRefId?: string;
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

/**
 * Adds a simple feedback entry to a product with real-time updates
 */
export async function addSimpleFeedback(feedbackData: FeedbackItemInDB) {
  const { feedback, productId, componentRefId, userInfo } = feedbackData;
  console.log(`addFeedback`, feedbackData);

  try {
    // Example usage with default topics
    const sentimentResult = await analyzeSentiment(
      `${feedback.title}. ${feedback.content || ``}`
    );
    console.log(`sentimentResult`, sentimentResult);
    const topicClassification = await classifyTopic(
      `${feedback.title}. ${feedback.content}`
    );
    // const topicClassification = {
    //   labels: ["User Interface"],
    //   topTopic: "User Interface",
    //   topScore: 1
    // }
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
      feedback: {
        title: feedback.title,
        content: feedback.content,
      },
      feedbackId,
      productId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: "Sent", // Adding status can help with filtering in real-time listeners
      // Component
      componentRefId: componentRefId || null,
      userInfo,
    });

    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      feedbackCount: (await import("firebase/firestore")).increment(1),
      lastFeedbackAt: serverTimestamp(),
    });

    // Update basic analytics
    console.log(`start update basic analytics`)
    await updateBasicAnalyticsFromNewFeedback({productId, sentimentResult, topicClassification});
    console.log(`end update basic analytics`)

    return { success: true, feedbackId };
  } catch (error) {
    console.error("Error adding feedback:", error);
    return { success: false, error };
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
