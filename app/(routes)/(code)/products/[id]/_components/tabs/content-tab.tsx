import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { FilterData, Product } from "../../page";
import FeedbackContentItems from "../feedback-content-items";
import FilterButton from "@/components/filter/filter-button";
import { Badge } from "@/components/ui/badge";
import { formatDateDataFromShadcn } from "./_utility/formatDateData";
import { Suspense } from "react";
import LoaderSpinner from "@/components/loader-spinner";

export default async function ContentTab({productData, isOwner=false, filterData}: {productData: Product, isOwner: boolean, filterData: FilterData}) {
    const productId = productData.docId

    return (
      <Suspense fallback={<LoaderSpinner />}>
            <div className="mb-[15px]">
            {/* Filtering */}
            <div className="flex justify-between">
            <h2 className="text-3xl font-bold mb-[25px]">Feedbacks</h2>
            <FilterButton label="Filter" />
            </div>
            {/* Filtered items */}
            {filterData.filter && <Badge style={{background: productData.style.accentColor}}>
                {filterData.filter.charAt(0).toUpperCase() + filterData.filter.slice(1)} {filterData.specifiedDate && ` - ${formatDateDataFromShadcn(filterData.specifiedDate)}`}
            </Badge>
            }
            <FeedbackContentItems filterData={filterData} isOwner={isOwner} productData={productData} productId={productId}/>
            </div>
      </Suspense>
    )
}