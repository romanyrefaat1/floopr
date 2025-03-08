"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { addLikeToFeedbackItem } from "@/lib/feedback-item/like-to-feedback-item";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ThumbsUp } from "lucide-react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useFeedbackItem, useIsUserLiked } from "@/hooks/feedback/feedback";

export default function LikeButton({ feedbackId, productId }: { feedbackId: string, productId: string }) {
    const { user } = useUser();
    const router = useRouter();
    
    // Use real-time hooks instead of local state
    const { feedback, loading: feedbackLoading } = useFeedbackItem(productId, feedbackId);
    const { isLiked, loading: likeLoading } = useIsUserLiked(productId, feedbackId, user?.id || "");
    
    const likesCount = feedback?.socialData?.likes?.count || 0;
    const isLoading = feedbackLoading || likeLoading;

    const handleFeedbackLike = async () => {
        if (!user) {
            // Optional: redirect to sign-in or show a dialog
            // router.push("/sign-in");
            return;
        }
        
        await addLikeToFeedbackItem(feedbackId, {
            userId: user.id,
            username: user.fullName || "",
            profilePicture: user.imageUrl,
            productId
        });
        // No need to update state manually as real-time listener will handle it
    };
   
    return (
        <Button 
            onClick={handleFeedbackLike} 
            variant="outline" 
            className={cn("p-2 border-none", isLiked && "text-red-500 font-bold")}
            disabled={isLoading}
        >
            <ThumbsUp />
            {` `}
            <Suspense fallback={<Skeleton className="h-[20px] w-[20px] rounded" />}>
                {isLoading ? (
                    <Skeleton className="h-[20px] w-[20px] rounded" />
                ) : (
                    <span>{likesCount}</span>
                )}
            </Suspense>
        </Button>
    );
}