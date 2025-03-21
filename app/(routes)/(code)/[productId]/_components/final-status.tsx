import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  "in progress": "bg-blue-100 text-blue-800",
  "in review": "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-800",
  done: "bg-primary text-white", // Ensure "bg-primary" is defined in your Tailwind config
};

export default function FinalStatus({
  finalStatus,
  isOwner,
  productId,
  feedbackId
}: {
  finalStatus: string;
  isOwner: boolean;
  productId: string;
  feedbackId: string;
}) {
  const [status, setStatus] = useState(finalStatus);
  const statuses = ["in progress", "in review", "rejected", "done"];

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    // Add any additional logic for handling the status change here
    const docRef = doc(db, `products`, productId, `feedbacks`, feedbackId)
    await updateDoc(docRef, { status: newStatus })
      .then(() => {
        toast.success(`Status updated successfully to ${newStatus}`);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  if (isOwner) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`text-xs px-2 py-1 rounded-full focus:outline-none ${statusStyles[status] || "bg-gray-200"}`}
        >
          {status}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statuses.map((s) => (
            <DropdownMenuItem
              key={s}
              onSelect={() => handleStatusChange(s)}
              className={`text-xs ${statusStyles[s]} rounded-full px-2 py-1`}
            >
              {s}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className={`text-xs px-2 py-1 rounded-full ${statusStyles[status] || "bg-gray-200"}`}>
      {status}
    </div>
  );
}
