import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BarChartHorizontal, TrendingUp, TrendingDown } from "lucide-react";

const AnalyzeProducts = () => {
  const topProducts = [
    { name: "Product A", score: 85, trend: "up" },
    { name: "Product B", score: 72, trend: "up" },
    { name: "Product C", score: 68, trend: "down" },
    { name: "Product D", score: 64, trend: "up" },
    { name: "Product E", score: 59, trend: "down" },
  ];

  // Sample performance data for the horizontal chart
  const performanceData = [
    { metric: "Conversion Rate", value: 85, target: 90 },
    { metric: "Customer Satisfaction", value: 92, target: 90 },
    { metric: "Return Rate", value: 12, target: 15 },
    { metric: "Delivery Time", value: 95, target: 90 },
    { metric: "Cost Efficiency", value: 78, target: 85 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 pb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <BarChartHorizontal className="h-4 w-4" />
              Performance Metrics
            </h3>
            <Badge variant="outline" className="font-normal">
              Current Quarter
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {performanceData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.metric}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <div className="w-full bg-muted/40 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      item.value >= item.target ? "bg-green-500" : "bg-primary"
                    }`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
                <div className="flex justify-end text-xs text-muted-foreground">
                  Target: {item.target}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 pb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Top Performing Products</h3>
            <Badge variant="outline" className="font-normal">
              Last 30 days
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[350px]">
            <div className="divide-y">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <span className="font-medium text-sm text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Score: {product.score}/100
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`flex items-center ${
                      product.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}>
                      {product.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-xs">
                        {product.trend === "up" ? "+2.4%" : "-1.8%"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyzeProducts;