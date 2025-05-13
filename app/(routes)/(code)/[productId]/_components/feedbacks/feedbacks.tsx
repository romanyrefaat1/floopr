import { FilterData } from "../../../products/[id]/page";
import { ProductData } from "../../page";
import ShowFeedbacks from "../show-feedbacks";
import TopFeedbacks from "./top-feedbacks";
import LoaderSpinner from "@/components/loader-spinner";
import { Suspense } from "react";

export default function Feedbacks({
  productId,
  productData,
  filterData,
  isOwnerPa,
}: {
  productId: string;
  productData: ProductData;
  filterData: FilterData;
  isOwnerPa: boolean;
}) {
  return (
    <div className="p flex flex-col rounded-lg bg- text-card-foreground ">
      <Suspense fallback={<LoaderSpinner />}>
        <TopFeedbacks isOwnerPa={isOwnerPa} productId={productId} />
      </Suspense>
      <Suspense fallback={<LoaderSpinner />}>
        <ShowFeedbacks
          productId={productId}
          isOwnerPa={isOwnerPa}
          isOwner={productData.isOwner}
          filterData={filterData}
        />
      </Suspense>
    </div>
  );
}
