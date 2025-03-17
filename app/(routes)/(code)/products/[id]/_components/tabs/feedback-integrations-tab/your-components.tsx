import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import ComponentCard from "../component-card"
import { Product } from "@/contexts/multistep-form-context"

export default async function YourComponents({productId, productData}: {productId: string, productData: Product}) {
    // fetch components
    const response = collection(db, `products`, productId, `components`)
    const components = await getDocs(response)
    console.log(`components docs`, components.docs)
    return (
        <div>
            <h2 className="text-3xl font-bold mb-[25px]">Your Components</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {components.docs.map((component) => {
                    const data = component.data()
                    console.log(`component data jsx`, data)
                    return (<ComponentCard key={component.id} productData={productData} componentData={data} isYours={true} />)
                })}
            </div>
        </div>
    )
}