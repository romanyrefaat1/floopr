"use client";

import { Button } from "../ui/button";
import { Calendar, ThumbsUp, MessageCircle, Smile, Tag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FilterTabsDate from "./tabs/filter-tabs-date";
import FilterTabsReach from "./tabs/filter-tabs-reach";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FilterButtonProps = {
    variant?: "outline" | "secondary" | "default" | "destructive" | "ghost" | "link";
    label?: string;
    style?: {
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
    };
}

export default function FilterButton({
  variant="outline", 
  label="Filter",
  style
}: FilterButtonProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState('all');
    const searchParams = useSearchParams();

    const handleFilter = (type: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all') {
            params.delete(type);
        } else {
            params.set(type, value);
        }
        router.push(`?${params.toString()}`);
        setOpen(false);
    };

    const tabItems = [
        { id: 'all', label: 'All', icon: Tag },
        { id: 'date', label: 'Date', icon: Calendar },
        { id: 'popular', label: 'Popular', icon: ThumbsUp },
        { id: 'sentiment', label: 'Sentiment', icon: Smile },
        { id: 'topic', label: 'Topic', icon: MessageCircle },
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant={variant}
                    style={{
                        backgroundColor: style?.backgroundColor,
                        color: style?.textColor,
                        borderColor: style?.accentColor
                    }}
                >
                    {label}
                </Button>
            </DialogTrigger> 

            <DialogContent 
                className="rounded-lg w-full max-w-md mx-auto"
                style={{
                    backgroundColor: style?.backgroundColor,
                    color: style?.textColor,
                }}
            >
                <DialogHeader>
                    <DialogTitle 
                        className="text-xl font-semibold"
                        style={{ color: style?.textColor }}
                    >
                        {label || `Filter by ${currentTab}`}
                    </DialogTitle>
                </DialogHeader>

                <Tabs 
                    value={currentTab} 
                    onValueChange={setCurrentTab}
                    className="w-full mt-4"
                >
                    <TabsList className="grid w-full grid-cols-5">
                        {tabItems.map((tab) => (
                            <TabsTrigger 
                                key={tab.id}
                                value={tab.id}
                                className={cn(
                                    "flex flex-col items-center gap-1 p-2",
                                    "data-[state=active]:text-primary"
                                )}
                                style={{
                                    "--tab-accent": style?.accentColor
                                } as React.CSSProperties}
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
                                className="hover:bg-accent/10 p-3 rounded-md cursor-pointer transition-colors"
                                onClick={() => handleFilter('filter', 'all')}
                            >
                                Show all feedback
                            </li>
                        </ul>
                    </TabsContent>

                    <TabsContent value="date">
                        <FilterTabsDate onSelect={(value) => handleFilter('date', value)} />
                    </TabsContent>

                    <TabsContent value="popular">
                        <FilterTabsReach onSelect={(value) => handleFilter('popular', value)} />
                    </TabsContent>

                    <TabsContent value="sentiment">
                        <ul className="space-y-2">
                            {['positive', 'neutral', 'negative'].map((sentiment) => (
                                <li
                                    key={sentiment}
                                    role="button"
                                    className="hover:bg-accent/10 p-3 rounded-md cursor-pointer transition-colors capitalize"
                                    onClick={() => handleFilter('sentiment', sentiment)}
                                >
                                    {sentiment}
                                </li>
                            ))}
                        </ul>
                    </TabsContent>

                    <TabsContent value="topic">
                        <ul className="space-y-2">
                            {['feature', 'bug', 'improvement', 'other'].map((topic) => (
                                <li
                                    key={topic}
                                    role="button"
                                    className="hover:bg-accent/10 p-3 rounded-md cursor-pointer transition-colors capitalize"
                                    onClick={() => handleFilter('topic', topic)}
                                >
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}