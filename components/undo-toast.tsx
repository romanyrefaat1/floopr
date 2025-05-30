"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export default function UndoToast({
  open,
  title,
  description,
  onUndo,
  onClose,
  duration = 10000,
  undoLabel = "Undo",
}: {
  open: boolean;
  title: string;
  description?: string;
  onUndo: () => void;
  onClose: () => void;
  duration?: number;
  undoLabel?: string;
}) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      timer.current = setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [open, duration, onClose]);

  return (
    open && (
      <div
        className="fixed top-6 left-1/2 z-50 -translate-x-1/2 bg-card border shadow-lg rounded-xl px-6 py-4 flex flex-col items-center gap-2 fade-in"
        style={{
          transition: "opacity 0.4s, transform 0.4s",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="font-semibold text-base text-primary mb-1">{title}</div>
        {description && (
          <div className="text-sm text-muted-foreground mb-2 text-center">
            {description}
          </div>
        )}
        <Button
          onClick={onUndo}
          variant="outline"
          className="w-fit animate-pulse"
        >
          {undoLabel}
        </Button>
      </div>
    )
  );
}
