"use client";

import CommentsForm from "../comments-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentsList from "@/app/(routes)/(code)/[productId]/_components/comments/comments-list";
import { useAuth, useUser } from "@clerk/nextjs";

export default function CommentsSection({
  productId,
  feedbackId,
}: {
  productId: string;
  feedbackId: string;
}) {
  const { userId } = useAuth();
  const { user } = useUser();

  return (
    <div className="border-t border-border pt-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-foreground">Comments</h4>
      </div>

      {/* Comment Input */}
      <div className="flex items-center space-x-3">
        {/* <Avatar className="w-8 h-8">
          <AvatarImage src={user?.imageUrl} alt="User's profile picture" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar> */}
        <div className="flex-grow flex justify-center items-center relative">
          <CommentsForm
            feedbackId={feedbackId}
            productId={productId}
            userId={userId}
          />
          {/* <CommentInput productId={productId} feedbackId={feedbackId} /> */}
        </div>
      </div>
      <CommentsList feedbackId={feedbackId} productId={productId} />
    </div>
  );
}
