import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export async function syncUserWithFirebase(userId: string, userData: any) {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    const now = serverTimestamp();

    if (!userSnap.exists()) {
      // Create new user document if it doesn't exist
      await setDoc(userRef, {
        id: userId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        createdAt: now,
        feedback_count_monthly: 0,
        feedback_last_reset_date: now,
        subscription_tier: "free", // Default to free
        ...userData,
      });
    } else {
      // Update existing user with any new information, ensure new fields exist
      const existingData = userSnap.data();
      await setDoc(
        userRef,
        {
          ...existingData,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          updatedAt: now,
          // Add default values for new fields if they don't exist
          feedback_count_monthly: existingData.feedback_count_monthly ?? 0,
          feedback_last_reset_date:
            existingData.feedback_last_reset_date ?? now,
          subscription_tier: existingData.subscription_tier ?? "free", // Ensure default if missing
          ...userData,
        },
        { merge: true }
      );
    }

    return true;
  } catch (error) {
    console.error("Error syncing user with Firebase:", error);
    return false;
  }
}
