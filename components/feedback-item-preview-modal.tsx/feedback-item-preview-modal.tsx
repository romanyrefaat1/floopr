"use client";

import DetailsSection from "./details-section";
import FeedbackSection from "./feedback-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// Main Modal Component
export default function FeedbackItemPreviewModal({
  passedParams,
  productData,
  feedbackData,
}: {
  passedParams: { productId: string; feedbackId: string };
  productData: any;
  feedbackData: any;
}) {
  const router = useRouter();
  const { productId, feedbackId } = passedParams;

  const closeModal = React.useCallback(() => {
    router.back();
  }, [router]);

  // Add event listener for escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeModal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background backdrop-blur-sm overflow-hidden">
      <div className="bg-secondaryBackground w-full h-full md:w-[80%] md:max-h-[80vh] rounded-modal overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border shrink-0">
          <h2 className="text-xl font-semibold text-foreground">
            Feedback Details
          </h2>
          <button
            onClick={closeModal}
            className="text-mutedForeground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs Content */}
        <Tabs
          defaultValue="feedback"
          className="flex-grow flex flex-col overflow-hidden"
        >
          <TabsList className="grid w-fit grid-cols-2 bg-background border-b border-border shrink-0">
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent
            value="feedback"
            className="flex-grow overflow-y-auto p-6 scrollbar-thin scrollbar-track-background scrollbar-thumb-primary"
            style={{ wordBreak: "break-word" }}
          >
            <FeedbackSection productId={productId} feedbackId={feedbackId} />
          </TabsContent>

          <TabsContent
            value="details"
            className="flex-grow overflow-y-auto p-6 scrollbar-thin scrollbar-track-background scrollbar-thumb-primary"
          >
            <DetailsSection feedbackData={feedbackData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
