import { FilterData } from "../../page";
import DifferViewButton from "../../view-context/differ-view-button";
import {
  useView,
  VIEW_MODES,
  ViewProvider,
} from "../../view-context/view-context";
import FeedbackContentWrapper from "../feedback-content-wrapper";
import { formatDateDataFromShadcn } from "./_utility/formatDateData";
import ContentTabTitle from "./content-tab-title";
import GroupFeedbackButton from "./content-tab/group-feedback-button";
import { ProductData } from "@/app/(routes)/(code)/[productId]/page";
import FilterButton from "@/components/filter/filter-button";
import SentimentFilterButton from "@/components/filter/sentiment-filter-button";
import TypeFilterButton from "@/components/filter/type-filter-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import serializeFirestoreData from "@/lib/serialize-firestore-data";
import { Search, SlidersHorizontal, Plus, Eye, Group } from "lucide-react";

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
  const productId = productData.docId;
  console.log(`content tab productId:`, productId);
  const primaryColor = productData.style?.primaryColor || "#7c64f6";

  return (
    // <Suspense fallback={<LoaderSpinner />}>
    <div className="space-y-6">
      {/* Feedback list section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <ContentTabTitle />
          <div className="flex gap-2 items-center justify-center">
            {/**/}
            <GroupFeedbackButton productId={productId} />
            <DifferViewButton />
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search feedback..." className="pl-8 w-full" />
          </div>
          <div className="flex gap-2">
            <TypeFilterButton productId={productId} />
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

        {/* Feedback items */}
        <FeedbackContentWrapper
          filterData={filterData}
          isOwner={isOwner}
          productData={productData}
          productId={productId}
        />
      </div>
    </div>
    // </Suspense>
  );
}
