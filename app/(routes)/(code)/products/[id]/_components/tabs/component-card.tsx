import { Product } from "../../page";
import OpenModalButton from "./open-modal-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import makeFirstLetterUppercase from "@/lib/make-first-letter-uppercase";
import serializeFirestoreData from "@/lib/serialize-firestore-data";
import Link from "next/link";

export default function ComponentCard({
  productData,
  componentData,
  isYours,
}: {
  productData: Product;
  componentData: { name: string; title: string; description: string } | object;
  isYours: boolean;
}) {
  //   console.log(`my-componentData`, componentData);
  const productDataFromFirestore = serializeFirestoreData(productData);

  return (
    <Card className="text-center lg:text-left flex flex-col-reverse lg:grid lg:grid-cols-2 items-center justify-center gap-4 p-4 lg:p-4">
      <div className="image w-full flex items-center justify-center rounded-lg border p-[10px]">
        preview
      </div>

      <div className="flex flex-col">
        <CardHeader className="flex flex-col justify-between gap-4">
          <CardTitle>
            {componentData.componentDisplayNeme ||
              componentData.componentType ||
              `Your component`}
          </CardTitle>
          {componentData.description &&
            componentData.description.length > 0 && (
              <CardDescription>
                {makeFirstLetterUppercase(componentData.description)}
              </CardDescription>
            )}
        </CardHeader>
        <CardContent className="flex lg:flex-col gap-2">
          {isYours && (
            <OpenModalButton
              componentData={componentData}
              productData={productDataFromFirestore}
            />
          )}
          <Link
            href={
              isYours
                ? `/products/${productDataFromFirestore.docId}/my-components/${componentData.componentType}/${componentData.componentData.componentId}`
                : `/edit-component/${componentData.name}?ref=${productDataFromFirestore.docId}`
            }
          >
            <Button
              className="w-full"
              variant={isYours ? "outline" : "default"}
            >
              {isYours ? `Import` : `Add`} Component
            </Button>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}
