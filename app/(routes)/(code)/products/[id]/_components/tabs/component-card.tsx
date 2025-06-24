import { Product } from "../../page";
import OpenModalButton from "./open-modal-button";
import DeleteDropdown from "@/components/delete-dropdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/firebase";
import makeFirstLetterUppercase from "@/lib/make-first-letter-uppercase";
import serializeFirestoreData from "@/lib/serialize-firestore-data";
import { doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

export default function ComponentCard({
  productData,
  componentData,
  isYours,
  imageUrl,
}: {
  productData: Product;
  componentData: { name: string; title: string; description: string } | object;
  isYours: boolean;
  imageUrl: string;
}) {
  //   
  const productDataFromFirestore = serializeFirestoreData(productData);
  let metaData = {
    title: null,
    description: null,
    imageUrl: null,
    componentName: null,
  };
  

  if (!isYours) {
    metaData = {
      title: componentData.title,
      description: componentData.description,
      imageUrl: imageUrl,
      componentName: componentData.name,
      plan: componentData.plan || `free`,
    };
  } else if (isYours) {
    metaData = {
      title: componentData.componentData.metaData.name,
      description: componentData.componentData.metaData.description,
      imageUrl: componentData.componentData.metaData.imageUrl,
      componentName: componentData.componentData.name,
      plan: componentData.componentData.plan || `free`,
    };
  }

  return (
    <Card className="text-center lg:text-left flex flex-col-reverse lg:grid lg:grid-cols-2 items-center justify-center gap-4 p-4 lg:p-4 relative">
      <div className="absolute top-2 right-2">
        <Badge
          className="select-none"
          variant={metaData.plan === "free" ? "secondary" : "default"}
        >
          {makeFirstLetterUppercase(metaData.plan)}
        </Badge>
      </div>

      {/* Delete dropdown for isYours */}
      {isYours && (
        <div className="absolute top-4 right-4">
          {/* <DeleteDropdown
            isYours={isYours}
            docRef={doc(
              db,
              `products/${productData.docId}/components/${componentData.componentId}`
            )}
          /> */}
        </div>
      )}
      {/* Image */}
      <div className="image w-full flex items-center justify-center rounded-lg">
        <Image
          width={300}
          height={40}
          alt="Component Preview"
          src={
            metaData.imageUrl || `/images/online/components/modal-timeout.PNG`
          }
          // src={`/images/online/components/modal-timeout.PNG`}
        />
      </div>

      <div className="flex flex-col">
        <CardHeader className="flex flex-col justify-between gap-4">
          <CardTitle>
            {componentData.componentDisplayNeme ||
              metaData.title ||
              componentData.componentType ||
              `Your component`}
          </CardTitle>
          {metaData.description.length > 0 && (
            <CardDescription className="text-secondary-foreground">
              {makeFirstLetterUppercase(metaData.description)}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex lg:flex-col gap-2">
          {isYours && metaData.componentName === `modal-time` && (
            <OpenModalButton
              componentData={componentData}
              productData={productDataFromFirestore}
            />
          )}
          {!componentData.isCreating && (
            <Link
              className="w-full"
              href={
                isYours
                  ? `/products/${productDataFromFirestore.docId}/my-components/${componentData.componentType}/${componentData.componentData.componentId}`
                  : `/edit-component?componentTypeName=${componentData.name}&ref=${productDataFromFirestore.docId}`
              }
              id={isYours ? "add-float-button" : ""}
            >
              <Button
                className="w-full"
                variant={isYours ? "outline" : "default"}
              >
                {isYours ? `Import` : `Add`} Component
              </Button>
            </Link>
          )}
        </CardContent>
        {componentData.isCreating && (
          <div>
            <p className="text-sm w-full p-2 text-center bg-floopr-purple/30 mt-2 rounded">
              Component in progress...
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
