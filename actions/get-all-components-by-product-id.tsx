import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function getAllComponentsByProductId(productId: string) {
    if (!productId) throw new Error("Product ID is required for getAllComponentsByProductId");
    
    const collectionRef = collection(db, `products`, productId, `components`);
    const componentsDocs = await getDocs(collectionRef);
    const components = componentsDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) || [];
    
    return components || [];
}