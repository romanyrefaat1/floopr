import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  increment,
} from "firebase/firestore";
import { analyzeSentiment } from "@/services/analyze-sentiment";
import updateBasicAnalyticsFromNewFeedback from "@/actions/basic-analytics/update/update-basic-analytics-from-new-feedback";
import getUserPricing from "@/actions/user/get-user-pricing";
import getProductData from "@/actions/get-product-data";

// Define the expected request body structure
type AddSimpleFeedbackRequestBody = {
  feedback: {
    title: string;
    content: any; // Can be string or Draft.js object
    isRich: boolean;
    type: `idea` | `feature` | `issue` | `other`;
  };
  productId: string;
  componentRefId?: string | null;
  userInfo?: {
    username?: string;
    userId?: string;
    profilePicture?: string;
  };
  currPage?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = auth();
    let user = await currentUser();

    const body: AddSimpleFeedbackRequestBody = await request.json();
    const { feedback, productId, componentRefId, userInfo, currPage } = body;

    // Handle custom userInfo if provided
    if (userInfo && (userInfo.username || userInfo.userId || userInfo.profilePicture)) {
      user = {
        username: userInfo.username || "Anonymous",
        userId: userInfo.userId || null,
        profilePicture: userInfo.profilePicture || null,
      } as any;
    }

    if (!feedback || !productId) {
      return NextResponse.json({ error: "Missing feedback data or productId." }, { status: 400 });
    }

    const { ownerId } = await getProductData(productId);
    
    // Check user subscription limits
    const userSubscription = await getUserPricing(ownerId);

    if (userSubscription.isExceededFeedbackCountLimit) {
      return NextResponse.json(
        { error: "Monthly feedback submission limit reached. Please upgrade your plan or try again next month." },
        { status: 429 }
      );
    }

    // Analyze sentiment
    const sentimentText = `${feedback.title}. ${
      typeof feedback.content === 'string' 
        ? feedback.content 
        : feedback.content?.blocks?.map((block: any) => block.text).join(' ') || ''
    }`;
    const sentimentResult = await analyzeSentiment(sentimentText);
    const topicClassification = ["No topic", "No topic", "No topic"]; // Placeholder

    // Ensure the product document exists
    await setDoc(
      doc(db, "products", productId),
      { productId, updatedAt: serverTimestamp() },
      { merge: true }
    );

    // Prepare user info for feedback
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
    
    // Create the feedback document
    const finalFirestoreObject = {
      type: feedback?.type || "other",
      sentiment: {
        sentiment: sentimentResult?.sentiment ?? null,
        score: sentimentResult?.score ?? null,
        text: sentimentResult?.text ?? "",
      },
      topic: topicClassification,
      socialData: { 
        likes: { count: 0, data: [] }, 
        comments: { count: 0, data: [] } 
      },
      feedback: {
        title: feedback.title || "Untitled",
        content: feedback.content || null, // Store as-is (object or string)
        isRich: feedback.isRich || false,
      },
      feedbackId,
      productId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: "Sent",
      componentRefId: componentRefId || null,
      isComponent: !!componentRefId,
      userInfo: userInfoForFeedback,
      referenceLink: currPage || null,
    };

    // Save feedback to Firestore
    await setDoc(
      doc(db, "products", productId, "feedbacks", feedbackId), 
      finalFirestoreObject
    );

    // Update user feedback count
    const userDocRef = doc(db, "users", ownerId);
    await updateDoc(userDocRef, {
      feedback_count_monthly: increment(1),
    });

    // Update product feedback count
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      feedbackCount: increment(1),
      lastFeedbackAt: serverTimestamp(),
    });

    // Update basic analytics
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