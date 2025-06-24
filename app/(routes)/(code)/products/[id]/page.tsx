import { getChangelogItems } from "./_components/tabs/changelog-tab/changelog-server";
import DashboardTemplate from "./_components/templates/dashboard-template";
import { lightenColor } from "./_utils/lighten-color";
import getFilteredFeedbacks from "@/actions/filter-feedback";
import getProductData from "@/actions/get-product-data";
import { AllFeedbackProvider } from "@/contexts/all-feedback-context";
import { ChangelogProvider } from "@/contexts/changelog-context";
import { ChatbotProvider } from "@/contexts/chatbot-context";
import { SettingsProvider } from "@/contexts/settings-context";
import getFiltersFromParams from "@/lib/get-filters-from-params";
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
  group: string | null;
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
  if (productDataFromServer.ownerId !== userId) {
    return notFound();
  }

  const filters = getFiltersFromParams(searchParams);
  const filterData = {
    ...filters,
    group: (filters as any).group ?? null,
  };

  // Fetch changelog, feedbacks, and settings on the server
  const [initialChangelog, rawFeedbacks, initialSettings] = await Promise.all([
    getChangelogItems(id),
    getFilteredFeedbacks(id, filterData),
    Promise.resolve({ theme: "light", notificationsEnabled: true }), // Replace with real settings fetch
  ]);
  
  // Ensure feedbacks is always an array
  const initialFeedbacks = Array.isArray(rawFeedbacks) ? rawFeedbacks : [];

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
    <SettingsProvider initialSettings={initialSettings}>
      <ChatbotProvider
        feedbacks={initialFeedbacks}
        changelog={initialChangelog}
        settings={initialSettings}
      >
        <ChangelogProvider productId={id} initialChangelog={initialChangelog}>
          <AllFeedbackProvider
            productId={id}
            filterData={filterData}
            initialFeedbacks={initialFeedbacks}
          >
            <div className="min-h-screen bg-background">
              <DashboardTemplate
                productData={productData}
                filterData={filterData}
              />
            </div>
          </AllFeedbackProvider>
        </ChangelogProvider>
      </ChatbotProvider>
    </SettingsProvider>
  );
};

export default ProductPage;
