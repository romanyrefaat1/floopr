"use client";

import ChangelogAddButton from "./changelog-add-button";
import ChangelogList from "./changelog-list";
import { useChangelog } from "@/contexts/changelog-context";

export default function ChangelogTab({ productId }: { productId: string }) {
  const { changelog, loading } = useChangelog();
  console.log(`my cool changelog from useChangelog:`, changelog);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Changelog</h2>
        <ChangelogAddButton productId={productId} />
      </div>
      <ChangelogList
        items={changelog || []}
        productId={productId}
        loading={loading}
      />
    </div>
  );
}
