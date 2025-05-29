"use client";

import { FeedbackItemInDB } from "../../../[productId]/_components/feedback-list";
import FeedbackItem from "../_components/feedback-item";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/firebase";
import makeFirstLetterUppercase from "@/lib/make-first-letter-uppercase";
import {
  doc,
  getDoc,
  writeBatch,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { Trash2, Loader2, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

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
  const [isClearing, setIsClearing] = useState<boolean>(false);
  const [isCommitting, setIsCommitting] = useState<boolean>(false);
  const cancelRef = useRef<boolean>(false);

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

  const handleClearAllFeedback = async () => {
    if (!groupId || feedbackItems.length === 0) return;

    setIsClearing(true);
    setIsCommitting(false);
    cancelRef.current = false;

    const toastId = toast.loading(
      `Clearing all feedback from ${groupTitle}...`
    );

    try {
      // Simulate some preparation time where cancellation is possible
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if cancelled before committing
      if (cancelRef.current) {
        toast.dismiss(toastId);
        toast.info("Clear operation cancelled");
        return;
      }

      // Set committing state - no more cancellation after this point
      setIsCommitting(true);

      const batch = writeBatch(db);

      // Get all feedback IDs from this group
      const feedbackIds = feedbackItems.map((item) => item.feedbackId);

      // Delete from main feedbacks collection
      for (const feedbackId of feedbackIds) {
        const feedbackRef = doc(
          db,
          "products",
          productId,
          "feedbacks",
          feedbackId
        );
        batch.delete(feedbackRef);
      }

      // Clear the group document (set feedbackData to empty array)
      const groupRef = doc(
        db,
        "products",
        productId,
        "feedback-groups",
        groupId
      );
      batch.update(groupRef, {
        feedbackData: [],
        feedback: [],
        updatedAt: new Date(),
      });

      // Commit all deletions
      await batch.commit();

      // Update local state
      setFeedbackItems([]);

      toast.success(`All feedback cleared from ${groupTitle}!`, {
        id: toastId,
      });
    } catch (error: any) {
      // Don't show error if it was cancelled
      if (cancelRef.current) {
        toast.dismiss(toastId);
        toast.info("Clear operation cancelled");
        return;
      }

      console.error("Error clearing feedback:", error);
      toast.error(
        error?.message ||
          `Failed to clear feedback from ${groupTitle}. Please try again.`,
        { id: toastId }
      );
    } finally {
      setIsClearing(false);
      setIsCommitting(false);
      cancelRef.current = false;
    }
  };

  const handleCancel = () => {
    cancelRef.current = true;
  };

  if (!groupId || loading) return null;

  return (
    <div className="w-full max-w-4xl mx-auto py-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          Grouped by {groupTitle}
        </h2>

        {feedbackItems.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearAllFeedback}
              disabled={isClearing}
              className="flex items-center gap-2"
            >
              {isClearing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              {isClearing ? "Clearing..." : "Clear All Feedback"}
            </Button>

            {isClearing && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isCommitting}
                className="flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            )}
          </div>
        )}
      </div>

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
