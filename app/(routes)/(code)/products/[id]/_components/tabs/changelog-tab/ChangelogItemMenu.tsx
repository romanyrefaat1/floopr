"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

export default function ChangelogItemMenu({
  onDelete,
  onFallback,
  idx,
  loading = false,
}: {
  onDelete: (idx: number) => void;
  onFallback: (idx: number) => void;
  idx: number;
  loading?: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<null | "delete" | "fallback">(
    null
  );

  const handleDropdown = (type: "delete" | "fallback") => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (modalType === "delete") onDelete(idx);
    if (modalType === "fallback") onFallback(idx);
    setModalOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0"
            disabled={loading}
          >
            {loading ? (
              <span className="w-4 h-4 animate-spin border-2 border-primary border-t-transparent rounded-full inline-block" />
            ) : (
              <MoreVertical className="w-4 h-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-destructive"
            onSelect={() => handleDropdown("delete")}
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleDropdown("fallback")}>
            Fallback
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              {modalType === "delete" ? (
                <>
                  This will delete{" "}
                  <span className="font-bold">this changelog item</span>. This
                  action cannot be undone.
                </>
              ) : (
                <>
                  This will delete{" "}
                  <span className="font-bold">all items after this</span> (not
                  including this one). This action cannot be undone.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={loading}
            >
              {modalType === "delete" ? "Delete" : "Delete all after"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
