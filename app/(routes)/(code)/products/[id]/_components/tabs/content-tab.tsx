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

export default async function ContentTab({productData, isOwner=false, filterData}: {productData: Product, isOwner: boolean, filterData: FilterData}) {
    const productId = productData.docId

    return (
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
                <CardTitle>Feedback Content</CardTitle>
                <CardDescription>
                    Product content desc..
                </CardDescription>  
            </div>
            {/* Filtering */}
            <FilterButton label="Filter" />
          </CardHeader>
          <CardContent className="space-y-2">
          {/* Filtered items */}
          {filterData.filter && <Badge style={{background: productData.style.accentColor}}>
            {filterData.filter.charAt(0).toUpperCase() + filterData.filter.slice(1)} {filterData.specifiedDate && ` - ${formatDateDataFromShadcn(filterData.specifiedDate)}`}
          </Badge>
          }
            <FeedbackContentItems filterData={filterData} isOwner={isOwner} productData={productData} productId={productId}/>
          </CardContent>
          {/* <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
        </Card>
    )
}