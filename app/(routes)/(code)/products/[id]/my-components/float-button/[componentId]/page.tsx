"use client";

import { CodeBlock } from "@/components/docs/code-block";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ComponentData {
  apiKey: string;
  productId: string;
  componentId: string;
}

export default function FloatButtonDocs() {
  const params = useParams();
  const [componentData, setComponentData] = useState<ComponentData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComponentData = async () => {
      try {
        if (!params.id || !params.componentId)
          throw new Error("Missing params");

        // Query Firestore for the component data
        const componentRef = doc(
          db,
          "products",
          params.id as string,
          "components",
          params.componentId as string
        );
        const componentSnap = await getDoc(componentRef);

        if (!componentSnap.exists()) {
          throw new Error("Component not found");
        }

        setComponentData(componentSnap.data() as ComponentData);
      } catch (error) {
        console.error("Error fetching component data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id && params.componentId) {
      fetchComponentData();
    }
  }, [params.id, params.componentId]);

  const installationCode = `<script
  src="https://floopr.vercel.app/embeds/float-button-bundle_floopr_feedback_embed.js"
  data-api-key="${componentData?.apiKey || "YOUR_API_KEY"}"
  data-product-id="${params.id || "YOUR_PRODUCT_ID"}"
  data-component-id="${params.componentId || "YOUR_COMPONENT_ID"}"
  data-user-info='{"userId": "user_123", "userName": "User Name", "userImage": "https://example.com/avatar.jpg"}' // Optional
  defer
></script>`;

  const customizationCode = `// Example of customization options
{
  "buttonStyle": {
    "backgroundColor": "#ffffff",
    "borderRadius": "lg",
    "padding": "lg",
    "position": "bottom-right"
  },
  "userInfo": {
    "userId": "user_123",
    "userName": "User Name",
    "userImage": "https://example.com/avatar.jpg"
  }
}`;

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-4 md:mx-auto py-10 max-w-7xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Float Button Documentation
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn how to integrate and customize the floating feedback button in
            your application.
          </p>
        </div>

        <Tabs defaultValue="installation" className="space-y-4">
          <TabsList>
            <TabsTrigger value="installation">Installation</TabsTrigger>
            {/* <TabsTrigger value="customization">Customization</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger> */}
          </TabsList>

          <TabsContent value="installation" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
              <p className="mb-4">
                Add the following script tag to your HTML file, preferably just
                before the closing body tag:
              </p>
              <p>Make sure to add this script at the end of your HTML page</p>
                    <CodeBlock code={`<script src="https://cdn.tailwindcss.com"></script>`} language="html" />
              
              
              <CodeBlock code={installationCode} language="html" />

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">
                  Required Parameters
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code>data-api-key</code>: Your unique API key
                  </li>
                  <li>
                    <code>data-product-id</code>: The ID of your product
                  </li>
                  <li>
                    <code>data-component-id</code>: The specific component ID
                  </li>
                  <li>
                    <code>data-user-info</code>: JSON string containing user
                    information
                  </li>
                </ul>
              </div>
            </Card>
          </TabsContent>

          {/* Rest of the tabs content remains the same */}
          {/* ... existing code ... */}
        </Tabs>
      </div>
    </div>
  );
}
