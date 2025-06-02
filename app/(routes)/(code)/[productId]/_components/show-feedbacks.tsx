import { FilterData } from "../../products/[id]/page";
import FeedbackList from "./feedback-list";
import { usePricing } from "@/context/pricing-context";

export default function ShowFeedbacks({
  productId,
  isOwner,
  filterData,
}: {
  productId: string;
  isOwner: boolean;
  filterData: FilterData;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-4">All Feedbacks</h2>
      <FeedbackList isOwner={isOwner} productId={productId} />
    </div>
  );
}
