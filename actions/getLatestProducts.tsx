import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
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

    const products = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Ensure all required properties are present
      return {
        id: doc.id,
        title: data.title || "",
        description: data.description || "",
        name: data.name || "",
        likesCount: data.likesCount || 0,
        commentsCount: data.commentsCount || 0,
        productName: data.productName || "",
        productRoute: data.productRoute || "",
        tags: data.tags || [],
        ...data, // Include any other properties from the document
      };
    });
    console.log(products)

    return products;
  } catch (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }
}
