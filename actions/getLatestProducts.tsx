import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

// Ensure your Firestore instance is exported as "db"

export async function getLatestProducts(userId: string) {
  try {
    const productsRef = collection(db, "products");

    const q = query(
      productsRef,
      where("ownerId", "==", userId),
    //   orderBy("createdAt", "desc"),
    //   limit(4)
    );

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(products)

    return products;
  } catch (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }
}
