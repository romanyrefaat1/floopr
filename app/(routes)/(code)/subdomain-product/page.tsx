"use client";

import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubdomainProductPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function lookupProduct() {
      try {
        // In App Router, we need to get the subdomain from metadata
        // added by our layout component
        const subdomain = document.querySelector(
          'meta[name="x-product-subdomain"]'
        )?.content;

        if (!subdomain) {
          setError("Product name not found");
          setLoading(false);
          return;
        }

        // Call our API to look up the product ID
        const queryRef = query(
          collection(db, "products"),
          where("productUName", "==", subdomain)
        );
        const querySnapshot = await getDocs(queryRef);
        let productId = null;

        if (querySnapshot.empty) {
          setError("Product not found");
          setLoading(false);
          return;
        }

        productId = querySnapshot[0].docId;

        // Navigate to the product page while preserving the subdomain URL in the browser
        if (productId) {
          router.replace(`/products/${productId}`);
        } else {
          setError("Product not found");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error looking up product:", err);
        setError("An error occurred");
        setLoading(false);
      }
    }

    lookupProduct();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p>{error}</p>
      </div>
    );
  }

  return null;
}
