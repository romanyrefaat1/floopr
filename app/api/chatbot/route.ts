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
      drajedContext,
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
    console.log(`drajedContext`, drajedContext);
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
    feedbackId: ${f.feedbackId}
    date: ${f.createdAt?.toDate()?.toLocaleDateString() || `Unkown`}
    likesCount: ${f.socialData?.liked?.count}
    commentsCount: ${f.socialData?.comments?.count}
    status: ${f.status}
    type: ${f.type}
    `;
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
            text: `You are a helpful assistant named **Prey** for *Floopr*, a product feedback platform. Follow the user's instructions carefully. Based on the context, you can answer questions about the feedbacks and the product.

Always format your responses using Markdown. Use the following conventions:

- # Headlines for top-level headings (equivalent to #). => Use it once in every response, make it te Headline
- ## Subheadlines for secondary headings (equivalent to ##).  
- *Italic* for emphasis.  
- **Bold** for strong emphasis.  
- Use lists (- or 1.) for grouping items.  
- Use blockqoutes (> Text)
- Use code (\`\`\`) for code.

Make sure to reference the feedbacks in your answers, and show a link to any specific feedback using this template:  
\`[Link name](/${productId}/feedbackId)\`

If you dont know te feedback context, say it.

User’s product name: **${productName}**  
User’s product description: *${productDescription}*  
User’s product context: *${productContext || ``}\`*

User referenced tese feedback to teir messaje: ${
              JSON.stringify(drajedContext) || `No reference, read all feedback`
            }
`,
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
