"use client"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeedbackItem } from "@/hooks/feedback/feedback";
import { MessageCircleIcon } from "lucide-react";
import { Suspense } from "react";

export default function CommentButton({productId, feedbackId}: {productId: string, feedbackId: string}) {
    const {feedback, loading} = useFeedbackItem(productId, feedbackId);
    return <Button variant="outline">
        <MessageCircleIcon />
    {` `}
    {loading ? <Skeleton className="h-[20px] w-[20px] rounded" /> : <span>{feedback?.socialData?.comments?.count}</span>}
    </Button>;
}