import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default async function getProductFeedbacksCommentsCount(productId: string) {
    const productRef = doc(db, 'products', productId)
    const productSnap = await getDoc(productRef)

  if (!productSnap.exists()) {
    throw new Error('Product not found')
  }

  const commentsCount = productSnap.data().commentsCount || 0
  return commentsCount
}