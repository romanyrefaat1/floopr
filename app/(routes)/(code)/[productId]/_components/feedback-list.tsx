import FeedbackItem from "./feedback-item";
import getFilteredFeedbacks from "@/actions/filter-feedback";
import { FilterData } from "../../products/[id]/page";

export type FeedbackItemInDB = {
  componentRefId: string | null;
  createdAt?: any;
  updatedAt?: any;
  feedbackId: string;
  productId: string;
  status?: string;
  // type: `idea` | `feature` | `issue` | `other`;
  type: string;
  topic?: {
    topTopic?: string;
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
    content?: string;
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
    },
    likes: {
      count: number;
      data: any[];
    };
  };
}

export default async function FeedbackList({ productId, filterData, isOwner }: { productId: string, filterData: FilterData, isOwner: boolean }) {
  try {
    const feedbacks = await getFilteredFeedbacks(productId, filterData) as Array<unknown>
    console.log(`Fetched feedbacks`, feedbacks);

    if (!feedbacks[0]) {
      return (<div className="text-red-500">
        Failed to load feedback. Please try again later....
      </div>
      )
    }

    return (
      <div className="space-y-4">
        {isOwner ? `owner`: `not owner`}
        {feedbacks.map((feedback) => (
          <FeedbackItem key={feedback.id} isOwner={isOwner} feedback={{...feedback, createdAt: feedback.createdAt?.toDate(), updatedAt: feedback.updatedAt?.toDate()}} productId={productId} />
          // <>text</>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return (
      <div className="text-red-500">
        Failed to load feedback. Please try again later.
      </div>
    );
  }
}
