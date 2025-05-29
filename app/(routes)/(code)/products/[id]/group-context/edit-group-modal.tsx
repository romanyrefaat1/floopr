"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface EditGroupModalProps {
  group: {
    id: string;
    title: string;
    description: string;
  };
  productId: string;
  onClose: () => void;
  onGroupUpdated: (
    groupId: string,
    updatedData: { title: string; description: string }
  ) => void;
}

export default function EditGroupModal({
  group,
  productId,
  onClose,
  onGroupUpdated,
}: EditGroupModalProps) {
  const [title, setTitle] = useState(group.title);
  const [description, setDescription] = useState(group.description);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    setIsLoading(true);

    try {
      // Update in Firestore
      const groupRef = doc(
        db,
        "products",
        productId,
        "feedback-groups",
        group.id
      );

      await updateDoc(groupRef, {
        title: title.trim(),
        description: description.trim(),
        updatedAt: new Date(),
      });

      // Update parent component
      onGroupUpdated(group.id, {
        title: title.trim(),
        description: description.trim(),
      });

      toast.success("Group updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating group:", error);
      toast.error("Failed to update group");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle>Edit Group</DialogTitle>
          <DialogDescription>
            Update the group title and description. Changes will be saved
            automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter group title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter group description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[80px] resize-none"
              disabled={isLoading}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading || !title.trim()}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
