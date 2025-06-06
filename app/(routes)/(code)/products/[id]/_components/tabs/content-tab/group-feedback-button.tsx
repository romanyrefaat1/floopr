"use client";

import { useGroupedFeedback } from "../../../group-context/groupt-context";
import { Button } from "@/components/ui/button";
import { usePricing } from "@/context/pricing-context";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import {
  writeBatch,
  collection,
  getDocs,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { RefreshCcwDotIcon, Loader2, X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
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

  const { isExceededGroupFeedbackLimit, openModal } = usePricing();
  const [isAnimated, setIsAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (clickCount > 0) {
      setTimeout(() => {
        setIsAnimated(true);
        setIsAnimating(false);
        setClickCount(0);
      }, 2000);
    }
  }, [clickCount]);

  const handleCreateNewGroup = async () => {
    if (isExceededGroupFeedbackLimit) {
      if (clickCount === 0) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimated(true);
          setIsAnimating(false);
          setClickCount(1);
        }, 1000);
        return;
      } else {
        openModal({
          error:
            "You have exceeded the group feedback limit. Please upgrade your plan to continue.",
          content: {
            plans: {
              free: {
                button: "Continue without grouping feedback",
              },
            },
          },
        });
        return;
      }
    }

    setIsLoading(true);
    setIsCommitting(false);
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    const toastId = toast.loading("Replacing groups...");

    try {
      const res = await fetch("/api/group-feedback/create-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        signal,
      });

      if (signal.aborted) {
        toast.dismiss(toastId);
        toast.info("Group replacement cancelled");
        setIsLoading(false);
        setIsCommitting(false);
        return;
      }

      if (res.status === 403) {
        openModal({
          error:
            "You have exceeded the group feedback limit. Please upgrade your plan to continue.",
          content: {
            plans: {
              free: {
                button: "Continue without grouping feedback",
              },
            },
          },
        });
        toast.dismiss(toastId);
        setIsLoading(false);
        setIsCommitting(false);
        return;
      }

      if (!res.ok) {
        const { error } = await res.json();
        toast.dismiss(toastId);
        setIsLoading(false);
        setIsCommitting(false);
        throw new Error(error || "Unknown error from grouping API");
      }

      const { groupedFeedback } = await res.json();

      if (signal.aborted) {
        toast.dismiss(toastId);
        toast.info("Group replacement cancelled");
        setIsLoading(false);
        setIsCommitting(false);
        return;
      }

      setIsCommitting(true);
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
        groupedFeedback.map((group: any) => ({
          title: group.groupTitle,
          description: group.groupDescription,
          feedback: group.feedback,
          feedbackData: group.feedbackData || [],
          updatedAt: serverTimestamp(),
        }))
      );

      toast.success("Groups replaced successfully!", { id: toastId });
    } catch (err: any) {
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
        {
          id: toastId,
        }
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
        className={cn(
          "flex items-center gap-1",
          // isAnimating && "animate-wiggle",
          isAnimating && "wiggle-fast"
          // isAnimated && "animate-none border-4 border-red-500"
        )}
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
