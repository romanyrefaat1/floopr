import { ProductData } from "../../../[productId]/page";
import { FilterData } from "../page";
import { FeedbackTabsClient } from "./feedback-tabs-client";

export default function FeedbackTabs({
  productData,
  isOwner = false,
  filter,
}: {
  productData: ProductData;
  isOwner: boolean;
  filter: FilterData;
}) {
  console.log(`feedbacktab productid`, productData.productId)
  return (
    <div className="">
      <FeedbackTabsClient
        filter={filter}
        isOwner={isOwner}
        productData={{
          ...productData,
          // createdAt: productData.createdAt.toDate(),
          updatedAt: productData.updatedAt.toDate(),
          lastFeedbackAt: productData.lastFeedbackAt.toDate(),
        }}
      />
    </div>
  );
}
