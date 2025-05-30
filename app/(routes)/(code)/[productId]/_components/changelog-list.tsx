"use client";

import { Button } from "@/components/ui/button";
import { ChangelogItem, ChangelogListProps } from "@/types/changelog";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function ChangelogList({ items }: ChangelogListProps) {
  const getBadgeColor = (type: "improvement" | "bugfix" | "feature") => {
    switch (type) {
      case "improvement":
        return "bg-blue-500/10 text-blue-500";
      case "bugfix":
        return "bg-red-500/10 text-red-500";
      case "feature":
        return "bg-green-500/10 text-green-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

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
    <div className="max-w-5xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute left-4 h-full w-px bg-border" />
        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={item.version} className="relative pl-8">
              <div className="absolute left-0 w-8 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-mono bg-muted px-2.5 py-0.5 rounded-full">
                    v{item.version}
                  </span>
                  <time className="text-sm text-muted-foreground">
                    {formatDistance(item.date, new Date(), { addSuffix: true })}
                  </time>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-muted-foreground mb-4">
                    {item.description}
                  </p>
                )}
                <div className="space-y-3">
                  {item.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="flex items-start gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(
                          change.type
                        )}`}
                      >
                        {change.type}
                      </span>
                      <span className="text-sm">{change.content}</span>
                    </div>
                  ))}
                </div>
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
                {item.feedbackLink && (
                  <div className="mt-4">
                    <Button variant="outline" asChild>
                      <Link href={item.feedbackLink}>
                        {item.feedbackTitle || "View feedback discussion"}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
