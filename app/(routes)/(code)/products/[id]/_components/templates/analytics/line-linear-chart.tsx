"use client";

import getFeedbacks from "@/actions/get-feedbacks";
import LoaderSpinner from "@/components/loader-spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

// Update the TimeRange type to include "24hours"
type TimeRange = "24hours" | "1week" | "1month" | "1year";

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: "24hours", label: "Last 24 Hours" },
  { value: "1week", label: "1 Week" },
  { value: "1month", label: "1 Month" },
  { value: "1year", label: "1 Year" },
];

const chartConfig = {
  desktop: {
    label: "Feedbacks",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

// Helper function to convert any type of date to a Date object
function normalizeDate(dateInput: any): Date | null {
  try {
    // Handle Firebase Timestamp
    if (dateInput && typeof dateInput.toDate === "function") {
      return dateInput.toDate();
    }
    // Handle string dates
    else if (typeof dateInput === "string") {
      return new Date(dateInput);
    }
    // Handle Date objects
    else if (dateInput instanceof Date) {
      return dateInput;
    }
    // Handle numbers (timestamps)
    else if (typeof dateInput === "number") {
      return new Date(dateInput);
    }
    return null;
  } catch (error) {
    console.error("Error normalizing date:", error);
    return null;
  }
}

// Generate complete timeline with all time points (even zeros)
function generateTimelinePoints(
  startDate: Date,
  endDate: Date,
  timeRange: TimeRange
) {
  const timeline = [];
  const current = new Date(startDate);

  let increment;
  let formatOptions;

  if (timeRange === "24hours") {
    increment = 60 * 60 * 1000; // 1 hour in ms
    formatOptions = { hour: "numeric" };
  } else if (timeRange === "1week") {
    increment = 24 * 60 * 60 * 1000; // 1 day in ms
    formatOptions = { weekday: "short" };
  } else if (timeRange === "1month") {
    increment = 24 * 60 * 60 * 1000; // 1 day in ms
    formatOptions = { month: "short", day: "numeric" };
  } else {
    increment = 30 * 24 * 60 * 60 * 1000; // ~1 month in ms
    formatOptions = { month: "short" };
  }

  // Create complete timeline with all points
  while (current <= endDate) {
    timeline.push({
      date: new Date(current),
      label: current.toLocaleDateString("en-US", formatOptions),
      desktop: 0,
      timestamp: current.getTime(),
    });

    current.setTime(current.getTime() + increment);
  }

  return timeline;
}

export function LineLinearChart({ productId }: { productId: string }) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1month");
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndProcessFeedbacks() {
      try {
        setLoading(true);
        const now = new Date();
        let startDate = new Date();

        // Set the appropriate start date based on the time range
        if (timeRange === "24hours") {
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          startDate.setMinutes(0, 0, 0);
          now.setMinutes(59, 59, 999);
        } else if (timeRange === "1week") {
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          startDate.setHours(0, 0, 0, 0);
          now.setHours(23, 59, 59, 999);
        } else if (timeRange === "1month") {
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          startDate.setHours(0, 0, 0, 0);
          now.setHours(23, 59, 59, 999);
        } else {
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          startDate.setHours(0, 0, 0, 0);
          now.setHours(23, 59, 59, 999);
        }

        // Generate the complete timeline
        const timelinePoints = generateTimelinePoints(
          startDate,
          now,
          timeRange
        );

        // Get the feedbacks
        const feedbacks = await getFeedbacks(productId);
        

        // Process the feedbacks and add to the timeline
        feedbacks.forEach((feedback) => {
          const feedbackDate = normalizeDate(feedback.createdAt);
          if (!feedbackDate) return;

          let timeKey;
          if (timeRange === "24hours") {
            // For hourly view, round to the hour
            const hourDate = new Date(feedbackDate);
            hourDate.setMinutes(0, 0, 0);
            timeKey = hourDate.getTime();
          } else if (timeRange === "1week" || timeRange === "1month") {
            // For daily view, round to the day
            const dayDate = new Date(feedbackDate);
            dayDate.setHours(0, 0, 0, 0);
            timeKey = dayDate.getTime();
          } else {
            // For yearly view, round to the month
            const monthDate = new Date(feedbackDate);
            monthDate.setDate(1);
            monthDate.setHours(0, 0, 0, 0);
            timeKey = monthDate.getTime();
          }

          // Find the matching point in the timeline
          const matchingPoint = timelinePoints.find((point) => {
            if (timeRange === "1year") {
              // For yearly view, match by month and year
              const pointDate = new Date(point.timestamp);
              const feedbackMonthYear = new Date(timeKey);
              return (
                pointDate.getMonth() === feedbackMonthYear.getMonth() &&
                pointDate.getFullYear() === feedbackMonthYear.getFullYear()
              );
            }
            return point.timestamp === timeKey;
          });

          if (matchingPoint) {
            matchingPoint.desktop += 1;
          }
        });

        
        setChartData(timelinePoints);
      } catch (error) {
        console.error("Error processing feedback data:", error);
        // Set empty chart data to avoid UI errors
        setChartData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAndProcessFeedbacks();
  }, [productId, timeRange]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Feedback Over Time</CardTitle>
          <CardDescription>
            {timeRange === "24hours"
              ? "Last 24 Hours"
              : timeRange === "1week"
              ? "Last Week"
              : timeRange === "1month"
              ? "Last Month"
              : "Last Year"}
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="mt-2 md:mt-0">
            <Button variant="outline" className="w-full justify-start">
              {timeRangeOptions.find((opt) => opt.value === timeRange)?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {timeRangeOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onSelect={() => setTimeRange(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px]">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <LoaderSpinner />
            </div>
          ) : chartData.length > 0 ? (
            <LineChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
              width={4}
              height={2}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                // Show fewer ticks for better readability
                interval={
                  timeRange === "1year"
                    ? 1
                    : timeRange === "1month"
                    ? 3
                    : "preserveEnd"
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="desktop"
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          ) : (
            <div className="flex h-64 items-center justify-center">
              <p>No data available for the selected time period</p>
            </div>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
          Feedback trend over{" "}
          {timeRange === "24hours"
            ? "hours"
            : timeRange === "1year"
            ? "months"
            : "days"}
        </div>
        <div className="leading-none text-muted-foreground">
          Shows complete{" "}
          {timeRange === "24hours"
            ? "24-hour"
            : timeRange === "1week"
            ? "7-day"
            : timeRange === "1month"
            ? "30-day"
            : "12-month"}{" "}
          timeline with all{" "}
          {timeRange === "24hours"
            ? "hours"
            : timeRange === "1year"
            ? "months"
            : "days"}{" "}
          displayed
        </div>
      </CardFooter>
    </Card>
  );
}
