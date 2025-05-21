"use client";

import { ProductData } from "../../../[productId]/page";
import { useGroupedFeedback } from "../group-context/groupt-context";
import ShowGroupsFeedback from "../group-context/show-groups-feedback";
import { FilterData } from "../page";
import { useView, VIEW_MODES } from "../view-context/view-context";
import FeedbackContentItems from "./feedback-content-items";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { mode: viewMode } = useView();

  return (
    <div className="w-full">
      {viewMode === VIEW_MODES.NORMAL ? (
        <FeedbackContentItems
          filterData={filterData}
          isOwner={isOwner}
          productData={productData}
          productId={productId}
        />
      ) : (
        <div className="flex items-center justify-center">
          <Skeleton className="text-center mt-8 w-fit bg-transparent">
            In Development...
          </Skeleton>
        </div>
        // <ShowGroupsFeedback productData={productData} />
      )}
    </div>
  );
}
