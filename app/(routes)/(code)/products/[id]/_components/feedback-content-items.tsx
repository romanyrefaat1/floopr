import { collection, getDocs, query, where } from "firebase/firestore";
import { Product } from "../page";
import FeedbackItem from "./feedback-item";
import { db } from "@/lib/firebase";

export default async function FeedbackContentItems({productData, productId, isOwner=false}: {productData: Product, productId: string, isOwner: boolean}) {
  const response = query(
    collection(db, `products`, productId, `feedbacks`)
    // where("createdAt", ">", 0)
  );
  const feedbacksSnap = await getDocs(response);
  console.log(`feedbacks`, feedbacksSnap);
  
  if (feedbacksSnap.empty) {
    return <div className="text-center p-8"> <p>No feedback yet!</p></div>;
  }
  
  return (
    <div>
      <ul>
        {feedbacksSnap.docs.map((doc) => (
          <li key={doc.id}>
            <FeedbackItem isOwner={isOwner} productData={productData} feedbackData={doc.data()} isSimple={true} feedbackId={doc.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}