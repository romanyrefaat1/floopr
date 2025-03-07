import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function syncUserWithFirebase(userId: string, userData: any) {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Create new user document if it doesn't exist
        await setDoc(userRef, {
          id: userId,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          createdAt: new Date(),
          ...userData
        });
      } else {
        // Update existing user with any new information
        await setDoc(userRef, {
          ...userSnap.data(),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          updatedAt: new Date(),
          ...userData
        }, { merge: true });
      }
      
      return true;
    } catch (error) {
      console.error('Error syncing user with Firebase:', error);
      return false;
    }
  }
  