"use client";

export default function GroupFeedbackButton({
  productId,
}: {
  productId: string;
}) {
  return (
    <button
      onClick={async () => {
        try {
          const res = await fetch("/api/group-feedback/create-group", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
          });

          if (!res.ok) {
            const { error } = await res.json();
            throw new Error(error || "Unknown error from grouping API");
          }

          const { groupedFeedback, allFeedbacks } = await res.json();
          console.log("allFeedbacks:", allFeedbacks);
          console.log("groupedFeedback:", groupedFeedback);
        } catch (err) {
          console.error("API test error:", err);
        }
      }}
    >
      Test Group‑Feedback API
    </button>
  );
}
