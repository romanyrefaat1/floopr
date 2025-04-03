"use client";

import getSentimentPercent from "@/actions/basic-analytics/sentiment-percent";
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

export default function SentimentFilterButton({
  productId,
}: {
  productId: string;
}) {
  const [value, setValue] = useState("All");
  const [positiveCount, setPositiveCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
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

    async function fetchSentimentCounts() {
      const { positive, negative, neutral } = await getSentimentPercent(
        productId
      );
      setPositiveCount(positive);
      setNegativeCount(negative);
      setNeutralCount(neutral);
    }
    fetchSentimentCounts();
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
            className="flex justify-between transition"
            value="All"
          >
            <span>All</span>
            <span className="text-text-muted text-sm">
              {positiveCount + negativeCount + neutralCount}
            </span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="Positive"
            className="flex justify-between"
          >
            <span>Positive</span>
            <span className="text-text-muted text-sm">{positiveCount}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="Neutral"
            className="flex justify-between"
          >
            <span>Neutral</span>
            <span className="text-text-muted text-sm">{neutralCount}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="Negative"
            className="flex justify-between"
          >
            <span>Negative</span>
            <span className="text-text-muted text-sm">{negativeCount}</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
