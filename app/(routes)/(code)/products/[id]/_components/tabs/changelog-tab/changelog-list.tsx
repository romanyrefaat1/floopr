import { ChangelogItem } from "@/types/changelog";
import Image from "next/image";
import Link from "next/link";

export default function ChangelogList({ items, productId }: { items: ChangelogItem[]; productId: string }) {
  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-muted-foreground">No changelog entries yet</p>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {items.map((item) => (
        <div key={item.version} className="relative pl-8">
          <div className="absolute left-0 w-8 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <div className="p-6 bg-card rounded-lg shadow-sm border">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-mono bg-muted px-2.5 py-0.5 rounded-full">v{item.version}</span>
              <time className="text-sm text-muted-foreground">
                {item.date instanceof Date ? item.date.toLocaleDateString() : item.date}
              </time>
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            {item.description && <p className="text-muted-foreground mb-4">{item.description}</p>}
            <div className="space-y-3">
              {item.changes.map((change, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    change.type === "feature"
                      ? "bg-green-500/10 text-green-500"
                      : change.type === "improvement"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-red-500/10 text-red-500"
                  }`}>
                    {change.type}
                  </span>
                  <span className="text-sm">{change.content}</span>
                </div>
              ))}
            </div>
            {item.feedbackRef && productId && (
              <div className="mt-2 text-xs">
                <Link href={`/${productId}/${item.feedbackRef.feedbackId}`} className="text-primary underline hover:opacity-80">
                  See feedback: {item.feedbackRef.name}
                </Link>
              </div>
            )}
            {item.imageUrl && (
              <div className="mt-4 relative rounded-lg overflow-hidden">
                <Image src={item.imageUrl} alt={`Preview for ${item.title}`} width={800} height={400} className="object-cover" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
