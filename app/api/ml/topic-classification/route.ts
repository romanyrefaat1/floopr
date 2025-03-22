// app/api/topic-classification/route.js
import { pipeline } from "@xenova/transformers";
import { NextResponse } from "next/server";

// Create a zero-shot classification pipeline
let classificationPipeline = null;

// Default topics if none are provided
const DEFAULT_TOPICS = [
  'User Interface',
  'Performance',
  'Features',
  'Pricing',
  'Customer Support',
  'Usability',
  'Security',
  'Integration',
  'Customization',
  'Scalability',
  'Reliability',
  'Accessibility',
  'Documentation',
  'Ease of Use',
  'Design',
  'User Experience',
  'Functionality',
  'Innovation',
  'Data Handling',
  'Privacy',
  'Mobile Experience',
  'Compatibility',
  'Customer Engagement',
  'Onboarding',
  'Analytics',
  'Communication',
  'Error Handling',
  'Maintenance',
  'Feedback Loop',
  'Updates',
  'Market Trends',
  'Technology Stack',
  'User Retention',
  'Conversion Rates',
  'Branding',
  'Support Resources',
  'Training Materials',
  'Bug Reporting',
  'Feature Requests'
];

// Initialize the pipeline if it hasn't been initialized yet
async function getClassificationPipeline() {
  if (!classificationPipeline) {
    console.log("Loading zero-shot classification model...");
    try {
      classificationPipeline = await pipeline(
        "zero-shot-classification",
        "Xenova/bart-large-mnli"
      );
      console.log("Zero-shot classification model loaded");
    } catch (error) {
      console.error("Error loading classification model:", error);
      throw error;
    }
  }
  return classificationPipeline;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { text, labels } = body;

    // Validate input
    if (!text) {
      return NextResponse.json(
        { error: 'Missing required "text" field' },
        { status: 400 }
      );
    }

    // Use provided labels or default topics
    const candidateLabels =
      labels && Array.isArray(labels) && labels.length > 0
        ? labels
        : DEFAULT_TOPICS;

    // Get the classification pipeline
    const classifier = await getClassificationPipeline();

    // Perform zero-shot classification
    const result = await classifier(text, candidateLabels);

    // Return the result
    return NextResponse.json({
      text: text,
      labels: result.labels,
      scores: result.scores,
      // Include the top matching topic
      topTopic: result.labels[0],
      topScore: result.scores[0],
    });
  } catch (error) {
    console.error("Topic classification error:", error);
    return NextResponse.json(
      {
        error: "Failed to classify topic",
        details: error.message,
        text: text || "",
        labels: [],
        scores: [],
        topTopic: "Uncategorized",
        topScore: 0,
      },
      { status: 500 }
    );
  }
}
