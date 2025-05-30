import FeedbackItem from "./feedback-item";
import { useAllFeedback } from "@/contexts/all-feedback-context";

export default function FeedbackList({
  isOwner,
  productId,
}: {
  productId: string;
  isOwner: boolean;
}) {
  const { feedbacks, loading, error } = useAllFeedback();

  if (loading) {
    return (
      <div className="space-y-4 flex flex-col gap-md lg:gap-lg">
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
      <div className="text-red-500 flex justify-center items-center min-h-[200px]">
        {error}
      </div>
    );
  }

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="text-secondaryForeground flex justify-center items-center min-h-[200px]">
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
