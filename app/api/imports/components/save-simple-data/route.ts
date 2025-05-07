import { addSimpleFeedback } from "@/packages/floopr-feedback/float-button/src/utils/add-feedback";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Validation

    const result = await addSimpleFeedback(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error?.message || error,
    });
  }
}
