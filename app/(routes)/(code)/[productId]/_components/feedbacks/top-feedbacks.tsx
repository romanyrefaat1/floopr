import ButtonAddFeedback from "@/components/button-add-feedback";
import FilterButton from "@/components/filter/filter-button";
import SentimentFilterButton from "@/components/filter/sentiment-filter-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TopFeedbacks() {
  return (
    <div className="flex justify-between items-center">
      <ButtonAddFeedback />
      <div className="flex gap-2">
        <SentimentFilterButton />
          <Input type="search" placeholder="Search" className="rounded-md" />
            <FilterButton />
        </div>
    </div>
  );
}
