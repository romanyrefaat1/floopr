import { addSimpleFeedback } from "@/actions/add-feedback";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: NextRequest) {
  try {
    const reqData = await req.json();
    const data = {
      ...reqData,
      feedback: {
        title: reqData.title || "Untitled",
        content: reqData.content || null,
        isRich: reqData.isRich || false,
      },
    };

    const result = await addSimpleFeedback(data);
    return NextResponse.json(result, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error?.message || error },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
