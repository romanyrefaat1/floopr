"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import getFilteredFeedbacks from "@/actions/filter-feedback";
import type { FilterData } from "@/app/(routes)/(code)/products/[id]/page";

export interface FeedbackItemInDB {
  componentRefId: string | null;
  createdAt?: any;
  updatedAt?: any;
  feedbackId: string;
  productId: string;
  status?: string;
  isComponent: boolean;
  type: string;
  topic?: {
    topTopic: string;
    text: string;
    topScore: number;
    labels: string[];
    scores: number[];
  };
  sentiment: {
    sentiment: string;
    score: number;
    text: string;
  };
  feedback: {
    title: string;
    content?: object;
    inputs?: Array<any>;
    isRich: boolean;
  };
  userInfo?: {
    username: string;
    userId: string;
    profilePicture?: string;
  };
  socialData?: {
    comments: {
      count: number;
      data: any[];
    };
    likes: {
      count: number;
      data: any[];
    };
  };
}

interface AllFeedbackContextType {
  feedbacks: FeedbackItemInDB[] | null;
  loading: boolean;
  error: string | null;
  refetch: (productId: string, filterData: FilterData) => void;
}

const AllFeedbackContext = createContext<AllFeedbackContextType | undefined>(undefined);

export function useAllFeedback() {
  const ctx = useContext(AllFeedbackContext);
  if (!ctx) throw new Error("useAllFeedback must be used within AllFeedbackProvider");
  return ctx;
}

export function AllFeedbackProvider({ productId, filterData, initialFeedbacks, children }: {
  productId: string;
  filterData: FilterData;
  initialFeedbacks?: FeedbackItemInDB[];
  children: ReactNode;
}) {
  const [feedbacks, setFeedbacks] = useState<FeedbackItemInDB[] | null>(initialFeedbacks || null);
  const [loading, setLoading] = useState(!initialFeedbacks);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbacks = async (pid: string, fd: FilterData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFilteredFeedbacks(pid, fd);
      if (Array.isArray(data)) {
        setFeedbacks(data);
      } else {
        setFeedbacks([]);
      }
    } catch (e) {
      setError("Failed to load feedback");
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks(productId, filterData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, JSON.stringify(filterData)]);

  const refetch = (pid: string, fd: FilterData) => {
    fetchFeedbacks(pid, fd);
  };

  return (
    <AllFeedbackContext.Provider value={{ feedbacks, loading, error, refetch }}>
      {children}
    </AllFeedbackContext.Provider>
  );
}
