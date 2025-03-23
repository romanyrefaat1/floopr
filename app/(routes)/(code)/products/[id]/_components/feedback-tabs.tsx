import { ProductData } from "../../../[productId]/page";
import { FilterData } from "../page";
import { FeedbackTabsClient } from "./feedback-tabs-client";

export default function FeedbackTabs({
  productData,
  isOwner = false,
  filter,
  isOwnerPa = false,
}: {
  productData: ProductData;
  isOwner: boolean;
  isOwnerPa?: boolean;
  filter: FilterData;
}) {
  console.log(`feedbacktab productid`, productData.productId);
  return (
    <div className="">
      <FeedbackTabsClient
        filter={filter}
        isOwner={isOwner}
        isOwnerPa={isOwnerPa}
        productData={{
          ...productData,
          // createdAt: productData.createdAt.toDate(),
          // updatedAt: productData.updatedAt.toDate(),
          // lastFeedbackAt: productData.lastFeedbackAt.toDate() || null,
        }}
      />
    </div>
  );
}
