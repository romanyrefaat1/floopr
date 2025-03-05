import { useAuth } from "@/contexts/auth-context"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

export async function checkProductNameExists(productName) {
  // User id handling
  // const {userId} = useAuth()
  try {
    const q = query(collection(db, `products`), where("name", "==", productName));
    const querySnap = await getDocs(q);

    if (querySnap.empty) {
      return false
    }
      return true
    
  } catch (error) {
    console.log(error)
  }
}