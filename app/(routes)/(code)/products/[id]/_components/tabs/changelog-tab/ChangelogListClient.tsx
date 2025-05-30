"use client";

import ChangelogItemMenu from "./ChangelogItemMenu";
import { ChangelogItem } from "@/types/changelog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UndoToast from "@/components/undo-toast";
import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, getDocs, query, orderBy, setDoc } from "firebase/firestore";

function ChangelogSkeleton() {
  return (
    <div className="relative pl-8 animate-pulse">
      <div className="absolute left-0 w-8 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-muted" />
      </div>
      <div className="p-6 bg-card rounded-lg shadow-sm border">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-5 w-16 bg-muted rounded-full inline-block" />
          <span className="h-4 w-24 bg-muted rounded-full inline-block" />
        </div>
        <div className="h-6 w-1/3 bg-muted rounded mb-2" />
        <div className="h-4 w-2/3 bg-muted rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-muted rounded" />
          <div className="h-4 w-1/3 bg-muted rounded" />
        </div>
        <div className="mt-4 h-32 w-full bg-muted rounded-lg" />
      </div>
    </div>
  );
}

export default function ChangelogListClient({
  items,
  productId,
  loading = false,
}: {
  items: ChangelogItem[];
  productId: string;
  loading?: boolean;
}) {
  const [undoOpen, setUndoOpen] = useState(false);
  const [undoItems, setUndoItems] = useState<ChangelogItem[]>([]);
  const [undoType, setUndoType] = useState<"fallback" | null>(null);
  const [loadingIdx, setLoadingIdx] = useState<number | null>(null);

  // Delete only the selected item
  const handleDelete = async (idx: number) => {
    setLoadingIdx(idx);
    const item = items[idx];
    const updatesRef = collection(db, "products", productId, "updates");
    const q = query(updatesRef, orderBy("version"));
    const snapshot = await getDocs(q);
    const docId = snapshot.docs.find((d) => d.data().version === item.version)?.id;
    if (docId) {
      await deleteDoc(doc(updatesRef, docId));
    }
    setLoadingIdx(null);
    // Optionally: trigger a refresh or re-fetch
  };

  // Fallback: delete all items after idx (not including idx)
  const handleFallback = async (idx: number) => {
    setLoadingIdx(idx);
    const updatesRef = collection(db, "products", productId, "updates");
    const q = query(updatesRef, orderBy("version"));
    const snapshot = await getDocs(q);
    // Type: ChangelogItem & { _id: string }
    const allItems = snapshot.docs.map((d) => ({ ...(d.data() as ChangelogItem), _id: d.id }));
    const fallbackVersion = items[idx].version;
    // Find all items after idx (greater version)
    const toDelete = allItems.filter((it) => parseFloat(it.version as any) > parseFloat(fallbackVersion as any));
    // Save for undo (strip _id for Firestore setDoc)
    setUndoItems(toDelete.map(({ _id, ...rest }) => rest));
    setUndoType("fallback");
    setUndoOpen(true);
    // Delete them
    await Promise.all(toDelete.map((it) => deleteDoc(doc(updatesRef, it._id))));
    setLoadingIdx(null);
    // Optionally: trigger a refresh or re-fetch
  };

  // Undo fallback: restore deleted items
  const handleUndo = async () => {
    if (undoType === "fallback" && undoItems.length) {
      const updatesRef = collection(db, "products", productId, "updates");
      // Add with auto-generated IDs
      await Promise.all(
        undoItems.map((it) => setDoc(doc(updatesRef), it))
      );
    }
    setUndoOpen(false);
    setUndoItems([]);
    setUndoType(null);
    // Optionally: trigger a refresh or re-fetch
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {[...Array(3)].map((_, i) => (
          <ChangelogSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-muted-foreground">
          No changelog entries yet
        </p>
      </div>
    );
  }
  return (
    <>
      <UndoToast
        open={undoOpen}
        title="Changelog fallback applied"
        description="All changelog items after the selected version were removed. You can undo this action for 10 seconds."
        onUndo={handleUndo}
        onClose={() => setUndoOpen(false)}
        undoLabel="Undo Fallback"
      />
      <div className="space-y-8">
        {items.map((item, idx) => (
          <div key={item.version} className="relative pl-8">
            <div className="absolute left-0 w-8 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm border relative">
              {/* Dropdown menu top right */}
              <div className="absolute top-4 right-4 z-10">
                <ChangelogItemMenu
                  idx={idx}
                  onDelete={handleDelete}
                  onFallback={handleFallback}
                  loading={loadingIdx === idx}
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-mono bg-muted px-2.5 py-0.5 rounded-full">
                  v{item.version}
                </span>
                <time className="text-sm text-muted-foreground">
                  {item.date instanceof Date
                    ? item.date.toLocaleDateString()
                    : item.date}
                </time>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-muted-foreground mb-4">{item.description}</p>
              )}
              <div className="space-y-3">
                {item.changes.map((change, idx2) => (
                  <div key={idx2} className="flex items-start gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        change.type === "feature"
                          ? "bg-green-500/10 text-green-500"
                          : change.type === "improvement"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {change.type}
                    </span>
                    <span className="text-sm">{change.content}</span>
                  </div>
                ))}
              </div>
              {item.feedbackRef && productId && (
                <div className="mt-2 text-xs">
                  <Link
                    href={`/${productId}/${item.feedbackRef.feedbackId}`}
                    className="text-primary underline hover:opacity-80"
                  >
                    See feedback: {item.feedbackRef.name}
                  </Link>
                </div>
              )}
              {item.imageUrl && (
                <div className="mt-4 relative rounded-lg overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={`Preview for ${item.title}`}
                    width={800}
                    height={400}
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
