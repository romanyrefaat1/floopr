import getFeedbacks from "@/actions/get-feedbacks";
import { db } from "@/lib/firebase";
import { updateDoc, serverTimestamp, increment, runTransaction, doc } from "firebase/firestore";

type SentimentResult = {
  sentiment: string
}

type TopicClassification = {
  labels: string[]
  topTopic: string
  topScore: number
}

type UpdateBasicAnalyticsFromNewFeedbackParams = {
  sentimentResult: SentimentResult
  topicClassification: TopicClassification
  productId: string
}

export default async function updateBasicAnalyticsFromNewFeedback({productId, sentimentResult, topicClassification}: UpdateBasicAnalyticsFromNewFeedbackParams) {
  
  await runTransaction(db, async (transaction) => {
    
    const productRef = doc(db, 'products', productId)
    
    // Read current document data.
    const productDoc = await transaction.get(productRef);
    
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
    
    
    
    if (sentimentResult.sentiment === "POSITIVE") {
      sentimentUpdate.positive += 1;
    } else if (sentimentResult.sentiment === "NEGATIVE") {
      sentimentUpdate.negative += 1;
    } else if (sentimentResult.sentiment === "NEUTRAL") {
      sentimentUpdate.neutral += 1;
    } else {
      throw new Error("Unexpected sentiment value");
    }
    

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

    // Find all feedback
    const allFeedbacks = await getFeedbacks(productId);
    
    const allTopics = allFeedbacks.map(f => {
      const currFeedback = f
      
      const currTopic = currFeedback.topic
      
      if (!currTopic) return "Uncategorized"
      return currTopic?.topTopic || "Uncategorized"
    });
    

    const topicCounts = allTopics.reduce((acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {});
    
    const topTopic = Object.entries(topicCounts).sort((a, b) => b[1] - a[1])[0][0];
    const topTopicPercent = (topicCounts[topTopic] / allTopics.length || 0) * 100;
    

    // Map topic classification results to analytics.topic structure.
    const topicUpdate = {
      allTopics: allTopics || [],
      topTopic: topTopic || "Uncategorized",
      topTopicPercent: topTopicPercent || 0,
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

    

    // Update the document within the transaction.
    
    transaction.update(productRef, updateObj);
    
  });
  
  return {success: true}
}
