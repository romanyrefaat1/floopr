import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DotSquareIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { Product } from "../page";
import { AdvancedFeedbackItemDataProps, SimpleFeedbackItemDataProps } from "@/actions/add-feedback";
import LikeButton from "../feedback/[feedbackId]/_components/like-button";
import CommentButton from "../feedback/[feedbackId]/_components/comment-button";

type FeedbackDataProps = {
    isSimple: true
} extends infer T
    ? SimpleFeedbackItemDataProps
    : AdvancedFeedbackItemDataProps

export default function FeedbackItem({productData, feedbackData, isSimple=true, feedbackId, isOwner=false}: {productData: Product, feedbackId: string, 
    isSimple?: boolean, feebackData: FeedbackDataProps, isOwner?: boolean}) {
    const productId = productData.docId;
    return (
        
        <Card>
            <CardHeader>
                {!isSimple &&<> <Link className="hover:underline" href={`/products/${productId}/feedback/${feedbackId}`}><CardTitle className="truncate max-w-[1030ch]">{feedbackData.title}</CardTitle></Link>
                <CardDescription>{feedbackData.username}</CardDescription></>}
                {isSimple && <Link className="hover:underline" href={`/products/${productId}/feedback/${feedbackId}`}><CardTitle className="truncate max-w-[20ch]">{feedbackData.content}</CardTitle></Link>}
            </CardHeader>
            <CardDescription className="px-6 truncate max-w-[100ch]">
                {feedbackData.description}
            </CardDescription>
            <CardFooter>
                <Button variant="outline" ><LikeButton feedbackId={feedbackId} productId={productId}/></Button>
                <CommentButton productId={productId} feedbackId={feedbackId}/>
                {/* {isOwner && <AdminDropdownOnFeedback />} */}
            </CardFooter>
        </Card>
    )
}