"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
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
      className="absolute top-4 right-4 text-[12px]"
    >
      {copied ? (
        <>
          <Check className="h-2 w-2 mr-2" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-2 w-2 mr-2" /> Copy
        </>
      )}
    </Button>
  );
}
