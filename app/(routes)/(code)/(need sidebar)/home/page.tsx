import AnalyticsOverview from "./_components/analytics-overview";
import AnalyzeProducts from "./_components/analyze-products";
import LatestProducts from "./_components/latest-products";
import QuickStats from "./_components/quick-stats";
import WelcomeSection from "./_components/welcome-section";
import SyncUser from "./sync-user";
import LoaderSpinner from "@/components/loader-spinner";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Suspense } from "react";

const Home = async () => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    redirectToSignIn();
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-6 md:py-4 space-y-8">
      <SyncUser />
      <WelcomeSection />
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
              <LatestProducts numOfCols={1} userId={userId} />
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
