import getUserData from "@/actions/getUserData";
import increaseChatbotMessagesCount from "@/actions/qouta/increase/increase-chatbot-messages-count";
import getUserPricing from "@/actions/user/get-user-pricing";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  vertexai: false,
  apiKey: process.env.GEMINI_API_KEY,
  // project: process.env.GOOGLE_CLOUD_PROJECT,
  // location: process.env.GOOGLE_CLOUD_LOCATION,
});

export async function POST(request: NextRequest) {
  try {
    const {
      prompt = `Wat is AI?`,
      messContext = [],
      productId,
      thinkingBudget = 0,
      drajedContext,
      feedbacks: providedFeedbacks,
      changelog: providedChangelog,
      settings: providedSettings,
    } = await request.json();
    const {userId} = await auth()

    if (!userId) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    if (!prompt || !productId || productId.length < 5) {
      return NextResponse.json(
        { error: "Prompt and productId are required" },
        { status: 400 }
      );
    }

    const {chatbot_messages_monthly = 0, limit_chatbot_messages_monthly = 10} = await getUserPricing(productId);

    console.log("chatbot_messages_monthly", chatbot_messages_monthly);
    console.log("limit_chatbot_messages_monthly", limit_chatbot_messages_monthly);
    
    if (chatbot_messages_monthly >= limit_chatbot_messages_monthly) {
      return NextResponse.json({error: `Chatbot limit exceeded, please upgrade your plan for more messages. Current limit: ${limit_chatbot_messages_monthly}`}, {status: 403})
    }

    // return NextResponse.json({
    //   text: `yooo`
    // })


    // Use provided data instead of fetching
    const feedbacks = Array.isArray(providedFeedbacks) ? providedFeedbacks : [];
    const changelogItems = Array.isArray(providedChangelog) ? providedChangelog : [];
    const settings = providedSettings || {};

    // Compose feedbacksText and changelogText as before, but from provided data
    let feedbacksText = "";
    let changelogText = "";
    if (feedbacks.length === 0) {
      feedbacksText = "Feedback are empty.";
    } else {
      feedbacksText = feedbacks
        .map((f: any) => {
          const name = f.name || (f.feedback && f.feedback.name) || "Unknown";
          const title = f.feedback?.title || "";
          const inputs = f.isComponent ? f.feedback?.inputs : "";
          const richContent = !f.feedback?.isRich
            ? ""
            : (f.feedback?.content?.blocks || [])
                .map((block: any) => block.text)
                .join("\n");
          return `${name}:
    ${title}
    ${inputs}
    ${richContent}
    feedbackId: ${f.feedbackId}
    date: ${f.createdAt?.toLocaleString?.() || f.createdAt || `Unkown`}
    likesCount: ${f.socialData?.liked?.count}
    commentsCount: ${f.socialData?.comments?.count}
    status: ${f.status}
    type: ${f.type}
    all data: ${JSON.stringify(f)}
    `;
        })
        .join("\n");
    }
    if (changelogItems && changelogItems.length > 0) {
      changelogText = changelogItems
        .map((c: any) => {
          return `v${c.version}: ${c.title}\n${
            c.description || ""
          }\nType: ${c.changes?.map((ch: any) => ch.type).join(", ")}\nDate: ${
            c.date
          }\n`;
        })
        .join("\n");
    } else {
      changelogText = "No changelog entries.";
    }

    // Compose the context for Gemini using only provided data
    const contextParts = [
      `Changelog:`,
      changelogText,
      '',
      `Feedbacks:`,
      feedbacksText,
      '',
      `Settings:`,
      JSON.stringify(settings, null, 2),
      '',
      `User referenced feedbacks: ${JSON.stringify(drajedContext) || "No reference, read all feedback"}`,
    ];

    const contents = [
      {
        role: "model",
        parts: [
          {
            text: contextParts.join("\n"),
          },
        ],
      },
      ...(feedbacksText
        ? [
            {
              role: "user",
              parts: [
                {
                  text: `Here are all the feedbacks:\n${feedbacksText}`,
                },
              ],
            },
          ]
        : []),
      ...messContext
        .filter((msg) => msg.content && msg.content.trim())
        .map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        })),
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "models/gemini-2.5-flash-preview-04-17",
      contents,
      config: { thinkingConfig: { thinkingBudget } },
    });

    console.log("Response from AI:", response);

    // Handle Gemini API response safely
    if (
      !response.candidates ||
      !response.candidates[0]?.content?.parts?.[0]?.text
    ) {
      console.error("Error from AI: No valid response candidates", response);
      return NextResponse.json(
        { error: "No valid response from AI" },
        { status: 500 }
      );
    }

    console.log(
      "Response from AI:",
      response.candidates[0].content.parts[0].text
    );
    console.log("Response from AI:", response.candidates[0]);

    await increaseChatbotMessagesCount(userId)

    return NextResponse.json({
      text: response.candidates[0].content.parts[0].text,
    });
  } catch (error: any) {
    console.error("Generation error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
