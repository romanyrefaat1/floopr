import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp, getCountFromServer } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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

export { app, analytics, db };
