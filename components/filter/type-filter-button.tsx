"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import * as React from "react";

export type FeedbackType = "issue" | "idea" | "feature" | "other";

const FEEDBACK_TYPES: { label: string; value: FeedbackType }[] = [
  { label: "Issue", value: "issue" },
  { label: "Idea", value: "idea" },
  { label: "Feature", value: "feature" },
  { label: "Other", value: "other" },
];

export default function TypeFilterButton({
  productId,
}: {
  productId: string;
}) {
  const [value, setValue] = React.useState<FeedbackType | "All">("All");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle value changes from dropdown selection
  const handleValueChange = (newValue: string) => {
    setValue(newValue as FeedbackType | "All");
    const params = new URLSearchParams(searchParams.toString());

    if (newValue === "All") {
      params.delete("filter");
      params.delete("type");
      router.push(pathname);
    } else {
      params.set("filter", "type");
      params.set("type", newValue);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  // Sync URL params with component state
  React.useEffect(() => {
    const filter = searchParams.get("filter");
    const type = searchParams.get("type");
    if (filter === "type" && type) {
      setValue(type as FeedbackType);
    } else {
      setValue("All");
    }
  }, [searchParams]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-lg">
          {value === "All"
            ? "All Types"
            : FEEDBACK_TYPES.find((t) => t.value === value)?.label || value}
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background">
        <DropdownMenuRadioGroup value={value} onValueChange={handleValueChange}>
          <DropdownMenuRadioItem value="All" className="flex justify-between transition">
            <span>All Types</span>
          </DropdownMenuRadioItem>
          {FEEDBACK_TYPES.map((type) => (
            <DropdownMenuRadioItem
              key={type.value}
              value={type.value}
              className="flex justify-between"
            >
              <span>{type.label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
