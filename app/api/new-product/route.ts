import { db } from "@/lib/firebase";
import { randomUUID } from "crypto";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let productDocId;
  try {
    const { productData } = await req.json();
    console.log(`productData`, productData);

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

    console.log(`firebase code will start`);
    // Firebase Code
    productDocId = randomUUID();
    const docRef = doc(db, `products`, productDocId);
    await setDoc(docRef, {
      ...productData,
      // ownerId: userId,
      docId: productDocId,
    });

    console.log(`code is successfull`);
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
