"use client";

import { FeedbackItemInDB } from "../../../[productId]/_components/feedback-list";
import FeedbackItem from "../_components/feedback-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/firebase";
import makeFirstLetterUppercase from "@/lib/make-first-letter-uppercase";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilteredFeedbackByGroup({
  productId,
  isOwner,
}: {
  productId: string;
  isOwner: boolean;
}) {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group");

  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemInDB[]>([]);
  const [groupTitle, setGroupTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGroupFeedback = async () => {
      if (!groupId) return;
      setLoading(true);
      const groupRef = doc(
        db,
        "products",
        productId,
        "feedback-groups",
        groupId
      );
      const groupSnap = await getDoc(groupRef);

      if (groupSnap.exists()) {
        const data = groupSnap.data();
        setFeedbackItems(data.feedbackData || []);
        setGroupTitle(
          makeFirstLetterUppercase((data.title || groupId).replace(/-/g, " "))
        );
      } else {
        setFeedbackItems([]);
        setGroupTitle(groupId);
      }

      setLoading(false);
    };

    fetchGroupFeedback();
  }, [groupId, productId]);

  if (!groupId || loading) return null;

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Grouped by {groupTitle}
      </h2>
      <ScrollArea className="h-[700px] w-full">
        <div className="space-y-4">
          {feedbackItems.length === 0 ? (
            <p className="text-muted-foreground">No feedback in this group.</p>
          ) : (
            feedbackItems.map((fb: FeedbackItemInDB, idx) => {
              let content = fb.feedback?.content || "Unknown Content";

              if (!fb.feedback?.isRich) {
                content = fb.feedback?.content;
              } else if (
                Array.isArray(fb.feedback?.content?.blocks) &&
                fb.feedback.content.blocks.length > 0
              ) {
                content = fb.feedback.content.blocks
                  .map((block) => block.text)
                  .join("\n");
              } else if (
                Array.isArray(fb.feedback?.inputs) &&
                fb.feedback.inputs?.length > 0
              ) {
                content = fb.feedback.inputs
                  .map((input) => `${input.label}: ${input.value}`)
                  .join("\n");
              }

              return (
                <FeedbackItem
                  key={fb.id || idx}
                  feedbackData={{
                    title: fb.feedback?.title || "Untitled Feedback",
                    content,
                    isRic: fb.feedback?.isRich,
                    username: fb.userInfo?.username,
                  }}
                  productData={{ id: productId, isOwner }}
                  feedbackId={fb.feedbackId}
                />
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
