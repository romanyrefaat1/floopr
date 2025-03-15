
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe5DDaMyrl1zpu82IMVYdHUE81hZFoDxY",
  authDomain: "ideaboar.firebaseapp.com",
  projectId: "ideaboar",
  storageBucket: "ideaboar.firebasestorage.app",
  messagingSenderId: "476355972239",
  appId: "1:476355972239:web:864e53883df26700bdb4fa",
  measurementId: "G-E0DS66M4Q2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
let analytics: any = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firestore
const db = getFirestore(app);

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
        message: "This email is already on our waitlist!"
      };
    }
    
    // Add new email to waitlist
    await addDoc(waitlistRef, {
      email,
      createdAt: serverTimestamp()
    });
    
    return {
      success: true,
      message: "Successfully added to waitlist!"
    };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return {
      success: false,
      message: "Failed to join waitlist. Please try again."
    };
  }
};

export { app, analytics, db };
