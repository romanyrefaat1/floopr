import { analyzeSentiment } from "./analyze-sentiment";
import classifyTopic from "./classify-topic";
import { db } from "./firebase";
import updateBasicAnalyticsFromNewFeedback from "./update-basic-analytics-from-new-feedback";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

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

export async function addSimpleFeedback(feedbackData: SimpleFeedbackItemData) {
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
        isRich: true,
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
