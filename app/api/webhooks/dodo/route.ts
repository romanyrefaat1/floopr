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

    // Helper: extract plan type from product name or metadata if available
    let planType: string | undefined = undefined;
    if (data.product && data.product.name) {
      if (data.product.name.toLowerCase().includes("annual"))
        planType = "builder_annual";
      else if (data.product.name.toLowerCase().includes("month"))
        planType = "builder_monthly";
    }

    switch (type) {
      case "customer.created":
        if (data.customer && data.customer.email && data.customer.customer_id) {
          await updateFirebaseUserData(data.customer.email, {
            dodoCustomerId: data.customer.customer_id,
          });
        }
        break;
      case "payment.succeeded":
      case "subscription.created":
      case "subscription.updated":
      case "subscription.renewed":
      case "subscription.cancelled":
        // Save all relevant payment/subscription info
        if (data.customer && data.customer.email && data.subscription_id) {
          await updateFirebaseUserData(data.customer.email, {
            subscription_tier: planType || data.plan || null,
            subscription_status: data.status || null,
            subscription_id: data.subscription_id,
            subscription_renewal:
              data.renewal_date || data.next_billing_date || null,
            trial_end: data.trial_end || null,
            updatedAt: new Date().toISOString(),
            payment: {
              status: data.status || null,
              subscriptionId: data.subscription_id,
              dodoCustomerId: data.customer.customer_id,
              lastUpdatedAt: data.updated_at || data.created_at || null,
              paymentId: data.payment_id || null,
              totalAmount: data.total_amount || null,
              currency: data.currency || null,
              productId: data.product_id || null,
              productName: data.product?.name || null,
              plan: planType || data.plan || null,
              renewalDate: data.renewal_date || data.next_billing_date || null,
              trialEnd: data.trial_end || null,
              raw: data, // Save the full payload for debugging
            },
          });
        }
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
