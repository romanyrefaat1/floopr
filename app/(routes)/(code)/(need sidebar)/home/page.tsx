import AnalyzeProducts from "./_components/analyze-products";
import LatestProducts from "./_components/latest-products";

const Home = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Top Feedback</h2>
        {/* <TopFeedback /> */}
        <LatestProducts />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Analyze Products</h2>
        <AnalyzeProducts />
      </div>
    </div>
  );
};

export default Home;
