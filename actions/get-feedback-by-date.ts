import { FilterData } from "@/app/(routes)/(code)/products/[id]/page";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

export async function getFeedbacksByDate(
  productId: string,
  filterData: FilterData
) {
  try {
    // Create a date object from the string
    // For this specific format, we can try multiple approaches
    let dateObj;

    // Approach 1: Try direct parsing
    dateObj = new Date(filterData.specifiedDate);

    // If direct parsing fails, try manual parsing
    if (isNaN(dateObj.getTime())) {
      // Extract date components using regex
      // This regex extracts: day of week, month, day, year, time, timezone
      const dateRegex =
        /(\w+)\s(\w+)\s(\d+)\s(\d+)\s(\d+:\d+:\d+)\s(GMT[+-]\d+)/;
      const match = filterData.specifiedDate.match(dateRegex);

      if (match) {
        // [_, dayOfWeek, month, day, year, time, timezone] = match
        const monthMap = {
          Jan: 0,
          Feb: 1,
          Mar: 2,
          Apr: 3,
          May: 4,
          Jun: 5,
          Jul: 6,
          Aug: 7,
          Sep: 8,
          Oct: 9,
          Nov: 10,
          Dec: 11,
        };

        const monthIdx = monthMap[match[2]];
        const day = parseInt(match[3]);
        const year = parseInt(match[4]);

        // Create date (ignoring time for simplicity)
        dateObj = new Date(year, monthIdx, day);
      } else {
        console.error("Failed to parse date string with regex");
        return [];
      }
    }

    // Now that we have a valid date, create the start and end of day timestamps
    const startOfDay = new Date(dateObj);
    startOfDay.setHours(0, 0, 0, 0);
    const startTimestamp = Timestamp.fromDate(startOfDay);

    const endOfDay = new Date(dateObj);
    endOfDay.setHours(23, 59, 59, 999);
    const endTimestamp = Timestamp.fromDate(endOfDay);

    // Query the Firestore database
    const feedbacksQuery = query(
      collection(db, "products", productId, "feedbacks"),
      where("createdAt", ">=", startTimestamp),
      where("createdAt", "<=", endTimestamp)
    );

    const feedbacksSnap = await getDocs(feedbacksQuery);

    // Additional debugging if no results
    if (feedbacksSnap.empty) {
      // Check if there are any documents in the collection
      const allDocsQuery = query(
        collection(db, "products", productId, "feedbacks"),
        limit(5)
      );

      const allDocsSnap = await getDocs(allDocsQuery);

      if (!allDocsSnap.empty) {
        allDocsSnap.docs.forEach((doc) => {
          const data = doc.data();
          if (data.createdAt) {
            // Check if createdAt is a Firestore Timestamp
            if (data.createdAt.toDate) {
              console.log(
                `- Doc ${doc.id}: ${data.createdAt.toDate().toString()}`
              );
            } else {
              console.log(
                `- Doc ${doc.id}: ${data.createdAt} (not a Firestore Timestamp)`
              );
            }
          } else {
            
          }
        });
      } else {
        
      }
    }

    return feedbacksSnap;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return [];
  }
}
