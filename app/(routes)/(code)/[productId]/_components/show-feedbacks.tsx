import FeedbackList from "./feedback-list";

export default function ShowFeedbacks({ productId }: { productId: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Feedbacks</h2>
      <FeedbackList productId={productId} />
    </div>
  );
}
