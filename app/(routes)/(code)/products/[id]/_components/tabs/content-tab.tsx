import { FilterData } from "../../page";
import DifferViewButton from "../../view-context/differ-view-button";
import FeedbackContentWrapper from "../feedback-content-wrapper";
import TopFeedbackButtons from "../top-feedback-buttons";
import { formatDateDataFromShadcn } from "./_utility/formatDateData";
import ContentTabTitle from "./content-tab-title";
import GroupFeedbackButton from "./content-tab/group-feedback-button";
import { ProductData } from "@/app/(routes)/(code)/[productId]/page";
import { Badge } from "@/components/ui/badge";
import FeedbackCountIndicator from "@/components/warn/feedback-count-indicator";
import WarnFeedbackCountLimit from "@/components/warn/warn-feedback-count-limit";

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
            <FeedbackCountIndicator />
          </div>
        </div>

        {/* Search and filters */}
        <TopFeedbackButtons productId={productId} isOwnerPa={true} />

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
        <WarnFeedbackCountLimit isOwner={isOwner} />

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
