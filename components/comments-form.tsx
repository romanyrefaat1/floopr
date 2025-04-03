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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) return;

    console.log("Value:", value);
    // Uncomment below line when ready to send reply
    await sendReply(value, feedbackId, userId, productId);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-3 w-full"
    >
      <RichTextEditor
        onChange={(content) => setValue(content)}
        placeholder="Add a comment..."
        className="w-full"
      />
      <Button variant="default" disabled={!value} type="submit">
        Send
      </Button>
    </form>
  );
}
