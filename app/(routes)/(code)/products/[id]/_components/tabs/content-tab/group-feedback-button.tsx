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
import { RefreshCcwDotIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function GroupFeedbackButton({
  productId,
}: {
  productId: string;
}) {
  const { setGroupedFeedback } = useGroupedFeedback();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNewGroup = async () => {
    setIsLoading(true);

    // show loading toast (returns toast id)
    const toastId = toast.loading("Replacing groups...");

    try {
      // fetch grouped feedback
      const res = await fetch("/api/group-feedback/create-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Unknown error from grouping API");
      }

      const { groupedFeedback } = await res.json();

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
        });
      });

      await batch.commit();
      setGroupedFeedback(groupedFeedback);

      // update toast to success
      toast.success("Groups replaced successfully!", { id: toastId });
    } catch (err: any) {
      console.error("Error replacing feedback groups:", err);
      toast.error(
        err?.message || "Failed to replace groups. Please try again.",
        { id: toastId }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCreateNewGroup}
      disabled={isLoading}
      className="flex items-center gap-1"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <RefreshCcwDotIcon />}
      {isLoading ? "Replacing..." : "Replace All Groups"}
    </Button>
  );
}
