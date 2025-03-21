import { FilterData } from "../../products/[id]/page";
import FeedbackList from "./feedback-list";

export default function ShowFeedbacks({ productId, filterData }: { productId: string, filterData: FilterData }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Feedbacks</h2>
      <FeedbackList productId={productId} filterData={filterData} />
    </div>
  );
}
