import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Loading() {
  return (
    <main className="max-w-screen flex relative">
      <div className="absolute left-[2rem] top-[2rem] md:top-[9rem] md:left-[5rem] transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(125,101,246,0.6)_0%,rgba(125,101,246,0.2)_2%,transparent_100%)] blur-3xl z-[1] pointer-events-none" />

      <div className="px-4 py-[3rem] w-full z-2">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="md:hidden mb-2">
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
          <div className="w-full max-w-2xl">
            <div className="mb-4">
              <Skeleton className="h-10 w-full max-w-xs" />
            </div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-5 w-96 max-w-full" />
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-6">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-2 pb-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-md" />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Main Content Skeleton */}
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>

          {/* Main Content Area */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Skeleton className="h-96 w-full rounded-xl" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-80 w-full rounded-xl" />
            <Skeleton className="h-80 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
