import { NextResponse } from "next/server";
import { prioritizeFeedbacks } from "@/actions/prioritize-feedbacks";

export async function GET() {
  try {
    const result = await prioritizeFeedbacks();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Feedback prioritization error:", error);
    return NextResponse.json(
      {
        error: "Failed to prioritize feedback",
        details: error.message,
      },
      { status: 500 }
    );
  }
}