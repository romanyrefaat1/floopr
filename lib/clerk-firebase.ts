import { signInWithCustomToken } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "sonner";

export async function signInToFirebase(clerkUser) {
    // Retrieve a custom token for Firebase from Clerk
    const firebaseToken = await clerkUser.getToken('firebase');
    toast.success(`Firebase token: ${firebaseToken}`);
    
    // Sign in to Firebase using the custom token
    await signInWithCustomToken(auth, firebaseToken);
  }