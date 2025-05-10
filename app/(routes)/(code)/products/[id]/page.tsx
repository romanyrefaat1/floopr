import DashboardTemplate from "./_components/templates/dashboard-template";
import { lightenColor } from "./_utils/lighten-color";
import getProductData from "@/actions/get-product-data";
import BasicSendEmailButton from "@/components/basic-send-email-button";
import { ChatbotProvider } from "@/contexts/chatbot-context";
import getFiltersFromParams from "@/lib/get-filters-from-params";
import serializeFirestoreData from "@/lib/serialize-firestore-data";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export type Product = {
  docId: string;
  name: string;
  description: string;
  ownerId: string;
  style?: {
    textColor: string;
    backgroundColor: string;
    primaryColor: string;
    accentColor: string;
    [key: string]: string | undefined;
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
  searchParams: FilterData;
}) => {
  const { id } = await params;
  const { userId } = await auth();
  const productDataFromServer = (await getProductData(id)) as Product;

  if (!productDataFromServer) notFound();
  console.log(`productDataFromServer`, productDataFromServer.name);
  console.log(`userId from main`, userId);
  console.log(`productDataFromServer`, productDataFromServer.ownerId);

  if (productDataFromServer.ownerId !== userId) {
    return notFound();
  }

  // const serializedProductData = serializeFirestoreData(productDataFromServer);

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
    return notFound();
  }

  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-background">
        {/* <div>
          <BasicSendEmailButton />
        </div> */}

        <DashboardTemplate productData={productData} filterData={filterData} />
      </div>
    </ChatbotProvider>
  );
};

export default ProductPage;
