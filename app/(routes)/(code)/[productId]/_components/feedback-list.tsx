import FeedbackItem from "./feedback-item";
import { StatusType } from "./status-filter";
import { useAllFeedback } from "@/contexts/all-feedback-context";

export default function FeedbackList({
  isOwner,
  productId,
  status = null,
}: {
  productId: string;
  isOwner: boolean;
  status?: StatusType | null;
}) {
  const { feedbacks: feedbackData, loading, error } = useAllFeedback();
  let feedbacks = feedbackData;

  if (status) {
    feedbacks =
      feedbackData?.filter((feedback) => feedback.status === status) || [];
  }

  if (loading) {
    return (
      <div className="space-y-4 flex flex-col gap-md lg:gap-lg w-full">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-muted rounded-lg h-24 w-full"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 flex justify-center items-center w-full min-h-[200px]">
        {error}
      </div>
    );
  }

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="text-secondaryForeground flex justify-center items-center min-h-[200px] w-full">
        No feedback here yet
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
          className=""
        />
      ))}
    </div>
  );
}
