
import getProductData from '@/actions/get-product-data';
import FeedbackItemPreviewModal from '@/components/feedback-item-preview-modal.tsx/feedback-item-preview-modal';
import { db } from '@/lib/firebase';
import serializeFirestoreData from '@/lib/serialize-firestore-data';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000, // ensure the modal is on top
  },
  modal: {
    padding: '20px',
    borderRadius: '8px',
    position: 'relative',
    maxWidth: '500px',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
};

export default async function FeedbackModal({ params, searchParams }) {
  const {productId, feedbackId} = params;

  const productData = await getProductData(productId)
  const serializedProductData = serializeFirestoreData(productData)

  // Find feedbackData
  const feedbackCollRef = collection(db, `products`, productId, `feedbacks`)
  const feedbackSnap = await getDocs(feedbackCollRef)
  const feedbackData = feedbackSnap.docs.map(doc => serializeFirestoreData(doc.data()))[0]

  console.log(`feedbackData from paje:`, feedbackData)
  console.log(`productData from paje:`, serializedProductData)

  if (!feedbackData || !serializedProductData) {
    throw new Error(`Feedback Data and Product Data are not truthy values`)
  }

  return (
    <div style={modalStyles.overlay}>
      <FeedbackItemPreviewModal
        passedParams={{productId: productId, feedbackId: feedbackId}}
        productData={serializedProductData}
        feedbackData={feedbackData}/>
    </div>
  );
}