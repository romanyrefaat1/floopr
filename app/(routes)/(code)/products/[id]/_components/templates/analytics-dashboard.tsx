import { BarChart, LineChart, PieChart } from "lucide-react";
import { Product } from "../../page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { LineChart, BarChart, PieChart } from "@/components/ui/chart";
import {LineLinearChart} from "./analytics/line-linear-chart";

export default function AnalyticsDashboard({
  productData,
}: {
  productData: Product;
}) {
  // Sample data for charts
  const lineChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        data: [5, 10, 30, 40, 45, 30, 60],
        borderColor: "#7c64f6",
        backgroundColor: "rgba(124, 100, 246, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const feedbackByType = {
    labels: ["Feature", "Bug", "Improvement", "Question"],
    datasets: [
      {
        data: [30, 20, 35, 15],
        backgroundColor: [
          "rgba(124, 100, 246, 0.8)",
          "rgba(124, 100, 246, 0.6)",
          "rgba(124, 100, 246, 0.4)",
          "rgba(124, 100, 246, 0.2)",
        ],
      },
    ],
  };

  const sentimentData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ["#4ade80", "#94a3b8", "#f87171"],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Feedback Analytics</h2>
        <p className="text-muted-foreground mb-6">
          Track and analyze feedback trends for {productData.name}
        </p>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feedback Over Time</CardTitle>
            <CardDescription>Daily feedback submissions</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <LineChart data={lineChartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback by Type</CardTitle>
            <CardDescription>
              Distribution of feedback categories
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <PieChart data={feedbackByType} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
            <CardDescription>Feedback sentiment distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <PieChart data={sentimentData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Feedback Topics</CardTitle>
            <CardDescription>Most mentioned topics in feedback</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <BarChart
              data={{
                labels: [
                  "UI/UX",
                  "Performance",
                  "Features",
                  "Pricing",
                  "Support",
                ],
                datasets: [
                  {
                    data: [45, 38, 32, 25, 20],
                    backgroundColor: "rgba(124, 100, 246, 0.6)",
                  },
                ],
              }}
            />
          </CardContent>
        </Card>
      </div> */}
      <LineLinearChart productId={productData.docId}/>
    </div>
  );
}
