import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export default async function getProductFeedbacksLikesCount(productId: string) {
  const productRef = doc(db, 'products', productId)
  const productSnap = await getDoc(productRef)

  if (!productSnap.exists()) {
    throw new Error('Product not found')
  }

  const likesCount = productSnap.data().likesCount || 0
  return likesCount
}