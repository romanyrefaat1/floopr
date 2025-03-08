import LoaderSpinner from "@/components/loader-spinner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { addLikeToFeedbackItem } from "@/lib/feedback-item/like-to-feedback-item";
import { db } from "@/lib/firebase";
import { doc, getDoc, getDocs, query } from "firebase/firestore";
import { ArrowLeft, MessageCircleIcon, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LikeButton from "./_components/like-button";

export default async function FeedbackSpecialPage({params}: {params: {id: string}}) {
    const {feedbackId, id: productId} = await params;
    const feedbackRef = doc(db, "products", productId, "feedbacks", feedbackId);
    const feedbackSnap = await getDoc(feedbackRef);
    if (!feedbackSnap.exists()) {
        notFound()
    }

    const feedbackData = feedbackSnap.data();

        
    return (
        <main>
            {/* User Data */}
            <Suspense fallback={<ArrowLeft />}><Link href={`/products/${productId}`}><ArrowLeft /></Link>
            </Suspense>
            <Link href={`/products/${productId}`} className="w-full hover:opacity-70">
                <p>Feeback to <Suspense fallback={<LoaderSpinner />}><span>{feedbackData.username}</span></Suspense></p>
            </Link>
            <Suspense fallback={<LoaderSpinner />}><div>
                <Link href={`/profile/${params.id}`} className="flex gap-2 items-center">
                    <Suspense fallback={<LoaderSpinner />}><Image
                        src={feedbackData.profilePicture}
                        alt={feedbackData.username}
                        width={30}
                        height={30}
                        className="rounded-full"
                    /></Suspense>
                    <p>{feedbackData.username}</p>
                </Link>
            </div>
            </Suspense>
            <Suspense fallback={ <Skeleton className="h-[200px] w-full rounded " />}>
            {feedbackData.type === `simple` && <article>
                <p>{feedbackData.content}</p>
            </article>}
            {feedbackData.type === `advanced` && <article>
                <p>{feedbackData.title}</p>
                <p>{feedbackData.description}</p>
            </article>}
            </Suspense>
            <div className="flex gap-2">
                <div>
                <LikeButton likesCount={feedbackData.socialData.likes.count}productId={productId} feedbackId={feedbackId}/>
                 </div>
                <div>
                <Button variant="outline" className="p-2 border-none">
                    <MessageCircleIcon />
                    {` `}
                    <Suspense fallback={<Skeleton className="h-[20px] w-[20px] rounded" />}><span>{feedbackData.socialData.comments.count}</span></Suspense>
                </Button>
                </div>
            </div>
        </main>
    )
}

// {"profilePicture":"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ydTBDNlNoNVpoVlp5YWdaQU9Xa3ZuM1RRWDEifQ","updatedAt":{"seconds":1741386774,"nanoseconds":375000000},"productId":"b3fe7981-7a58-44a2-9a49-713a620cbb20","userId":"user_2u0C6Q4MMHglCF18bB3NSAJTDWK","feedbackId":"596b72e7-038c-4f9a-a23b-0e37941b6146","content":"Feedback text","username":"Romany Refaat","productName":"DeaBoard","createdAt":{"seconds":1741386774,"nanoseconds":375000000},"status":"active"}