"use server";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export type PrioritizedTask = {
  id: string;
  task: string;
  description: string;
  priority: number;
};

export async function getPrioritizedTasksForProduct(productId: string): Promise<{
  success: boolean;
  topTasks?: PrioritizedTask[];
  error?: string;
}> {
  try {
    if (!productId) {
      return {
        success: false,
        error: "Product ID is required",
      };
    }

    const collRef = collection(db, "products", productId, "topTasks");
    const topTasksData = await getDocs(collRef);

    if (topTasksData.empty) {
      return {
        success: true,
        topTasks: [],
      };
    }

    const topTasks = topTasksData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as PrioritizedTask[];

    return {
      success: true,
      topTasks,
    };
  } catch (error) {
    console.error("Error fetching prioritized tasks:", error);
    return {
      success: false,
      error: "Failed to fetch prioritized tasks",
    };
  }
}