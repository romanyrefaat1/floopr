import { ProductData } from "@/app/(routes)/(code)/[productId]/page";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function getProductData(
  productId: string
): ProductData | null {
  try {
    const q = query(
      collection(db, "products"),
      where("docId", "==", productId)
    );
    const querySnap = await getDocs(q);

    if (querySnap.empty) {
      return null;
    }

    const product = querySnap.docs.map((doc) => {
      return {
        docId: doc.id,
        ...doc.data(),
      };
    });
    return product[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
