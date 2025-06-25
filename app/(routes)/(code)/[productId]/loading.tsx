import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <Skeleton className="h-10 w-20 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg bg-primary/20" />
      </header>

      {/* Main Content */}
      <main className="section-container py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-80 mx-auto mb-4 rounded-lg" />
          <Skeleton className="h-6 w-96 mx-auto mb-8 rounded" />
          <Skeleton className="h-12 w-36 mx-auto rounded-lg bg-primary/20" />
        </div>

        {/* Content Area */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 space-y-6">
            <div className="bg-secondary-background rounded-lg p-6 border border-border">
              <Skeleton className="h-6 w-32 mb-4 rounded" />
              
              {/* Type Filter */}
              <div className="mb-6">
                <Skeleton className="h-4 w-8 mb-2 rounded" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>

              {/* Status Filter */}
              <div>
                <Skeleton className="h-4 w-12 mb-2 rounded" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-12 rounded-lg" />
                  <Skeleton className="h-8 w-16 rounded-lg bg-primary/20" />
                  <Skeleton className="h-8 w-14 rounded-lg bg-warn-background/50" />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Tab Navigation */}
            <div className="flex gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-8 w-32 rounded" />
              <Skeleton className="h-10 w-36 rounded-lg bg-primary/20" />
            </div>

            {/* Feedback Cards */}
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-secondary-background rounded-lg p-6 border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <Skeleton className="h-6 w-48 mb-2 rounded" />
                      <Skeleton className="h-4 w-full mb-2 rounded" />
                      <Skeleton className="h-4 w-3/4 rounded" />
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Skeleton className="h-6 w-8 rounded" />
                      <Skeleton className="h-4 w-4 rounded" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-24 rounded" />
                      <span className="text-muted-foreground">•</span>
                      <Skeleton className="h-4 w-20 rounded" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-16 rounded-full bg-destructive/20" />
                      <Skeleton className="h-6 w-14 rounded-full bg-primary/20" />
                      <Skeleton className="h-6 w-18 rounded-full bg-muted" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Skeleton */}
            <div className="mt-8 text-center">
              <Skeleton className="h-10 w-32 mx-auto rounded-lg" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}