"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/lib/firebase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { deleteDoc, doc } from "firebase/firestore";
import { MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteComponentDropdownProps {
  docRef: any;

  onDeleteSuccess?: () => void;
  successMessage?: string;
  title?: string;
  description?: string;
}

export default function DeleteDropdown({
  onDeleteSuccess,
  docRef,
  successMessage,
  title = "Are you sure?",
  description = "This action cannot be undone.",
}: DeleteComponentDropdownProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  if (!docRef) {
    throw new Error("Component ID is required");
  }

  const handleDelete = async () => {
    try {
      // Delete the document
      console.log(docRef);
      const deleteRes = await deleteDoc(docRef);
      console.log(`Deleted component with ID: ${docRef}`, deleteRes);
      // Callback on successful delete
      if (onDeleteSuccess) onDeleteSuccess();

      // Notify the user
      toast.success(
        successMessage ||
          "Item deleted successfully. Refresh the page to see changes."
      );

      // Close the alert dialog
      setIsAlertOpen(false);
    } catch (error) {
      console.error("Error deleting component:", error);
      toast.error("Failed to delete component");
    }
  };

  return (
    <div className=" top-4 right-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
            {/* <span className="sr-only">Open menu</span> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-destructive hover:text-muted-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-muted-destructive"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
