import ShowFeedbacks from "../show-feedbacks";
import TopFeedbacks from "./top-feedbacks";

export default function Feedbacks({ productId, productData }) {
  return (
    <div className="p-4 flex flex-col gap-xl2 rounded-lg bg-card text-card-foreground shadow border border-secondary">
      <TopFeedbacks />
      <ShowFeedbacks productId={productId} />
    </div>
  );
}
