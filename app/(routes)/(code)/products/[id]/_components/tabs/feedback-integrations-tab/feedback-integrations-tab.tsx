import AllComponents from "./all-components";
import YourComponents from "./your-components";
import LoaderSpinner from "@/components/loader-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Suspense } from "react";

export default async function FeedbackIntegrationsTab({
  productData,
}: {
  productData;
}) {
  return (
    <Suspense fallback={<LoaderSpinner />}>
      <Tabs defaultValue="your-components">
        <TabsList className="w-fit">
          <div className="w-fit">
            <TabsTrigger value="your-components">Your components</TabsTrigger>
            <TabsTrigger value="all-components">All components</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="your-components">
          <YourComponents
            productId={productData.docId}
            productData={productData}
          />
        </TabsContent>
        <TabsContent value="all-components">
          <AllComponents productData={productData} />
        </TabsContent>
      </Tabs>
    </Suspense>
  );
}

// <h1 className="mb-[20px]">Edit Modal</h1>
{
  /* */
}
