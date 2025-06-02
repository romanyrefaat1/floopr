// app/api/create-subscription/route.ts
import DodoPayments from "dodopayments";
// SDK import :contentReference[oaicite:8]{index=8}
import { NextResponse } from "next/server";

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!, // test key :contentReference[oaicite:9]{index=9}
  environment: "test_mode", // ensure test endpoint
});

async function ensureCustomer(email: string, name: string, reference: string) {
  try {
    return await client.customers.retrieve(reference); // try retrieve :contentReference[oaicite:10]{index=10}
  } catch (err: any) {
    if (err.status === 404) {
      return await client.customers.create({ email, name }); // create on 404 :contentReference[oaicite:11]{index=11}
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

    // 2) select product ID based on plan
    let productId = process.env.DODO_BUILDER_MONTHLY_PRODUCT_ID!;
    let trialDays: number | undefined = undefined;
    if (plan === "annual") {
      productId = process.env.DODO_BUILDER_ANNUAL_PRODUCT_ID!;
    } else {
      // monthly is default
      trialDays = 7;
    }

    // 3) create subscription
    const subscription = await client.subscriptions.create({
      billing: {
        city: "Cairo",
        country: "EG",
        state: "Cairo Governorate",
        street: "123 Nile St",
        zipcode: "11511",
      },
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
