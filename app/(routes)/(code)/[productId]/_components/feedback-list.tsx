import { FilterData } from "../../products/[id]/page";
import FeedbackItem from "./feedback-item";
import getFilteredFeedbacks from "@/actions/filter-feedback";
import serializeFirestoreData from "@/lib/serialize-firestore-data";

export type FeedbackItemInDB = {
  componentRefId: string | null;
  createdAt?: any;
  updatedAt?: any;
  feedbackId: string;
  productId: string;
  status?: string;
  isComponent: boolean;
  // type: `idea` | `feature` | `issue` | `other`;
  type: string;
  topic?: {
    topTopic: string;
    text: string;
    topScore: number;
    labels: string[];
    scores: number[];
  };
  sentiment: {
    sentiment: string;
    score: number;
    text: string;
  };
  feedback: {
    title: string;
    content?: object;
    inputs?: Array;
    isRich: boolean;
  };
  userInfo?: {
    username: string;
    userId: string;
    profilePicture?: string;
  };

  socialData?: {
    comments: {
      count: number;
      data: any[];
    };
    likes: {
      count: number;
      data: any[];
    };
  };
};

export default async function FeedbackList({
  productId,
  filterData,
  isOwner,
}: {
  productId: string;
  filterData: FilterData;
  isOwner: boolean;
}) {
  try {
    const unserializedFeedbacks = (await getFilteredFeedbacks(
      productId,
      filterData
    )) as Array<FeedbackItemInDB>;

    // Serialize each feedback item
    const feedbacks = unserializedFeedbacks.map((feedback) =>
      serializeFirestoreData(feedback)
    );
    console.log(`feedbacks:`, feedbacks);

    if (feedbacks.length === 0) {
      return (
        <div className="text-secondaryForeground flex justify-center items-center min-h-[200px]">
          No feedbacks here yet
        </div>
      );
    }

    return (
      <div className="space-y-4 flex flex-col gap-md lg:gap-lg">
        {feedbacks.map((feedback) => (
          <FeedbackItem
            key={feedback.feedbackId}
            isOwner={isOwner}
            feedback={feedback}
            productId={productId}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return (
      <div className="text-red-500 flex justify-center items-center min-h-[200px]">
        Failed to load feedback. Please try again later.
      </div>
    );
  }
}
