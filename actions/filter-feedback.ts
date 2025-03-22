import { getAllFeedbacks } from "./get-all-feedbacks";
import { getFeedbacksByDate } from "./get-feedback-by-date";
import { FilterData } from "@/app/(routes)/(code)/products/[id]/page";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

export default async function getFilteredFeedbacks(
  productId: string,
  filterData?: Partial<FilterData>
) {
  // If no need for filter
  if (!filterData) {
    return await getAllFeedbacks(productId);
  }

  try {
    switch (filterData.filter) {
      case `likes`:
        console.log(`Filtered by likes`);
        const likesResponse = query(
          collection(db, `products`, productId, `feedbacks`),
          orderBy("socialData.likes.count", "desc")
        );
        const likesData = await getDocs(likesResponse);
        return likesData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      case `date`:
        console.log(`Filtered by date`);
        if (filterData.quick !== null) {
          const quickFilter = filterData.quick;
          const now = new Date();
          let before;
          switch (quickFilter) {
            case "7-days":
              before = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              break;
            case "30-days":
              before = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
              break;
            case "24-hours":
              before = new Date(now.getTime() - 24 * 60 * 60 * 1000);
              console.log(`before-date: ${before}`);
              break;
            default:
              throw new Error(`Unknown quick filter: ${quickFilter}`);
          }
          console.log(`before-date after: ${before}`);
          const dateResponse = query(
            collection(db, `products`, productId, `feedbacks`),
            where("createdAt", ">", before)
          );
          const dateData = await getDocs(dateResponse);
          return dateData.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } else if (filterData.specifiedDate !== null) {
          console.log("Raw date from URL (date filter switch):", filterData);
          const data = await getFeedbacksByDate(productId, filterData);
          if (!data) break;
          console.log(`Filtered by date`, data);
          return data;
        }
        break;
      case `sentiment`:
        switch (filterData.sentiment) {
          case `all`:
            console.log(`switch filter by all`);
            return await getAllFeedbacks(productId);
          default:
            const sentimentTypeUpperCase = filterData.sentiment;
            console.log(`Sentiment type: ${sentimentTypeUpperCase}`);
            const sentimentType = sentimentTypeUpperCase.toUpperCase();
            const sentimentResponse = query(
              collection(db, `products`, productId, `feedbacks`),
              where("sentiment.sentiment", "==", sentimentType)
            );
            console.log(`feedback by ${sentimentType}`);
            const sentimentData = await getDocs(sentimentResponse);
            return sentimentData.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
        }
      case `topic`:
        switch (filterData.topic) {
          case `other`:
            return await getAllFeedbacks(productId);

          default:
            const topicResponse = query(
              collection(db, `products`, productId, `feedbacks`),
              where("type", "==", filterData.topic)
            );
            const topicData = await getDocs(topicResponse);
            return topicData.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
        }
      default:
        return await getAllFeedbacks(productId);
    }
  } catch (error) {
    console.error("Error filtering feedbacks:", error);
    return [];
  }
}
