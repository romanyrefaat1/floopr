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
      currPage
    } = reqData;
    console.log("Received data:", reqData);

    // Re-building the shape that addSimpleFeedback expects:
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
      currPage
    };

    console.log("Saving feedback:", payload);
    const result = await addSimpleFeedback(payload);

    console.log("Result from addSimpleFeedback:", result);
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
