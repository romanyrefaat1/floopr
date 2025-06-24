import { getChangelogItems } from "../products/[id]/_components/tabs/changelog-tab/changelog-server";
import ClientPageShell from "./_components/client-page-shell";
import ProductNavbar from "./_components/product-navbar";
import getFilteredFeedbacks from "@/actions/filter-feedback";
import getProductData from "@/actions/get-product-data";
import { ChangelogProvider } from "@/contexts/changelog-context";
import { notFound } from "next/navigation";

export default async function UsersProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const productData = await getProductData(params.productId);
  if (!productData) return notFound();

  const [initialChangelog, rawFeedbacks, initialSettings] = await Promise.all([
    getChangelogItems(params.productId),
    getFilteredFeedbacks(params.productId),
    Promise.resolve({ theme: "light", notificationsEnabled: true }), // Replace with real settings fetch
  ]);
  
  // Ensure feedbacks is always an array
  const initialFeedbacks = Array.isArray(rawFeedbacks) ? rawFeedbacks : [];

  return (
    <ChangelogProvider
      initialChangelog={initialChangelog}
      productId={params.productId}
    >
      <div className="min-h-screen bg-background">
        <div className="flex justify-center py-4">
          <div className="rounded-full bg- shadow-md py-3 bg-white/90 dark:bg-white/10 px-6 flex items-center gap-6">
            <ProductNavbar
              productId={params.productId}
              productName={productData.name}
            />
          </div>
        </div>
        <ClientPageShell
          productId={params.productId}
          productName={productData.name}
        />
      </div>
    </ChangelogProvider>
  );
}
