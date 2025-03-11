import { FeedbackTabsClient } from "./feedback-tabs-client";
import { FilterData, Product } from "../page";

export default async function FeedbackTabs({productData, isOwner=false, filter}: {productData: Product, isOwner: boolean, filter: FilterData}) {
  return <FeedbackTabsClient filter={filter} isOwner={isOwner} productData={productData} />;
}