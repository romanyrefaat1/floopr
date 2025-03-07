import { auth } from "@clerk/nextjs/server";
import AnalyzeProducts from "./_components/analyze-products";
import LatestProducts from "./_components/latest-products";
import { redirect } from "next/navigation";
import SyncUser from "./sync-user";
import { Suspense } from "react";
import LoaderSpinner from "@/components/loader-spinner";

const Home = async () => {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  
  return (
    <div className="w-full">
      <SyncUser />
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Top Feedback</h2>
        {/* <TopFeedback /> */}
        <Suspense fallback={<div className="flex justify-center items-center"><LoaderSpinner /></div>}>
          <LatestProducts userId={userId} />
        </Suspense>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Analyze Products</h2>
        {/* <AnalyzeProducts /> */}
      </div>
    </div>
  );
};

export default Home;
