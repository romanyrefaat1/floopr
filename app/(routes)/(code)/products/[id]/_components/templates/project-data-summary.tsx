import getBasicAnalytics from "@/actions/basic-analytics/return-basic-analytics";
import { Separator } from "@/components/ui/separator";

// Data is not cached, and force dynamic rendering so that each request updates the DB.
export const dynamic = 'force-dynamic';

const LiItem = ({children, className}: {children: React.ReactNode, className?: string})=>{
    return (
        <li className={`flex items-center justify-between text-sm ${className}`}>{children}</li>
    )
}

export default async function ProjectDataSummary({productId}: {productId: string}){
    const basicAnalytics = await getBasicAnalytics(productId);
    console.log(`basicAnalytics`, basicAnalytics)
    let topSentiment = basicAnalytics.sentiment.topSentiment;
    // let topSentiment = `Negative`;
    return (
        // <div></div>
        <ul className="bg-background text-foreground flex flex-col gap-4">
            <LiItem>
                <span className="text-mutedForeground">Page Views</span>
                <span className="font-medium">{basicAnalytics.pageViews}</span>
            </LiItem>
            <Separator />
            <LiItem>
                <span className="text-mutedForeground">Feedbacks</span>
                <span className="font-medium">{basicAnalytics.feedbackCount}</span>
            </LiItem>
            <Separator />
            <LiItem>
                <span className="text-mutedForeground">Comments</span>
                <span className="font-medium">{basicAnalytics.commentsCount}</span>
            </LiItem>   
            <Separator />
            <LiItem>
                <span className="text-mutedForeground">Sentiment Percent</span>
                <span className="flex items-center gap-2">
                    {/* Small circle */}
                    {topSentiment === 'Positive' && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                    {topSentiment === 'Negative' && <span className="w-1.5 h-1.5 rounded-full bg-destructive"></span>}
                    {topSentiment === 'Neutral' && <span className="w-1.5 h-1.5 rounded-full bg-muted"></span>}
                    <span className="font-medium">{topSentiment} | {basicAnalytics.sentiment.percent}%</span>
                </span>
            </LiItem>
            <Separator />
            <LiItem>
                <span className="text-mutedForeground">Top Topic</span>
                <span className="font-medium">{basicAnalytics.topic.topTopic} | {basicAnalytics.topic.topTopicPercent}%</span>
            </LiItem>
        </ul>
    )
}