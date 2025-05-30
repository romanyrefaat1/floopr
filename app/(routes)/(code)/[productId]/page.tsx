import getProductData from "@/actions/get-product-data";
import ProductNavbar from "./_components/product-navbar";
import ClientPageShell from "./_components/client-page-shell";
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
        <div className="rounded-full bg-card shadow-md px-8 py-3 flex items-center gap-6">
          <ProductNavbar productId={params.productId} productName={productData.name} />
        </div>
      </div>
      <ClientPageShell productId={params.productId} productName={productData.name} />
    </div>
  );
}
