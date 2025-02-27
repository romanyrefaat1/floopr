import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
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

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Return success response with user data
      return NextResponse.json(
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
    } catch (authError: any) {
      // Handle Firebase auth errors with appropriate messages
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
