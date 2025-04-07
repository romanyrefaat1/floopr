import DashboardTemplate from "./_components/templates/dashboard-template";
import { lightenColor } from "./_utils/lighten-color";
import getProductData from "@/actions/get-product-data";
import BasicSendEmailButton from "@/components/basic-send-email-button";
import getFiltersFromParams, {
  FiltersFromParams,
} from "@/lib/get-filters-from-params";
import { notFound } from "next/navigation";

export type Product = {
  docId: string;
  name: string;
  description: string;
  style?: {
    textColor: string;
    backgroundColor: string;
    primaryColor: string;
    accentColor: string;
    [key: string]: any;
  };
};

export type FilterData = {
  filter: "likes" | "date" | "sentiment" | "type" | null;
  quick: "24-hours" | "7-days" | "30-days" | null;
  sentiment: "positive" | "neutral" | "negative" | null;
  type: "feature" | "idea" | "issue" | "other" | null;
  specifiedDate: string | null;
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: FiltersFromParams;
}) => {
  const { id } = await params;
  const productDataFromServer = await getProductData(id);

  if (!productDataFromServer) notFound();

  const filterData = getFiltersFromParams(searchParams);

  // Generate secondary colors based on the primary colors
  const secondaryTextColor = lightenColor(
    productDataFromServer.style?.textColor || "#000000",
    20
  );
  const productData = {
    ...productDataFromServer,
    secondaryTextColor,
  };

  if (!productData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <div>
        <BasicSendEmailButton />
      </div> */}
      <DashboardTemplate productData={productData} filterData={filterData} />
    </div>
  );
};

export default ProductPage;
