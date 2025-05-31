import { getAllFeedbacks } from "@/actions/get-all-feedbacks";
import getProductData from "@/actions/get-product-data";
import { db } from "@/lib/firebase";
import { GoogleGenAI } from "@google/genai";
import { serverTimestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  vertexai: false,
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
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

    const responseText = aiResponse.candidates[0].content.parts[0].text;
    console.log(`groupText ai:`, responseText);

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
    console.log(`group`, groups);

    return NextResponse.json({
      groupedFeedback: timestampedGroups,
      allFeedbacks: rawFeedbacksJSON,
    });
  } catch (error) {
    console.error("Handler error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
