'use server';

import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { pipeline } from "@xenova/transformers";

// Initialize the pipeline with a smaller model
let llmPipeline = null;

async function getLLMPipeline() {
  if (!llmPipeline) {
    console.log("Loading language model...");
    try {
      // Use a timeout to prevent hanging
      const modelPromise = pipeline(
        "text-generation",
        "Xenova/tiny-random-gpt2",
        { quantized: true } // Use quantized model for lower memory usage
      );
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Model loading timed out')), 30000);
      });

      llmPipeline = await Promise.race([modelPromise, timeoutPromise]);
      console.log("Language model loaded successfully");
    } catch (error) {
      console.error("Error loading language model:", error);
      throw new Error(`Failed to load language model: ${error.message}`);
    }
  }
  return llmPipeline;
}

export async function prioritizeFeedbacks() {
  try {
    // Get all products
    const productsSnapshot = await getDocs(collection(db, 'products'));
    const products = [];

    // Fetch all products and their feedbacks
    for (const productDoc of productsSnapshot.docs) {
      try {
        const productData = productDoc.data();
        const feedbacksSnapshot = await getDocs(collection(db, `products`, productDoc.id, `feedbacks`));
        const feedbacks = feedbacksSnapshot.docs.map(doc => ({
          id: doc.id,
          feedback: doc.data(),
          socialData: doc.data().socialData || {}
        }));

        if (feedbacks.length > 0) {
          products.push({
            id: productDoc.id,
            data: productData,
            feedbacks
          });
        }
      } catch (error) {
        console.error(`Error processing product ${productDoc.id}:`, error);
        continue;
      }
    }

    // Get the LLM pipeline
    const llm = await getLLMPipeline();

    // Process each product's feedbacks
    console.log(`start products for loop`)
    for (const product of products) {
    //   if (product.feedbacks.length === 0) continue;
    console.log(`start new product in projress in for loop`)

      const context = `Product Name: ${product.data.name}
      Product Description: ${product.data.description || 'No description provided'}\n`;

      const feedbacksDescription = product.feedbacks.map(f => {
        return f.feedback.content?.blocks 
          ? f.feedback.content.blocks.map(block => block.text).join(' ')
          : f.feedback.inputs 
            ? f.feedback.inputs.map(input => input.value).join(' ')
            : '';
      });

      const prompt = `Given the following product and feedback data, analyze and prioritize the feedback items based on their importance and urgency. Return a JSON array of objects containing task, description, id, and priority (0 being highest priority, 10 being lowest):\n\nProduct Context:\n${context}\n\nFeedback Items:\n${product.feedbacks
        .map(
          (f, index) =>
            `- ID: ${f.id}\nFeedback title: ${f.feedback.title}\nDescription: ${feedbacksDescription[index]}\nLikes: ${f.socialData?.likes?.count || 0}\n`
        )
        .join("\n")}\n\nProvide output in this format: [{"task": string, "description": string, "id": string, "priority": number}]`;

      // Generate prioritization using LLM
      const result = await llm(prompt, {
        max_new_tokens: 1000,
        temperature: 0.3,
      });
      console.log("LLM Result:", result);

      // Parse the generated text to extract JSON
      const jsonStr = result[0].generated_text.match(/\[.*\]/s)?.[0] || "[]";
      const prioritizedFeedbacks = JSON.parse(jsonStr);

      // Sort by priority (0 = highest, 10 = lowest)
      prioritizedFeedbacks.sort((a, b) => a.priority - b.priority);

      // Save prioritized tasks to Firestore
      await setDoc(doc(db, `products/${product.id}/prioritizedTasks`, 'current'), {
        tasks: prioritizedFeedbacks,
        updatedAt: new Date()
      });
      console.log(`finished new product in projress in for loop`)
    }
    console.log(`finished products for loop`)

    return { success: true };
  } catch (error) {
    console.error("Feedback prioritization error:", error);
    throw error;
  }
}