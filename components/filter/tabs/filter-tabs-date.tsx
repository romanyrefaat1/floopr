"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterTabsDate(){
    const router = useRouter()
    const [date, setDate] = useState<Date | undefined>(new Date())

    

    const handleQuickCLick = (filter: string) => {
        console.log(`filter: ${filter}`);
        router.push(`?filter=date&quick=${filter}`);
    }

    const handleSpecialDateClick = ()=> {
        console.log(`will route te te new filterin route`)
        router.push(`?filter=date&date=${date}`)
    }

    return (
        <div className="w-full">
           <div className="w-full">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant={`outline`}>
                            Filter By Range
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    {/* <DropdownMenuLabel>Filter By Date</DropdownMenuLabel> */}
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuRadioGroup>
                    <DropdownMenuRadioItem value="24 hours" onClick={()=>handleQuickCLick(`24-hours`)}>24 hours</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="7 days" onClick={()=>handleQuickCLick(`7-days`)}>7 days</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="30 days" onClick={()=>handleQuickCLick(`30-days`)}>30 days</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
           </div>
           <div className="w-full">
            <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md w-full pointer border"
  />
            <Button onClick={handleSpecialDateClick} variant={`outline`}>Apply</Button>
            </div>
        </div>
    )
}