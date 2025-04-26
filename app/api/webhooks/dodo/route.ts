import updateFirebaseUserData from "@/actions/user/update-firebase-user-data";
import { db } from "@/lib/firebase";
import crypto from "crypto";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Allow CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, webhook-signature",
    },
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

async function verifySignature(
  rawBody: Buffer,
  sigHeader: string,
  secret: string
) {
  try {
    // Parse the signature header (format: v1,signature)
    const parts = sigHeader.split(",");
    if (parts.length !== 2 || parts[0] !== "v1") {
      console.error("Invalid signature format");
      return false;
    }

    const signature = parts[1];

    // Generate expected signature
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("base64");

    // Compare with the provided signature
    return signature === expectedSig;
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

export async function POST(request: Request) {
  console.log("Received webhook request");
  const secret = process.env.DODO_WEBHOOK_SECRET;

  if (!secret) {
    console.error("Missing DODO_WEBHOOK_SECRET environment variable");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  // Use the correct header name from the sample response
  const signature = request.headers.get("webhook-signature") || "";

  try {
    // Get raw body as text first
    const bodyText = await request.text();
    const rawBody = Buffer.from(bodyText);

    console.log("Raw body length:", rawBody.length);
    console.log("Signature:", signature);

    // 1. Verify webhook signature
    if (!(await verifySignature(rawBody, signature, secret))) {
      console.error("Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    console.log("Signature verified successfully");

    // Parse the event data
    const event = JSON.parse(bodyText);
    const { type, data } = event;

    if (!data) {
      console.error("Missing required data in webhook payload");
      return NextResponse.json(
        { error: "Invalid webhook data" },
        { status: 400 }
      );
    }

    // 2. Handle different event types based on the actual response format
    switch (type) {
      case "customer.created":
        // Link Dodo customer ID to Firebase user
        await updateFirebaseUserData(data.customer.email, {
          dodoCustomerId: data.customer.customer_id,
        });
        console.log("Customer created:", data.customer.customer_id);
        break;

      case "payment.succeeded":
        console.log("Payment succeeded for:", data.customer.email);

        // For payment.succeeded, we need to fetch subscription details in a separate call
        // or update with the data we have
        await updateFirebaseUserData(data.customer.email, {
          subscription: {
            status: "active",
            subscriptionId: data.subscription_id,
            dodoCustomerId: data.customer.customer_id,
            lastUpdatedAt: new Date(data.created_at),
            lastPaymentId: data.payment_id,
            lastPaymentAmount: data.total_amount,
            lastPaymentCurrency: data.currency,
          },
        });
        break;

      case "subscription.renewed":
        console.log("Subscription renewed for:", data.customer.email);
        await updateFirebaseUserData(data.customer.email, {
          subscription: {
            status: "active",
            subscriptionId: data.subscription_id,
            dodoCustomerId: data.customer.customer_id,
            lastUpdatedAt: new Date(data.created_at),
          },
        });
        break;

      case "invoice.paid":
        console.log("Invoice paid for:", data.customer.email);
        await updateFirebaseUserData(data.customer.email, {
          subscription: {
            status: "active",
            subscriptionId: data.subscription_id,
            dodoCustomerId: data.customer.customer_id,
            lastUpdatedAt: new Date(data.created_at),
          },
        });
        break;

      case "subscription.cancelled":
        console.log("Subscription cancelled for:", data.customer.email);
        await updateFirebaseUserData(data.customer.email, {
          "subscription.status": "canceled",
          "subscription.canceledAt": new Date(),
          lastUpdatedAt: new Date(data.created_at),
        });
        break;

      case "invoice.payment_failed":
      case "subscription.payment_failed":
        console.log("Payment failed for:", data.customer.email);
        await updateFirebaseUserData(data.customer.email, {
          "subscription.status": "past_due",
          "subscription.lastFailedPayment": new Date(),
          lastUpdatedAt: new Date(data.created_at),
        });
        break;

      default:
        console.warn(`Unhandled event type: ${type}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}
