"use client";

import GuidedOnboardingPopover from "@/components/onboarding/GuidedOnboardingPopover";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserButton, useUser } from "@clerk/nextjs";
import { Plus, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const WelcomeSection = () => {
  const { user, isLoaded } = useUser();
  if (!user && !isLoaded) {
    return (
      <div className="flex gap-2 justify-between flex-col">
        <Skeleton className="w-[220px] max-w-full h-[50px]" />
        <Skeleton className="w-[270px] max-w-full h-[20px]" />
      </div>
    );
  }
  if (!user) {
    return null;
  }

  if (!isLoaded) {
    return (
      // <Suspense
      //   fallback={}
      // ></Suspense>
      <div className="flex gap-2 justify-between flex-col">
        <Skeleton className="w-[250px] max-w-full h-[40px]" />
        <Skeleton className="w-[320px] max-w-full h-[70px]" />
      </div>
    );
  }

  if (!user) {
    return <div>Error: No user data found</div>;
  }

  return (
    <Suspense fallback={<Skeleton className="w-full h-[50px]" />}>
      <div className="w-full rounded-xl bg-gradient-to-r from-primary/10 to-background shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start sm:items-center justify-between">
          <div className="flex items-center w-full gap-5">
            <div className="space-y-1 w-full">
              <h1 className="tracking-tight flex gap-1 items-center text-3xl justify-between">
                Welcome back{`, ${user?.firstName}`}
              </h1>
              <p className="text-secondaryForeground text-sm">
                Here&apos;s what&apos;s happening with your products today
              </p>
            </div>
          </div>

          <div
            className={`flex md:flex-col md:items-end md:justify-between gap-4 w-full flex-1  flex-wrap md:flex-nowrap`}
          >
            <div className="rounded-full p-1 bg-background shadow-sm">
              <UserButton afterSignOutUrl="/" />
            </div>
            <div className="flex gap-3 w-full flex-wrap md:flex-nowrap">
              <Link href="/products" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link
                href="/new"
                className="w-full sm:w-auto"
                id="create-new-product-button"
              >
                <Button className="w-full sm:w-auto">
                  <Plus className="mr-1 h-2 w-2" />
                  Create Product
                </Button>
              </Link>

              {/* <GuidedOnboardingPopover stepIndex={0} waitMs={200} /> */}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default WelcomeSection;
