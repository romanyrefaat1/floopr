import { FilterData } from "../../../products/[id]/page";
import { ProductData } from "../../page";
import ShowFeedbacks from "../show-feedbacks";
import TopFeedbacks from "./top-feedbacks";

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
    // <div className="p-4 flex flex-col gap-xl2 rounded-lg bg-card text-card-foreground shadow border border-secondary">
    <div className="p flex flex-col rounded-lg bg-card text-card-foreground shadow">
      <TopFeedbacks isOwnerPa={isOwnerPa} productId={productId} />
      <ShowFeedbacks
        productId={productId}
        isOwnerPa={isOwnerPa}
        isOwner={productData.isOwner}
        filterData={filterData}
      />
    </div>
  );
}
