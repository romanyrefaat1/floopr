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
    const { userId, userName = "User", email } = await request.json();

    // 1) ensure customer exists
    const customer = await ensureCustomer(email, userName, userId);
    const custId = customer.customer_id;

    // 2) create subscription
    const subscription = await client.subscriptions.create({
      billing: {
        // required billing block :contentReference[oaicite:12]{index=12}
        city: "Cairo",
        country: "EG",
        state: "Cairo Governorate",
        street: "123 Nile St",
        zipcode: "11511",
      },
      customer: { customer_id: custId }, // existing or newly created ID :contentReference[oaicite:13]{index=13}
      product_id: process.env.DODO_STARTER_PRODUCT_ID!, // your product ID :contentReference[oaicite:14]{index=14}
      quantity: 1, // ≥1 :contentReference[oaicite:15]{index=15}
      payment_link: true, // return hosted checkout URL :contentReference[oaicite:16]{index=16}
      return_url: process.env.NEXT_PUBLIC_DODO_RETURN_URL,
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
