"use client";

import LoaderSpinner from "../loader-spinner";
import FeedbackItem from "./feedback-item";
import { db } from "@/lib/firebase";
import serializeFirestoreData from "@/lib/serialize-firestore-data";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

// Feedback List Component
export default function FeedbackSection({
  productId,
  feedbackId,
}: {
  productId: string;
  feedbackId: string;
}) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  // Sample data - replace with actual data fetching
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const docRef = doc(db, "products", productId, "feedbacks", feedbackId);
        const querySnap = await getDoc(docRef);
        const firestoreData = querySnap.data();

        // Feedback doesnt exist
        if (!querySnap.exists()) {
          console.warn("Document not found");
          setData([]);
        } else {
          const serializedFeedbackData = serializeFirestoreData(
            firestoreData,
            true,
            true,
            false
          );
          console.log(
            "Serialized Feedback Data from else:",
            serializedFeedbackData
          );
          setData(serializedFeedbackData);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId && feedbackId) {
      fetchData();
    }
  }, [productId, feedbackId]);

  if (loading) return <LoaderSpinner />;

  return (
    <div className="space-y-4">
      <FeedbackItem key={data.id} feedbackData={data} productId={productId} />
    </div>
  );
}
