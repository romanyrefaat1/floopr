"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { sendReply } from "@/lib/feedback-item/send-reply";
import { useUser } from "@clerk/nextjs";

export default function CommentInput({productId, feedbackId}: {productId: string, feedbackId: string}) {
    const [commentVal,setCommentVal] = useState("")
    const [loading, setLoading] = useState(false)
    const {user, isSignedIn} = useUser()
    const userId = user?.id

    const handleSendComment = async(e: React.FormEvent) => {
        e.preventDefault();

        if (!commentVal.length) return;
        if (!isSignedIn) return;

        setLoading(true)
        console.log(`productId: ${productId}, feedbackId: ${feedbackId}, userId: ${userId}`)
        await sendReply(commentVal, feedbackId, userId, productId)
        setLoading(false)
        setCommentVal("")
    }
    
    return (
        <form onSubmit={(e)=>handleSendComment(e)} className="flex gap-2">
            <Input placeholder="Reply" disabled={commentVal.length < 0} onChange={(e)=>setCommentVal(e.target.value)} />
            <Button type="submit">Send</Button>
        </form>
    )
}