import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(request: Request) {
  console.log("Start: GET request to load component data");

  try {
    // Get URL parameters
    const url = new URL(request.url);
    const apiKey = url.searchParams.get("apiKey");
    const productId = url.searchParams.get("productId");
    const componentId = url.searchParams.get("componentId");

    console.log("Params:", { apiKey, productId, componentId });

    // Check if required data is provided
    if (!apiKey || !productId || !componentId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // Get document from Firestore
    const response = await getDoc(
      doc(db, `products/${productId}/components/${componentId}`)
    );

    const data = response.data();
    console.log(`Data from firestore:`, data);

    if (!data) {
      return NextResponse.json(
        { error: "Component not found" },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    // Validate API key
    const isAPIKeyCorrect = data?.apiKey === apiKey;
    if (!isAPIKeyCorrect) {
      return NextResponse.json(
        { error: "Invalid API key" },
        {
          status: 401,
          headers: corsHeaders,
        }
      );
    }

    // Return component data with CORS headers
    return NextResponse.json(data.componentData, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
