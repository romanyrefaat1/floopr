import { getLatestProducts } from "@/actions/getLatestProducts";
import LatestProductItem, { LatestProductItemProps } from "@/components/latest-product-item";

// Use the existing LatestProductItemProps interface
type ProductItem = Omit<LatestProductItemProps, 'docId'> & {
  id: string;
};

const LatestProducts =  async({userId}: {userId: string}) => {
  const latestProducts = await getLatestProducts(userId);

  return (
    <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 w-full gap-4">
      {latestProducts.length > 0 ? (
        latestProducts.map((product) => (
          <LatestProductItem
            key={product.id}
            docId={product.id}
            {...product}
          />
        ))
      ) : (
        <div className="flex justify-center items-center">
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};

export default LatestProducts;
