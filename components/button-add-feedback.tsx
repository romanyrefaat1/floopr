"use client";

import FeedbackForm from "@/app/(routes)/(code)/[productId]/_components/feedback-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ButtonAddFeedback() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white rounded-md">
          Add Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg sm:max-w-[80vw] md:min-h-[80vh] p-0">
        <FeedbackForm />
      </DialogContent>
    </Dialog>
  );
}
