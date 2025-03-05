"use client";

import { getLatestProducts } from "@/actions/getLatestProducts";
import LatestProductItem, { LatestProductItemProps } from "@/components/latest-product-item";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";

// Use the existing LatestProductItemProps interface
type ProductItem = Omit<LatestProductItemProps, 'docId'> & {
  id: string;
};

const LatestProducts = () => {
  const { userId } = useAuth();
  console.log(userId)
  const [latestProducts, setLatestProducts] = useState<ProductItem[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsData = async () => {
      if (!userId) return;
      try {
        const data = await getLatestProducts(userId);
        console.log(`useffect data`, data)
        // Type assertion here since we've ensured the data has the correct shape in getLatestProducts
        setLatestProducts(data);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [userId]);

  return (
    <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 w-full gap-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : latestProducts.length > 0 ? (
        latestProducts.map((product) => (
          <>
          <LatestProductItem
            key={product.id}
            docId={product.id}
            {...product}
          />
           {/* <p>{latestProducts.length}</p> */}
          </>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default LatestProducts;
