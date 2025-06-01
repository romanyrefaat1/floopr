"use client";

import { getChangelogItems } from "@/app/(routes)/(code)/products/[id]/_components/tabs/changelog-tab/changelog-server";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ChangelogItem {
  version: string;
  title: string;
  description?: string;
  date: string;
  changes: Array<{ type: string; content: string }>;
  feedbackRef?: { feedbackId: string; name: string };
  imageUrl?: string;
}

interface ChangelogContextType {
  changelog: ChangelogItem[] | null;
  loading: boolean;
  error: string | null;
  refetch: (productId: string) => void;
}

const ChangelogContext = createContext<ChangelogContextType | undefined>(
  undefined
);

export function useChangelog() {
  const ctx = useContext(ChangelogContext);
  if (!ctx)
    throw new Error("useChangelog must be used within ChangelogProvider");
  return ctx;
}

export function ChangelogProvider({
  productId,
  initialChangelog,
  children,
}: {
  productId: string;
  initialChangelog?: ChangelogItem[];
  children: ReactNode;
}) {
  const [changelog, setChangelog] = useState<ChangelogItem[] | null>(
    initialChangelog || null
  );
  console.log(`my cool changelog:`, changelog);
  const [loading, setLoading] = useState(!initialChangelog);
  const [error, setError] = useState<string | null>(null);

  const fetchChangelog = async (pid: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getChangelogItems(pid);
      setChangelog(data || []);
    } catch (e) {
      setError("Failed to load changelog");
      setChangelog([]);
    } finally {
      setLoading(false);
    }
  };

  const refetch = (pid: string) => {
    fetchChangelog(pid);
  };

  return (
    <ChangelogContext.Provider value={{ changelog, loading, error, refetch }}>
      {children}
    </ChangelogContext.Provider>
  );
}
