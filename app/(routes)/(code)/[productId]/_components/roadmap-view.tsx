import { StatusType } from "../page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const statusColors = {
  planned: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "in-progress":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
} as const;

interface RoadmapItem {
  title: string;
  description: string;
  status: StatusType;
  votes: number;
}

interface RoadmapViewProps {
  productId: string;
}

export default function RoadmapView({ productId }: RoadmapViewProps) {
  // This would be replaced with real data from your backend
  const roadmapItems: RoadmapItem[] = [
    {
      title: "Implement dark mode",
      description: "Add a dark theme option for better viewing at night",
      status: "planned",
      votes: 42,
    },
    {
      title: "Mobile app development",
      description: "Create native mobile apps for iOS and Android",
      status: "in-progress",
      votes: 89,
    },
    {
      title: "API documentation",
      description: "Comprehensive API documentation with examples",
      status: "completed",
      votes: 34,
    },
  ];

  const groupedItems = roadmapItems.reduce((acc, item) => {
    if (!acc[item.status]) {
      acc[item.status] = [];
    }
    acc[item.status].push(item);
    return acc;
  }, {} as Record<StatusType, RoadmapItem[]>);

  const total = roadmapItems.length;
  const getProgress = (status: StatusType) => {
    return ((groupedItems[status]?.length || 0) / total) * 100;
  };

  const statuses: { label: string; value: StatusType }[] = [
    { label: "Planned", value: "planned" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="space-y-8">
      {statuses.map(({ label, value }) => (
        <Card key={value}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">{label}</CardTitle>
              <Badge variant="outline" className={statusColors[value]}>
                {groupedItems[value]?.length || 0}
              </Badge>
            </div>
            <Progress value={getProgress(value)} className="h-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {groupedItems[value]?.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border p-4 bg-card hover:bg-accent transition-colors"
                >
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="secondary">{item.votes} votes</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
