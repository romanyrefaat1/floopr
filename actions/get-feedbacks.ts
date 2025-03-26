import { FeedbackItemInDB } from "@/app/(routes)/(code)/[productId]/_components/feedback-list"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export default async function getFeedbacks(productId: string) {
    const productRef = collection(db, 'products', productId, `feedbacks`)
    const productSnap = await getDocs(productRef)
    const feedbacks = productSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as unknown as FeedbackItemInDB))
    return feedbacks
}
