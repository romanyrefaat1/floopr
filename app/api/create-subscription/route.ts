// app/api/create-subscription/route.ts
import DodoPayments from "dodopayments";
import { NextResponse } from "next/server";

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!, // live key
});

async function ensureCustomer(email: string, name: string, reference: string) {
  try {
    return await client.customers.retrieve({ customer_id: reference });
  } catch (err: any) {
    if (err.status === 404) {
      return await client.customers.create({ email, name });
    }
    throw err;
  }
}

export async function POST(request: Request) {
  try {
    const { userId, userName = "User", email, plan } = await request.json();

    

    // 1) ensure customer exists
    const customer = await ensureCustomer(email, userName, userId);
    const custId = customer.customer_id;

    // 2) select product ID based on plan - using live product IDs
    let productId = process.env.DODO_BUILDER_MONTHLY_PRODUCT_ID_LIVE!;
    let trialDays: number | undefined = undefined;
    if (plan === "annual") {
      productId = process.env.DODO_BUILDER_ANNUAL_PRODUCT_ID_LIVE!;
      trialDays = 7;
    } else {
      // monthly is default
      trialDays = 5;
    }

    // 3) create subscription with fallback billing info
    const billingInfo = {
      city: "N/A",
      country: "EG",
      state: "N/A",
      street: "N/A",
      zipcode: "00000",
    };

    const subscription = await client.subscriptions.create({
      billing: billingInfo,
      customer: { customer_id: custId },
      product_id: productId,
      quantity: 1,
      payment_link: true,
      return_url: process.env.NEXT_PUBLIC_DODO_RETURN_URL,
      ...(trialDays ? { trial_period_days: trialDays } : {}),
    });

    return NextResponse.json({ checkoutUrl: subscription.payment_link });
  } catch (err: any) {
    console.error("Dodo Payment Error:", err);
    return NextResponse.json(
      { error: err.message || "Subscription creation failed" },
      { status: err.status || 500 }
    );
  }
}
