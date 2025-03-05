import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    User
  } from "firebase/auth";
  import { auth } from "@/lib/firebase";
  
  // Hold the current user globally (note: this is not reactive)
  let currentUser: User | null = null;
  
  // Set up the listener once so that currentUser gets updated
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
  });
  
  export default function myAuth() {
    // If no user is signed in, throw an error immediately
    if (!currentUser) {
        return {
            isUserSignedIn: false,
            currentUser: null,
            userId: null,
         }
    }
  
    const userId = currentUser.uid;
  
    // Auth helper functions
    const signup = (email: string, password: string) => {
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const login = (email: string, password: string) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logout = () => {
      return signOut(auth);
    };
  
    const resetPassword = (email: string) => {
      return sendPasswordResetEmail(auth, email);
    };
  
    const updateUserProfile = (data: any) => {
      return updateProfile(currentUser as User, data);
    };
  
    const googleSignIn = () => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    };
  
    const isUserSignedIn = () => {
      return !!currentUser;
    };
  
    // Return an object matching what your context provided
    return {
      currentUser,
      userId,
      signup,
      login,
      logout,
      resetPassword,
      updateUserProfile,
      googleSignIn,
      isUserSignedIn
    };
  }
  