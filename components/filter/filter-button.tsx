"use client";

import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FilterTabsDate from "./tabs/filter-tabs-date";
import FilterTabsReach from "./tabs/filter-tabs-reach";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Calendar, ThumbsUp, MessageCircle, Smile, Tag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type FilterButtonProps = {
  isOwnerPa?: boolean;
  variant?:
    | "outline"
    | "secondary"
    | "default"
    | "destructive"
    | "ghost"
    | "link";
  label?: string;
  style?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
  };
};

type FilterTabsDateProps = {
  onSelect: (value: string) => void;
};

type FilterTabsReachProps = {
  onSelect: (value: string) => void;
  open: boolean;
  setDialogOpen: (open: boolean) => void;
};

export default function FilterButton({
  variant = "outline",
  label = "Filter",
  style,
  isOwnerPa = false,
}: FilterButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");

  const handleFilter = (type: string, value: string, name) => {
    if (value === "all") {
      // Remove all filters and return to base URL
      router.push(window.location.pathname);
    } else {
      // Set only one filter at a time
      router.push(
        `${window.location.pathname}?filter=${name}&${type}=${value}`
      );
    }
    setOpen(false);
  };

  const tabItems = [
    { id: "all", label: "All", icon: Tag },
    { id: "date", label: "Date", icon: Calendar },
    { id: "popular", label: "Popular", icon: ThumbsUp },
    { id: "sentiment", label: "Sentiment", icon: Smile },
    { id: "type", label: "Type", icon: MessageCircle },
  ];

  const ownerPaTabItems = [
    { id: "all", label: "All", icon: Tag },
    { id: "type", label: "Type", icon: MessageCircle },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className="bg-background text-foreground border-border hover:bg-secondaryBackground"
        >
          {label}
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-modal w-full max-w-md mx-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            {label || `Filter by ${currentTab}`}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full mt-4"
        >
          {/* Topic */}
          <TabsList className="grid w-full grid-cols-5 bg-background border-border mb-10">
            {(isOwnerPa ? tabItems : ownerPaTabItems).map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "flex flex-col items-center gap-2 p-2 h-fit",
                  "text-secondaryForeground",
                  "data-[state=active]:bg-primary",
                  "data-[state=active]:text-primary-foreground",
                  "hover:bg-secondaryBackground transition-colors"
                )}
              >
                <tab.icon size={16} />
                <span className="text-xs">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <ul className="space-y-2">
              <li
                role="button"
                className="hover:bg-secondaryBackground p-3 rounded-md cursor-pointer transition-colors text-foreground"
                onClick={() => handleFilter("filter", "all")}
              >
                Show all feedback
              </li>
            </ul>
          </TabsContent>

          <TabsContent value="date">
            <FilterTabsDate
              onSelect={(value) => handleFilter("date", value, `date`)}
            />
          </TabsContent>

          <TabsContent value="popular">
            <FilterTabsReach
              onSelect={(value) => handleFilter("popular", value, `likes`)}
              open={open}
              setDialogOpen={setOpen}
            />
          </TabsContent>

          <TabsContent value="sentiment">
            <ul className="space-y-2">
              {["positive", "neutral", "negative"].map((sentiment) => (
                <li
                  key={sentiment}
                  role="button"
                  className="hover:bg-secondaryBackground p-3 rounded-md cursor-pointer transition-colors text-foreground capitalize"
                  onClick={() =>
                    handleFilter("sentiment", sentiment, `sentiment`)
                  }
                >
                  {sentiment}
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="type">
            <ul className="space-y-2">
              {["feature", "idea", "issue", "other"].map((type) => (
                <li
                  key={type}
                  role="button"
                  className="hover:bg-secondaryBackground p-3 rounded-md cursor-pointer transition-colors text-foreground capitalize"
                  onClick={() => handleFilter("type", type, `type`)}
                >
                  {type}
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
