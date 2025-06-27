import LatestProducts from "./_components/latest-products";
import QuickStats from "./_components/quick-stats";
import WelcomeSection from "./_components/welcome-section";
import SyncUser from "./sync-user";
import LoaderSpinner from "@/components/loader-spinner";
import Onboarding from "@/components/onboarding/onboarding";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Suspense } from "react";
import TestGetEmbedding from "./_components/test-deduplication/test-get-embedding"
import TestSaveIntoSupabase from "./_components/test-deduplication/test-save-into-supabase"
const Home = async () => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    redirectToSignIn();
  }

  return (
    <div className="w-full max-w-7xl mx-auto ml-4 md:ml-0 px-2 sm:px-4 py-6 md:py-4 space-y-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <Onboarding />
      <SyncUser />
      <TestGetEmbedding />
      <TestSaveIntoSupabase />
      <Suspense
        fallback={
          <div className="flex gap-2 justify-between flex-col">
            <Skeleton className="w-[250px] max-w-full h-[40px]" />
            <Skeleton className="w-[320px] max-w-full h-[70px]" />
          </div>
        }
      >
        <WelcomeSection />
      </Suspense>
      <div className="">
        <div className="mt-8">
          <QuickStats userId={userId} />
        </div>

        <div className="grid mt-[25px] grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">
                Recent Products
              </h2>
              <Link
                href={`/products`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                View all
              </Link>
            </div>
            <Suspense fallback={<LoaderSpinner className="min-h-[300px]" />}>
              <LatestProducts numOfCols={1} userId={userId} maxProducts={4} />
            </Suspense>
          </div>

          {/* <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Analytics Overview</h2>
            <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              View details
            </span>
          </div>
          <Suspense fallback={<LoaderSpinner className="min-h-[300px]" />}>
            <AnalyticsOverview userId={userId} />
          </Suspense>
        </div> */}
        </div>

        {/* <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Product Analysis</h2>
          <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            View report
          </span>
        </div>
        <AnalyzeProducts />
      </div> */}
      </div>
    </div>
  );
};

export default Home;
