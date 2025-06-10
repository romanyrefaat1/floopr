import updateBasicAnalyticsFromNewFeedback from "./basic-analytics/update/update-basic-analytics-from-new-feedback";
import { db } from "@/lib/firebase";
import { analyzeSentiment } from "@/services/analyze-sentiment";
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  addDoc,
  collection,
  getDoc,
  increment,
} from "firebase/firestore";
import getProductData from "./get-product-data";

export type SimpleFeedbackItemData = {
  feedback: {
    title: string;
    content: string | null;
    isRich: boolean;
    type: `idea` | `feature` | `issue` | `other`;
  };
  productId: string;
  userInfo?: {
    userId?: string;
    username?: string;
    profilePicture?: string;
  };
};

export type AdvancedFeedbackItemData = {
  title: string;
  description: string;
  userId: string;
  username: string;
};

export type FeedbackComponentModalInputs = {
  label: string;
  placeholder: string;
  id: number;
  value: string;
};

// Type for the modal component feedback
type AddComponentFeedbackProps = {
  inputs: FeedbackComponentModalInputs[];
  productId: string;
  componentRefId: string;
  rating: number;
  userInfo?: {
    userId?: string;
    username?: string;
    profilePicture?: string | null;
  } | null;
};

/**
 * Adds a simple feedback entry to a product with real-time updates
 */
// Type for the data expected by the action, userInfo is handled by the API route
export type SimpleFeedbackItemDataForAction = {
  feedback: {
    title: string;
    content: string | null;
    isRich: boolean;
    type: `idea` | `feature` | `issue` | `other`;
  };
  productId: string;
  componentRefId?: string | null;
};

/**
 * Adds a simple feedback entry by calling the API route.
 */
export async function addSimpleFeedback(
  feedbackData: SimpleFeedbackItemDataForAction
) {
  // const baseUrl = "http://localhost:3000"
  const baseUrl = "https://floopr.app"
  try {
    const response = await fetch(baseUrl + "/api/feedbacks/add-simple", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("API Error:", result.error);
      throw new Error(
        result.error || `API request failed with status ${response.status}`
      );
    }

    return result; // Should be { success: true, feedbackId: "..." } or { success: false, error: "..." }
  } catch (error: any) {
    console.error("Error calling addSimpleFeedback API:", error);
    return {
      success: false,
      error: error.message || "Failed to submit feedback via API.",
    };
  }
}

/**
 * Adds feedback from a component (like modal)
 */
export async function addComponentFeedback({
  inputs,
  referenceLink,
  productId,
  componentRefId,
  rating,
  userInfo = null,
}: AddComponentFeedbackProps) {
  try {
    // 1. Fetch user data to check limits
    if (!productId) {
      console.error("addComponentFeedback: Product ID missing");
      return { success: false, error: "Product ID is required." };
    }

    const {ownerId }=await  getProductData(productId);

    if (!ownerId) {
      console.error("addComponentFeedback: Owner ID missing");
      return { success: false, error: `Owner ID is required. Product ID: ${productId}, Owner ID: ${ownerId}` };
    }

    const userRef = doc(db, "users", ownerId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error(
        `addComponentFeedback: User document not found for ID: ${ownerId}`
      );
      return { success: false, error: "User data not found." };
    }

    const userData = userSnap.data();
    const subscriptionTier = userData.subscription_tier ?? "free";
    const feedbackCountMonthly = userData.feedback_count_monthly ?? 0;
    const FEEDBACK_LIMIT_FREE = 50;

    // Check limit for free tier
    if (
      subscriptionTier === "free" &&
      feedbackCountMonthly >= FEEDBACK_LIMIT_FREE
    ) {
      return {
        success: false,
        error: `Feedback limit of ${FEEDBACK_LIMIT_FREE} reached for free plan. Please upgrade.`,
      };
    }

    // 2. Create the feedback document
    const feedbackData = {
      feedback: {
        inputs,
        isRich: false,
      },
      type: "feedback",
      status: "Sent",
      // Component
      isComponent: true,
      componentRefId,
      componentId: `modal-timeout`,
      componentName: `Modal Timeout`,

      rating,
      userInfo: userInfo || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      socialData: {
        likes: { count: 0, data: [] },
        comments: { count: 0, data: [] },
      },
      referenceLink,
    };

    // Get the collection reference
    const feedbacksCollectionRef = collection(
      db,
      "products",
      productId,
      "feedbacks"
    );

    // Add the document
    const docRef = await addDoc(feedbacksCollectionRef, feedbackData);

    // 3. Increment feedback count for the user
    await updateDoc(userRef, {
      feedback_count_monthly: increment(1),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding component feedback:", error);
    return {
      success: false,
      error: (error as Error).message || "Failed to add feedback.",
    };
  }
}

/**
 * Adds an advanced feedback entry with title and description
 */
export async function addAdvancedFeedback(
  productId: string,
  feedbackData: AdvancedFeedbackItemData
) {
  try {
    // 1. Fetch user data to check limits
    if (!feedbackData.userId) {
      console.error("addAdvancedFeedback: User ID missing");
      return { success: false, error: "Authentication required." };
    }

    const userRef = doc(db, "users", feedbackData.userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error(
        `addAdvancedFeedback: User document not found for ID: ${feedbackData.userId}`
      );
      return { success: false, error: "User data not found." };
    }

    const userData = userSnap.data();
    const subscriptionTier = userData.subscription_tier ?? "free";
    const feedbackCountMonthly = userData.feedback_count_monthly ?? 0;
    const FEEDBACK_LIMIT_FREE = 50;

    // Check limit for free tier
    if (
      subscriptionTier === "free" &&
      feedbackCountMonthly >= FEEDBACK_LIMIT_FREE
    ) {
      return {
        success: false,
        error: `Feedback limit of ${FEEDBACK_LIMIT_FREE} reached for free plan. Please upgrade.`,
      };
    }

    // 2. Ensure the product document exists (already exists, keep for safety)
    await setDoc(
      doc(db, "products", productId),
      {
        productId,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    // 3. Generate a unique ID and create a feedback document
    const feedbackId = crypto.randomUUID();
    await setDoc(doc(db, "products", productId, "feedbacks", feedbackId), {
      title: feedbackData.title,
      description: feedbackData.description,
      userId: feedbackData.userId,
      username: feedbackData.username,
      feedbackId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: "Sent",
    });

    // 4. Update the product document with feedback count (keep existing logic)
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      feedbackCount: increment(1),
      lastFeedbackAt: serverTimestamp(),
    });

    // 5. Increment feedback count for the user
    await updateDoc(userRef, {
      feedback_count_monthly: increment(1),
    });

    return { success: true, feedbackId };
  } catch (error) {
    console.error("Error adding feedback:", error);
    return {
      success: false,
      error: (error as Error).message || "Failed to add feedback.",
    };
  }
}
