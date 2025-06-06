import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export async function handleFirebaseSignOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during Firebase sign-out:", error);
  }
}
