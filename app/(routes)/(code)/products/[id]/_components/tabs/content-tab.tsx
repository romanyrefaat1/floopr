import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    TabsContent,
  } from "@/components/ui/tabs";
  import { Button } from "@/components/ui/button";
import { Product } from "../../page";
import FeedbackContentItems from "../feedback-content-items";

export default function ContentTab({productData}: {productData: Product}) {
    const productId = productData.docId

    return (
        <TabsContent value="feedback-content">
        <Card>
          <CardHeader>
            <CardTitle>Feedback Content</CardTitle>
            <CardDescription>
              Product content desc..
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FeedbackContentItems productData={productData} productId={productId}/>
          </CardContent>
          {/* <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
    )
}