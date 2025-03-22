"use client";

import { FilterData, Product } from "../page";
import ContentTab from "./tabs/content-tab";
import FeedbackIntegrationsTab from "./tabs/feedback-integrations-tab/feedback-integrations-tab";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";

type FeedbackTabsClientProps = {
  productData: Product;
  isOwner: boolean;
  filter: FilterData;
};

export function FeedbackTabsClient({
  productData,
  isOwner = false,
  filter,
}: FeedbackTabsClientProps) {
  return (
    <ContentTab
          isOwner={isOwner}
          productData={productData}
          filterData={filter}
        />
    // <Tabs className="w-full" defaultValue="feedback-content">
    //   {/* <div className="flex justify-between items-center mb-4"> */}
    //     {/* <TabsList className="grid grid-cols-2 w-fit">
    //       <TabsTrigger value="feedback-content">Content</TabsTrigger>
    //       <TabsTrigger value="feedback-integrations">
    //         Integrations
    //       </TabsTrigger>
    //     </TabsList> */}

    //     {/* <div className="flex items-center gap-2">
    //       <Button variant="outline" size="sm">
    //         <Settings size={16} className="mr-2" />
    //         Configure
    //       </Button>
    //     </div> */}
    //   {/* </div> */}

    //   <TabsContent value="feedback-content">
    //     <ContentTab
    //       isOwner={isOwner}
    //       productData={productData}
    //       filterData={filter}
    //     />
    //   </TabsContent>

    //   {/* {isOwner && (
    //     <>
    //       <TabsContent value="feedback-integrations">
    //         <FeedbackIntegrationsTab productData={productData} />
    //       </TabsContent>
          
    //     </> */}
    //   )}
    // </Tabs>
  );
}