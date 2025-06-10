import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function getComponentData(productId: string, componentId: string) {
  
    if (!componentId || !productId) {
      throw new Error("getComponentData: Missing componentId or productId");
    }

    const componentsRef = doc(db, "products", productId, "components", componentId);
    const componentSnap = await getDoc(componentsRef);

    if (!componentSnap.exists()) {
      throw new Error("getComponentData: Component not found");
    }

    const data = componentSnap.data()

    return data;
    
}