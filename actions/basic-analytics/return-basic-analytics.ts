import getFeedbackCount from "@/actions/basic-analytics/feedback-count";
import getProductFeedbacksLikesCount from "@/actions/basic-analytics/likes-count";
import getTopicsData from "@/actions/basic-analytics/topic";
import getSentimentPercent from "@/actions/basic-analytics/sentiment-percent";
import getProductFeedbacksCommentsCount from "@/actions/basic-analytics/comments-count";
import { getPageViews } from "./pageViews";


export default async function getBasicAnalytics(productId: string) {
    const pageViews = await getPageViews(productId);
    const feedbackCount = await getFeedbackCount(productId);
    const likesCount = await getProductFeedbacksLikesCount(productId);
    const commentsCount = await getProductFeedbacksCommentsCount(productId);
    const sentiment = await getSentimentPercent(productId);
    const topic = await getTopicsData(productId);
    return { pageViews, feedbackCount, sentiment, topic, likesCount, commentsCount };
}