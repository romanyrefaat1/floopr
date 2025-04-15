import { FilterData, Product } from "../../page";
import AddFeedbackForm from "../add-simple-feedback-form";
import FeedbackContentWrapper from "../feedback-content-wrapper";
import PrioritizedFeedback from "../prioritized-feedback";
import { formatDateDataFromShadcn } from "./_utility/formatDateData";
import { ProductData } from "@/app/(routes)/(code)/[productId]/page";
import FilterButton from "@/components/filter/filter-button";
import SentimentFilterButton from "@/components/filter/sentiment-filter-button";
import LoaderSpinner from "@/components/loader-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import serializeFirestoreData from "@/lib/serialize-firestore-data";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { Suspense } from "react";

export default function ContentTab({
  productData,
  isOwner = false,
  filterData,
  isOwnerPa = false,
}: {
  productData: ProductData;
  isOwner: boolean;
  filterData: FilterData;
  isOwnerPa: boolean;
}) {
  const productId = productData.productId;
  console.log(`content tab productId:`, productId);
  const primaryColor = productData.style?.primaryColor || "#7c64f6";

  // Serialize Firebase timestamps to avoid passing non-serializable objects to client components
  const serializedProductData = serializeFirestoreData(productData);

  return (
    // <Suspense fallback={<LoaderSpinner />}>
    <div className="space-y-6">
      {/* Feedback list section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Recent Feedback</h3>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search feedback..." className="pl-8 w-full" />
          </div>
          <div className="flex gap-2">
            <SentimentFilterButton productId={productId} />
            <FilterButton isOwnerPa={isOwnerPa} label="Filter" />
          </div>
        </div>

        {/* Active filters display */}
        {filterData.filter && (
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge
              className="bg-primary hover:bg-primary/90"
              style={{ backgroundColor: primaryColor }}
            >
              {filterData.filter.charAt(0).toUpperCase() +
                filterData.filter.slice(1)}{" "}
              {filterData.specifiedDate &&
                ` - ${formatDateDataFromShadcn(filterData.specifiedDate)}`}
            </Badge>
            {filterData.sentiment && (
              <Badge className="bg-primary/80 hover:bg-primary/70">
                Sentiment: {filterData.sentiment}
              </Badge>
            )}
            {filterData.quick && (
              <Badge className="bg-primary/80 hover:bg-primary/70">
                Quick: {filterData.quick}
              </Badge>
            )}
          </div>
        )}

        {/* Prioritized Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Prioritized Feedback</CardTitle>
          <CardDescription>AI-powered feedback prioritization based on importance and urgency</CardDescription>
        </CardHeader>
        <CardContent>
          <PrioritizedFeedback
            productId={productId}
          />
          {/* Codin tis. */}
        </CardContent>
      </Card>

      {/* Feedback items */}
      <FeedbackContentWrapper
        filterData={filterData}
        isOwner={isOwner}
        productData={serializedProductData}
        productId={productId}
      />
      </div>
    </div>
    // </Suspense>
  );
}
