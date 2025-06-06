"use client";

import FeedbackForm from "@/app/(routes)/(code)/[productId]/_components/feedback-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function ButtonAddFeedback({
  value = "Submit Feedback",
  rounded = "md",
}: {
  value?: string | React.ReactNode;
  rounded?: "sm" | "md" | "lg" | "full";
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("bg-primary text-white", `rounded-${rounded}`)}>
          {value}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl h-[75vh] w-[90vw] md:max-w-[70vw] md:min-h-[20vh] md:max-h-[60vh] lg:min-h-[80vh] p-0 overflow-hidden">
        <FeedbackForm />
      </DialogContent>
    </Dialog>
  );
}
