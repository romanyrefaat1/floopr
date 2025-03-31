import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getClientPageViews(productId: string) {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data()?.pageViews || 0;
    } else {
      return 0
    }
  }