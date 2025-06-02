"use client";

import Warn from "../warn";
import { usePricing } from "@/context/pricing-context";

export default function WarnFeedbackCountLimit({
  isOwner = false,
}: {
  isOwner: boolean;
}) {
  const { userSubscription, isExceededFeedbackLimit, openModal } = usePricing();
  const plan = userSubscription.tier ?? `free`;

  if (isExceededFeedbackLimit) {
    return (
      <Warn
        title="Feedback Submission Limit Reached"
        description={
          <p>
            This product ran out of the limited feedback submission per {plan}
            subscription. Please{" "}
            {isOwner
              ? `contact the owner to increase their quota.`
              : `upgrade to the Builder plan to increase your feedback submission limit.`}
          </p>
        }
        buttons={[
          {
            text: `See Plans`,
            onClick: () => openModal(),
            isMain: true,
          },
        ]}
      />
    );
  }

  return null;
}
