import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getAllFeedbackGroups(productId: string) {
  if (!productId) return [];
  const groupsRef = collection(db, "products", productId, "feedback-groups");
  const snapshot = await getDocs(groupsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
