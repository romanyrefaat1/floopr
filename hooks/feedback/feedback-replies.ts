import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

export function useFeedbackReplies(productId: string, feedbackId: string) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId || !feedbackId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const docRef = doc(db, "products", productId, "feedbacks", feedbackId);

    // Set up the real-time listener
    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setReplies((data.socialData?.comments?.data || []).slice().reverse());
        } else {
          setReplies([]);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error listening to replies:", err);
        setError(err);
        setLoading(false);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [productId, feedbackId]);

  return { replies, loading, error };
}
