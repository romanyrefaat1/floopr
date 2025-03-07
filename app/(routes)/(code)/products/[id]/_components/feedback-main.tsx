import { auth } from "@clerk/nextjs/server";
import { Product } from "../page";
import FeedbackNotOwner from "./feedback-not-owner";
import FeedbackTabs from "./feedback-tabs";

export default async function FeedbackMain({productData}: {productData: Product}) {
     // See if user is owner of product
     const {userId} = await auth()
     const isOwner = userId === productData.ownerId
     return (
        <div>
            <FeedbackTabs productData={productData} isOwner={isOwner}/>
        </div>
     )
}