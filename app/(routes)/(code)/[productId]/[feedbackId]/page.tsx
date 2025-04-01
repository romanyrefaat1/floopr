import getProductData from "@/actions/get-product-data";
import FeedbackItemPreviewModal from "@/components/feedback-item-preview-modal.tsx/feedback-item-preview-modal";
import { db } from "@/lib/firebase";
import serializeFirestoreData from "@/lib/serialize-firestore-data";
import { doc, getDoc } from "firebase/firestore";

export default async function FeedbackModal({ params }) {
  const { productId, feedbackId } = params;

  const productData = await getProductData(productId);
  const serializedProductData = serializeFirestoreData(productData);

  // Get specific feedback document directly instead of fetching all
  const feedbackDocRef = doc(
    db,
    "products",
    productId,
    "feedbacks",
    feedbackId
  );
  const feedbackSnap = await getDoc(feedbackDocRef);
  const feedbackData = serializeFirestoreData(feedbackSnap.data());

  if (!feedbackData || !serializedProductData) {
    throw new Error(`Feedback Data or Product Data not found`);
  }

  return (
    <FeedbackItemPreviewModal
      passedParams={{ productId, feedbackId }}
      productData={serializedProductData}
      feedbackData={feedbackData}
    />
  );
}
