import ClientPageShell from "./_components/client-page-shell";
import ProductNavbar from "./_components/product-navbar";
import getProductData from "@/actions/get-product-data";
import { notFound } from "next/navigation";

export default async function UsersProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const productData = await getProductData(params.productId);
  if (!productData) return notFound();

  return (
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
  );
}
