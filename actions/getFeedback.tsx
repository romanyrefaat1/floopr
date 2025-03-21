import { db } from "@/lib/firebase";
import { collection } from "firebase/firestore";

export function getAllFeedback(productId: string){
    const collectionRef = collection(db, `products`, productId, `feedbacks`)
    // const feedbacksSnap = 
}