import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { componentData, productId, componentType } = await request.json();
    console.log("POST /api/save-component received request:", request);

    if (!componentData || !productId || !componentType) {
      return NextResponse.json(
        {
          error: "componentData, productId, and componentType are required",
          success: false,
        },
        { status: 400 }
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
      console.log(`Updating existing component ${componentData.componentId}`);
      await updateDoc(componentRef, {
        componentData,
        componentType,
        apiKey: componentApiKey,
        productId,
      });
    } else {
      console.log(`Creating new component ${componentData.componentId}`);
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
