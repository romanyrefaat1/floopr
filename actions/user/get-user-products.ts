import { ProductData } from "@/app/(routes)/(code)/[productId]/page";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function getUserProducts(userId: string) {
  const q = query(collection(db, "products"), where("ownerId", "==", userId));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  
  return products as ProductData[];
}
