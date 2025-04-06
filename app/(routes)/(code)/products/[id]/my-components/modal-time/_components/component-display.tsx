"use client";

import CopyButton from "./copy-button";
import ComponentTabs from "./tabs/tabs";

interface ComponentDisplayProps {
  componentData: any;
  componentType: string;
}

export default function ComponentDisplay({
  componentData,
  componentType,
}: ComponentDisplayProps) {
  const componentDataString = JSON.stringify(componentData, null, 2);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Components</h1>
      <h2 className="font-bold mb-2 text-secondaryForeground">
        {componentType}
      </h2>
      <ComponentTabs
        componentId={componentData.componentData.componentId}
        componentAPIKey={componentData.apiKey}
        componentProductId={componentData.productId}
      />
    </main>
  );
}
