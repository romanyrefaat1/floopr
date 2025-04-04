import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function getAllFeedbacks(productId: string) {
  const response = query(
    collection(db, `products`, productId, `feedbacks`),
    orderBy("socialData.likes.count", "desc")
  );
  const data = await getDocs(response);
  console.log(`Fetched all feedbacks`, data.docs);
  return data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
