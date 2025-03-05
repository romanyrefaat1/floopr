'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  getIdToken
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Cookies from 'js-cookie';

// Define the interface for the auth context
interface AuthContextType {
  currentUser: User | null;
  userId?: string;
  signup?: (email: string, password: string) => Promise<any>;
  login?: (email: string, password: string) => Promise<any>;
  logout?: () => Promise<void>;
  resetPassword?: (email: string) => Promise<void>;
  updateUserProfile?: (user: User, data: any) => Promise<void>;
  googleSignIn?: () => Promise<any>;
  isUserSignedIn?: () => boolean;
  getToken?: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null });

export const useAuth = () => useContext(AuthContext);
export const getAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = currentUser?.uid;

  // Manage authentication token
  const manageToken = async (user: User | null) => {
    if (user) {
      try {
        // Get the Firebase ID token
        const token = await getIdToken(user);
        
        // Set token in an HTTP-only cookie (requires server-side setup)
        Cookies.set('authToken', token, { 
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        return token;
      } catch (error) {
        console.error('Error getting token:', error);
        return null;
      }
    } else {
      // Remove token when user logs out
      Cookies.remove('authToken');
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // Manage token on auth state change
      await manageToken(user);
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign up function
  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await manageToken(userCredential.user);
    return userCredential;
  };

  // Login function
  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await manageToken(userCredential.user);
    return userCredential;
  };

  // Logout function
  const logout = async () => {
    await manageToken(null);
    return signOut(auth);
  };

  // Get current user's token
  const getToken = async () => {
    if (currentUser) {
      try {
        return await getIdToken(currentUser);
      } catch (error) {
        console.error('Error getting token:', error);
        return null;
      }
    }
    return null;
  };

  // Reset password
  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update user profile
  const updateUserProfile = (user: User, data: any) => {
    return updateProfile(user, data);
  };

  // Google sign-in
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await manageToken(userCredential.user);
    return userCredential;
  };

  const isUserSignedIn = () => {
    return !!currentUser;
  };

  const value: AuthContextType = {
    currentUser,
    userId,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    googleSignIn,
    isUserSignedIn,
    getToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}