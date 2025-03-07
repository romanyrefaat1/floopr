import { useAuth } from '@clerk/nextjs';
import { signInWithCustomToken } from "firebase/auth";
import { auth } from '../firebase';

const handleFirebaseSignIn = async () => {
  try {
    const { getToken } = useAuth(); // Get Clerk's getToken function
    const token = await getToken({ template: 'integration_firebase' });
    if (!token) {
      console.error("No token received from Clerk");
      return;
    }
    const userCredentials = await signInWithCustomToken(auth, token);
    console.log("Signed in to Firebase as:", userCredentials.user);
  } catch (error) {
    console.error("Error during Firebase sign-in:", error);
  }
};
