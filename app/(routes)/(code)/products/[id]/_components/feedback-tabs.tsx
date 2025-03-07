import { FeedbackTabsClient } from "./feedback-tabs-client";
import { Product } from "../page";

export default async function FeedbackTabs({productData, isOwner=false}: {productData: Product, isOwner: boolean}) {
  return <FeedbackTabsClient isOwner={isOwner} productData={productData} />;
}