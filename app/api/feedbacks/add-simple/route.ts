import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
  increment,
  collection, // Added for consistency, though addDoc isn't used here for feedbacks
} from "firebase/firestore";
import { analyzeSentiment } from "@/services/analyze-sentiment";
import updateBasicAnalyticsFromNewFeedback from "@/actions/basic-analytics/update/update-basic-analytics-from-new-feedback";
import getUserPricing from "@/actions/user/get-user-pricing";
import getProductData from "@/actions/get-product-data";

// Re-define or import SimpleFeedbackItemData if it's not globally accessible
// For this example, I'll define the expected request body structure.
type AddSimpleFeedbackRequestBody = {
  feedback: {
    title: string;
    content: string | null;
    isRich: boolean;
    type: `idea` | `feature` | `issue` | `other`;
  };
  productId: string;
  componentRefId?: string | null; // Make optional if not always present
};

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = auth();
    let user = await currentUser(); // Get full user details for username/profilePicture

    // if (!clerkId || !user) {
    //   return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    // }

    const body: AddSimpleFeedbackRequestBody = await request.json();
    const { feedback, productId, componentRefId, userInfo, currPage } = body;

    if (userInfo && (userInfo.username || userInfo.userId || userInfo.profilePicture)) {
      user = {
        username: userInfo.username || "Anonymous",
        userId: userInfo.userId || null,
        profilePicture: userInfo.profilePicture || null,
      };
    }

    if (!feedback || !productId) {
      return NextResponse.json({ error: "Missing feedback data or productId." }, { status: 400 });
    }

    const {ownerId} = await getProductData(productId);
    
    // 1. Get user subscription details and check limits using centralized function
    const userSubscription = await getUserPricing(ownerId);

    if (userSubscription.isExceededFeedbackCountLimit) {
      return NextResponse.json(
        { error: "Monthly feedback submission limit reached. Please upgrade your plan or try again next month." },
        { status: 429 } // 429 Too Many Requests or 403 Forbidden
      );
    }

    // 2. Proceed with feedback submission
    const sentimentResult = await analyzeSentiment(
      `${feedback.title}. ${feedback.content || ""}`
    );
    const topicClassification = ["No topic", "No topic", "No topic"]; // Placeholder

    // 3. Ensure the product document exists (optional, for safety)
    await setDoc(
      doc(db, "products", productId),
      { productId, updatedAt: serverTimestamp() },
      { merge: true }
    );

    // 4. Add feedback document
    const feedbackId = crypto.randomUUID();
    const userInfoForFeedback = {
      userId: user?.id || user?.userId || null,
      username:
        user?.username ??
        user?.firstName ??
        (user?.emailAddresses?.[0]?.emailAddress
          ? user.emailAddresses[0].emailAddress.split('@')[0]
          : "Anonymous"),
      profilePicture: user?.imageUrl ?? user?.profilePicture ?? null,
    };
    console.log(userInfoForFeedback, user, sentimentResult, feedback)

    await setDoc(doc(db, "products", productId, "feedbacks", feedbackId), {
      type: feedback?.type || "other",
      sentiment: {
        sentiment: sentimentResult?.sentiment ?? null,
        score: sentimentResult?.score ?? null,
        text: sentimentResult?.text ?? "",
      },
      topic: topicClassification,
      socialData: { likes: { count: 0, data: [] }, comments: { count: 0, data: [] } },
      feedback: {
        title: feedback.title || "Untitled",
        content: feedback.content || null,
        isRich: feedback.isRich || true,
      },
      feedbackId,
      productId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: "Sent",
      componentRefId: componentRefId || null,
      isComponent: !!componentRefId, // Example logic
      userInfo: userInfoForFeedback,
      // ...(currPage && { referenceLink: currPage }),
      referenceLink: currPage || null,
    });

    // 5. Increment feedback count for the user in Firebase
    // clerkId is guaranteed by the auth check at the beginning.
    // getUserPricing ensures the user document exists.
    const userDocRef = doc(db, "users", ownerId);
    await updateDoc(userDocRef, {
      feedback_count_monthly: increment(1),
    });

    // 6. Update product feedback count
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      feedbackCount: increment(1),
      lastFeedbackAt: serverTimestamp(),
    });

    // 7. Update basic analytics
    await updateBasicAnalyticsFromNewFeedback({
      productId,
      sentimentResult,
      topicClassification,
    });

    return NextResponse.json({ success: true, feedbackId }, { status: 201 });
  } catch (error: any) {
    console.error("Error in /api/feedbacks/add-simple.route.ts:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add feedback." },
      { status: 500 }
    );
  }
}
