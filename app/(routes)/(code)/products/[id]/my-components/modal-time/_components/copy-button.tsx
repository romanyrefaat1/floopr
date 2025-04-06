"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // If the modern Clipboard API is supported, use it.
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for mobile or unsupported browsers.
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom.
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");
        if (!successful) {
          throw new Error("Fallback: Copy command was unsuccessful");
        }
        document.body.removeChild(textArea);
      }

      // Provide user feedback that the text was copied.
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      size="sm"
      className={cn("absolute top-2 right-2 text-sm scale-75", className)}
    >
      {copied ? (
        <>
          <Check className="h-2 w-2 mr-1" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-2 w-2 mr-1" /> Copy
        </>
      )}
    </Button>
  );
}
