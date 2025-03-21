import getProductData from "@/actions/get-product-data";
import { notFound } from "next/navigation";
import { lightenColor } from "./_utils/lighten-color";
import SimpleTemplate from "./_components/templates/simple-template";

export type Product = {
  docId: string;
  name: string;
  description: string;
  style?: {
    primaryColor: string;
    textColor: string;
    headingStyle: string;
    fontFamily: string;
    fontSize: string;
    layout: string;
    spacing: string;
    borderRadius: string;
    shadowStyle: string;
    animation: string;
    backgroundColor: string;
    secondaryColor: string;
    secondaryTextColor: string;
    accentColor: string;
  }
}

export type FilterData = {
  filter: string | null;
  quick: string | null;
  specifiedDate: string | null;
  sentiment: string | null;
};

const ProductPaSpecial = async ({
  params,
  searchParams,
}: {
  params: { id: string },
  searchParams: { filter: string | null, quick: string | null, date: string | null, sentiment: string | null }
}) => {
  const { id } = params;
  const productDataFromServer = await getProductData(id);
  // if (!productDataFromServer) notFound();

  const filter = searchParams.filter || null;
  const quick = searchParams.quick || null;
  const date = searchParams.date || null;
  const sentiment = searchParams.sentiment || null;

  const filterData = {
    filter,
    quick,
    specifiedDate: date,
    sentiment
  };

  // Generate secondary colors based on the primary colors
  const secondaryTextColor = lightenColor(productDataFromServer.style.textColor, 20);
  const productData = {
    ...productDataFromServer,
    secondaryTextColor,
  };

  if (!productData) {
    notFound();
  }

  return (
    <div className="product-page-container min-h-screen">
      <SimpleTemplate productData={productData} filterData={filterData} />
    </div>
  );
}

export default ProductPaSpecial;
