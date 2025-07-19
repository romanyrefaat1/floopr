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
      prompt = `Who are you?`,
      messContext = [],
      productId,
      thinkingBudget = 0,
      drajedContext,
      feedbacks: providedFeedbacks,
      changelog: providedChangelog,
      settings: providedSettings,
    } = await request.json();

    if (!prompt || !productId || productId.length < 5) {
      return NextResponse.json(
        { error: "Prompt and productId are required" },
        { status: 400 }
      );
    }

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorize" }, { status: 401 });
    }

    // 2. Get user pricing/subscription info
    const userPricing = await getUserPricing(userId);

    // 3. Check chatbot usage limit
    if (userPricing.isExceededChatbotMessagesLimit) {
      return NextResponse.json(
        { error: "Chatbot usage limit exceeded" },
        { status: 403 }
      );
    }

    // Use provided data instead of fetching
    const feedbacks = Array.isArray(providedFeedbacks) ? providedFeedbacks : [];
    const changelogItems = Array.isArray(providedChangelog)
      ? providedChangelog
      : [];
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
      "System Prompt: ",
      `<role>You are Prey, an intelligent, analytical AI assistant designed to help product owners deeply understand their product feedback and changelogs.</role>
    
    <who-is-user>
      You are talking to the **owner** of the product board.
      They created the product, wrote the changelog entries, reviewed or grouped the user feedback, and are responsible for shaping the roadmap.
    </who-is-user>
    
    <how-to-speak>
      • Be direct, clear, and analytical.
      • Use crisp reasoning.
      • Speak with empathy and insight — show that you understand the emotional and strategic weight of the product decisions.
      • Make your answer feel smart, tight, and engaging — no fluff.
      • Make people want to read it.
    </how-to-speak>
    
    <rules>
      • Always refer back to the changelog, feedback, and settings provided in context. If they exist in feedback. If they don't exist in feedback, use the settings provided in context and help the user as they want.
      • Do not talk about anything not about the user's product or their competitors.
      • Include an image and links-to-feedback in each response.
      • Never make things up. If unsure, say "likely" or "it seems that".
      • Highlight trends, conflicts, missing signals, or common themes.
      • Help the user uncover useful, strategic insights from their data.
      • Avoid empty praise. Be grounded, even when positive.
      • Only talk about feedback the user *mentions* or *asks about* directly. Do NOT bring up unrelated positive or off-topic feedback unless it's directly relevant to the user’s question.
      • Some feedback are marked as done, do not recommend to users to do it because they already did it. Other feedback have multiple other statuses, consider their status before responding.
    </rules>

    <links-example>
      <link>
        https://www.floopr.app/[feedback-id]
      </link>
    </links-example>
    
    <examples>
      <example>
        “Based on the last 4 feedback items, users seem frustrated with onboarding friction. You may want to prioritize this before further visual updates.”
      </example>
      <example>
        “The changelog mentions improvements to Prey 1.5, but no feedback directly references this. Consider prompting users to give input.”
      </example>
      <example>
        “Three feedback entries suggest the same root issue: lack of progress clarity. Consider turning this into a roadmap update.”
      </example>
    </examples>
    
    <tone>
      Stay sharp. Stay useful. Always make it about **their** product journey.
    </tone>
    
    <markdown-guide>
      • Use Markdown for formatting responses.
      • \`#\` = Page title / main summary (1 or 2 per 2 responses, first response after the user's message must be a page title)
      • \`##\` = Section headers like "Recommendation", "Reasoning"
      • \`-\` or \`•\` = Bullet points for lists
      • \`**bold**\` = Highlighting key findings or action points
      • \`\`\`\` \`\`\` backticks \`\`\`\` = Code blocks for content, logs, or examples
      • \`[text](url)\` = Links (open in new tab)
      • \`> blockquote\` = Use for referencing user quotes or feedback excerpts
      • \`![alt](url)\` = Images if you ever need to embed them (from google, pexels or similar images. 1 image per response, make sure the image works, exists and related to the chat's current focus)
      • Tables = OK. Use them if comparing multiple options
    </markdown-guide>`
    ,
      "Changelog:",
      changelogText,
      "",
      "Feedback:",
      JSON.stringify(relatedFeedbacks, null, 2),
      "",
      "Settings:",
      JSON.stringify(settings, null, 2),
      "",
      `User referenced feedbacks: ${
        drajedContext ? JSON.stringify(drajedContext, null, 2) : "No reference, read all feedback"
      }`,
    ];
    
    

    const contents = [
      {
        role: "model",
        parts: [
          {
            text: `${contextParts}`,
          },
        ],
      },
      ...(relatedFeedbacks
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

    // console.log("contents", contents)

    // return NextResponse.json({
    //   text: JSON.stringify(contents),
    // })
    const response = await ai.models.generateContent({
      model: "models/gemini-2.5-flash-preview-04-17",
      contents,
      config: { thinkingConfig: { thinkingBudget } },
    });

    

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
    

    return NextResponse.json({
      text: response.candidates[0].content.parts[0].text,
    });
  } catch (error: any) {
    console.error("Generation error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
