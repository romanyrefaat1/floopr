import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";

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
        const unsubscribe = onSnapshot(docRef, 
            (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    setReplies((data.socialData?.comments?.data || []).slice().reverse());
                    console.log(`data.replies`, data.socialData?.comments?.data)
                } else {
                    setReplies([]);
                    console.log(`replies: empty array []`)
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

    console.log(`replies: ${replies}`)

    return { replies, loading, error };
}