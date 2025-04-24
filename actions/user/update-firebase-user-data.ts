import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function updateFirebaseUserData(
  userId: string,
  data: object
) {
  if (!userId) {
    throw new Error("User ID is required to update user data.");
  }
  if (!data) {
    throw new Error("Data is required to update user data.");
  }

  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, data);
}
