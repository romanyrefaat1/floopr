import { db } from "@/lib/firebase"
import makeFirstLetterUppercase from "@/lib/make-first-letter-uppercase"
import { doc, getDoc } from "firebase/firestore"

export default async function getSentimentPercent(productId: string) {
    const productRef = doc(db, 'products', productId)
    const productSnap = await getDoc(productRef)
    
    if (!productSnap.exists()) {
        throw new Error('Product not found')
      }
    
      const sentimentFromDb = productSnap.data().analytics?.sentiment || 0
      const positive = sentimentFromDb.positive || 0
      const negative = sentimentFromDb.negative || 0
      const neutral = sentimentFromDb.neutral || 0
      const percent = 
        sentimentFromDb.topSentimentPercent ? parseFloat((sentimentFromDb.topSentimentPercent || 0).toFixed(1)) : 0
      const topSentiment = 
        sentimentFromDb.topSentiment ? makeFirstLetterUppercase(sentimentFromDb.topSentiment) : "Neutral"
      return { positive, negative, neutral, percent, topSentiment }
}