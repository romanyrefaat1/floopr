import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let productDocId;
  try {
    const { productData } = await req.json();

    const userId = auth();

    if (!userId) {
      return NextResponse.json(
        { error: `User is not authenticated.`, success: false },
        { status: 401 }
      );
    }

    if (!productData) {
      return NextResponse.json(
        {
          error: `productData and userId are not provided to new-product`,
          success: false,
        },
        { status: 400 }
      );
    }

    if (productData.name.length === 0) {
      return NextResponse.json(
        { error: `Please give a name to your product.`, success: false },
        { status: 500 }
      );
    }

    // Firebase Code
    productDocId = randomUUID();
    const docRef = doc(db, `products`, productDocId);
    await setDoc(docRef, {
      ...productData,
      docId: productDocId,
      pageViews: 0,
      commentsCount: 0,
      feedbackCount: 0,
      likesCount: 0,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastFeedbackAt: null,

      analytics: {
        sentiment: {
          positive: 0,
          negative: 0,
          neutral: 0,
          topSentiment: "neutral",
          percent: 0,
        },
        topic: {
          allTopics: productData.topics || [],
          topTopic: null,
          percent: 0,
        },
        socialData: {
          likes: {
            count: 0,
            data: [],
          },
          comments: {
            count: 0,
            data: [],
          },
        },
      },
    });

    return NextResponse.json(
      { mess: `Product created successfully.`, success: true, productDocId },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Server error in new-product route: ${error}`, success: false },
      { status: 500 }
    );
  }
}
