import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Product } from "../../page";
import FeedbackContentItems from "../feedback-content-items";

export default function ContentTab({productData, isOwner=false}: {productData: Product, isOwner: boolean}) {
    const productId = productData.docId

    return (
        <Card>
          <CardHeader>
            <CardTitle>Feedback Content</CardTitle>
             <CardDescription>
              Product content desc..
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FeedbackContentItems isOwner={isOwner} productData={productData} productId={productId}/>
          </CardContent>
          {/* <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
        </Card>
    )
}