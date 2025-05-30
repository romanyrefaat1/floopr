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
      <DialogContent className="rounded-lg sm:max-w-[60vw] md:min-h-[30vh] md:max-h-[60vh] p-0">
        <FeedbackForm />
      </DialogContent>
    </Dialog>
  );
}
