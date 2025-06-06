"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";

export default function FirebaseAuthActions() {
  const { getToken, userId } = useAuth();

  // This function is used for signing in.
  const handleFirebaseSignIn = async () => {
    try {
      // Generate a Firebase-compatible token using your custom template.
      const token = await getToken({ template: "firebase_jwt" });
      if (!token) {
        console.error("No token received from Clerk");
        return;
      }
      const userCredentials = await signInWithCustomToken(auth, token);
    } catch (error) {
      console.error("Error during Firebase sign-in:", error);
    }
  };

  // In a custom token flow, signing up is similar to signing in.
  // Here, we provide a separate function for clarity.
  const handleFirebaseSignUp = async () => {
    try {
      // Optionally, you could use a different JWT template if desired.
      const token = await getToken({ template: "firebase_jwt" });
      if (!token) {
        console.error("No token received from Clerk");
        return;
      }
      const userCredentials = await signInWithCustomToken(auth, token);
    } catch (error) {
      console.error("Error during Firebase sign-up:", error);
    }
  };

  // Optionally, you could conditionally render these buttons
  // if no userId is available (meaning the user hasn't signed in via Clerk)

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button onClick={handleFirebaseSignIn}>Sign In to Firebase</Button>
      <Button onClick={handleFirebaseSignUp}>Sign Up to Firebase</Button>
    </div>
  );
}
