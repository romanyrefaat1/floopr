import { getAllFeedbacks } from "@/actions/get-all-feedbacks";
import getProductData from "@/actions/get-product-data";
import getUserPricing from "@/actions/user/get-user-pricing";
import updateFirebaseUserData from "@/actions/user/update-firebase-user-data";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { serverTimestamp, doc, updateDoc, increment } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  vertexai: false,
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    // Get user subscription details and check limits for AI grouping
    // const userSubscription = await getUserPricing();

    // if (userSubscription.isExceededGroupFeedbackLimit) {
    //   return NextResponse.json(
    //     {
    //       error:
    //         "Daily AI-powered feedback grouping limit reached. Please upgrade your plan or try again tomorrow.",
    //     },
    //     { status: 403 } // Or 403 Forbidden
    //   );
    // }

    // await updateFirebaseUserData(
    //   clerkId,
    //   {
    //     group_feedback_count_daily_number: increment(1) ?? 0,
    //     group_feedback_last_reset_date: serverTimestamp(),
    //   },
    //   true
    // );

    const { productId } = await request.json();

    if (!productId || productId.length < 5) {
      return NextResponse.json(
        { error: "productId is required and must be at least 5 characters." },
        { status: 400 }
      );
    }

    const productData = await getProductData(productId);
    if (!productData) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    const feedbacks = await getAllFeedbacks(productId);
    if (!feedbacks || feedbacks.length === 0) {
      return NextResponse.json(
        { error: "No feedback found for this product." },
        { status: 404 }
      );
    }

    const rawFeedbacksJSON = JSON.stringify(feedbacks);

    const feedbackListText = feedbacks
      .map((f) => `ID: ${f.feedbackId}\nContent: ${JSON.stringify(f)}`)
      .join("\n---\n");

    const groupingPrompt = `
Group the following feedback entries by topic, maximum 6 groups. Return an array as JSON(dont add 'json' before the array and make sure I can parse your response) of objects with properties: groupId (string), groupTitle (string),groupDescription(string) feedback (array of feedback IDs).

Please make sure to group feedback properly for example, if you expect get more feedback like this feedback give it its own group, if not group it with other feedback. Also make sure to always include these groups: Spam, Important

Feedback list:
${feedbackListText}

ALWAYS RETURN PARSABLE JSON. I will will parse your response directly so only return
{} json, never return random text. Only return json file. Make sure to group based on topic.

Desired format:
[
  {
    \"groupId\": \"<unique topic id>\",
    \"groupTitle\": \"<descriptive topic name>\",
    \"groupDescription\": \"<descriptive topic description>\",
    \"feedback\": [\"id1\", \"id2\", ...]
  }
]
`;

    const aiResponse = await ai.models.generateContent({
      model: "models/gemini-2.5-flash-preview-04-17",
      contents: [{ role: "user", parts: [{ text: groupingPrompt }] }],
    });

    if (aiResponse.error) {
      console.error("AI error:", aiResponse.error);
      return NextResponse.json({ error: aiResponse.error }, { status: 500 });
    }

    // updateFirebaseUserData(clerkId, {
    //   group_feedback_count_daily_number: increment(1),
    //   group_feedback_last_reset_date: serverTimestamp(),
    // });

    const responseText = aiResponse.candidates[0].content.parts[0].text;
    

    let groups;
    try {
      groups = JSON.parse(responseText);
    } catch (err) {
      console.error("Failed to parse AI response:", responseText);
      return NextResponse.json(
        { error: "Invalid JSON from AI." },
        { status: 500 }
      );
    }

    const timestamp = serverTimestamp();
    const timestampedGroups = groups.map((group) => {
      const feedbackData = group.feedback.map((id) => {
        const match = feedbacks.find((f) => f.feedbackId === id);
        if (!match) {
          console.warn(`Missing feedback with ID: ${id}`);
        }
        return (
          match || {
            feedbackId: id,
            missing: true,
          }
        );
      });
      return {
        ...group,
        feedbackData,
        fireTimestamp: timestamp,
      };
    });
    

    // Increment AI-powered group generation count for the user
    const userDocRef = doc(db, "users", clerkId);
    await updateDoc(userDocRef, {
      group_feedback_count_daily_number: increment(1),
    });

    return NextResponse.json({
      groupedFeedback: timestampedGroups,
      allFeedbacks: rawFeedbacksJSON,
    });
  } catch (error) {
    console.error("Handler error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
