import { db } from "./firebase";
import {
  updateDoc,
  serverTimestamp,
  increment,
  runTransaction,
  doc,
} from "firebase/firestore";

// Dummy getFeedbacks, replace with your own implementation or import
async function getFeedbacks(productId: string) {
  // ...fetch feedbacks for the productId...
  return [];
}

type SentimentResult = {
  sentiment: string;
};

type TopicClassification = {
  labels: string[];
  topTopic: string;
  topScore: number;
};

type UpdateBasicAnalyticsFromNewFeedbackParams = {
  sentimentResult: SentimentResult;
  topicClassification: TopicClassification;
  productId: string;
};

export default async function updateBasicAnalyticsFromNewFeedback({
  productId,
  sentimentResult,
  topicClassification,
}: UpdateBasicAnalyticsFromNewFeedbackParams) {
  await runTransaction(db, async (transaction) => {
    const productRef = doc(db, "products", productId);
    const productDoc = await transaction.get(productRef);
    if (!productDoc.exists()) throw new Error("Document does not exist!");
    const analyticsData = productDoc.data().analytics || {};
    const sentimentData = analyticsData.sentiment || {
      positive: 0,
      negative: 0,
      neutral: 0,
    };
    let sentimentUpdate = {
      positive: sentimentData.positive,
      negative: sentimentData.negative,
      neutral: sentimentData.neutral,
    };
    if (sentimentResult.sentiment === "POSITIVE") {
      sentimentUpdate.positive += 1;
    } else if (sentimentResult.sentiment === "NEGATIVE") {
      sentimentUpdate.negative += 1;
    } else if (sentimentResult.sentiment === "NEUTRAL") {
      sentimentUpdate.neutral += 1;
    } else {
      throw new Error("Unexpected sentiment value");
    }
    const totalSentiments =
      sentimentUpdate.positive +
      sentimentUpdate.negative +
      sentimentUpdate.neutral;
    const sentimentPercents = {
      positive: (sentimentUpdate.positive / totalSentiments) * 100,
      negative: (sentimentUpdate.negative / totalSentiments) * 100,
      neutral: (sentimentUpdate.neutral / totalSentiments) * 100,
    };
    let topSentiment = "NEUTRAL";
    if (
      sentimentUpdate.positive >= sentimentUpdate.negative &&
      sentimentUpdate.positive >= sentimentUpdate.neutral
    ) {
      topSentiment = "POSITIVE";
    } else if (
      sentimentUpdate.negative >= sentimentUpdate.positive &&
      sentimentUpdate.negative >= sentimentUpdate.neutral
    ) {
      topSentiment = "NEGATIVE";
    }
    const topSentimentPercent = sentimentPercents[topSentiment.toLowerCase()];
    const allFeedbacks = await getFeedbacks(productId);
    const allTopics = allFeedbacks.map((f) => {
      const currTopic = f.topic;
      if (!currTopic) return "Uncategorized";
      return currTopic?.topTopic || "Uncategorized";
    });
    const topicCounts = allTopics.reduce((acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {});
    const topTopic = Object.entries(topicCounts).sort(
      (a, b) => b[1] - a[1]
    )[0][0];
    const topTopicPercent =
      (topicCounts[topTopic] / allTopics.length || 0) * 100;
    const topicUpdate = {
      allTopics: allTopics || [],
      topTopic: topTopic || "Uncategorized",
      topTopicPercent: topTopicPercent || 0,
    };
    const updateObj = {
      feedbackCount: increment(1),
      lastFeedbackAt: serverTimestamp(),
      analytics: {
        sentiment: {
          ...sentimentUpdate,
          topSentimentPercent: topSentimentPercent,
          topSentiment,
        },
        topic: topicUpdate,
      },
    };
    transaction.update(productRef, updateObj);
  });
  return { success: true };
}
