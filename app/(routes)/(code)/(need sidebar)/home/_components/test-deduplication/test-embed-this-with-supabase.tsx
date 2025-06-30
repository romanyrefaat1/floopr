"use client"

import callEmbedFn from "@/actions/add-feedback-to-supabase-with-embedding-with-supabase-functions"

export default function EmbedThisWithSupabase() {
    const feedback = {
        id: 'test-abc1234',
        product_id: 'xyz789',
        content: 'This is a test feedback',
        metadata: { title: 'Great Feature' },
        created_at: new Date().toISOString(),
      };
    const handleClick = async ()=> {
        await callEmbedFn(feedback)
    }
    return (
        <button onClick={handleClick}>Embed this with supabase</button>
    )
}