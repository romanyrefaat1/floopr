"use client";

import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubdomainProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function lookupProduct() {
      try {
        // Get the subdomain from search params (set by middleware)
        const subdomain = searchParams.get("subdomain");
        

        if (!subdomain) {
          setError("Product name not found: No subdomain parameter found");
          setLoading(false);
          return;
        }

        // Query Firestore directly for the product
        
        const queryRef = query(
          collection(db, "products"),
          where("productUName", "==", subdomain)
        );

        const querySnapshot = await getDocs(queryRef);
        

        if (querySnapshot.empty) {
          
          setError(`Product not found: No product with name "${subdomain}"`);
          setLoading(false);
          return;
        }

        // Get the first document
        const productDoc = querySnapshot.docs[0];
        const productId = productDoc.id;

        

        // Navigate to the user's product page
        if (productId) {
          
          router.replace(`/${productId}`);
        } else {
          setError("Product not found: Product document has no ID");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error looking up product:", err);
        setError(`An error occurred: ${err.message}`);
        setLoading(false);
      }
    }

    lookupProduct();
  }, [router, searchParams]);

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
        <div className="mt-4 text-sm text-gray-500">
          Subdomain parameter: {searchParams.get("subdomain") || "Not found"}
        </div>
      </div>
    );
  }

  return null;
}
