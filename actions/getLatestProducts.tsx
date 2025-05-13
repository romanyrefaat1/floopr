import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

export async function getLatestProducts(userId: string, maxProducts: number) {
  try {
    const productsRef = collection(db, "products");

    const q = query(
      productsRef,
      where("ownerId", "==", userId),
      maxProducts && limit(maxProducts)
    );

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

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

    return products;
  } catch (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }
}
