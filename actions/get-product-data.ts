import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function getProductData(productId: string){
    try {
        const q = query(collection(db, "products"), where("docId", "==", productId));
        const querySnap = await getDocs(q);

        if (querySnap.empty) {
            return null
        }

        console.log(`Product data: ${JSON.stringify(querySnap.docs[0].data())}`)

        const product = querySnap.docs.map((doc) => {
            return {
                docId: doc.id,
                ...doc.data(),
            }
        })
        return product[0];
    } catch (error) {
        console.log(error)
        return null;
    }
}