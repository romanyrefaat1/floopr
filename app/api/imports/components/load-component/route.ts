import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

{
  /*
    Tasks:
        1. See if parsed data is correct
        2. See if api key is correct
        3. get data from firestore
        4. return data
*/
}

export async function POST(request: Request) {
  console.log("Start: POST request to load component data");
  const { apiKey, productId, componentId } = await request.json();
  console.log("apiKey, productId, componentId", apiKey, productId, componentId);
  // check if api key is correct
  if (!apiKey || !productId || !componentId)
    return new Response("Invalid data", { status: 400 });

  const response = await getDoc(
    doc(db, `products/${productId}/components/${componentId}`)
  );
  const data = response.data();
  // check if api key is correct
  console.log(`data from firestore/backend:`, data);
  if (!data) return new Response("Component not found", { status: 404 });

  // check if api key is correct
  const isAPIKeyCorrect = data?.apiKey === apiKey;
  if (!isAPIKeyCorrect)
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });

  // get data from firestore
  return NextResponse.json(data.componentData, { status: 200 });
}
