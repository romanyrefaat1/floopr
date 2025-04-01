import formatFirebaseTimestamp from "@/lib/formate-firebase-timestamp";

export default function FeedbackMetadata({ feedbackData }: { feedbackData: any }) {
    return (
    <div className="grid md:grid-cols-2 gap-4 bg-background p-4 rounded-md">
      <div>
        <p className="text-mutedForeground">Feedback ID</p>
        <p>{feedbackData.feedbackId}</p>
      </div>
      <div>
        <p className="text-mutedForeground">Created At</p>
        <p>{formatFirebaseTimestamp(feedbackData.createdAt)}</p>
      </div>
      <div>
        <p className="text-mutedForeground">Sentiment</p>
        <div className="flex items-center gap-2">
          <span 
            className={`px-2 py-1 rounded-sm text-sm 
              ${feedbackData?.sentiment?.sentiment === 'POSITIVE' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'}`}
          >
            {feedbackData?.sentiment?.sentiment}
          </span>
          <span>Score: {feedbackData?.sentiment?.score?.toFixed(2)}</span>
        </div>
      </div>
      <div>
        <p className="text-mutedForeground">Type</p>
        <p>{feedbackData.type}</p>
      </div>
    </div>
    )
}