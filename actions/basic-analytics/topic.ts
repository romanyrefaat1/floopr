import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

type BasicTopicData = {
    topTopic: string | null
    topTopicPercent: number
    allTopics: string[]
}

export default async function getTopicsData(productId: string) {
    const productRef = doc(db, 'products', productId)
    const productSnap = await getDoc(productRef)
    
    if (!productSnap.exists()) {
        throw new Error('Product not found')
      }
    
      const topicFromDb = productSnap.data().analytics?.topic || 0
      const topTopic = topicFromDb.topTopic || `None`
      const topTopicPercent = topicFromDb.topTopicPercent || 0
      const allTopics = topicFromDb.allTopics || []

      return {topTopic, topTopicPercent, allTopics} as BasicTopicData
}