import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentInput from "@/app/(routes)/(code)/products/[id]/feedback/[feedbackId]/_components/comment-input";
import CommentsList from "@/app/(routes)/(code)/[productId]/_components/comments/comments-list";

export default function CommentsSection({productId, feedbackId}: {productId: string, feedbackId: string}){
    
    return (
        <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-foreground">Comments</h4>
        </div>

        {/* Comment Input */}
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-grow flex justify-center items-center relative">
            {/* <RichTextEditor placeholder="Add a comment..." className="w-full p-2 pl-10 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
          <Button variant="default">Send</Button> */}
          <CommentInput productId={productId} feedbackId={feedbackId} />
          </div>
        </div>
        <CommentsList feedbackId={feedbackId} productId={productId}/>
      </div>
    )
}