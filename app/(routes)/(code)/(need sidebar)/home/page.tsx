"use client"
import useAuth from "@/hooks/use-auth";
import AnalyzeProducts from "./_components/analyze-products";
import TopFeedback from "./_components/top-feedback";

const Home = () => {
  const user = useAuth()
  console.log(`user`, user)
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Top Feedback</h2>
        <TopFeedback />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Analyze Products</h2>
        <AnalyzeProducts />
      </div>
    </div>
  );
};

export default Home;
