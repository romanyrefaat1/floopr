"use client";

import { useView, VIEW_MODES } from "../view-context/view-context";
import { FilterbyGroup } from "./filter-by-group";
import FilterButton from "@/components/filter/filter-button";
import SentimentFilterButton from "@/components/filter/sentiment-filter-button";
import TypeFilterButton from "@/components/filter/type-filter-button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function TopFeedbackButtons({
  isOwnerPa,
  productId,
}: {
  isOwnerPa: boolean;
  productId: string;
}) {
  const { mode } = useView();
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search feedback..." className="pl-8 w-full" />
      </div>
      <div className="flex gap-2 items-center justify-between">
        {mode === VIEW_MODES.NORMAL ? (
          <div className="flex gap-2 items-center">
            <TypeFilterButton productId={productId} />
            <SentimentFilterButton productId={productId} />
          </div>
        ) : (
          <FilterbyGroup productId={productId} />
          // <div>filter by group</div>
        )}
        <FilterButton isOwnerPa={isOwnerPa} label="Filter" />
      </div>
    </div>
  );
}
