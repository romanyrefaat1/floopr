import { serve } from "https://deno.land/x/sift@0.6.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY   = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase     = createClient(SUPABASE_URL, SERVICE_KEY);

// your existing Jina wrapper, unchanged
async function getEmbedding(text: string): Promise<number[]> {
  const res = await fetch("https://api.jina.ai/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Deno.env.get("JINA_API_KEY")}`,
    },
    body: JSON.stringify({
      input: [text],
      model: "jina-embeddings-v3",
      task: "text-matching",
    }),
  });
  if (!res.ok) throw new Error(`Jina API error: ${res.status} – ${await res.text()}`);
  const { data } = await res.json();
  return data[0].embedding;
}

serve(async (req) => {
  try {
    // 1) read everything from the POST body
    const { id, product_id, content, metadata, createdAt } = await req.json();

    // 2) build the text: title + content
    const title   = metadata?.title ?? "";
    const text    = [title, content].filter(Boolean).join("\n").trim();
    if (!text) throw new Error("Empty text – nothing to embed");

    // 3) compute the embedding
    const embedding = await getEmbedding(text);

    // 4) upsert into feedback_vectors
    const { error } = await supabase
      .from("feedback_vectors")
      .upsert({
        id,
        product_id,
        content,
        metadata,
        created_at: createdAt,
        embedding,
      });

    if (error) throw error;
    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err: any) {
    console.error("embed-feedback error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
