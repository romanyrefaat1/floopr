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
import Image from "next/image";
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
  let metaData = {
    title: null,
    description: null,
    imageUrl: null,
  };
  console.log(`componentData ${isYours}`, componentData);

  if (!isYours) {
    metaData = {
      title: componentData.title,
      description: componentData.description,
      imageUrl: componentData.imageUrl,
    };
  } else if (isYours) {
    metaData = {
      title: componentData.componentData.metaData.name,
      description: componentData.componentData.metaData.description,
      imageUrl: componentData.componentData.metaData.imageUrl,
    };
  }

  return (
    <Card className="text-center lg:text-left flex flex-col-reverse lg:grid lg:grid-cols-2 items-center justify-center gap-4 p-4 lg:p-4">
      {metaData.imageUrl && (
        <div className="image w-full flex items-center justify-center rounded-lg">
          <Image
            width={300}
            height={40}
            alt="Component Preview"
            // src={componentData.imageUrl || null}
            src={`/images/online/components/modal-timeout.PNG`}
          />
        </div>
      )}

      <div className="flex flex-col">
        <CardHeader className="flex flex-col justify-between gap-4">
          <CardTitle>
            {componentData.componentDisplayNeme ||
              metaData.title ||
              componentData.componentType ||
              `Your component`}
          </CardTitle>
          {componentData.description && metaData.description.length > 0 && (
            <CardDescription className="text-secondaryForeground">
              {makeFirstLetterUppercase(metaData.description)}
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
            className="w-full"
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
