import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { getFeedbacksByDate } from "./get-feedback-by-date";


export default async function getFilteredFeedbacks(productId: string, filterData) {
    // If no need for filter
    if (!filterData) {
        return await getAllFeedbacks(productId);
    }

    switch (filterData.filter) {
        case `likes`:
          console.log(`Filtered by likes`);
          const likesResponse = query(
            collection(db, `products`, productId, `feedbacks`),
            orderBy("socialData.likes.count", "desc")
          );
          // toast.success("Filtered by likes");
          console.log(`Filtered by likes`);
          return await getDocs(likesResponse);
        //   break;
        case `date`:
          console.log(`Filtered by date`);
          if (filterData.quick !== null) {
            const quickFilter = filterData.quick;
            const now = new Date();
            let before;
            switch (quickFilter) {
              case "7-days":
                before = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
                break;
              case "30-days":
                before = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
                break;
              case "24-hours":
                before = new Date(now.getTime() - (24 * 60 * 60 * 1000));
                console.log(`before-date: ${before}`);
                break;
              default:
                throw new Error(`Unknown quick filter: ${quickFilter}`);
            }
            console.log(`before-date after: ${before}`)
            const response = query(
              collection(db, `products`, productId, `feedbacks`),
                where("createdAt", ">", before)
              );
              // toast.success(`Filtered by ${quickFilter}`);
              console.log(`Filtered by ${quickFilter}`);
              return await getDocs(response);
              break;
            } else if (filterData.specifiedDate !== null) {
              console.log("Raw date from URL (date filter switch):" , filterData)
              const data = await getFeedbacksByDate(productId, filterData)
              if (!data) break;
              console.log(`Filtered by date`, data);
              return data;
            }
          break;
        case `sentiment`:
          switch(filterData.filter.sentiment) {
            case `all`:
              return await getAllFeedbacks(productId);
            default:
              const sentimentType = filterData.filter.sentiment.toUpperCase()
              const response = query(
                collection(db, `products`, productId, `feedbacks`),
                  where("sentiment.sentiment", "==", sentimentType)
                );
                console.log(`feedback by ${sentimentType}`)
                const data = await getDocs(response)
                console.log(`filtered data sentiment:`, data)
              return data
          }
        default:
          return await getAllFeedbacks(productId);
          break;
      }
}

async function getAllFeedbacks(productId) {
    const response = query(
      collection(db, `products`, productId, `feedbacks`)
    );
    console.log(`Fetched all feedbacks`);
    return await getDocs(response);
  }