import { getAllFeedbacks } from "./get-all-feedbacks";
import { FilterData } from "@/app/(routes)/(code)/products/[id]/page";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export default async function getFilteredFeedbacks(
  productId: string,
  filterData?: Partial<FilterData>,
  isOwnerPa?: boolean
) {
  try {
    const feedbacksRef = collection(db, `products`, productId, `feedbacks`);
    let feedbackQuery;

    // If no filters or filter is "all", return all feedbacks
    if (!filterData || !Object.keys(filterData).length) {
      return await getAllFeedbacks(productId);
    }

    // Handle different filter types
    if (filterData.filter === "likes") {
      if (!isOwnerPa) {
        return { isError: true };
      }
      feedbackQuery = query(
        feedbacksRef,
        orderBy("socialData.likes.count", "desc")
      );
    } else if (filterData.filter === "date") {
      if (!isOwnerPa) {
        return { isError: true };
      }
      console.log(
        `you cose date`,
        filterData.filter,
        filterData.quick,
        filterData.date
      );
      if (filterData.quick) {
        // Handle quick date filters
        const now = new Date();
        let startDate;

        switch (filterData.quick) {
          case "24-hours":
            startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            break;
          case "7-days":
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case "30-days":
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
          default:
            return await getAllFeedbacks(productId);
        }

        feedbackQuery = query(
          feedbacksRef,
          where("createdAt", ">=", startDate),
          orderBy("createdAt", "desc")
        );
      } else if (filterData.specifiedDate) {
        if (!isOwnerPa) {
          return { isError: true };
        }
        // Handle specific date filter
        const selectedDate = new Date(filterData.specifiedDate);
        console.log(`selectedDate`, selectedDate);

        // Set start of day
        const startDate = new Date(selectedDate);
        startDate.setHours(0, 0, 0, 0);

        // Set end of day
        const endDate = new Date(selectedDate);
        endDate.setHours(23, 59, 59, 999);

        console.log("Filtering between:", startDate, "and", endDate);

        feedbackQuery = query(
          feedbacksRef,
          where("createdAt", ">=", startDate),
          where("createdAt", "<=", endDate),
          orderBy("createdAt", "desc")
        );
      } else {
        return await getAllFeedbacks(productId);
      }
    } else if (filterData.filter === "sentiment" && filterData.sentiment) {
      const sentimentValue = filterData.sentiment.toUpperCase();
      console.log(`Sentiment value:`, sentimentValue);
      feedbackQuery = query(
        feedbacksRef,
        where("sentiment.sentiment", "==", sentimentValue),
        orderBy("createdAt", "desc")
      );
    } else if (filterData.filter === "type" && filterData.type) {
      feedbackQuery = query(
        feedbacksRef,
        where("type", "==", filterData.type),
        orderBy("createdAt", "desc")
      );
    } else {
      // Default to all feedbacks if no valid filter
      return await getAllFeedbacks(productId);
    }

    console.log(`query`, feedbackQuery);
    // Execute query and format results
    const querySnapshot = await getDocs(feedbackQuery);
    console.log(`querysnapsot docs`, querySnapshot);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error filtering feedbacks:", error);
    return [];
  }
}
