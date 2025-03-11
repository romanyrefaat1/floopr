import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { FilterData, Product } from "../page";
import FeedbackItem from "./feedback-item";
import { db } from "@/lib/firebase";
import { getFeedbacksByDate } from "@/actions/get-feedback-by-date";

type FeedbackContentItemsProps = {
  productData: Product;
  productId: string;
  isOwner?: boolean;

  filterData: FilterData;
};

export default async function FeedbackContentItems({productData, productId, isOwner=false, filterData}: FeedbackContentItemsProps) {
  let feedbacksSnap;
  console.log(`filterData start component render: ${JSON.stringify(filterData)}`);

  // console.log(`filter: ${filterData.filter}`);
  
  const getAllFeedbacks = async () => {
    const response = query(
      collection(db, `products`, productId, `feedbacks`)
    );
    console.log(`Fetched all feedbacks`);
    return await getDocs(response);
  }

  // Get all feedbacks
  if (!filterData?.filter){
    feedbacksSnap = await getAllFeedbacks();
  } else {
    

  // Get filtered feedbacks
  console.log(`will filter by: ${filterData.filter}`)
  // case filter?.startsWith("likes"):
  switch (filterData.filter) {
    case `likes`:
      console.log(`Filtered by likes`);
      const likesResponse = query(
        collection(db, `products`, productId, `feedbacks`),
        orderBy("socialData.likes.count", "desc")
      );
      feedbacksSnap = await getDocs(likesResponse);
      // toast.success("Filtered by likes");
      console.log(`Filtered by likes`);
      break;
    case `date`:
      console.log(`Filtered by date`);
      if (filterData.quick !== null) {
        const quickFilter = filterData.quick;
        const now = new Date();
        let before;
        switch (quickFilter) {
          case "7-days":
            before = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
            break;
          case "30-days":
            before = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
            break;
          case "24-hours":
            before = new Date(now.getTime() - (24 * 60 * 60 * 1000));
            console.log(`before-date: ${before}`);
            break;
          default:
            throw new Error(`Unknown quick filter: ${quickFilter}`);
        }
        console.log(`before-date after: ${before}`)
        const response = query(
          collection(db, `products`, productId, `feedbacks`),
            where("createdAt", ">", before)
          );
          feedbacksSnap = await getDocs(response);
          // toast.success(`Filtered by ${quickFilter}`);
          console.log(`Filtered by ${quickFilter}`);
          break; 
        } else if (filterData.specifiedDate !== null) {
          console.log("Raw date from URL (date filter switch):" , filterData)
          const data = await getFeedbacksByDate(productId, filterData)
          if (!data) break;
          feedbacksSnap = data;
          console.log(`Filtered by date`, data);
        }
      break;
    default:
      feedbacksSnap = await getAllFeedbacks();
      break;
  }
}

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