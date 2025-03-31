"use client";

import ReactTab from "./react-tab";
import ScriptTab from "./script-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ComponentTabs({ componentId, componentAPIKey, componentProductId }: { componentId: string, componentAPIKey: string, componentProductId: string }) {
  return (
    <Tabs defaultValue="script" className="w-full mb-6">
      <TabsList className="grid w-fit bg-secondaryBackground text-secondaryForeground grid-cols-2 mb-4">
        <TabsTrigger value="script">Script</TabsTrigger>
        <TabsTrigger value="react">React/NextJS</TabsTrigger>
      </TabsList>

      <TabsContent value="script" className="mt-2">
        <ScriptTab />
      </TabsContent>

      <TabsContent value="react" className="mt-2">
        <ReactTab componentId={componentId} componentAPIKey={componentAPIKey} componentProductId={componentProductId} />
      </TabsContent>
    </Tabs>
  );
}
