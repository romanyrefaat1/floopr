import { db } from "@/lib/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export default async function updateProductData(productId: string, data: any) {
  await updateDoc(doc(db, "products", productId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}
