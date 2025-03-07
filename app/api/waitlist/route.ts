import { db } from "@/lib/firebase";
import sgMail from "@sendgrid/mail";
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

    // Set up SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    // Email options for confirmation email to the user
    const confirmationEmail = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || "",
      subject: "Welcome to the MainFocus Waitlist!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h1 style="color: black; margin-bottom: 20px;">Thank You for Joining Our Waitlist!</h1>
          <p style="color: #374151; line-height: 1.5;">Hi there,</p>
          <p style="color: #374151; line-height: 1.5;">
            Thank you for joining the MainFocus waitlist. We're excited to have you on board!
          </p>
          <p style="color: #374151; line-height: 1.5;">
            We're working hard to bring you something amazing. You'll be among the first to know when we launch, and one of our exclusive early adopters who will earn special rewards.
          </p>
          <p style="color: #374151; line-height: 1.5;">Stay tuned!</p>
          <p style="color: #374151; line-height: 1.5;">The MainFocus Team</p>
        </div>
      `,
    };

    // Email notification for the admin
    const adminNotification = {
      to: process.env.ADMIN_EMAIL || process.env.SENDGRID_FROM_EMAIL || "",
      from: process.env.SENDGRID_FROM_EMAIL || "",
      subject: "New MainFocus Waitlist Signup",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h1 style="color: #4f46e5; text-align: center; margin-bottom: 20px;">New MainFocus Waitlist Signup</h1>
          <p style="color: #374151; line-height: 1.5;">A new user has joined the waitlist:</p>
          <p style="color: #374151; line-height: 1.5; background-color: #f3f4f6; padding: 10px; border-radius: 4px;">${email}</p>
          <p style="color: #374151; line-height: 1.5;">Current timestamp: ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    // Send emails
    try {
      await sgMail.send(confirmationEmail);
      await sgMail.send(adminNotification);
    } catch (emailError) {
      console.error("SendGrid error:", emailError);
      // Still return success if Firebase save worked but email failed
      return NextResponse.json({
        success: true,
        warning:
          "Email saved to waitlist but confirmation email failed to send",
      });
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