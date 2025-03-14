import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Product } from "../../page";

export default function ComponentCard({ productData, componentData }: { productData: Product; componentData: object }) {
    return (
        <Card className="flex items-center justify-center gap-4 p-8">
            <div className="image flex items-center justify-center rounded-lg border p-[10px]">preview</div>
            <div className="flex flex-col">
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>{componentData.title}</CardTitle>
                        <CardDescription>{componentData.description}</CardDescription>  
                    </div>
                </CardHeader>
                <Link href={`/edit-component/${componentData.name}?ref=${productData.docId}`}>
                    <Button variant="secondary">Add Component</Button>
                </Link>
            </div>
        </Card>
    )
}