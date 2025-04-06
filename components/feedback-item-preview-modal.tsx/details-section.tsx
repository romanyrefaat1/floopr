import FeedbackMetadata from "./feedback-metadata";

export default function DetailsSection({ feedbackData }) {
  return (
    <div className="flex flex-col gap-6 overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-primary">
      <FeedbackMetadata feedbackData={feedbackData} />
      <div className="bg-background p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">User Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-mutedForeground">Username</p>
            <p>{feedbackData.userInfo.username}</p>
          </div>
          <div>
            <p className="text-mutedForeground">User ID</p>
            <p>{feedbackData.userInfo.userId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
