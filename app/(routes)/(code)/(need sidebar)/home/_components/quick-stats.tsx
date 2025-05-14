"use client";

import { getClientPageViews } from "@/actions/basic-analytics/client-specific/getClientPageViews";
import getProductFeedbacksCommentsCount from "@/actions/basic-analytics/comments-count";
import getFeedbackCount from "@/actions/basic-analytics/feedback-count";
import getProductFeedbacksLikesCount from "@/actions/basic-analytics/likes-count";
import { getLatestProducts } from "@/actions/getLatestProducts";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, MessageSquare, ThumbsUp, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface StatItem {
  title: string;
  value: string;
  change?: string;
  trend?: "positive" | "negative";
  icon: React.ElementType;
}

const QuickStats = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    totalViews: 0,
    totalFeedback: 0,
    totalLikes: 0,
    engagementRate: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Get latest products for the user using client-side Firebase SDK
        const latestProducts = await getLatestProducts(userId, 4);

        // Variables to accumulate data
        let views = 0;
        let feedback = 0;
        let likes = 0;
        let comments = 0;

        // Get analytics for each product and accumulate the data
        for (const product of latestProducts) {
          const productId = product.id;

          if (productId) {
            views += (await getClientPageViews(productId)) || 0;
            feedback += (await getFeedbackCount(productId)) || 0;
            likes += (await getProductFeedbacksLikesCount(productId)) || 0;
            comments +=
              (await getProductFeedbacksCommentsCount(productId)) || 0;
          }
        }

        // Calculate engagement rate (likes + comments) / views * 100
        const engagement =
          views > 0 ? (((likes + comments) / views) * 100).toFixed(1) : 0;

        setAnalyticsData({
          totalViews: views,
          totalFeedback: feedback,
          totalLikes: likes,
          engagementRate: parseFloat(engagement.toString()),
        });
        console.log(`analyticsData`, {
          totalViews: views,
          totalFeedback: feedback,
          totalLikes: likes,
          engagementRate: parseFloat(engagement.toString()),
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Format numbers with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  const stats: StatItem[] = [
    {
      title: "Total Views",
      value: isLoading ? "..." : formatNumber(analyticsData.totalViews),
      icon: Eye,
    },
    {
      title: "Feedback",
      value: isLoading ? "..." : formatNumber(analyticsData.totalFeedback),
      icon: MessageSquare,
    },
    {
      title: "Likes",
      value: isLoading ? "..." : formatNumber(analyticsData.totalLikes),
      icon: ThumbsUp,
    },
    {
      title: "Engagement Rate",
      value: isLoading ? "..." : `${analyticsData.engagementRate}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="overflow-hidden border bg-mutedBackground hover:bg-muted/70 transition-colors"
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex flex-col gap-1">
                  {isLoading ? (
                    <Skeleton className="h-8 w-14 bg-background" />
                  ) : (
                    <h3 className="text-2xl font-bold tracking-tight">
                      {stat.value}
                    </h3>
                  )}
                  {stat.change && (
                    <p
                      className={`text-xs ${
                        stat.trend === "positive"
                          ? "text-green-500"
                          : "text-red-500"
                      } flex items-center`}
                    >
                      {stat.change} from last month
                    </p>
                  )}
                </div>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
