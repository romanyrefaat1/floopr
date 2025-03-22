import { db } from "@/lib/firebase";
import { updateDoc, serverTimestamp, increment, runTransaction } from "firebase/firestore";

export default async function updateBasicAnalyticsFromNewFeedback(productRef, sentimentResult, topicClassification) {
  console.log("updateBasicAnalyticsFromNewFeedback called");
  await runTransaction(db, async (transaction) => {
    console.log("runTransaction called");
    // Read current document data.
    const productDoc = await transaction.get(productRef);
    console.log("productDoc:", productDoc);
    if (!productDoc.exists()) throw new Error("Document does not exist!");

    // Initialize current analytics data.
    const analyticsData = productDoc.data().analytics || {};
    const sentimentData = analyticsData.sentiment || { positive: 0, negative: 0, neutral: 0 };

    // Determine which sentiment count to increment.
    let sentimentUpdate = { 
      positive: sentimentData.positive, 
      negative: sentimentData.negative, 
      neutral: sentimentData.neutral 
    };
    console.log(`sentiment result`, sentimentResult)
    console.log(`sentiment data before increment`, sentimentUpdate)
    
    if (sentimentResult.sentiment === "POSITIVE") {
      sentimentUpdate.positive += 1;
    } else if (sentimentResult.sentiment === "NEGATIVE") {
      sentimentUpdate.negative += 1;
    } else if (sentimentResult.sentiment === "NEUTRAL") {
      sentimentUpdate.neutral += 1;
    } else {
      throw new Error("Unexpected sentiment value");
    }
    console.log(`sentiment data after increment`, sentimentUpdate)

    // Calculate total feedback count for sentiment.
    const totalSentiments = sentimentUpdate.positive + sentimentUpdate.negative + sentimentUpdate.neutral;
    // Compute percentages for each sentiment.
    const sentimentPercents = {
      positive: (sentimentUpdate.positive / totalSentiments) * 100,
      negative: (sentimentUpdate.negative / totalSentiments) * 100,
      neutral:  (sentimentUpdate.neutral  / totalSentiments) * 100,
    };

    // Determine the top sentiment and its percentage.
    let topSentiment = "NEUTRAL";
    if (sentimentUpdate.positive >= sentimentUpdate.negative && sentimentUpdate.positive >= sentimentUpdate.neutral) {
      topSentiment = "POSITIVE";
    } else if (sentimentUpdate.negative >= sentimentUpdate.positive && sentimentUpdate.negative >= sentimentUpdate.neutral) {
      topSentiment = "NEGATIVE";
    }
    const topSentimentPercent = sentimentPercents[topSentiment.toLowerCase()]; // convert key to lowercase

    // Map topic classification results to analytics.topic structure.
    const topicUpdate = {
      allTopics: topicClassification.labels || [],
      topTopic: topicClassification.topTopic || "Uncategorized",
      topTopicPercent: topicClassification.topScore || 0,
    };

    // Build the update object.
    const updateObj = {
      feedbackCount: increment(1),
      lastFeedbackAt: serverTimestamp(),
      analytics: {
        sentiment: {
          ...sentimentUpdate,                // Updated counts for sentiments
          topSentimentPercent: topSentimentPercent,        // Percentage of the top sentiment
          topSentiment,                        // Top sentiment category
        },
        topic: topicUpdate,                    // Updated topic analytics
      },
    };

    console.log("updateObj:", updateObj);

    // Update the document within the transaction.
    console.log("Start update product document:", productRef);
    transaction.update(productRef, updateObj);
    console.log("End update product document");
  });
  console.log("runTransaction finished");
}
