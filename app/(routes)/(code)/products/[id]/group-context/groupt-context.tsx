"use client";

import { FeedbackItemInDB } from "../../../[productId]/_components/feedback-list";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// A mapping from Firestore group IDs to arrays of feedback items
export type GroupMap = Record<string, FeedbackItemInDB[]>;

type ContextType = {
  groupedFeedback: GroupMap;
  addFeedback: (groupId: string, feedback: FeedbackItemInDB) => void;
  removeFeedback: (groupId: string, feedbackId: string) => void;
  clearGroup: (groupId: string) => void;
  setGroupedFeedback: React.Dispatch<React.SetStateAction<GroupMap>>;
};

const GroupedFeedbackContext = createContext<ContextType | undefined>(
  undefined
);

export function GroupedFeedbackProvider({
  children,
  productId,
}: {
  children: ReactNode;
  productId: string;
}) {
  const [groupedFeedback, setGroupedFeedback] = useState<GroupMap>({});

  // Load existing feedback groups and their embedded feedback arrays from Firestore
  useEffect(() => {
    if (!productId) {
      setGroupedFeedback({});
      return;
    }

    const fetchGroups = async () => {
      try {
        const groupsCol = collection(
          db,
          "products",
          productId,
          "feedback-groups"
        );
        const groupsSnap = await getDocs(groupsCol);
        if (groupsSnap.empty) {
          setGroupedFeedback({});
          return;
        }

        // Build map from each group document's feedback field
        const map: GroupMap = {};
        groupsSnap.docs.forEach((groupDoc) => {
          const data = groupDoc.data();
          const feedbackArray = Array.isArray(data.feedback)
            ? (data.feedback as FeedbackItemInDB[])
            : [];
          map[groupDoc.id] = feedbackArray;
        });

        setGroupedFeedback(map);
      } catch (err) {
        console.error("Error fetching feedback groups:", err);
        setGroupedFeedback({});
      }
    };

    fetchGroups();
  }, [productId]);

  // Add a feedback item into a named group (local state only)
  const addFeedback = (groupId: string, feedback: FeedbackItemInDB) => {
    setGroupedFeedback((prev) => ({
      ...prev,
      [groupId]: prev[groupId] ? [...prev[groupId], feedback] : [feedback],
    }));
  };

  // Remove a specific feedback item by its id (local state only)
  const removeFeedback = (groupId: string, feedbackId: string) => {
    setGroupedFeedback((prev) => ({
      ...prev,
      [groupId]: prev[groupId]?.filter((f) => f.id !== feedbackId) || [],
    }));
  };

  // Clear all items from a group (local state only)
  const clearGroup = (groupId: string) => {
    setGroupedFeedback((prev) => ({
      ...prev,
      [groupId]: [],
    }));
  };

  return (
    <GroupedFeedbackContext.Provider
      value={{
        groupedFeedback,
        addFeedback,
        removeFeedback,
        clearGroup,
        setGroupedFeedback,
      }}
    >
      {children}
    </GroupedFeedbackContext.Provider>
  );
}

export function useGroupedFeedback(): ContextType {
  const ctx = useContext(GroupedFeedbackContext);
  if (!ctx) {
    throw new Error(
      "useGroupedFeedback must be used within a GroupedFeedbackProvider"
    );
  }
  return ctx;
}
