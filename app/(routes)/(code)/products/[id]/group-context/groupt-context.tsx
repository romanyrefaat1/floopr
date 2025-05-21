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

export type GroupMeta = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  feedbackData?: any[];
};

export type GroupMap = Record<string, FeedbackItemInDB[]>;
export type GroupMetaMap = Record<string, GroupMeta>;

type ContextType = {
  groupedFeedback: GroupMap;
  groupMeta: GroupMetaMap;
  addFeedback: (groupId: string, feedback: FeedbackItemInDB) => void;
  removeFeedback: (groupId: string, feedbackId: string) => void;
  clearGroup: (groupId: string) => void;
  setGroupedFeedback: React.Dispatch<React.SetStateAction<GroupMap>>;
  setGroupMeta: React.Dispatch<React.SetStateAction<GroupMetaMap>>;
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
  const [groupMeta, setGroupMeta] = useState<GroupMetaMap>({});

  useEffect(() => {
    if (!productId) {
      setGroupedFeedback({});
      setGroupMeta({});
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
          setGroupMeta({});
          return;
        }
        const map: GroupMap = {};
        const metaMap: GroupMetaMap = {};
        groupsSnap.docs.forEach((groupDoc) => {
          const data = groupDoc.data();
          const feedbackArray = Array.isArray(data.feedback)
            ? (data.feedback as FeedbackItemInDB[])
            : [];
          map[groupDoc.id] = feedbackArray;
          metaMap[groupDoc.id] = {
            title: data.title || groupDoc.id,
            description: data.description || "",
            icon: undefined, // Icon will be handled in the component
            feedbackData: data.feedbackData || [],
          };
        });
        setGroupedFeedback(map);
        setGroupMeta(metaMap);
      } catch (err) {
        console.error("Error fetching feedback groups:", err);
        setGroupedFeedback({});
        setGroupMeta({});
      }
    };
    fetchGroups();
  }, [productId]);

  const addFeedback = (groupId: string, feedback: FeedbackItemInDB) => {
    setGroupedFeedback((prev) => ({
      ...prev,
      [groupId]: prev[groupId] ? [...prev[groupId], feedback] : [feedback],
    }));
  };

  const removeFeedback = (groupId: string, feedbackId: string) => {
    setGroupedFeedback((prev) => ({
      ...prev,
      [groupId]: prev[groupId]?.filter((f) => f.id !== feedbackId) || [],
    }));
  };

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
        groupMeta,
        addFeedback,
        removeFeedback,
        clearGroup,
        setGroupedFeedback,
        setGroupMeta,
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
