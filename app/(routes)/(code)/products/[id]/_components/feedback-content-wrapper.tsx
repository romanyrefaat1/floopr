"use client";

import { ProductData } from "../../../[productId]/page";
import { FilterData } from "../page";
import { useView, VIEW_MODES } from "../view-context/view-context";
import FeedbackContentItems from "./feedback-content-items";

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
        `Jroup`
      )}
    </div>
  );
}
