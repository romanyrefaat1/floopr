import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

{
  /*
    Tasks:
        1. See if parsed data is correct
        2. See if api key is correct
        3. get data from firestore
        4. return data
  */
}

// Consistent CORS headers for all responses
const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", // or "*" for all origins
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: Request) {
  console.log("Start: POST request to load component data");

  try {
    const { apiKey, productId, componentId } = await request.json();
    console.log(
      "apiKey, productId, componentId",
      apiKey,
      productId,
      componentId
    );

    // Check if required data is provided
    if (!apiKey || !productId || !componentId) {
      return NextResponse.json(
        { error: "Invalid data" },
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
    console.log(`data from firestore/backend:`, data);

    // Check if component exists
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
