import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import React from "react";

interface Props {
  params: { userId: string };
}

async function getUserProducts(userId: string) {
  const productsCol = collection(db, "products");
  const q = query(productsCol, where("ownerId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export default async function UserProductsPage({ params }: Props) {
  const { userId } = params;
  const products = await getUserProducts(userId);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products for User: {userId}</h1>
      {products.length === 0 ? (
        <p>No products found for this user.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between border p-2 rounded"
            >
              <span>{product.name || product.id}</span>
              <Link
                href={`/admin/${userId}/products/${product.id}/feedback`}
                className="ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                View Feedback
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
