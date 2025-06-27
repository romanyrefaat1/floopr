export async function getEmbedding(text: string): Promise<number[]> {
  const res = await fetch('https://api.jina.ai/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer jina_d868f73d9fbc4380bf86527c249cf8c8yZRXoIapuHGWAojEyxrfcNCsxMmK`,
    },
    body: JSON.stringify({
      input: [text],
      model: 'jina-embeddings-v3',
      task: 'text-matching', // Use appropriate task type like 'retrieval.query' for retrieval
    //   pooling: 'mean', // Apply mean pooling to average token embeddings
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Jina API error: ${res.status} - ${err}`);
  }

  const data = await res.json();
  console.log("dataa from embedding text", data);
  return data.data[0].embedding; // returns mean pooled embedding
}

// curl https://api.jina.ai/v1/embeddings \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer jina_d868f73d9fbc4380bf86527c249cf8c8yZRXoIapuHGWAojEyxrfcNCsxMmK" \
//   -d @- <<EOFEOF
//   {
//     "model": "jina-embeddings-v3",
//     "task": "text-matching",
//     "input": [
//         "Organic skincare for sensitive skin with aloe vera and chamomile: Imagine the soothing embrace of nature with our organic skincare range, crafted specifically for sensitive skin. Infused with the calming properties of aloe vera and chamomile, each product provides gentle nourishment and protection. Say goodbye to irritation and hello to a glowing, healthy complexion.",
//         "Bio-Hautpflege für empfindliche Haut mit Aloe Vera und Kamille: Erleben Sie die wohltuende Wirkung unserer Bio-Hautpflege, speziell für empfindliche Haut entwickelt. Mit den beruhigenden Eigenschaften von Aloe Vera und Kamille pflegen und schützen unsere Produkte Ihre Haut auf natürliche Weise. Verabschieden Sie sich von Hautirritationen und genießen Sie einen strahlenden Teint.",
//         "Cuidado de la piel orgánico para piel sensible con aloe vera y manzanilla: Descubre el poder de la naturaleza con nuestra línea de cuidado de la piel orgánico, diseñada especialmente para pieles sensibles. Enriquecidos con aloe vera y manzanilla, estos productos ofrecen una hidratación y protección suave. Despídete de las irritaciones y saluda a una piel radiante y saludable.",
//         "针对敏感肌专门设计的天然有机护肤产品：体验由芦荟和洋甘菊提取物带来的自然呵护。我们的护肤产品特别为敏感肌设计，温和滋润，保护您的肌肤不受刺激。让您的肌肤告别不适，迎来健康光彩。",
//         "新しいメイクのトレンドは鮮やかな色と革新的な技術に焦点を当てています: 今シーズンのメイクアップトレンドは、大胆な色彩と革新的な技術に注目しています。ネオンアイライナーからホログラフィックハイライターまで、クリエイティビティを解き放ち、毎回ユニークなルックを演出しましょう。"
//     ]
//   }
// EOFEOF
