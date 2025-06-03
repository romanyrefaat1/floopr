import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export default async function updateFirebaseUserData(
  emailOrUserId: string,
  data: object,
  isUserId=false,
) {
  if (!emailOrUserId) {
    throw new Error("Email or User ID is required to update user data.");
  }
  if (!data) {
    throw new Error("Data is required to update user data.");
  }

  const usersRef = collection(db, "users");
  const q = query(usersRef, where(isUserId ? "id" : "email", "==", emailOrUserId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("User not found");
  }

  const userDoc = querySnapshot.docs[0];
  await updateDoc(userDoc.ref, data);
}
