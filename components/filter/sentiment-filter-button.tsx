"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ArrowDownIcon } from "lucide-react";

export default function SentimentFilterButton() {
  const [value, setValue] = useState("All");
  const router = useRouter()

  useEffect(()=> {
    router.push(`?filter=sentiment&sentiment=${value.toLowerCase()}`)
  },[value])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-lg">
          {value}
          <ArrowDownIcon/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background pointer">
        <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
          <DropdownMenuRadioItem className="flex justify-between hover:bg-[#eee] transition" value="All">
            <span>All</span>
            <span className="text-text-muted text-sm">89</span>
            </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Positive" className="flex justify-between hover:bg-[#eee]">
          <span>Positive</span>
          <span className="text-text-muted text-sm ">49</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Negative" className="flex justify-between hover:bg-[#eee]">
          <span>Negative</span>
          <span className="text-text-muted text-sm ">40</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
