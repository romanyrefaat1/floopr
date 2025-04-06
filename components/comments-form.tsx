"use client";

import { Button } from "./ui/button";
import RichTextEditor from "./ui/rich-textarea";
import { sendReply } from "@/lib/feedback-item/send-reply";
import { useState } from "react";

export default function CommentsForm({
  feedbackId,
  userId,
  productId,
}: {
  feedbackId: string;
  userId: string;
  productId: string;
}) {
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!value) {
      setIsLoading(false);
      return;
    }

    await sendReply(value, feedbackId, userId, productId);
    setValue(``);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex items-center border rounded-md bg-mutedBackground space-x-3 w-full pr-4"
    >
      <RichTextEditor
        onChange={(content) => setValue(content)}
        placeholder="Add a comment..."
        className="w-full"
        secondaryClassName="bg-transparent border-0 focus:outline-none"
      />
      <Button variant="default" disabled={!value || isLoading} type="submit">
        {isLoading ? `Sending...` : `Send`}
      </Button>
    </form>
  );
}
