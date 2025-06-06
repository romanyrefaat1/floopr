import getUserPricing from "@/actions/user/get-user-pricing";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { componentData, productId, componentType } = await request.json();

    if (!componentData || !productId || !componentType) {
      return NextResponse.json(
        {
          error: "componentData, productId, and componentType are required",
          success: false,
        },
        { status: 400 }
      );
    }

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: User not authenticated", success: false },
        { status: 401 }
      );
    }

    const { tier } = await getUserPricing(userId);

    if (tier === "free" && componentType !== "modal-time") {
      return NextResponse.json(
        {
          error:
            "Modal Time component is the only one allowed for Builder+ users",
          success: false,
        },
        { status: 403 }
      );
    }
    // Save component in Firestore
    const componentApiKey = crypto.randomUUID();
    const componentRef = doc(
      db,
      `products/${productId}/components/${componentData.componentId}`
    );
    const docSnap = await getDoc(componentRef);

    if (docSnap.exists()) {
      await updateDoc(componentRef, {
        componentData,
        componentType,
        apiKey: componentApiKey,
        productId,
      });
    } else {
      await setDoc(componentRef, {
        componentData,
        componentType,
        apiKey: componentApiKey,
        productId,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to save component: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}
