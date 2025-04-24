// app/api/webhooks/dodo/route.ts

import updateFirebaseUserData from "@/actions/user/update-firebase-user-data";
import { db } from "@/lib/firebase";
import crypto from "crypto";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

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
  return crypto.timingSafeEqual(
    Buffer.from(expectedSig),
    Buffer.from(sigHeader)
  );
}

export async function POST(request: Request) {
  const secret = process.env.DODO_WEBHOOK_SECRET!;
  const signature = request.headers.get("dodo-signature") || ""; // Verify correct header name
  const rawBody = Buffer.from(await request.text());

  try {
    // 1. Verify webhook signature
    if (!(await verifySignature(rawBody, signature, secret))) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody.toString());
    const { type, data } = event;

    // 2. Handle different event types
    switch (type) {
      case "customer.created":
        // Link Dodo customer ID to Firebase user
        await updateFirebaseUserData(data.customer.reference, {
          dodoCustomerId: data.customer.id,
        });
        break;

      case "subscription.succeeded":
        await updateFirebaseUserData(data.customer.reference, {
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
      case "subscription.renewed":
      case "invoice.paid":
        // Find user by customer reference (your Firebase UID)
        await updateFirebaseUserData(data.customer.reference, {
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
        await updateFirebaseUserData(data.customer.reference, {
          "subscription.status": "canceled",
          "subscription.canceledAt": new Date(),
        });
        break;

      case "invoice.payment_failed":
      case "subscription.payment_failed":
        await updateFirebaseUserData(data.customer.reference, {
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
