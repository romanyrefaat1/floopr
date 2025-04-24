import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function getUserByCustomerId(customerId: string) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("dodoCustomerId", "==", customerId));
  const snapshot = await getDocs(q);
  return snapshot.docs[0]?.id || null;
}
