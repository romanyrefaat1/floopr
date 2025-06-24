import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
      !process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
      !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      !process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      !process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
      !process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
      !process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    ) {
      return NextResponse.json(
        { success: false, error: "Firebase configuration is missing." },
        { status: 500 }
      );
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      

      // Generate ID token
      const token = await getIdToken(user);
      

      // Create response with token as HTTP-only cookie
      const response = NextResponse.json(
        {
          success: true,
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          },
        },
        { status: 200 }
      );

      // Set HTTP-only, secure cookie with the token
      response.cookies.set('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });
      

      return response;
    } catch (authError: any) {
      // Existing error handling remains the same
      if (
        authError.code === "auth/user-not-found" ||
        authError.code === "auth/wrong-password"
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid email or password. Please try again.",
          },
          { status: 401 }
        );
      } else if (authError.code === "auth/invalid-email") {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid email format. Please enter a valid email.",
          },
          { status: 400 }
        );
      } else if (authError.code === "auth/user-disabled") {
        return NextResponse.json(
          {
            success: false,
            error: "This account has been disabled. Please contact support.",
          },
          { status: 403 }
        );
      } else if (authError.code === "auth/too-many-requests") {
        return NextResponse.json(
          {
            success: false,
            error:
              "Too many unsuccessful login attempts. Please try again later.",
          },
          { status: 429 }
        );
      }

      // Re-throw any other auth errors to be caught by the outer catch
      throw authError;
    }
  } catch (error: any) {
    console.error("Signin error:", error);

    return NextResponse.json(
      { success: false, error: "An unknown error occurred." },
      { status: 500 }
    );
  }
}