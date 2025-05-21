import { addSimpleFeedback } from "@/actions/add-feedback";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Validation

    const result = await addSimpleFeedback(data);
    return NextResponse.json(result, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error?.message || error,
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
