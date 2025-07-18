import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type StatusType = "planned" | "in-progress" | "completed" | "archived";

const statusTypes = [
  {
    value: "done",
    label: "Done",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    value: "in progress",
    label: "In Progress",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  {
    value: "done",
    label: "Completed",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  // {
  //   value: "archived",
  //   label: "Archived",
  //   color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  // },
] as const;

interface StatusFilterProps {
  value: StatusType | null;
  onChange: (value: StatusType | null) => void;
}

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <ScrollArea>
      <div className="flex space-x-2 p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(null)}
          className={cn("min-w-[80px] whitespace-nowrap", !value && "bg-muted")}
        >
          All
        </Button>
        <div className="flex gap-0">
          {statusTypes.map((type, index) => (
            <Button
              key={type.value+index}
              variant="ghost"
              size="sm"
              onClick={() => onChange(type.value)}
              className={cn(
                "min-w-[80px] whitespace-nowrap",
                value === type.value && "bg-muted"
              )}
            >
              <Badge variant="outline" className={cn("", type.color)}>
                {type.label}
              </Badge>
            </Button>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
