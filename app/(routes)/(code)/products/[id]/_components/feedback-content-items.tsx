import { FilterData, Product } from "../page";
import FeedbackItem from "./feedback-item";
import getFilteredFeedbacks from "@/actions/filter-feedback";

type FeedbackContentItemsProps = {
  productData: Product;
  productId: string;
  isOwner?: boolean;

  filterData: FilterData;
};

export default async function FeedbackContentItems({productData, productId, isOwner=false, filterData}: FeedbackContentItemsProps) {
  let feedbacksSnap;
  console.log(`filterData start component render: ${JSON.stringify(filterData)}`);


  console.log(`will filter by: ${filterData.filter}`)
  feedbacksSnap = await getFilteredFeedbacks(productId, filterData)

  // console.log(`feedbacks`, feedbacksSnap);
  if (feedbacksSnap?.empty) {
    return <div className="text-center p-8">
      {!filterData.filter &&  <p>No feedback yet!</p>}
      {filterData.filter && <p>No feedback found for filter: {filterData.filter.charAt(0).toUpperCase() + filterData.filter.slice(1)}</p>}
    </div>;
  }
  
  return (
    <div>
      <ul>
        {feedbacksSnap?.docs.map((doc) => (
          <li key={doc.id}>
            <FeedbackItem isOwner={isOwner} productData={productData} feedbackData={doc.data()} isSimple={true} feedbackId={doc.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}