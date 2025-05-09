"use client";

import IncludeUserDataTab from "./include-user-data-tab";
import ScriptTab from "./script-tab";
import { CodeBlock } from "@/components/docs/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ComponentTabs({
  componentId,
  componentAPIKey,
  componentProductId,
}: {
  componentId: string;
  componentAPIKey: string;
  componentProductId: string;
}) {
  return (
    <Tabs defaultValue="exclude" className="w-full mb-6">
      <TabsList className="grid w-fit bg-secondaryBackground text-secondaryForeground grid-cols-2 mb-4">
        <TabsTrigger value="exclude">Exclude user data</TabsTrigger>
        <TabsTrigger value="include">Include user data</TabsTrigger>
      </TabsList>

      <p>Make sure to add this script at the end of your HTML page</p>
      <CodeBlock
        code={`<script src="https://cdn.tailwindcss.com"></script>`}
        language="html"
      />

      <TabsContent value="exclude" className="mt-2">
        <ScriptTab
          componentId={componentId}
          componentAPIKey={componentAPIKey}
          componentProductId={componentProductId}
        />
      </TabsContent>

      <TabsContent value="include" className="mt-2">
        <IncludeUserDataTab
          componentAPIKey={componentAPIKey}
          componentId={componentId}
          componentProductId={componentProductId}
        />
        {/* <ReactTab
          componentId={componentId}
          componentAPIKey={componentAPIKey}
          componentProductId={componentProductId}
        /> */}
      </TabsContent>
    </Tabs>
  );
}
