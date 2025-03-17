import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Suspense } from "react";
import LoaderSpinner from "@/components/loader-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllComponents from "./all-components";
import YourComponents from "./your-components";
export default async function FeedbackIntegrationsTab({ productData }: { productData }) {
    
    return (
        <Suspense fallback={<LoaderSpinner />}>
      <Tabs defaultValue="your-components">
<TabsList>
    <TabsTrigger value="your-components">Your components</TabsTrigger>
    <TabsTrigger value="all-components">All components</TabsTrigger>
</TabsList>
<TabsContent value="your-components">
    <YourComponents productId={productData.docId} productData={productData} />
</TabsContent>
<TabsContent value="all-components">
    <AllComponents productData={productData} />
</TabsContent>
</Tabs>       
        </Suspense>
    )
}

// <h1 className="mb-[20px]">Edit Modal</h1>
{/* */}