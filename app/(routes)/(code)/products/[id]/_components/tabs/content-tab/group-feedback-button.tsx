"use client";

import { useGroupedFeedback } from "../../../group-context/groupt-context";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import {
  writeBatch,
  collection,
  getDocs,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { RefreshCcwDotIcon, Loader2, X } from "lucide-react";
import React, { useState, useRef } from "react";
import { toast } from "sonner";

export default function GroupFeedbackButton({
  productId,
}: {
  productId: string;
}) {
  const { setGroupedFeedback } = useGroupedFeedback();
  const [isLoading, setIsLoading] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleCreateNewGroup = async () => {
    setIsLoading(true);
    setIsCommitting(false);

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // show loading toast (returns toast id)
    const toastId = toast.loading("Replacing groups...");

    try {
      // fetch grouped feedback
      const res = await fetch("/api/group-feedback/create-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        signal, // Add signal for cancellation
      });

      // Check if request was aborted
      if (signal.aborted) {
        toast.dismiss(toastId);
        toast.info("Group replacement cancelled");
        return;
      }

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Unknown error from grouping API");
      }

      const { groupedFeedback } = await res.json();

      // Check if cancelled before proceeding with database operations
      if (signal.aborted) {
        toast.dismiss(toastId);
        toast.info("Group replacement cancelled");
        return;
      }

      // Set committing state - no more cancellation after this point
      setIsCommitting(true);

      // batch delete existing docs and write new ones
      const batch = writeBatch(db);
      const groupsRef = collection(
        db,
        "products",
        productId,
        "feedback-groups"
      );
      const existing = await getDocs(groupsRef);
      existing.forEach((snapshot) => batch.delete(snapshot.ref));

      groupedFeedback.forEach((group: any) => {
        const groupRef = doc(
          db,
          "products",
          productId,
          "feedback-groups",
          group.groupId
        );
        batch.set(groupRef, {
          title: group.groupTitle,
          description: group.groupDescription,
          feedback: group.feedback,
          feedbackData: group.feedbackData || [],
          updatedAt: serverTimestamp(),
          id: group.groupId,
        });
      });

      await batch.commit();

      setGroupedFeedback(
        groupedFeedback.map((group: any) => {
          return {
            title: group.groupTitle,
            description: group.groupDescription,
            feedback: group.feedback,
            feedbackData: group.feedbackData || [],
            updatedAt: serverTimestamp(),
          };
        })
      );

      // update toast to success
      toast.success("Groups replaced successfully!", { id: toastId });
    } catch (err: any) {
      // Don't show error if it was cancelled
      if (
        err.name === "AbortError" ||
        abortControllerRef.current?.signal.aborted
      ) {
        toast.dismiss(toastId);
        toast.info("Group replacement cancelled");
        return;
      }

      console.error("Error replacing feedback groups:", err);
      toast.error(
        err?.message || "Failed to replace groups. Please try again.",
        { id: toastId }
      );
    } finally {
      setIsLoading(false);
      setIsCommitting(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCreateNewGroup}
        disabled={isLoading}
        className="flex items-center gap-1"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <RefreshCcwDotIcon />
        )}
        {isLoading ? "Replacing..." : "Replace All Groups"}
      </Button>

      {isLoading && (
        <Button
          variant="destructive"
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
  );
}
