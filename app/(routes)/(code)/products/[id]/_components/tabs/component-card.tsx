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

// Better type definition
interface ComponentDataExternal {
  name: string;
  title: string;
  description: string;
  plan?: string;
}

interface ComponentDataOwned {
  componentDisplayNeme?: string;
  componentType?: string;
  componentId?: string;
  isCreating?: boolean;
  componentData?: {
    name?: string;
    componentId?: string;
    plan?: string;
    metaData?: {
      name?: string;
      description?: string;
      imageUrl?: string;
    };
  };
}

export default function ComponentCard({
  productData,
  componentData,
  isYours,
  imageUrl,
}: {
  productData: Product;
  componentData: ComponentDataExternal | ComponentDataOwned;
  isYours: boolean;
  imageUrl: string;
}) {
  const productDataFromFirestore = serializeFirestoreData(productData);
  let metaData = {
    title: "",
    description: "",
    imageUrl: "",
    componentName: "",
    plan: "free",
  };

  if (!isYours) {
    // Type guard and safe property access
    const externalData = componentData as ComponentDataExternal;
    metaData = {
      title: externalData.title || "",
      description: externalData.description || "",
      imageUrl: imageUrl || "",
      componentName: externalData.name || "",
      plan: externalData.plan || "free",
    };
  } else if (isYours) {
    // Safe property access with optional chaining
    const ownedData = componentData as ComponentDataOwned;
    metaData = {
      title: ownedData.componentData?.metaData?.name || "",
      description: ownedData.componentData?.metaData?.description || "",
      imageUrl: ownedData.componentData?.metaData?.imageUrl || "",
      componentName: ownedData.componentData?.name || "",
      plan: ownedData.componentData?.plan || "free",
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
              `products/${productData.docId}/components/${(componentData as ComponentDataOwned).componentId}`
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
        />
      </div>

      <div className="flex flex-col">
        <CardHeader className="flex flex-col justify-between gap-4">
          <CardTitle>
            {(componentData as ComponentDataOwned).componentDisplayNeme ||
              metaData.title ||
              (componentData as ComponentDataOwned).componentType ||
              `Your component`}
          </CardTitle>
          {/* Safe length check - this was the main issue */}
          {metaData.description && metaData.description.length > 0 && (
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
          {!(componentData as ComponentDataOwned).isCreating && (
            <Link
              className="w-full"
              href={
                isYours
                  ? `/products/${productDataFromFirestore.docId}/my-components/${(componentData as ComponentDataOwned).componentType}/${(componentData as ComponentDataOwned).componentData?.componentId}`
                  : `/edit-component?componentTypeName=${(componentData as ComponentDataExternal).name}&ref=${productDataFromFirestore.docId}`
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
        {(componentData as ComponentDataOwned).isCreating && (
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