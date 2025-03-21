export default async function classifyTopic(
  text: string,
  customLabels: string[] = null
) {
  try {
    // Don't classify if text is empty or too short
    if (!text || text.length < 5) {
      return {
        text: text,
        labels: [],
        scores: [],
        topTopic: "Uncategorized",
        topScore: 0,
      };
    }

    const body: any = { text };
    if (
      customLabels &&
      Array.isArray(customLabels) &&
      customLabels.length > 0
    ) {
      body.labels = customLabels;
    }

    const response = await fetch("/api/ml/topic-classification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.warn(
        `Topic classification failed with status: ${response.status}`
      );
      return {
        text: text,
        labels: [],
        scores: [],
        topTopic: "Uncategorized",
        topScore: 0,
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Error classifying topic:", error);
    // Return a fallback response
    return {
      text: text,
      labels: [],
      scores: [],
      topTopic: "Uncategorized",
      topScore: 0,
      error: error.message,
    };
  }
}

// Example usage with custom topics
//   const customResult = await classifyTopic(
//     "The new smartphone features a revolutionary camera system.",
//     ["Mobile Devices", "Photography", "Software", "Hardware"]
//   );
//   console.log(customResult);
