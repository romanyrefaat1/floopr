import CopyButton from "../copy-button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type IncludeUserDataTab = {
  componentId: string;
  componentAPIKey: string;
  componentProductId: string;
};

export default function IncludeUserDataTab({
  componentId,
  componentAPIKey,
  componentProductId,
}: IncludeUserDataTab) {
  const normalScriptCode = `<script
      src="https://floopr.vercel.app/embeds/modal-timeout-bundle_floopr_feedback_embed.js"
      defer
      data-api-key="${componentAPIKey}"
      data-product-id="${componentProductId}"
      data-component-id="${componentId}"
      data-api-base-url="https://floopr.vercel.app"
    ></script>`;

  const reactScriptCode = `
import React, { useEffect } from 'react';

const EmbedScript = () => {
  // Get user data
  const user = yourFunctionToGetUserData(); // Replace with your logic to get user data

  useEffect(() => {
    // Only run if user data is available
    if (!user) return;

    // Create the script element
    const script = document.createElement('script');
    script.src = 'http://floopr.vercel.app/embeds/modal-timeout-bundle_floopr_feedback_embed.js';
    script.defer = true;

    // Set data attributes, including dynamic user info
    script.dataset.apiKey = '${componentAPIKey}';
    script.dataset.productId = '${componentProductId}';
    script.dataset.componentId = '${componentId}';

    script.dataset.userInfo = JSON.stringify({
      userId: userId, // Adjust based on how your user object is structured
      username: username, // Optional username
      profilePicture: profilePictureURL, // Optional profile picture URL
    });
    script.dataset.apiBaseUrl = 'https://floopr.vercel.app';

    // Append the script to the body (or any other container)
    document.body.appendChild(script);

    // Cleanup: Remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [user]); // Run effect only when user data is available or updated

  return null;
};

export default EmbedScript;
`;
  const reactScriptCode2 = `export default function MyComponent() {
    // ... your component logic
    return (
     <div>
        <h1>My Component</h1>
        // Your page content here
        <EmbedScript /> {/* Include the script here */}
     </div>
)}
`;

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Add this script to your page to load the feedback component and include
        user data when a user submits feedback.
      </p>
      <Tabs defaultValue="normal" className="w-full">
        <TabsList className="grid bg-secondaryBackground w-fit grid-cols-2 mb-6">
          <TabsTrigger value="normal">Normal</TabsTrigger>
          <TabsTrigger value="react">React</TabsTrigger>
        </TabsList>

        <TabsContent value="normal" className="mt-0">
          <div className="relative rounded-md border bg-mutedBackground">
            <CopyButton text={normalScriptCode} />
            <pre className="p-4 overflow-x-auto text-sm text-foreground">
              {normalScriptCode}
            </pre>
          </div>
        </TabsContent>
        <TabsContent value="react" className="mt-0 space-y-6">
          <div className="relative rounded-md border bg-secondaryBackground">
            <h3 className="px-4 pt-4 font-medium mb-2">
              1. Create this component
            </h3>
            <CopyButton text={reactScriptCode} />
            <Separator />
            <pre className="p-4 overflow-x-auto text-sm text-foreground bg-mutedBackground">
              {reactScriptCode}
            </pre>
          </div>
          <div className="relative rounded-md border bg-secondaryBackground">
            <h3 className="px-4 pt-4 font-medium mb-2">
              2. Import it in your code
            </h3>
            <CopyButton text={reactScriptCode2} />
            <Separator />
            <pre className="p-4 overflow-x-auto text-sm text-foreground bg-mutedBackground">
              {reactScriptCode2}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
