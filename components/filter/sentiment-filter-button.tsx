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
import { useEffect, useState } from "react";

export default function SentimentFilterButton() {
  const [value, setValue] = useState("All");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle value changes from dropdown selection
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    const params = new URLSearchParams(searchParams.toString());

    if (newValue.toLowerCase() === "all") {
      // Remove filter parameters when selecting "All"
      params.delete("filter");
      params.delete("sentiment");
      router.push(pathname);
    } else {
      params.set("filter", "sentiment");
      params.set("sentiment", newValue.toLowerCase());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  // Sync URL params with component state
  useEffect(() => {
    const filter = searchParams.get("filter");
    const sentiment = searchParams.get("sentiment");

    if (filter === "sentiment" && sentiment) {
      setValue(sentiment.charAt(0).toUpperCase() + sentiment.slice(1));
    } else {
      setValue("All");
    }
  }, [searchParams]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-lg">
          {value}
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background">
        <DropdownMenuRadioGroup value={value} onValueChange={handleValueChange}>
          <DropdownMenuRadioItem
            className="flex justify-between hover:bg-[#eee] transition"
            value="All"
          >
            <span>All</span>
            <span className="text-text-muted text-sm">89</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="Positive"
            className="flex justify-between hover:bg-[#eee]"
          >
            <span>Positive</span>
            <span className="text-text-muted text-sm">49</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="Neutral"
            className="flex justify-between hover:bg-[#eee]"
          >
            <span>Neutral</span>
            <span className="text-text-muted text-sm">49</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="Negative"
            className="flex justify-between hover:bg-[#eee]"
          >
            <span>Negative</span>
            <span className="text-text-muted text-sm">40</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
