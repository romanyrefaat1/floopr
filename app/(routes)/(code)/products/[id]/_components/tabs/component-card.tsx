import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Product } from "../../page";
import FeedbackModalTimeout from "@/components/integration/modal-timout/imports/feedback-modal-timeout";

export default function ComponentCard({ productData, componentData, isYours }: { productData: Product; componentData: object, isYours: boolean }) {
    console.log(`my-componentData`, componentData)
    return (
        
        <Card className="flex flex-col-reverse md:flex-row items-center justify-center gap-4 p-4 md:p-8">
            {/* {JSON.stringify(componentData)} */}
            <div className="image w-full  flex items-center justify-center rounded-lg border p-[10px]">preview</div>
            {isYours && <Link href={`/products/${productData.docId}/my-compnoents/${componentData.componentData.componentId}?componentType=${componentData.componentType}`}>open</Link>}
            <div className="flex flex-col">
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>{componentData.title}</CardTitle>
                        <CardDescription>{componentData.description}</CardDescription>  
                    </div>
                </CardHeader>
                <FeedbackModalTimeout apiKey={componentData.apiKey} productId={productData.docId} componentId={componentData.componentData.componentId}/>
                <Link href={`/edit-component/${componentData.componentData.name}?ref=${productData.docId}`}>
                    <Button className="w-full" variant="secondary">{isYours ? `Edit` : `Add` } Component</Button>
                </Link>
            </div>
        </Card>
    )
}