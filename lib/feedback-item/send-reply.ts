import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// Original function to send replies
export async function sendReply(reply: string, feedbackId: string, userId: string, productId: string) {
    // Validation code remains the same
    if (!reply || !feedbackId || !userId || !productId) {
        console.error("Missing required parameters for sendReply:", { reply, feedbackId, userId, productId });
        return;
    }
    
    try {
        const docRef = doc(db, "products", productId, "feedbacks", feedbackId);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            console.log("Document does not exist");
            return;
        }
        
        const data = docSnap.data();
        const comments = data.socialData.comments.data || [];
        
        // Use a JavaScript Date object instead of serverTimestamp()
        const now = new Date().toISOString();
        const id = crypto.randomUUID();
        
        comments.push({
            id,
            content: reply,
            userId,
            createdAt: now,
            updatedAt: now
        });
        
        await updateDoc(docRef, {
            socialData: {
                comments: {
                    data: comments,
                    count: comments.length
                }
            },
            lastUpdated: serverTimestamp()
        });
        
        console.log("Reply added successfully");
    } catch (error) {
        console.error("Error adding reply:", error);
        throw error;
    }
}