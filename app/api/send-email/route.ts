import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// 1. Read and set your SendGrid API key once at module load
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

/**
 * POST /api/send-email
 * Expects JSON body: { to: string; subject: string; text?: string; html?: string; }
 */

type EmailParams = {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export async function POST(request: Request) {
  try {
    console.log("Received request to send email");
    const { to, subject, text, html } = await request.json() as EmailParams;

    // 2. Build the message payload
    const msg = {
      to,
      from: "refaatromany641@gmail.com",   // your verified sender
      subject,
      text: text || undefined,
      html: html || undefined,
    };

    console.log("Sending email...", msg);

    // 3. Send the email
    await sgMail.send(msg);
    console.log("Email sent successfully!");

    // 4. Return success response
    return NextResponse.json(
      { success: true, message: "Email sent." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("SendGrid error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.response?.body || error.message,
      },
      { status: 500 }
    );
  }
}
