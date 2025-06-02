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

    // Robust plan and product mapping
    const monthlyId = process.env.DODO_BUILDER_MONTHLY_PRODUCT_ID;
    const annualId = process.env.DODO_BUILDER_ANNUAL_PRODUCT_ID;
    const productId = data.product_id || data.metadata?.product_id;
    let planType: string | undefined = undefined;
    let productName: string | undefined = undefined;
    if (productId === monthlyId) {
      planType = "builder_monthly";
      productName = "Floopr Builder Monthly";
    } else if (productId === annualId) {
      planType = "builder_annual";
      productName = "Floopr Builder Annual";
    } else if (data.metadata?.payment_frequency_interval) {
      if (data.metadata.payment_frequency_interval.toLowerCase() === "year")
        planType = "builder_annual";
      if (data.metadata.payment_frequency_interval.toLowerCase() === "month")
        planType = "builder_monthly";
    }

    const totalAmount =
      data.total_amount ??
      data.recurring_pre_tax_amount ??
      data.metadata?.recurring_pre_tax_amount ??
      null;

    const renewalDate =
      data.renewal_date ||
      data.next_billing_date ||
      data.metadata?.next_billing_date ||
      null;

    const trialEnd =
      data.trial_end ??
      (data.metadata?.trial_period_days
        ? parseInt(data.metadata.trial_period_days) > 0
          ? data.metadata.trial_period_days
          : null
        : null);

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
        if (
          data.customer &&
          data.customer.email &&
          (data.subscription_id || data.metadata?.subscription_id)
        ) {
          await updateFirebaseUserData(data.customer.email, {
            subscription_tier: planType,
            subscription_status: data.status || data.metadata?.status || null,
            subscription_id:
              data.subscription_id || data.metadata?.subscription_id,
            subscription_renewal: renewalDate,
            trial_end: trialEnd,
            updatedAt: new Date().toISOString(),
            payment: {
              status: data.status || data.metadata?.status || null,
              subscriptionId:
                data.subscription_id || data.metadata?.subscription_id,
              dodoCustomerId: data.customer.customer_id,
              lastUpdatedAt: data.updated_at || data.created_at || null,
              paymentId: data.payment_id || null,
              totalAmount,
              currency: data.currency || data.metadata?.currency || null,
              productId,
              productName,
              plan: planType,
              renewalDate,
              trialEnd,
              raw: data,
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
