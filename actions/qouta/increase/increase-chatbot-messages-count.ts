import { db } from "@/lib/firebase";
import { doc, increment, updateDoc } from "firebase/firestore";

export default async function increaseChatbotMessagesCount(userId: string) {
    if (!userId) {
        console.log("userId is not provided to increaseChatbotMessagesCount. No update performed.");
        return;
    }
    try {
        await updateDoc(doc(db, "users", userId), {
            chatbot_messages_monthly: increment(1),
        });
    } catch (error: any) {
        if (error.code === 'not-found') {
            console.log(`Document for userId ${userId} not found in increaseChatbotMessagesCount. No update performed.`);
            // Silently ignore not-found errors as requested.
        } else {
            // For any other errors, log and re-throw them.
            console.error(`Error updating chatbot messages count for userId ${userId} in increaseChatbotMessagesCount:`, error);
            throw error;
        }
    }
}