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
import Link from "next/link";
import { useState } from "react";

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
  return (
    <Card className="flex flex-col-reverse md:grid md:grid-cols-2 items-center justify-center gap-4 p-4 md:p-4">
      <div className="image w-full flex items-center justify-center rounded-lg border p-[10px]">
        preview
      </div>

      <div className="flex flex-col">
        <CardHeader className="flex flex-col justify-between gap-4">
          <CardTitle>{componentData.title || `Your component`}</CardTitle>
          <CardDescription>
            {componentData.description || `Component`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href={
              isYours
                ? `/edit-component/${componentData.componentType}/${componentData.componentData.componentId}?ref=${productData.docId}`
                : `/edit-component/${componentData.name}?ref=${productData.docId}`
            }
          >
            <Button className="w-full" variant="secondary">
              {isYours ? `Edit` : `Add`} Component
            </Button>
          </Link>
          {isYours && (
            <OpenModalButton
              componentData={componentData}
              productData={productData}
            />
          )}
        </CardContent>
      </div>
    </Card>
  );
}
