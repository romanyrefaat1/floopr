import { collection, getDocs, query, where } from "firebase/firestore";
import ComponentCard from "./component-card";
import { db } from "@/lib/firebase";
import { Suspense } from "react";
import LoaderSpinner from "@/components/loader-spinner";
export default async function FeedbackIntegrationsTab({ productData }: { productData }) {
    // fetch components
    const response = collection(db, `integrations`)
    const components = await getDocs(response)
    console.log(`components docs`, components.docs)
    return (
        <Suspense fallback={<LoaderSpinner />}>
            <div>
            <h2 className="text-3xl font-bold mb-[25px]">All Components</h2>
        <div className="grid grid-cols-2 gap-4">
            {components.docs.map((component) => {
                const data = component.data()
                return (<ComponentCard key={component.id} productData={productData} componentData={data} />)
            })}
        </div>
        </div>
        </Suspense>
    )
}