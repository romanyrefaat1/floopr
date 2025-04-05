import {
  addComponentFeedback,
  addSimpleFeedback,
} from "@/actions/add-feedback";
import { NextResponse } from "next/server";

{
  /*
    Tasks:
        1. See if params are correct
        2. Save data to /products/{productId}/feedbacks/
        3. Add component ref to te db
    */
}

type InputItem = {
  label: string;
  placeholder: string;
  id: number;
  value: string;
};

type SaveDataProps = {
  productId: string;
  componentId: string;
  inputs: Array<InputItem>;
  rating: number;
  userInfo?: {
    userId?: string;
    username?: string;
    profilePicture?: string;
  };
};

export async function POST(req: Request) {
  console.log(`Enter save-data`);
  try {
    const { productId, componentId, inputs, rating, userInfo }: SaveDataProps =
      await req.json();

    if (!productId || !componentId || !inputs || !rating) {
      console.error("Missing required parameters");
      return NextResponse.json(
        { success: false, error: "Missing required parameters" },
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const { success } = await addComponentFeedback({
      productId: productId,
      componentRefId: componentId,
      userInfo: userInfo || null,
      inputs,
      rating,
    });
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Failed to save feedback" },
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    return NextResponse.json(
      { success: true },
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in save-data route:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
