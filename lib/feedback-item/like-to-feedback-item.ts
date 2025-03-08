import { arrayRemove, arrayUnion, getDoc, increment, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { doc } from "firebase/firestore";

type Data = {
    userId: string;
    username: string;
    profilePicture: string;
    productId: string;
}

export type LikeData = {
    userId: string;
    username: string;
    profilePicture: string;
}

export async function addLikeToFeedbackItem(feedbackId: string, data: Data) {
    const {userId, username, productId, profilePicture} = data;
    const docRef = doc(db, "products", productId, "feedbacks", feedbackId);
    
    // See if user already liked
    if (await isUserLiked(feedbackId, userId, productId)) {
        // User already liked - remove the like
        await updateDoc(docRef, {
          "socialData.likes.count": increment(-1),
          "socialData.likes.data": arrayRemove({
            userId,
            username,
            profilePicture
          })
        });
        console.log("Like removed");
        return false; // User unliked
    } else {
        // User hasn't liked - add the like
        await updateDoc(docRef, {
          "socialData.likes.count": increment(1),
          "socialData.likes.data": arrayUnion({
            userId,
            username,
            profilePicture
          })
        });
        console.log("Like added");
        return true; // User liked
    }
}

export async function isUserLiked(feedbackId: string, userId: string, productId: string) {
    const docRef = doc(db, "products", productId, "feedbacks", feedbackId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        return data.socialData?.likes?.data?.some((like: { userId: string }) => like.userId === userId) || false;
    }
    return false;
}

