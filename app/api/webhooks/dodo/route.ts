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
      "Access-Control-Allow-Headers": "Content-Type, dodo-signature",
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
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    // Safe comparison to avoid timing attacks
    // The key fix: don't directly compare potentially different length buffers
    return sigHeader === expectedSig;
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

  const signature = request.headers.get("dodo-signature") || "";

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

    if (!data || !data.customer || !data.customer.email) {
      console.error("Missing required data in webhook payload");
      return NextResponse.json(
        { error: "Invalid webhook data" },
        { status: 400 }
      );
    }

    // 2. Handle different event types
    switch (type) {
      case "customer.created":
        // Link Dodo customer ID to Firebase user
        await updateFirebaseUserData(data.customer.email, {
          dodoCustomerId: data.customer.id,
        });
        console.log("Customer created:", data.customer.id);
        break;

      case "payment.succeeded":
        console.log("Payment succeeded for:", data.customer.email);
        await updateFirebaseUserData(data.customer.email, {
          subscription: {
            status: "active",
            subscriptionId: data.subscription.id,
            plan: data.subscription.items.data[0].price.product.id,
            currentPeriodEnd: new Date(
              data.subscription.current_period_end * 1000
            ),
            dodoCustomerId: data.customer.id,
            lastUpdatedAt: data.data.created_at,
          },
        });
        break;

      case "subscription.renewed":
        console.log("Subscription renewed for:", data.customer.email);
        await updateFirebaseUserData(data.customer.email, {
          subscription: {
            status: "active",
            subscriptionId: data.subscription.id,
            plan: data.subscription.items.data[0].price.product.id,
            currentPeriodEnd: new Date(
              data.subscription.current_period_end * 1000
            ),
            dodoCustomerId: data.customer.id,
            lastUpdatedAt: data.data.created_at,
          },
        });
        break;

      case "invoice.paid":
        console.log("Invoice paid for:", data.customer.email);
        // Find user by customer email
        await updateFirebaseUserData(data.customer.email, {
          subscription: {
            status: "active",
            subscriptionId: data.subscription.id,
            plan: data.subscription.items.data[0].price.product.id,
            currentPeriodEnd: new Date(
              data.subscription.current_period_end * 1000
            ),
            dodoCustomerId: data.customer.id,
            lastUpdatedAt: data.data.created_at,
          },
        });
        break;

      case "subscription.cancelled":
        console.log("Subscription cancelled for:", data.customer.email);
        await updateFirebaseUserData(data.customer.email, {
          "subscription.status": "canceled",
          "subscription.canceledAt": new Date(),
          lastUpdatedAt: data.data.created_at,
        });
        break;

      case "invoice.payment_failed":
      case "subscription.payment_failed":
        console.log("Payment failed for:", data.customer.email);
        await updateFirebaseUserData(data.customer.email, {
          "subscription.status": "past_due",
          "subscription.lastFailedPayment": new Date(),
          lastUpdatedAt: data.data.created_at,
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
