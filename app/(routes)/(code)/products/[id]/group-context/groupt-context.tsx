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

  // Load existing feedback groups from Firestore
  useEffect(() => {
    if (!productId) {
      setGroupedFeedback({});
      return;
    }

    const fetchGroups = async () => {
      try {
        const colRef = collection(db, "products", productId, "feedback-groups");
        const snapshot = await getDocs(colRef);

        if (snapshot.empty) {
          setGroupedFeedback({});
          return;
        }

        const data: GroupMap = {};
        snapshot.forEach((docSnap) => {
          const { feedback } = docSnap.data() as {
            feedback?: FeedbackItemInDB[];
          };
          data[docSnap.id] = Array.isArray(feedback) ? feedback : [];
        });

        setGroupedFeedback(data);
      } catch (err) {
        console.error("Error fetching feedback groups:", err);
        setGroupedFeedback({});
      }
    };

    fetchGroups();
  }, [productId]);

  // Add a feedback item into a named group
  const addFeedback = (groupId: string, feedback: FeedbackItemInDB) => {
    setGroupedFeedback((prev) => ({
      ...prev,
      [groupId]: prev[groupId] ? [...prev[groupId], feedback] : [feedback],
    }));
  };

  // Remove a specific feedback item by its id
  const removeFeedback = (groupId: string, feedbackId: string) => {
    setGroupedFeedback((prev) => ({
      ...prev,
      [groupId]: prev[groupId]?.filter((f) => f.id !== feedbackId) || [],
    }));
  };

  // Clear all items from a group
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
