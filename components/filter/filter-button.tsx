"use client";

import { Button } from "../ui/button";
import { Calendar, ThumbsUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FilterTabsDate from "./tabs/filter-tabs-date";
import FilterTabsReach from "./tabs/filter-tabs-reach";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type FilterButtonProps = {
    variant?: "outline" | "secondary" | "default" | "destructive" | "ghost" | "link";
    label: string;
}

export default function FilterButton({variant="outline", label="Filter"}: FilterButtonProps){
    const router = useRouter();
    const [open, setOpen] = useState(false);
    // const searchParams = useSearchParams();
    console.log(`all`)
    const handleFilter = (filter: string) => {
        setOpen(false)
        router.push(`?filter=${``}`);
    };
return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant}>{label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>
            Filter by Dates and likes.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="all" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="popular">Popular</TabsTrigger>
    <TabsTrigger value="date">Date</TabsTrigger>
  </TabsList>
  <TabsContent value="all" className="space-y-2 rounded">
  <ul>
    <li role="button" className="hover:bg-gray-100 p-2 rounded cursor-pointer flex items-center gap-4" onClick={() => handleFilter(`all`)}>All</li>
    <li role="button" className="hover:bg-gray-100 p-2 rounded cursor-pointer flex items-center gap-4">
        <Calendar size={14} /> Date
        </li>
    <li role="button" className="hover:bg-gray-100 p-2 rounded cursor-pointer flex items-center gap-4"><ThumbsUp size={14} /> Likes</li>
  </ul>
  </TabsContent>
  <TabsContent value="date" className="space-y-2 rounded"><FilterTabsDate /></TabsContent>
  <TabsContent value="popular" className="space-y-2 rounded">
    <FilterTabsReach open={open} setDialogOpen={setOpen} />
  </TabsContent>
</Tabs>

        
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
)}