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
  componentId: string;
  productId: string;
  onDeleteSuccess?: () => void;
}

export default function IsYoursOptionsDropdown({
  productId,
  componentId,
  onDeleteSuccess,
}: DeleteComponentDropdownProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  if (!componentId || !productId) {
    throw new Error("Component ID is required");
  }

  const handleDelete = async () => {
    try {
      // Reference the specific component document
      const compRef = doc(db, "products", productId, "components", componentId);

      // Delete the document
      await deleteDoc(compRef);
      console.log(`Deleted component with ID: ${componentId}`);

      // Notify the user
      toast.success(
        "Component deleted successfully. Refresh the page to see changes."
      );

      // Close the alert dialog
      setIsAlertOpen(false);

      // Callback on successful delete
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      console.error("Error deleting component:", error);
      toast.error("Failed to delete component");
    }
  };

  return (
    <div className="absolute top-4 right-4">
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
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this component.
                </AlertDialogDescription>
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
