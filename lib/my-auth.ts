import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function myAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      throw new Error(`user is not authenticated.`);
    }
    console.log(`user:`, user);
    return user;
  });
}
