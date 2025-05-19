"use client";

import { FeedbackItemInDB } from "../../../[productId]/_components/feedback-list";
import { ProductData } from "../../../[productId]/page";
import FeedbackItem from "../_components/feedback-item";
import { useGroupedFeedback } from "./groupt-context";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import makeFirstLetterUppercase from "@/lib/make-first-letter-uppercase";
import {
  MessageSquare,
  Users,
  TrendingUp,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import React from "react";

// Import your existing FeedbackItem component

// Group descriptions mapping
const groupDescriptions: Record<
  string,
  { description: string; icon: React.ReactNode }
> = {
  "user-interface": {
    description:
      "Feedback related to UI/UX, design, and user experience improvements",
    icon: <Users className="h-4 w-4" />,
  },
  performance: {
    description: "Reports about speed, loading times, and system performance",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  bugs: {
    description:
      "Bug reports, errors, and technical issues encountered by users",
    icon: <AlertCircle className="h-4 w-4" />,
  },
  "feature-requests": {
    description: "Suggestions for new features and functionality enhancements",
    icon: <Lightbulb className="h-4 w-4" />,
  },
  general: {
    description:
      "General feedback and comments that don't fit other categories",
    icon: <MessageSquare className="h-4 w-4" />,
  },
};

// Helper function to get group info
function getGroupInfo(groupId: string) {
  const defaultInfo = {
    description: "Feedback items grouped together",
    icon: <MessageSquare className="h-4 w-4" />,
  };

  return groupDescriptions[groupId] || defaultInfo;
}

export default function ShowGroupsFeedback({
  productData,
}: {
  productData: ProductData;
}) {
  const { groupedFeedback } = useGroupedFeedback();

  if (!groupedFeedback || Object.keys(groupedFeedback).length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground text-lg font-medium">
            No groups to show
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Groups will appear here once feedback is categorized
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ScrollArea className="h-[700px] w-full">
        <div className="p-6">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {Object.entries(groupedFeedback).map(([groupId, feedbackData]) => {
              const groupInfo = getGroupInfo(groupId);
              const groupName = makeFirstLetterUppercase(
                groupId.replace(/-/g, " ")
              );

              return (
                <AccordionItem
                  key={groupId}
                  value={groupId}
                  className="border bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger className="flex items-center justify-between px-6 py-4 bg-background hover:bg-mutedBackground transition-colors duration-200 [&[data-state=open]]:bg-muted/80">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-foreground">
                        {groupInfo.icon}
                        <span className="font-semibold text-lg">
                          {groupName}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                      >
                        {feedbackData.length}{" "}
                        {feedbackData.length === 1 ? "item" : "items"}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-2 pb-6 bg-background">
                    <div className="mb-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-sm text-accent-foreground leading-relaxed">
                        {groupInfo.description}
                      </p>
                    </div>
                    {feedbackData.length === 0 ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <div className="text-muted-foreground">
                              {groupInfo.icon}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            No feedback in this group yet
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {feedbackData.map((fb: FeedbackItemInDB, index) => (
                          <FeedbackItem
                            key={fb.id || index}
                            feedbackData={fb}
                            productData={productData}
                          />
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}
