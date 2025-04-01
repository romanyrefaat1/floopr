"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Share } from "lucide-react";
import * as React from "react";

export default function ShareButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Reset copied state after 2 seconds
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="rounded-lg"
      >
        <Share className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Link</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input
              readOnly
              value={typeof window !== "undefined" ? window.location.href : ""}
            />
            <Button onClick={copyToClipboard}>{!isCopied ? `Copy` : `Copied`}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
