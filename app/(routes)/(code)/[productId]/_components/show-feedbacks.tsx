import { ProductData } from "../page";
import FeedbackItem from "./feedback-item";
import FeedbackList from "./feedback-list";

export default function ShowFeedbacks({productId}: {productId: string}){
    return (
        <div>
            <h2 className="text-2xl font-[var(--product-heading-style)]">All Feedbacks</h2>
            <FeedbackList productId={productId}/>
            <FeedbackItem productId={productId}/>
        </div>
    )
}