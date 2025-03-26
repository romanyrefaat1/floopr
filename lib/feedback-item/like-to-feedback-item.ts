import { db } from "../firebase";
import {
  arrayRemove,
  arrayUnion,
  getDoc,
  increment,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { doc } from "firebase/firestore";

type Data = {
  userId?: string;
  username?: string;
  profilePicture?: string;
  productId: string;
};

export type LikeData = {
  userId?: string;
  username?: string;
  profilePicture?: string;
};

export async function addLikeToFeedbackItem(feedbackId: string, data: Data) {
  const { userId, username, productId, profilePicture } = data;
  console.log(`feedbackId like`, feedbackId);
  const docRef = doc(db, "products", productId, "feedbacks", feedbackId);

  // See if user already liked
  if (await isUserLiked(feedbackId, productId, userId)) {
    // User already liked - remove the like
    await updateDoc(docRef, {
      "socialData.likes.count": increment(-1),
      "socialData.likes.data": arrayRemove({
        userId: userId || null,
        username: username || null,
        profilePicture: profilePicture || ``,
      }),
    });
    console.log("Like removed");
    return false; // User unliked
  } else {
    // User hasn't liked - add the like
    await updateDoc(docRef, {
      "socialData.likes.count": increment(1),
      "socialData.likes.data": arrayUnion({
        userId: userId || null,
        username: username || null,
        profilePicture: profilePicture || ``,
      }),
    });
    console.log("Like added");
    return true; // User liked
  }
}

export async function isUserLiked(
  feedbackId: string,
  productId: string,
  userId?: string
) {
  const docRef = doc(db, "products", productId, "feedbacks", feedbackId);
  const docSnap = await getDoc(docRef);
  let isUserLiked = false;
  if (docSnap.exists()) {
    const data = docSnap.data();
    isUserLiked =
      data.socialData?.likes?.data?.some(
        (like: { userId: string }) => like.userId === userId
      ) || false;
  }
  console.log(`isUserLiked:`, isUserLiked);
  return isUserLiked || false;
}
