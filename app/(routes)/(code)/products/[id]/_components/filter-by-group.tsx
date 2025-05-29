"use client";

import { FeedbackItemInDB } from "../../../[productId]/_components/feedback-list";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { collection, getDocs } from "firebase/firestore";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

interface Group {
  id: string;
  title: string;
  description: string;
  feedback: Array<string>;
  feedbackData: Array<FeedbackItemInDB>;

  [key: string]: any; // Optional additional metadata
}

export function FilterbyGroup({ productId }: { productId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [metadata, setMetadata] = React.useState<Record<string, Group>>({});

  const selectedGroup = searchParams.get("group") || "";

  React.useEffect(() => {
    const fetchGroups = async () => {
      const snapshot = await getDocs(
        collection(db, `products/${productId}/feedback-groups`)
      );
      const groupList: Group[] = [];
      const metadataMap: Record<string, Group> = {};

      snapshot.forEach((doc) => {
        const data = doc.data() as Group;
        const group = { id: doc.id, ...data };
        groupList.push(group);
        metadataMap[doc.id] = group;
      });

      setGroups(groupList);
      setMetadata(metadataMap);
    };

    fetchGroups();
  }, [productId]);

  const handleSelect = (groupId: string) => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    if (groupId === selectedGroup) {
      newParams.delete("group");
      newParams.delete("filter");
    } else {
      newParams.set("filter", "group");
      newParams.set("group", groupId);
    }
    router.push(`?${newParams.toString()}`);
    setOpen(false);
  };

  const showAllGroups = () => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.delete("group");
    newParams.delete("filter");
    router.push(`?${newParams.toString()}`);
    setOpen(false); // Close popover
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedGroup
            ? metadata[selectedGroup]?.title || "Unknown Group"
            : "Filter by group"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search group..." />
          <CommandList>
            <CommandEmpty>No group found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key={"all"}
                value={"all"}
                onSelect={() => showAllGroups()}
              >
                All Groups
                <Check
                  className={cn(
                    "ml-auto",
                    selectedGroup === "all" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              <Separator />
              {groups.map((group) => (
                <CommandItem
                  key={group.id}
                  value={group.id}
                  onSelect={() => handleSelect(group.id)}
                >
                  {group.title}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedGroup === group.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
