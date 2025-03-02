"use client";

import { getLatestProducts } from "@/actions/getLatestProducts";
import FeedbackItem from "@/components/feedback-item";
import LatestProductItem from "@/components/latest-product-item";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";

const LatestProducts = () => {
  const { userId } = useAuth();
  console.log(userId)
  const [latestProducts, setLatestProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsData = async () => {
      if (!userId) return;
      try {
        const data = await getLatestProducts(userId);
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
          <LatestProductItem
          key={product.docId}
            {...product}
          />
        ))
        // <p>{latestProducts.length}</p>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default LatestProducts;
