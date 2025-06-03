"use client";

import Warn from "../warn";
import { usePricing } from "@/context/pricing-context";

export default function WarnChatbotLimit() {
  const { userSubscription, isExceededChatbotLimit, openModal } = usePricing();
  const plan = userSubscription.tier ?? `free`;

  if (isExceededChatbotLimit) {
    return (
      <Warn
        title="Chatbot Messages Limit Reached"
        description={
          <p>
            This product ran out of the limited chatbot messages per {plan}
            subscription. Please{" "}
            upgrade to the Builder plan to increase your chatbot messages limit. <br/><br/>
            Messages: {userSubscription.chatbot_messages_monthly}/{userSubscription.limit_chatbot_messages_monthly}
          </p>
        }
        buttons={[
          {
            text: `See Plans`,
            onClick: () =>  openModal({error: `Sorry you exceeded your chatbot messages limit for this month. Please check the plans below to upgrade.`,
                content: {
                  plans: {
                    free: {
                      button: "Continue without chatbot messages"
                    }
                  }
                }
              }),
            isMain: true,
          },
        ]}
      />
    );
  }

  return null;
}
