"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeedbackItem, useIsUserLiked } from "@/hooks/feedback/feedback";
import { addLikeToFeedbackItem } from "@/lib/feedback-item/like-to-feedback-item";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";

export default function LikeButton({
  feedbackId,
  productId,
  variant = `outline`,
}: {
  feedbackId: string;
  productId: string;
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}) {
  const { user } = useUser();
  const router = useRouter();
  console.log(`feedbackId button`, feedbackId);

  // Use real-time hooks instead of local state
  const { feedback, loading: feedbackLoading } = useFeedbackItem(
    productId,
    feedbackId
  );
  const { isLiked, loading: likeLoading } = useIsUserLiked(
    productId,
    feedbackId,
    user?.id || ""
  );

  const likesCount = feedback?.socialData?.likes?.count || 0;
  const isLoading = feedbackLoading || likeLoading;

  const handleFeedbackLike = async (e) => {
    if (likeLoading || feedbackLoading) return;
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.warning("Please sign in so we can save your data");
      router.push("/sign-in");
      return;
    }

    await addLikeToFeedbackItem(feedbackId, {
      userId: user.id,
      username: user.fullName || "",
      profilePicture: user.imageUrl,
      productId,
    });
  };

  return (
    <Button
      onClick={(e) => handleFeedbackLike(e)}
      variant={variant}
      className={cn(
        "p-2 border-none flex items-center justify-center skeleton",
        isLiked && "text-primary font-bold",
        (likeLoading || feedbackLoading) && "cursor-not-allowed"
      )}
      disabled={isLoading}
    >
      <ThumbsUp />
      {` `}
      {/* <Suspense fallback={<Skeleton className="h-[20px] w-[20px] rounded" />}>
        {isLoading ? (
          <Skeleton className="h-[15px] w-[15px] rounded-full bg-secondaryForeground" />
        ) : ( */}
      <span>{likesCount}</span>
      {/* )} */}
      {/* </Suspense> */}
    </Button>
  );
}
