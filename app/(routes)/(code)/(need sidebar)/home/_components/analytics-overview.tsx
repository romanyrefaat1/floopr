"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AnalyticsOverview = ({ userId }: { userId: string }) => {
  const [data] = useState([
    { name: "Mon", views: 400, feedback: 240 },
    { name: "Tue", views: 300, feedback: 139 },
    { name: "Wed", views: 200, feedback: 980 },
    { name: "Thu", views: 278, feedback: 390 },
    { name: "Fri", views: 189, feedback: 480 },
    { name: "Sat", views: 239, feedback: 380 },
    { name: "Sun", views: 349, feedback: 430 },
  ]);

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 rounded-md border shadow-sm">
          <p className="font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span>{entry.name}: {entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 border shadow-sm h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={4}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
          />
          <Bar 
            dataKey="views" 
            name="Views"
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
          <Bar 
            dataKey="feedback" 
            name="Feedback"
            fill="rgba(130, 202, 157, 0.8)" 
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default AnalyticsOverview;