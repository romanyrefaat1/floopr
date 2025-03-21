import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { notFound } from "next/navigation"

{/* 
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
     */}

export default async function MyComponentsPage({params, searchParams}){
    const {myComponentsId, id} = await params
    // const componentType = await searchParams.componentType
    const componentType = `modal-timeoute`
    if (!componentType) notFound()
    const docRef = doc(db, "products", id, "components", `${componentType}`)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) notFound()
    return (
        <main>
            <h1>My Components</h1>
            <h2 className="text-2xl font-bold">{componentType}</h2>
            <p>if you want to use this component, you can copy the code below</p>
            <pre style={{whiteSpace: "pre-wrap", overflow: "auto", padding: "1rem", borderRadius: "0.5rem", backgroundColor: "#f5f5f5"}}>
                {JSON.stringify(docSnap.data(), null, 2)}
            </pre>
        </main>
    )
}