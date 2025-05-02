import { getLatestProducts } from "@/actions/getLatestProducts";
import LatestProductItem, {
  LatestProductItemProps,
} from "@/components/latest-product-item";
import { Card, CardContent } from "@/components/ui/card";
import { PackageIcon } from "lucide-react";

// Use the existing LatestProductItemProps interface
type ProductItem = Omit<LatestProductItemProps, "docId"> & {
  id: string;
};

const LatestProducts = async ({
  userId,
  numOfCols: myNumOfCols = 2,
}: {
  userId: string;
  numOfCols: number;
}) => {
  const latestProducts = await getLatestProducts(userId);
  const numOfProducts = latestProducts.length;
  const numOfCols = numOfProducts > 1 ? (myNumOfCols > 1 ? myNumOfCols : 1) : 1;

  return (
    <div
      className={`grid grid-cols-[${numOfCols}] sm:grid-cols-${
        numOfCols > 1 ? numOfCols : numOfCols
      } gap-4`}
    >
      {latestProducts.length > 0 ? (
        latestProducts.map((product) => (
          <LatestProductItem key={product.id} docId={product.id} {...product} />
        ))
      ) : (
        <Card
          className={`col-span-1 sm:col-span-2 border border-dashed bg-muted/50`}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 h-64">
            <div className="rounded-full bg-background p-3 mb-4">
              <PackageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No products yet</h3>
            <p className="text-sm text-muted-foreground text-center">
              Create your first product to get started
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LatestProducts;
