"use client";

import { ProductData } from "../../../[productId]/page";
import { FilterData } from "../page";
import FeedbackContentItems from "./feedback-content-items";
import LoaderSpinner from "@/components/loader-spinner";
import { Suspense } from "react";

export default function FeedbackContentWrapper({
  productData,
  isOwner = false,
  filterData,
  productId,
}: {
  productData: ProductData;
  isOwner: boolean;
  filterData: FilterData;
  productId: string;
}) {
  console.log(`productId from feedback-content-wrapper:`, productId);
  return (
    <Suspense fallback={<LoaderSpinner />}>
      {/* @ts-expect-error Server Component */}
      <FeedbackContentItems
        filterData={filterData}
        isOwner={isOwner}
        productData={productData}
        productId={productId}
      />
    </Suspense>
  );
}
