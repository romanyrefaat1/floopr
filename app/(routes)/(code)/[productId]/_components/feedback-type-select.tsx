import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Bug,
  CheckIcon,
  ChevronDownIcon,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export type FeedbackType = "feature" | "idea" | "issue" | "other";

const feedbackTypes = [
  {
    value: "",
    label: "All Feedback",
    icon: ChevronDownIcon, // Using ChevronDownIcon for "All Feedback"
  },
  {
    value: "feature",
    label: "Feature Request",
    icon: Sparkles,
  },
  {
    value: "idea",
    label: "Idea",
    icon: Lightbulb,
  },
  {
    value: "issue",
    label: "Issue",
    icon: Bug,
  },
  {
    value: "other",
    label: "Other",
    icon: ChevronDownIcon,
  },
] as const;

interface FeedbackTypeSelectProps {
  value: FeedbackType;
  onChange: (value: FeedbackType) => void;
}

export default function FeedbackTypeSelect({
  value,
  onChange,
}: FeedbackTypeSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? feedbackTypes.find((type) => type.value === value)?.label
            : "Select type..."}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandGroup>
            {feedbackTypes.map((type) => (
              <CommandItem
                key={type.value}
                value={type.value}
                onSelect={() => {
                  onChange(type.value as FeedbackType);
                  setOpen(false);
                }}
              >
                <type.icon className="mr-2 h-4 w-4" />
                {type.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === type.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
