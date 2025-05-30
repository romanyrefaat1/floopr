"use client";

import ChangelogList from "../../products/[id]/_components/tabs/changelog-tab/changelog-list";
import { useEffect, useState } from "react";

export default function ChangelogListContainer({
  productId,
}: {
  productId: string;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    import(
      "../../products/[id]/_components/tabs/changelog-tab/changelog-server"
    ).then((mod) => {
      mod
        .getChangelogItems(productId)
        .then((data) => {
          if (mounted) {
            setItems(data);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (mounted) {
            setError("Failed to load changelog.");
            setLoading(false);
          }
        });
    });
    return () => {
      mounted = false;
    };
  }, [productId]);

  if (loading || error) {
    return <ChangelogList items={[]} productId={productId} loading={loading} />;
  }
  return <ChangelogList items={items} productId={productId} />;
}
