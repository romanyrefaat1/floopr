import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export default async function updateFirebaseUserData(
  email: string,
  data: object
) {
  if (!email) {
    throw new Error("Email is required to update user data.");
  }
  if (!data) {
    throw new Error("Data is required to update user data.");
  }

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("User not found");
  }

  const userDoc = querySnapshot.docs[0];
  await updateDoc(userDoc.ref, data);
}
