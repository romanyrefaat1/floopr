import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function getUserData(userId: string) {
  return new Promise((resolve, reject) => {
    const userRef = doc(db, "users", userId);
    getDoc(userRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          resolve(docSnap.data());
        } else {
          reject(new Error("No such document!"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
