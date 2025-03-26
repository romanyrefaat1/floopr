"use client";

import CopyButton from "../copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

export default function ModalTimeFeedbackDocs() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showApiKey, setShowApiKey] = useState(false);

  // The component signature remains unchanged.
  const componentSignature = `function FlooprFeedbackModalTimeout({
  apiKey,
  productId,
  componentId,
  userInfo,
}) {
  // Component implementation
}`;

  const installCode = `npm install modal-time-feedback`;

  const basicUsageCode = `import FlooprFeedbackModalTimeout from 'modal-time-feedback';

function App() {
  return (
    <FlooprFeedbackModalTimeout 
      productId="your-product-id"
      apiKey="your-api-key"
      componentId="your-component-id"
    />
  );
}`;

  // For the full usage example, we build two versions:
  // 1. The displayed code uses a masked API key until the user clicks to reveal it.
  // 2. The copied code always includes the actual API key and a "use client" header.
  const actualApiKey = "sec_prod_1234567890";
  const displayedFullUsageCode = `import FlooprFeedbackModalTimeout from 'modal-time-feedback';

function App() {
  return (
    <FlooprFeedbackModalTimeout 
      productId="shopping-app"
      apiKey="${showApiKey ? actualApiKey : "**********"}"
      componentId="feedback-modal-1"
      userInfo={{
        username: "Sarah Johnson",
        userId: "user_sarah_123",
        profilePicture: "https://example.com/sarah-profile.jpg"
      }}
    />
  );
}`;

  const copiedFullUsageCode = `use client;
import FlooprFeedbackModalTimeout from 'modal-time-feedback';

function App() {
  return (
    <FlooprFeedbackModalTimeout 
      productId="shopping-app"
      apiKey="${actualApiKey}"
      componentId="feedback-modal-1"
      userInfo={{
        username: "Sarah Johnson",
        userId: "user_sarah_123",
        profilePicture: "https://example.com/sarah-profile.jpg"
      }}
    />
  );
}`;

  const propsData = [
    {
      name: "productId",
      type: "string",
      required: "Yes",
      description: "Unique identifier for your product",
    },
    {
      name: "apiKey",
      type: "string",
      required: "Yes",
      description: "Authentication key for the service",
    },
    {
      name: "componentId",
      type: "string",
      required: "Yes",
      description: "Unique identifier for this specific component instance",
    },
    {
      name: "userInfo",
      type: "object",
      required: "No",
      description: "Optional user information object",
    },
  ];

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-fit bg-secondaryBackground text-secondaryForeground grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="props">Props</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-2">
          <div className="bg-secondaryBackground p-4 rounded-md">
            <h3 className="text-lg font-bold mb-2 text-foreground">
              Component Overview
            </h3>
            <div className="relative bg-background p-3 rounded-md mb-4">
              <div className="absolute top-2 right-2">
                <CopyButton text={componentSignature} />
              </div>
              <pre className="text-secondaryForeground overflow-x-auto">
                <code>{componentSignature}</code>
              </pre>
            </div>
            <p className="text-secondaryForeground mb-4">
              FlooprFeedbackModalTimeout is a React component that provides a
              customizable feedback modal with timeout functionality. It allows
              easy integration of user feedback collection into your
              application.
            </p>

            <div className="bg-background p-3 rounded-md">
              <h4 className="font-semibold mb-2 text-foreground">
                Key Features:
              </h4>
              <ul className="list-disc pl-5 text-secondaryForeground">
                <li>Secure authentication with API key</li>
                <li>Optional user information tracking</li>
                <li>Unique component and product identification</li>
                <li>Flexible configuration</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* Installation Tab */}
        <TabsContent value="installation" className="mt-2">
          <div className="bg-secondaryBackground p-4 rounded-md">
            <h3 className="text-lg font-bold mb-2 text-foreground">
              Installation
            </h3>

            <div className="relative bg-background p-3 rounded-md mb-4">
              <div className="absolute top-2 right-2">
                <CopyButton text={installCode} />
              </div>
              <code className="text-secondaryForeground">{installCode}</code>
            </div>

            <h4 className="font-semibold mb-2 text-foreground">Basic Usage</h4>
            <div className="relative bg-background p-3 rounded-md">
              <div className="absolute top-2 right-2">
                <CopyButton text={basicUsageCode} />
              </div>
              <pre className="text-secondaryForeground overflow-x-auto">
                <code>{basicUsageCode}</code>
              </pre>
            </div>
          </div>
        </TabsContent>

        {/* Props Reference Tab */}
        <TabsContent value="props" className="mt-2">
          <div className="bg-secondaryBackground p-4 rounded-md">
            <h3 className="text-lg font-bold mb-2 text-foreground">
              Props Reference
            </h3>

            <div className="bg-background rounded-md">
              {propsData.map((prop, index) => (
                <div
                  key={prop.name}
                  className={`p-3 border-b border-border ${
                    index % 2 === 0
                      ? "bg-secondaryBackground bg-opacity-10"
                      : ""
                  }`}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-foreground">
                      {prop.name}
                    </span>
                    <span className="text-mutedForeground text-sm">
                      {prop.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondaryForeground">
                      {prop.description}
                    </span>
                    <span className="text-destructive text-sm font-medium">
                      {prop.required === "Yes" ? "Required" : "Optional"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="font-semibold mt-4 mb-2 text-foreground">
              Full Usage Example
            </h4>

            {/* Button to reveal the actual API key */}
            <div className="mb-2">
              {!showApiKey && (
                <button
                  onClick={() => setShowApiKey(true)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Reveal API Key
                </button>
              )}
            </div>

            <div className="relative bg-background p-3 rounded-md">
              <div className="absolute top-2 right-2">
                {/*
                  Pass the copied snippet (which includes "use client" and the actual key)
                  to the CopyButton so that when the user copies the code, the sensitive value is revealed.
                */}
                <CopyButton text={copiedFullUsageCode} />
              </div>
              <pre className="text-secondaryForeground overflow-x-auto">
                <code>{displayedFullUsageCode}</code>
              </pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
