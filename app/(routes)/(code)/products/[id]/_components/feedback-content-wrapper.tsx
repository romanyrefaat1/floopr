import { ProductData } from "../../../[productId]/page";
import { FilterData } from "../page";
import FeedbackContentItems from "./feedback-content-items";
import LoaderSpinner from "@/components/loader-spinner";

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
  return (
    <div className="w-full">
      <FeedbackContentItems
        filterData={filterData}
        isOwner={isOwner}
        productData={productData}
        productId={productId}
      />
    </div>
  );
}
