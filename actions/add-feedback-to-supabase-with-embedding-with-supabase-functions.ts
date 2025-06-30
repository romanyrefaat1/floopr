"use server"

import { supabase } from "@/lib/supabase";
import { Timestamp } from "firebase/firestore";

/*
 const feedback = {
        id: 'test-abc1234',
        product_id: 'xyz789',
        content: 'This is a test feedback',
        metadata: { title: 'Great Feature' },
        created_at: new Date().toISOString(),
      };
 */

type SupabaseAddFeedbackProps = {
  id: string;
  product_id: string;
  content: string;
  metadata: Object;
  created_at: Timestamp;
}

export default async function callEmbedFnForAddFeedbackForSupabase(payload: SupabaseAddFeedbackProps) {
  const { data, error } = await supabase.functions.invoke('embed-feedback', {
    body: payload,
  });

  if (error) {
    console.error('Function error:', error);
    throw error;
  }

  return data;
}
