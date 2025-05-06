import { getAllFeedbacks } from "@/actions/get-all-feedbacks";
import getProductData from "@/actions/get-product-data";
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
    } = await request.json();

    if (!prompt || !productId || productId.length < 5) {
      return NextResponse.json(
        { error: "Prompt and productId are required" },
        { status: 400 }
      );
    }

    if (!messContext) {
      console.warn("messContext is empty, using default context.");
    }

    const productData = await getProductData(productId);
    if (!productData) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const {
      name: productName,
      description: productDescription,
      productContext,
    } = productData;

    let feedbacksText = "";
    if (prompt.includes("#all-feedbacks")) {
      // Fetch feedbacks from your DB or API here
      // Example: const feedbacks = await getAllFeedbacks(productId);
      // For demo, let's use a placeholder:
      // const feedbacks = [
      //   { user: "Alice", feedback: "Great product!" },
      //   { user: "Bob", feedback: "Needs improvement." },
      // ];
      const feedbacks = await getAllFeedbacks(productId);
      console.log("Feedbacks fetced:", feedbacks);
      if (feedbacks.length === 0) {
        feedbacksText = "Feedbacks are empty.";
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
    feedbackId: ${f.feedbackId}`;
          })
          .join("\n");
      }
    }
    console.log("Feedbacks text:", feedbacksText);

    const contents = [
      {
        role: "model",
        parts: [
          {
            text: `You are a helpful assistant. Follow the user's instructions carefully. Based on the context, you can answer questions about the feedbacks and the product. You are a chatbot for Floopr, a product feedback platform. You are a helpful assistant. Follow the user's instructions carefully. Based on the context, you can answer questions about the feedbacks and the product. Your name is Prey. Make sure to reference the feedbacks in your answers, and you can show a tag of the feedback with href: floopr.vercel.app/${productId}/feedbackId. User's product name: ${productName}, user's product description: ${productDescription}, user's product context: ${
              productContext || ``
            }.`,
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
      ...messContext.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
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

    if (response.error) {
      console.error("Error from AI:", response.error);
      return NextResponse.json({ error: response.error }, { status: 500 });
    }
    console.log(
      "Response from AI:",
      response.candidates[0].content.parts[0].text
    );
    console.log("Response from AI:", response.candidates[0]);

    return NextResponse.json({
      text: response.candidates[0].content.parts[0].text,
    });
  } catch (error: any) {
    console.error("Generation error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
