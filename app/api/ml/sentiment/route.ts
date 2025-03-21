// app/api/sentiment/route.js
import { pipeline } from "@xenova/transformers";
import { NextResponse } from "next/server";

// Create a sentiment analysis pipeline
let sentimentPipeline = null;

// Initialize the pipeline if it hasn't been initialized yet
async function getSentimentPipeline() {
  if (!sentimentPipeline) {
    console.log("Loading sentiment analysis model...");
    try {
      sentimentPipeline = await pipeline(
        "sentiment-analysis",
        "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
      );
      console.log("Sentiment analysis model loaded");
    } catch (error) {
      console.error("Error loading sentiment model:", error);
      throw error;
    }
  }
  return sentimentPipeline;
}

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { text } = body;

    // Validate input
    if (!text) {
      return NextResponse.json(
        { error: 'Missing required "text" field' },
        { status: 400 }
      );
    }

    // Get the sentiment pipeline
    const classifier = await getSentimentPipeline();

    // Perform sentiment analysis
    const result = await classifier(text);
    console.log(`Sentiment result:`, result);

    // Return the result
    return NextResponse.json({
      sentiment: result[0].label,
      score: result[0].score,
      text: text,
    });
  } catch (error) {
    console.error("Sentiment analysis error:", error);
    return NextResponse.json(
      {
        error: "Failed to analyze sentiment",
        details: error.message,
        sentiment: "NEUTRAL",
        score: 0.5,
        text: text || "",
      },
      { status: 500 }
    );
  }
}
