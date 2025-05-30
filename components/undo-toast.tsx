"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-6 left-1/2 z-50 -translate-x-1/2 bg-card border shadow-lg rounded-xl px-6 py-4 flex flex-col items-center gap-2 animate-fade-in"
        >
          <div className="font-semibold text-base text-primary mb-1">
            {title}
          </div>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
