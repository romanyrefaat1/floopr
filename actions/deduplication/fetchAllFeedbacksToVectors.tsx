'use server';

import { db } from '@/lib/firebaseAdmin';
import { supabase } from '@/lib/supabase';
import { getEmbedding } from '@/lib/embedText';

export async function syncAllFeedbackToSupabaseVectors() {
  const productsSnapshot = await db.collection('products').get();
  const allProducts = productsSnapshot.docs;
// const allProducts = ["31a4fd3d-615a-409c-97ee-bda48bbbb8e2"]
  console.log("allProducts:", allProducts
  )

  let totalFeedbacks = 0;
//   return

  for (const productDoc of allProducts) {
    const productId = productDoc._fieldsProto.docId.stringValue;
    // const productId = "31a4fd3d-615a-409c-97ee-bda48bbbb8e2"
    console.log("productId:", productId)
    const feedbacksSnapshot = await db
      .collection(`products/${productId}/feedbacks`)
      .get();
      console.log("feedbacksSnapshot:", feedbacksSnapshot)

    const feedbacks = feedbacksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("feedbacks:", feedbacks)
    // return;

    for (const feedback of feedbacks) {
      let content;

      if (feedback.feedback.content) {
        if (typeof feedback.feedback.content === "string") {
          content = feedback.feedback.content;
        } else if (
          feedback.feedback.content.blocks &&
          Array.isArray(feedback.feedback.content.blocks)
        ) {
          content = feedback.feedback.content.blocks
            .map((block) => block.text)
            .join("\n");
        }
        else {
          content = "";
        }
      } else if (feedback.feedback.inputs) {
        content = feedback.feedback.inputs
          .map((input) => `${input.label} : ${input.value}`)
          .join("\n");
      } else {
        content = "";
      }
              const title = feedback.feedback.title;
        console.log("title:", title);
        console.log("content:", content)
      const text = (title + content) || '';
    //   break;
      if (!text) continue;

      try {
        const embedding = await getEmbedding(text);

        const { error } = await supabase.from('feedback_vectors').upsert({
          id: feedback.id,
          product_id: productId,
          content: text,
          metadata: feedback,
          embedding,
        });

        if (error) {
          console.error(`[${productId}] Supabase insert error for feedback ${feedback.id}:`, error.message);
        } else {
          totalFeedbacks++;
        }
      } catch (err) {
        console.error(`[${productId}] Embedding error for feedback ${feedback.id}:`, err);
      }
    }
  }

  return { success: true, totalFeedbacks };
}
