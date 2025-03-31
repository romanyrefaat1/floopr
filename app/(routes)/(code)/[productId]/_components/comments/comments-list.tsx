"use server"

import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

type CommentsListProps = {
    productId?: string;
    feedbackId?: string;
    feedbackD?: object;
}

export default async function CommentsList ({productId, feedbackId, feedbackD}: CommentsListProps){
    let commentsList;

    if (feedbackD) {
        commentsList = feedbackD.socialData.comments.data
    } else {
    const feedbackDocRef = doc(db, `products`, productId, `feedbacks`, feedbackId)
    const querySnap = await getDoc(feedbackDocRef)
    const feedbackData = querySnap.data()
    commentsList = feedbackData.socialData.comments.data
    }
    
    return (
        <div>{JSON.stringify(commentsList)}</div>
    )
}