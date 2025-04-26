import updateFirebaseUserData from "@/actions/user/update-firebase-user-data";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";

// Placeholder for WebhookPayload type. Replace with actual type if available.
// type WebhookPayload = WebhookPayload;

const webhook = new Webhook(process.env.DODO_WEBHOOK_SECRET!); // Replace with your secret key generated from the Dodo Payments Dashboard

export async function POST(request: Request) {
  const headersList = await headers();
  const rawBody = await request.text();

  const webhookHeaders = {
    "webhook-id": headersList.get("webhook-id") || "",
    "webhook-signature": headersList.get("webhook-signature") || "",
    "webhook-timestamp": headersList.get("webhook-timestamp") || "",
  };

  try {
    await webhook.verify(rawBody, webhookHeaders);
    const event = JSON.parse(rawBody);
    const { type, data } = event;

    if (!data || !data.customer || !data.customer.email) {
      return NextResponse.json(
        { error: "Invalid webhook data" },
        { status: 400 }
      );
    }

    switch (type) {
      case "customer.created":
        // You may need to adjust this if the payload structure is different for customer.created
        if (data.customer && data.customer.email && data.customer.customer_id) {
          await updateFirebaseUserData(data.customer.email, {
            dodoCustomerId: data.customer.customer_id,
          });
        }
        break;
      case "payment.succeeded":
        // Adjusted for new DodoPayments payload structure
        if (data.customer && data.customer.email && data.subscription_id) {
          await updateFirebaseUserData(data.customer.email, {
            subscription: {
              status: data.status || "active",
              subscriptionId: data.subscription_id,
              plan: undefined, // No plan/product info in payload, set if available
              currentPeriodEnd: undefined, // No period info in payload, set if available
              dodoCustomerId: data.customer.customer_id,
              lastUpdatedAt: data.created_at,
              paymentId: data.payment_id,
              totalAmount: data.total_amount,
              currency: data.currency,
            },
          });
        }
        break;
      // Add more cases as needed for other event types
      default:
        // Unhandled event type
        break;
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: (error as Error).message || "Webhook processing failed",
      }),
      { status: 400 }
    );
  }
}
