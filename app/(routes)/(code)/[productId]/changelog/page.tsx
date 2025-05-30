import ChangelogList from "../_components/changelog-list";
import ProductNavbar from "../_components/product-navbar";
import { getChangelog } from "@/actions/changelog/get-changelog";
import getProductData from "@/actions/get-product-data";
import { notFound } from "next/navigation";

export default async function ChangelogPage({
  params,
}: {
  params: { productId: string };
}) {
  const productData = await getProductData(params.productId);
  if (!productData) {
    return notFound();
  }

  const changelogItems = await getChangelog(params.productId);

  return (
    <main className="bg-background min-h-screen px-4 md:px-4 lg:px-20">
      <ProductNavbar
        productId={params.productId}
        productName={productData.name}
      />
      <div className="max-w-5xl mx-auto">
        <div className="flex items-baseline justify-between border-b pb-6 mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-muted">
            What&apos;s New
          </h1>
          <p className="text-muted-foreground">
            Latest updates and improvements
          </p>
        </div>
        <ChangelogList items={changelogItems} />
      </div>
    </main>
  );
}
