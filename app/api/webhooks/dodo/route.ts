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
        await updateFirebaseUserData(data.customer.email, {
          dodoCustomerId: data.customer.id,
        });
        break;
      case "payment.succeeded":
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
        await updateFirebaseUserData(data.customer.email, {
          "subscription.status": "canceled",
          "subscription.canceledAt": new Date(),
          lastUpdatedAt: data.data.created_at,
        });
        break;
      case "invoice.payment_failed":
      case "subscription.payment_failed":
        await updateFirebaseUserData(data.customer.email, {
          "subscription.status": "past_due",
          "subscription.lastFailedPayment": new Date(),
          lastUpdatedAt: data.data.created_at,
        });
        break;
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
