import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { Product } from "../page";
import { string } from "zod";
import { AdvancedFeedbackItemDataProps, SimpleFeedbackItemDataProps } from "@/actions/add-feedback";

type FeedbackDataProps = {
    isSimple: true
} extends infer T
    ? SimpleFeedbackItemDataProps
    : AdvancedFeedbackItemDataProps

export default function FeedbackItem({productData, feedbackData, isSimple=true, feedbackId}: {productData: Product, feedbackId: string, 
    isSimple?: boolean, feebackData: FeedbackDataProps}) {
    const productId = productData.docId;
    return (
        <Link href={`/products/${productId}/feedback/${feedbackId}`}>
        <Card>
            <CardHeader>
                {!isSimple &&<> <CardTitle className="truncate max-w-[50ch]">{feedbackData.title}</CardTitle>
                <CardDescription>{feedbackData.username}</CardDescription></>}
                {isSimple && <CardTitle className="truncate max-w-[50ch]">{feedbackData.content}</CardTitle>}
            </CardHeader>
            <CardDescription className="px-6 truncate max-w-[100ch]">
                {feedbackData.description}
            </CardDescription>
            <CardFooter>
                <Button variant="outline"><ThumbsUpIcon /></Button>
                <Button variant="secondary" className="border-none"><MessageCircleIcon /></Button>
            </CardFooter>
        </Card>
        </Link>
    )
}