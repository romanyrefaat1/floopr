"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { db } from "@/lib/firebase";
import makeFirstLetterUppercase from "@/lib/make-first-letter-uppercase";
import { doc, updateDoc } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { LucideArrowDownNarrowWide } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  "in progress": "bg-blue-100 text-blue-800",
  "in review": "bg-yellow-100 text-yellow-800",
  rejected: "bg-destructive text-destructive-foreground",
  done: "bg-primary text-foreground",
  Sent: "bg-background text-secondaryForeground",
};

export async function updateStatusAndChangelog({
  db,
  productId,
  feedbackId,
  newStatus,
  feedbackTitle,
  feedbackUserName,
}) {
  // Update feedback status
  const docRef = doc(db, `products`, productId, `feedbacks`, feedbackId);
  await updateDoc(docRef, { status: newStatus });

  // Get last version from changelog
  const updatesRef = collection(db, "products", productId, "updates");
  const q = query(updatesRef, orderBy("version", "desc"), limit(1));
  const snapshot = await getDocs(q);
  let lastVersion = 1.0;
  if (!snapshot.empty) {
    const last = snapshot.docs[0].data();
    lastVersion = parseFloat(last.version) || 1.0;
  }
  const newVersion = (Math.round((lastVersion + 0.1) * 10) / 10).toFixed(1);

  // Add new changelog entry
  await addDoc(updatesRef, {
    version: newVersion,
    title: `Status changed to ${newStatus}`,
    description: `Feedback: <'${feedbackTitle}'> | by ${feedbackUserName} status updated to ${newStatus}`,
    date: new Date(),
    changes: [
      {
        type: "improvement",
        content: `Status set to ${newStatus}`,
      },
    ],
    feedbackRef: {
      feedbackId,
      name: feedbackTitle,
    },
  });
}

export default function FinalStatus({
  finalStatus,
  isOwner,
  productId,
  feedbackId,
  feedbackTitle,
  feedbackUserName,
}: {
  finalStatus: string;
  isOwner: boolean;
  productId: string;
  feedbackId: string;
  feedbackTitle: string;
  feedbackUserName: string;
}) {
  const [status, setStatus] = useState(finalStatus);
  const statuses = ["in progress", "in review", "rejected", "done"];

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    try {
      await updateStatusAndChangelog({
        db,
        productId,
        feedbackId,
        newStatus,
        feedbackTitle,
        feedbackUserName,
      });
      toast.success(`Status updated successfully to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (isOwner) {
    return (
      <div
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`text-xs px-2 py-1 rounded-full focus:outline-none ${
              statusStyles[status] || "bg-gray-200"
            }`}
          >
            {makeFirstLetterUppercase(status)}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-xs gap-1 flex flex-col">
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
      </div>
    );
  }

  return (
    <div
      className={`text-xs px-2 py-1 rounded-full ${
        statusStyles[status] || "bg-gray-200"
      }`}
      role="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {/* <LucideArrowDownNarrowWide className="inline" /> */}
      {makeFirstLetterUppercase(status)}
    </div>
  );
}
