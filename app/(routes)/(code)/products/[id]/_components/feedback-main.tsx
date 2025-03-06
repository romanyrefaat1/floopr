import { Product } from "../page";
import FeedbackContent from "./feedback-content";
import FeedbackTabs from "./feedback-tabs";

export default function FeedbackMain({productData}: {productData: Product}) {
     // See if user is owner of product
     const isOwner = true;
     console.log(productData.docId)
     return (
        <div>
            {isOwner && <FeedbackTabs productData={productData}/>}
            {!isOwner && <FeedbackContent productId={productData.docId} productData={productData}/>}
        </div>
     )
}