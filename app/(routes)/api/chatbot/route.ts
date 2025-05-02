import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, allMessages } = await req.json();
  // Simulate a response
  return NextResponse.json({ reply: "Yoo" });
}
