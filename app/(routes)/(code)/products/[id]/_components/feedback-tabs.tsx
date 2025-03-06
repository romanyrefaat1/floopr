import { cookies } from "next/headers";
import { FeedbackTabsClient } from "./feedback-tabs-client";
import { Product } from "../page";

export default async function FeedbackTabs({productData}: {productData: Product}) {
  const cookieStore =await cookies();
  const defaultFeedbackTab = cookieStore.get('default-feedback-tab')?.value || "feedback-content";
  
  return <FeedbackTabsClient productData={productData} defaultFeedbackTab={defaultFeedbackTab} />;
}