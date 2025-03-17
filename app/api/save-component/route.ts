import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { componentData, productId, componentType } = await request.json();
    console.log("POST /api/save-component received request:", request)
    
    if (!componentData || !productId || !componentType) {
        return NextResponse.json(
        { error: "componentData, productId, and componentType are required", success: false },
        { status: 400 }
      );
    }
    
    // Save component in Firestore
    console.log("Start setDoc")
    const componentApiKey = crypto.randomUUID()
    const result = await setDoc(
      doc(db, `products/${productId}/components/${componentData.componentId}`), 
      {
        componentData,
        componentType,
        apiKey: componentApiKey,
        productId
      }
    );
    console.log("End setDoc:", result)
    
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to save component: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}
