import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export default async function getFeedbackCount(productId: string) {
  const productRef = doc(db, 'products', productId)
  const productSnap = await getDoc(productRef)

  if (!productSnap.exists()) {
    throw new Error('Product not found')
  }

  const feedbackCount = productSnap.data().feedbackCount || 0
  return feedbackCount
}
