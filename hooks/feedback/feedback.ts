import { onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { doc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LikeData } from "@/lib/feedback-item/like-to-feedback-item";

type FeedbackItem = {
    id: string;
    socialData: {
        likes: {
            count: number;
            data: LikeData[];
        };
    };
    // Add other feedback properties here as needed
}

// Real-time hook to listen to a single feedback item
export function useFeedbackItem(productId: string, feedbackId: string) {
    const [feedback, setFeedback] = useState<FeedbackItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!productId || !feedbackId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        
        const docRef = doc(db, "products", productId, "feedbacks", feedbackId);
        
        const unsubscribe = onSnapshot(
            docRef,
            (doc) => {
                if (doc.exists()) {
                    setFeedback({ id: doc.id, ...doc.data() } as FeedbackItem);
                } else {
                    setFeedback(null);
                }
                setLoading(false);
            },
            (err) => {
                console.error("Error listening to feedback item:", err);
                setError(err);
                setLoading(false);
            }
        );

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, [productId, feedbackId]);
    console.log(`feeback ook`, feedback)

    return { feedback, loading, error };
}

// Real-time hook to listen to all feedback items for a product
export function useFeedbackItems(productId: string) {
    const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!productId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        
        const collectionRef = collection(db, "products", productId, "feedbacks");
        
        const unsubscribe = onSnapshot(
            collectionRef,
            (snapshot) => {
                const items: FeedbackItem[] = [];
                snapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() } as FeedbackItem);
                });
                setFeedbacks(items);
                setLoading(false);
            },
            (err) => {
                console.error("Error listening to feedback items:", err);
                setError(err);
                setLoading(false);
            }
        );

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, [productId]);

    return { feedbacks, loading, error };
}

// Check if a user has liked a feedback item (real-time version)
export function useIsUserLiked(productId: string, feedbackId: string, userId: string) {
    const { feedback, loading, error } = useFeedbackItem(productId, feedbackId);
    
    const isLiked = feedback?.socialData?.likes?.data?.some(
        (like: LikeData) => like.userId === userId
    ) || false;
    
    return { isLiked, loading, error };
}