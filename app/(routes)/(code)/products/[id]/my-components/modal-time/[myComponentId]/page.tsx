import ComponentDisplay from "../_components/component-display";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";

{
  /* 
    <pre style={{whiteSpace: "pre-wrap", overflow: "auto", padding: "1rem", borderRadius: "0.5rem", backgroundColor: "#f5f5f5"}}>
      {JSON.stringify({
        "productId": "e2e2ac26-2c9e-4fd1-a408-05a6a971ccf7",
        "componentData": {
          "ratings": [
            { "value": 0, "emoji": "😞", "label": "Bad" },
            { "value": 1, "emoji": "😐", "label": "Normal" },
            { "label": "Good", "emoji": "😊", "value": 2 }
          ],
          "inputs": [
            { "label": "Explain it here", "placeholder": "Write your feedback..." }
          ],
          "componentId": "2a635f40-2844-4060-9867-5f08e34b80f9",
          "buttonText": "Save",
          "timeoutDuration": 0,
          "productId": "e2e2ac26-2c9e-4fd1-a408-05a6a971ccf7",
          "title": "Got any feedback?",
          "position": "sticky"
        },
        "componentType": "modal-time"
      }, null, 2)}
    </pre>
     */
}

export default async function MyComponentsPage({ params }) {
  const user = auth();
  if (!user) {
    // redirectToSignIn();
    console.log(`!user`);
    notFound();
  }

  const { myComponentId, id } = params;

  if (!myComponentId) notFound();

  // See if user is owner
  const productDocRef = doc(db, "products", id);
  let productDocSnap = await getDoc(productDocRef);

  if (!productDocSnap.exists()) {
    // const typeDocRef = doc(db, "products", id, "components", componentType);
    // productDocSnap = await getDoc(typeDocRef);
    notFound();
  }
  productDocSnap = await getDoc(productDocRef);
  const ownerId = productDocRef.ownerId;

  if (!user.id === ownerId) {
    notFound();
  }

  // First find component data
  const componentDocRef = doc(db, "products", id, "components", myComponentId);
  let componentDocSnap = await getDoc(componentDocRef);

  if (!componentDocSnap.exists()) {
    const typeDocRef = doc(db, "products", id, "components", `modal-time`);
    componentDocSnap = await getDoc(typeDocRef);

    if (!componentDocSnap.exists()) notFound();
  }

  const componentData = componentDocSnap.data();

  return (
    <ComponentDisplay
      componentData={componentData}
      componentType="Modal Time"
    />
  );
}
