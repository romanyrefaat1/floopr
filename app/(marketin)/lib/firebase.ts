import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getCountFromServer,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

// Function to add a user to the waitlist
export const addToWaitlist = async (email: string) => {
  try {
    // Check if email already exists
    const waitlistRef = collection(db, "waitlist-emails");
    const q = query(waitlistRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        success: false,
        message: "This email is already on our waitlist!",
      };
    }

    // Add new email to waitlist
    await addDoc(waitlistRef, {
      email,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Successfully added to waitlist!",
    };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return {
      success: false,
      message: "Failed to join waitlist. Please try again.",
    };
  }
};

// Function to get the waitlist count
export const getWaitlistCount = async () => {
  try {
    const waitlistRef = collection(db, "waitlist-emails");
    const snapshot = await getCountFromServer(waitlistRef);
    return snapshot.data().count;
  } catch (error) {
    console.error("Error getting waitlist count:", error);
    return 120; // Fallback to default number
  }
};
