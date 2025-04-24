'use server';

import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
// Remove the pipeline import as it's no longer needed
// import { pipeline } from "@xenova/transformers";

// Remove the local LLM pipeline initialization and loading function
// let llmPipeline = null;
// async function getLLMPipeline() { ... }

// Function to call the Together AI API (Llama 2)
// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to calculate exponential backoff delay
const getBackoffDelay = (retryCount: number, baseDelay: number = 1000) => {
  return Math.min(baseDelay * Math.pow(2, retryCount), 32000); // Max delay of 32 seconds
};

async function callDeepSeekAPI(prompt: string, retryCount: number = 0): Promise<string> {
  const apiUrl = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1t';
  const apiKey = process.env.TASK_PRIORITIZATION_HUGGINGFACE_API_KEY;
  const maxRetries = 5;

  if (!apiKey) {
    throw new Error("Hugging Face API Key (HUGGINGFACE_API_KEY) is not configured in environment variables.");
  }

  try {
    // Add delay between requests to respect rate limits
    if (retryCount > 0) {
      const backoffDelay = getBackoffDelay(retryCount);
      console.log(`Retrying after ${backoffDelay}ms (attempt ${retryCount + 1}/${maxRetries + 1})`);
      await delay(backoffDelay);
    }

    console.log("Calling DeepSeek model via Hugging Face API...");
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 512,
          temperature: 0.3,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      
      // Handle rate limiting specifically
      if (response.status === 429 && retryCount < maxRetries) {
        console.log(`Rate limit hit, retrying... (${retryCount + 1}/${maxRetries + 1})`);
        return callDeepSeekAPI(prompt, retryCount + 1);
      }

      throw new Error(`Hugging Face API request failed with status ${response.status}: ${errorBody}`);
    }

    const result = await response.json();
    console.log("DeepSeek API response received.");
    
    // Extract the generated text - the structure is different from Together AI
    let generatedText = "";
    if (Array.isArray(result)) {
      generatedText = result[0]?.generated_text || "";
    } else {
      generatedText = result?.generated_text || "";
    }
    
    if (!generatedText) {
      console.warn("DeepSeek API response did not contain expected generated text.", result);
      return "[]"; // Return empty JSON array string if no text found
    }
    
    console.log("Generated text content:", generatedText);
    return generatedText;
  } catch (error) {
    if (retryCount < maxRetries) {
      console.log(`Error occurred, retrying... (${retryCount + 1}/${maxRetries + 1})`);
      return callDeepSeekAPI(prompt, retryCount + 1);
    }
    console.error("Error calling DeepSeek API:", error);
    throw new Error(`Failed to get response from DeepSeek API after ${maxRetries + 1} attempts: ${error.message}`);
  }
}

export async function prioritizeFeedbacks() {
  try {
    // Get all products
    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = [];

    // Fetch all products and their feedbacks
    for (const productDoc of productsSnapshot.docs) {
      try {
        const productData = productDoc.data();
        const feedbacksSnapshot = await getDocs(
          collection(db, `products`, productDoc.id, `feedbacks`)
        );
        const feedbacks = feedbacksSnapshot.docs.map((doc) => ({
          id: doc.id,
          feedback: doc.data(),
          socialData: doc.data().socialData || {},
        }));

        if (feedbacks.length > 0) {
          products.push({
            id: productDoc.id,
            data: productData,
            feedbacks,
          });
        }
      } catch (error) {
        console.error(`Error processing product ${productDoc.id}:`, error);
        continue;
      }
    }

    // Process each product's feedbacks
    console.log(`Processing products...`);
    for (const product of products) {
      try {
        console.log(`Processing product: ${product.data.name}`);

        const context = `Product Name: ${product.data.name}
        Product Description: ${product.data.description || "No description provided"}\n`;

        const feedbacksDescription = product.feedbacks.map((f) => {
          return f.feedback.content?.blocks
            ? f.feedback.content.blocks.map((block) => block.text).join(" ")
            : f.feedback.inputs
            ? f.feedback.inputs.map((input) => input.value).join(" ")
            : "";
        });

        const prompt = `Given the following product and feedback data, analyze and prioritize the feedback items based on their importance and urgency. Return a JSON array of objects containing task, description, id, and priority (0 being highest priority, 10 being lowest):

Product Context:
${context}

Feedback Items:
${product.feedbacks
          .map(
            (f, index) =>
              `- ID: ${f.id}\nFeedback title: ${f.feedback.title}\nDescription: ${feedbacksDescription[index]}\nLikes: ${f.socialData?.likes?.count || 0}\n`
          )
          .join("\n")}\n\nProvide output in this format: [{"task": string, "description": string, "id": string, "priority": number}]`;

        const generatedText = await callDeepSeekAPI(prompt);
        console.log(`Generated priorities for ${product.data.name}`);

        // Parse the generated text to extract JSON
        // Ensure the regex correctly captures the JSON from the API response format
        const jsonStr = generatedText.match(/\s*(\[.*\])\s*/s)?.[1] || "[]";
        let prioritizedFeedbacks = [];
        try {
            prioritizedFeedbacks = JSON.parse(jsonStr);
        } catch (parseError) {
            console.error(`Failed to parse JSON response for ${product.data.name}:`, parseError, "Raw response:", jsonStr);
            // Handle invalid JSON, maybe skip this product or log error
            continue; // Skip to the next product if parsing fails
        }


        // Sort by priority (0 = highest, 10 = lowest)
        prioritizedFeedbacks.sort((a, b) => a.priority - b.priority);

        // Save prioritized tasks to Firestore
        await setDoc(
          doc(db, `products/${product.id}/prioritizedTasks`, "current"),
          {
            tasks: prioritizedFeedbacks,
            updatedAt: new Date(),
          }
        );
        console.log(`Saved priorities for ${product.data.name}`);
      } catch (error) {
        console.error(`Error processing product ${product.data.name}:`, error);
        continue;
      }
    }
    console.log(`Completed processing all products`);

    return { success: true };
  } catch (error) {
    console.error("Feedback prioritization error:", error);
    // Return a structured error response
    return { success: false, error: error.message };
  }
}