import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const {
        username,
        email,
        password,
        confirmPassword,
        type = "user",
      } = await req.json();
  
      if (!username || !email || !password || !confirmPassword) {
        return NextResponse.json(
          { error: "Credentials are not complete." },
          { status: 400 }
        );
      }
  
      if (password !== confirmPassword) {
        return NextResponse.json(
          { error: "Password and Confirm Password don't match" },
          { status: 400 }
        );
      }
  
      // Try to create the user
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        const user = userCredential.user;
  
        await updateProfile(user, { displayName: username });
  
        await setDoc(doc(db, "users", user.uid), {
          username,
          email: user.email,
          createdAt: new Date(),
          type: type || "user",
        });
  
        // Return success response
        return NextResponse.json(
          {
            success: true,
            user: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            },
          },
          { status: 201 }
        );
      } catch (authError: any) {
        // Handle Firebase auth errors with appropriate messages
        if (authError.code === "auth/email-already-in-use") {
          return NextResponse.json(
            { 
              success: false, 
              error: "This email is already in use. Please use another email." 
            },
            { status: 400 }
          );
        } else if (authError.code === "auth/weak-password") {
          return NextResponse.json(
            { 
              success: false, 
              error: "Password is too weak. Please use a stronger password." 
            },
            { status: 400 }
          );
        } else if (authError.code === "auth/invalid-email") {
          return NextResponse.json(
            { 
              success: false, 
              error: "Invalid email format. Please enter a valid email." 
            },
            { status: 400 }
          );
        }
        
        // Re-throw any other auth errors to be caught by the outer catch
        throw authError;
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      
      return NextResponse.json(
        { success: false, error: "An unknown error occurred." },
        { status: 500 }
      );
    }
  }