import { db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";

export async function addReplyToFeedback(reply: string, feedbackId: string, userId: string, productId: string) {
    // Validate inputs
    if (!reply || !feedbackId || !userId || !productId) {
        throw new Error("Missing required parameters for addReplyToFeedback");
    }
    
    try {
        // Reference the feedback document
        const docRef = doc(db, "products", productId, "feedbacks", feedbackId);
        
        // Get current document data
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            throw new Error("Feedback document does not exist");
        }
        
        // Get current replies or initialize empty array
        const data = docSnap.data();
        const replies = data.socialData?.comments?.data || [];
        
        // Create new reply object with current timestamp
        const now = new Date().toISOString();
        const newReply = {
            content: reply,
            userId,
            createdAt: now,
            updatedAt: now
        };
        
        // Add new reply to the array
        const updatedReplies = [...replies, newReply];
        
        // Update the document
        await updateDoc(docRef, {
            replies: updatedReplies,
            lastUpdated: serverTimestamp()
        });
        
        // Return the updated replies array
        return {
            success: true,
            replies: updatedReplies,
            newReply
        };
    } catch (error) {
        console.error("Error adding reply:", error);
        throw error;
    }
}


export async function getFeedbackReplies(productId: string, feedbackId: string) {
    if (!productId || !feedbackId) {
        throw new Error("Missing required parameters");
    }
    
    try {
        const docRef = doc(db, "products", productId, "feedbacks", feedbackId);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            return [];
        }
        
        const data = docSnap.data();
        return data.socialData?.comments?.data || [];
    } catch (error) {
        console.error("Error getting feedback replies:", error);
        throw error;
    }
}