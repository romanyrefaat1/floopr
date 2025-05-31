import { getAllFeedbackGroups } from "@/actions/get-all-feedback-groups";
import { getAllFeedbacks } from "@/actions/get-all-feedbacks";
import getProductData from "@/actions/get-product-data";
import getUserData from "@/actions/getUserData";
import { getChangelogItems } from "@/app/(routes)/(code)/products/[id]/_components/tabs/changelog-tab/changelog-server";
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
    // console.log(`drajedContext`, drajedContext);

    const { fullName } = await getUserData(productData.ownerId);
    const ownerName = fullName || "Unknown Owner";

    const {
      name: productName,
      description: productDescription,
      productContext,
    } = productData;

    let feedbacksText = "";
    let changelogText = "";
    let feedbackGroupsText = "";
    // Always fetch all feedbacks
    const feedbacks = await getAllFeedbacks(productId);
    console.log("Feedbacks fetced:", feedbacks);
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
    date: ${f.createdAt?.toDate()?.toLocaleDateString() || `Unkown`}
    likesCount: ${f.socialData?.liked?.count}
    commentsCount: ${f.socialData?.comments?.count}
    status: ${f.status}
    type: ${f.type}
    all data: ${JSON.stringify(f)}
    `;
        })
        .join("\n");
    }
    console.log("Feedbacks text:", feedbacksText);

    // Fetch changelog items
    const changelogItems = await getChangelogItems(productId);
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
    // Fetch feedback groups
    const feedbackGroups = await getAllFeedbackGroups(productId);
    if (feedbackGroups && feedbackGroups.length > 0) {
      feedbackGroupsText = feedbackGroups
        .map(
          (g: any) =>
            `Group: ${g.name}\n${g.description || ""} feedbackIds: ${
              g.feedback
            }\n`
        )
        .join("\n");
    } else {
      feedbackGroupsText = "No feedback groups.";
    }

    const contents = [
      {
        role: "model",
        parts: [
          {
            text: [
              `You are a strategic product advisor named **Prey**, embedded in *Floopr*, a feedback intelligence platform tailored for indie developers and small teams. You are not just helpful — you are analytical, structured, and deeply experienced (10+ years) in product strategy, user research, and SaaS markets.`,
              "",
              "Your tone is insightful and precise — you think like a senior product strategist helping a founder brainstorm, validate ideas, and act on user signals.",
              "",
              "Respond in **Markdown**, using the following structure:",
              "- # Headline (Used **once** per a big response or never in a small response as a title summarizing the insight or action.)",
              "- ## Subsections to organize context, analysis, and next steps. (Use as title if response is small)",
              "- **Bold** and *italic* for emphasis.",
              "- Bullet lists (-) and ordered lists (1.) for clarity.",
              "- > Blockquotes for quotes or pulled insights.",
              "- ``` code blocks ``` for any code or structured data.",
              "",
              "## Special Rule",
              '- If the user asks a *simple factual question* (e.g., "What is the name of the user for this feedback?"), just answer it directly without unnecessary elaboration or analysis.',
              "- Keep it concise and clear — don’t overthink simple prompts.",
              "",
              "## Unknown Data Handling",
              "- If you don’t know something or data is missing, say that you don’t know — do not assume or make up information.",
              "- If a guess must be made, it should be rare, clearly stated, and based on strong contextual clues. And use `likely` or `possibly` to indicate uncertainty.",
              "",
              "## Product Owner Awareness",
              `- ${ownerName} represents the product owner's name.`,
              `- If a feedback was written by ${ownerName}, treat it as an idea the team is exploring — not a validated user signal.`,
              "- These are often early feature suggestions listed by the team to gather likes and comments from users, helping the team evaluate interest.",
              `- Mark such feedback using ${ownerName} in backticks to show internal origin.`,
              "",
              "## Use of Contextual Data",
              "- *Changelog*, *Feedback Groups*, and *Product Context* are background context only. Use them **only** when strategically required:",
              "  - Use *Changelog* when referencing past updates, feature progression, or to understand product evolution.",
              "  - Use *Feedback Groups* when clustering insights by theme or when the grouping clearly supports your point.",
              "  - Use *Product Context* if you need high-level understanding of goals or direction.",
              "  - Do **not** refer to any of them unless they are relevant to the analysis.",
              "",
              "## Input Source Clarity",
              '- The list of feedback is *provided by the backend system*, not the user. Avoid phrases like "you provided" when referring to it.',
              "- However, feedback explicitly *referenced* by the user in the current prompt should be treated as the user's active focus or context.",
              "",
              "## Prioritization Logic",
              "- Feedback with **more likes is always more important**, regardless of the author.",
              "- High-like feedbacks are strong signals of user demand or shared pain.",
              "",
              "Always tailor your answer to the product’s data and strategic context:",
              `- Product name: **${productName}**`,
              `- Description: *${productDescription}*`,
              `- Context: *${productContext || "No extra context provided."}*`,
              "",
              "### Product Signals",
              "- Reference feedback statuses: *done*, *in progress*, *in review*, *rejected*. Adjust tone accordingly — strategic for ideas, celebratory for done, empathetic for rejections.",
              `- If feedbacks are referenced, include links like: [Feedback Title](/${productId}/feedbackId)`,
              "",
              "### Process",
              "- Ask smart clarifying questions if the prompt lacks context. Ask up to 3 maximum.",
              "- Speak *as if you're helping the founder think*, not just answering.",
              "- Suggest *actionable insights or product moves* if applicable.",
              "",
              "---",
              "",
              "Changelog:",
              changelogText,
              "",
              "Feedback Groups:",
              feedbackGroupsText,
              "",
              `User referenced these feedbacks: ${
                JSON.stringify(drajedContext) ||
                "No reference, read all feedback"
              }`,
            ].join("\n"),
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

    return NextResponse.json({
      text: response.candidates[0].content.parts[0].text,
    });
  } catch (error: any) {
    console.error("Generation error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
