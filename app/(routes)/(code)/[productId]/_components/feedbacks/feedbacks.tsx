import { FilterData } from "../../../products/[id]/page";
import { ProductData } from "../../page";
import ShowFeedbacks from "../show-feedbacks";
import TopFeedbacks from "./top-feedbacks";

export default function Feedbacks({ productId, productData , filterData}: { productId: string, productData: ProductData, filterData: FilterData }) {
  return (
    <div className="p-4 flex flex-col gap-xl2 rounded-lg bg-card text-card-foreground shadow border border-secondary">
      <TopFeedbacks />
      <ShowFeedbacks productId={productId} filterData={filterData} />
    </div>
  );
}
