// Client-side code to call the sentiment analysis endpoint
export async function analyzeSentiment(text) {
  try {
    // Don't analyze if text is empty or too short
    if (!text || text.length < 5) {
      return {
        sentiment: "NEUTRAL",
        score: 0.5,
        text: text,
      };
    }

    const response = await fetch("/api/ml/sentiment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    console.log(`sintemnt client response`, response);

    if (!response.ok) {
      console.warn(`Sentiment analysis failed with status: ${response.status}`);
      return {
        sentiment: "NEUTRAL",
        score: 0.5,
        text: text,
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    // Return a neutral sentiment as fallback
    return {
      sentiment: "NEUTRAL",
      score: 0.5,
      text: text,
    };
  }
}
