'use client';

import LoaderSpinner from "@/components/loader-spinner";
import { useFeedbackReplies } from "@/hooks/feedback/feedback-replies";

export default function RepliesList({productId, feedbackId}: {productId: string, feedbackId: string}) {
    const { replies, loading, error } = useFeedbackReplies(productId, feedbackId);
    
    if (loading) return <LoaderSpinner />;
    
    if (error) return <p className="text-red-500">Error loading replies: {error.message}</p>;
    
    return (
        <div>
            {replies && replies.length > 0 ? (
                replies.map((reply, index) => (
                    <div key={index} className="border p-4 mb-2 rounded">
                        <p className="font-medium">{reply.content}</p>
                        <p className="text-sm text-gray-500">
                            {reply.createdAt?.toDate 
                                ? new Date(reply.createdAt.toDate()).toLocaleString() 
                                : reply.createdAt 
                                    ? new Date(reply.createdAt).toLocaleString()
                                    : "Unknown date"}
                        </p>
                    </div>
                ))
            ) : (
                <p>No replies yet</p>
            )}
        </div>
    );
}