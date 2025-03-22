import { FilterData } from "../../products/[id]/page";
import FeedbackList from "./feedback-list";

export default function ShowFeedbacks({ productId, isOwner, filterData }: { productId: string, isOwner: boolean, filterData: FilterData }) {
  console.log(`show productId:`, productId)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Feedbacks</h2>
      <FeedbackList isOwner={isOwner} productId={productId} filterData={filterData} />
    </div>
  );
}
