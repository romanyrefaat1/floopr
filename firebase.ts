import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe5DDaMyrl1zpu82IMVYdHUE81hZFoDxY",
  authDomain: "ideaboar.firebaseapp.com",
  projectId: "ideaboar",
  storageBucket: "ideaboar.firebasestorage.app",
  messagingSenderId: "476355972239",
  appId: "1:476355972239:web:864e53883df26700bdb4fa",
  measurementId: "G-E0DS66M4Q2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
