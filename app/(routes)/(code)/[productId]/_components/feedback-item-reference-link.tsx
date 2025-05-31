import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Suspense, useEffect, useState } from "react";

function ReferenceLinkSkeleton() {
  return (
    <span className="absolute top-4 left-4 text-[12px] bg-muted rounded px-2 py-1 animate-pulse w-32 h-4 inline-block" />
  );
}

function FeedbackItemReferenceLinkInner({
  productId,
  feedbackId,
}: {
  productId: string;
  feedbackId: string;
}) {
  const [referenceLink, setReferenceLink] = useState<string | null>(null);
  useEffect(() => {
    const fetchLink = async () => {
      const docRef = doc(db, "products", productId, "feedbacks", feedbackId);
      const snap = await getDoc(docRef);
      if (snap.exists() && snap.data().referenceLink) {
        setReferenceLink(snap.data().referenceLink);
      } else {
        setReferenceLink(`No reference link found`);
      }
    };
    fetchLink();
  }, [productId, feedbackId]);
  if (!referenceLink) return <ReferenceLinkSkeleton />;
  return (
    <span className="text-mutedForeground absolute top-4 left-4 text-[12px] hover:text-foreground transition-colors">
      {referenceLink}
    </span>
  );
}

export default function FeedbackItemReferenceLink(props: {
  productId: string;
  feedbackId: string;
}) {
  return (
    <Suspense fallback={<ReferenceLinkSkeleton />}>
      <FeedbackItemReferenceLinkInner {...props} />
    </Suspense>
  );
}
