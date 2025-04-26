import updateFirebaseUserData from "@/actions/user/update-firebase-user-data";
import { db } from "@/lib/firebase";
import crypto from "crypto";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Allow CORS preflight requests
// This is important for handling CORS preflight requests from the browser
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*", // or specify your frontend origin
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
  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  // Turn both into Buffers of the same encoding
  const incoming = Buffer.from(sigHeader, "hex");
  const expected = Buffer.from(expectedSig, "hex");

  // If lengths differ, immediately return false
  if (incoming.byteLength !== expected.byteLength) {
    return false;
  }

  // Now safe to call timingSafeEqual
  return crypto.timingSafeEqual(incoming, expected);
}

export async function POST(request: Request) {
  console.log("Received webhook request:");
  const secret = process.env.DODO_WEBHOOK_SECRET!;
  const signature = request.headers.get("dodo-signature") || ""; // Verify correct header name
  const rawBody = Buffer.from(await request.text());

  try {
    console.log("Raw body:", rawBody.toString());
    console.log("Signature:", signature);
    console.log("Secret:", secret);
    // 1. Verify webhook signature
    if (!(await verifySignature(rawBody, signature, secret))) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    console.log("Signature verified successfully.");

    console.log("Received webhook:", {
      headers: Object.fromEntries(request.headers),
    });

    console.log("Signature verification:", {
      received: signature,
    });

    const event = JSON.parse(rawBody.toString());
    const { type, data } = event;

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
        console.log("Payment succeeded:", data);
        await updateFirebaseUserData(data.customer.email, {
          triedFromWebhook: true,
        });
        await updateFirebaseUserData(data.customer.email, {
          subscription: {
            status: "active",
            subscriptionId: data.subscription.id,
            plan: data.subscription.items.data[0].price.product.id,
            currentPeriodEnd: new Date(
              data.subscription.current_period_end * 1000
            ),
            dodoCustomerId: data.customer.id,
            lastUpdatedAt: new Date(),
          },
        });
        break;
      case "subscription.renewed":
        console.log("Subscription renewed:", data);
        await updateFirebaseUserData(data.customer.email, {
          subscription: {
            status: "active",
            subscriptionId: data.subscription.id,
            plan: data.subscription.items.data[0].price.product.id,
            currentPeriodEnd: new Date(
              data.subscription.current_period_end * 1000
            ),
            dodoCustomerId: data.customer.id,
            lastUpdatedAt: new Date(),
          },
        });
      case "invoice.paid":
        console.log("Invoice paid:", data);
        // Find user by customer reference (your Firebase UID)
        await updateFirebaseUserData(data.customer.email, {
          subscription: {
            status: "active",
            subscriptionId: data.subscription.id,
            plan: data.subscription.items.data[0].price.product.id,
            currentPeriodEnd: new Date(
              data.subscription.current_period_end * 1000
            ),
            dodoCustomerId: data.customer.id,
          },
        });
        break;

      case "subscription.cancelled":
        console.log("Subscription cancelled:", data);
        await updateFirebaseUserData(data.customer.email, {
          "subscription.status": "canceled",
          "subscription.canceledAt": new Date(),
          lastUpdatedAt: new Date(),
        });
        break;

      case "invoice.payment_failed":
      case "subscription.payment_failed":
        console.log("Payment failed:", data);
        await updateFirebaseUserData(data.customer.email, {
          "subscription.status": "past_due",
          "subscription.lastFailedPayment": new Date(),
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
