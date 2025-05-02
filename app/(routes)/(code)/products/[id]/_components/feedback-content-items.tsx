import FeedbackItem from "../../../[productId]/_components/feedback-item";
import { FeedbackItemInDB } from "../../../[productId]/_components/feedback-list";
import { FilterData, Product } from "../page";
import getFilteredFeedbacks from "@/actions/filter-feedback";
import serializeFirestoreData from "@/lib/serialize-firestore-data";
import { Timestamp } from "firebase/firestore";

type FeedbackData = {
  id: string;
  feedback: {
    title: string;
    content: string;
  };
  type: string;
  sentiment: string;
  username: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  socialData: {
    comments: { count: number; data: any[] };
    likes: { count: number; data: any[] };
  };
};

export default async function FeedbackContentItems({
  productData,
  productId,
  isOwner = false,
  filterData,
}: {
  productData: Product;
  productId: string;
  filterData?: FilterData;
  isOwner: boolean;
}) {
  try {
    console.log(`productId from feedbakcontentitems`, productId);
    const data = await getFilteredFeedbacks(productId, filterData || {});

    const feedbacks = Array.isArray(data) ? data : [];
    console.log(`fetced feedbacks`, feedbacks);

    if (!feedbacks || !feedbacks.length) {
      return (
        <div
          className="text-center py-8"
          style={{ color: productData.style?.textColor }}
        >
          <p className="text-secondaryForeground">
            No feedback found matching your criteria.
          </p>
        </div>
      );
    }

    const serializedFeedbacks = feedbacks.map(
      (f) => serializeFirestoreData(f) as FeedbackItemInDB
    );

    return (
      <div className="space-y-4">
        {serializedFeedbacks.map((feedback) => (
          <div className="mb-4" key={feedback.id}>
            <FeedbackItem
              isOwner={isOwner}
              feedback={feedback}
              productId={productId}
              feedbackId={feedback.id}
            />
          </div>
        ))}
      </div>
    );
  } catch (err) {
    return (
      <div className="text-red-500 p-4 text-center">
        {err instanceof Error ? err.message : "An error occurred"}
      </div>
    );
  }
}
