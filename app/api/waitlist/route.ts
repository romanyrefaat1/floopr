import { db } from "@/lib/firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Check if the email already exists in the waitlist collection
    const waitlistRef = collection(db, "waitlist-emails");
    const q = query(waitlistRef, where("email", "==", email));
    
    try {
      const querySnap = await getDocs(q);

      if (!querySnap.empty) {
        return NextResponse.json(
          { error: "Email already exists in waitlist." },
          { status: 400 }
        );
      }
    } catch (firestoreQueryError) {
      console.error("Firestore query error:", firestoreQueryError);
      // Handle query errors gracefully
      return NextResponse.json(
        { error: "Unable to check waitlist. Please try again later." },
        { status: 500 }
      );
    }

    // If email doesn't exist, add a new document
    // Use a simpler document structure - avoid serverTimestamp() for now
    try {
      await addDoc(waitlistRef, {
        email,
        createdAt: new Date().toISOString(),
      });
    } catch (firestoreWriteError) {
      console.error("Firestore write error:", firestoreWriteError);
      return NextResponse.json(
        { error: "Unable to add to waitlist. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}