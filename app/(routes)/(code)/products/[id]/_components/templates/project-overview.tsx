import ProjectDataSummary from "./project-data-summary";
import { ProductData } from "@/app/(routes)/(code)/[productId]/page";

type ProjectOverviewProps = {
  productData: ProductData;
};

export default function ProjectOverview({ productData }: ProjectOverviewProps) {
  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-1 gap-4">
      {/* <div className="rounded-lg w-full min-h-[300px] bg-background/50 border p-4 flex items-center justify-center">
                Image
            </div> */}
      <ProjectDataSummary productId={productData.docId} />
    </div>
  );
}
