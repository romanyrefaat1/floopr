// app/api/imports/components/save-simple-data/route.ts
import { NextResponse } from "next/server";
import { addSimpleFeedback } from "@/actions/add-feedback";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: Request) {
  try {
    const reqData = await req.json();

    // Destructure the nested payload
    const {
      feedback: { title, content, isRich, type } = {},
      productId,
      componentId,
      componentRefId,
      isComponent,
      componentType,
      userInfo,
    } = reqData;

    // Re-build the shape your addSimpleFeedback expects:
    const payload = {
      productId,
      componentId,
      componentRefId,
      isComponent,
      componentType,
      userInfo,
      feedback: {
        title: title || "Untitled",
        content: content ?? null,
        isRich: isRich ?? false,
        type,
      },
    };

    console.log("Saving feedback:", payload);
    const result = await addSimpleFeedback(payload);

    return NextResponse.json(result, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Error in save-simple-data:", error);
    return NextResponse.json(
      { success: false, error: error.message || error },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
