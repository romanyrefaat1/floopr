import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Product } from "../../page";

export default function ComponentCard({ productData, id }: { productData: Product; id: string }) {
    return (
        <Card className="flex items-center justify-center gap-4 p-8">
            <div className="image flex items-center justify-center rounded-lg border p-[10px]">preview</div>
            <div className="flex flex-col">
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Feedback Component</CardTitle>
                        <CardDescription>
                            Product integrations desc..
                        </CardDescription>  
                    </div>
                </CardHeader>
                <Link href={`/edit-component/${id}?ref=${productData.docId}`}>
                    <Button variant="secondary">Add Component</Button>
                </Link>
            </div>
        </Card>
    )
}