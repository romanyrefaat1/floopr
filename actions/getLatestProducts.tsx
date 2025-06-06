import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

export async function getLatestProducts(userId: string, maxProducts: number) {
  try {
    const productsRef = collection(db, "products");
    let q;

    if (!maxProducts) {
      q = query(productsRef, where("ownerId", "==", userId));
    } else {
      q = query(
        productsRef,
        where("ownerId", "==", userId),
        limit(maxProducts)
      );
    }

    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map((doc) => {
      const data = doc.data();
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
        ...data,
      };
    });

    return products;
  } catch (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }
}
