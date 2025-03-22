import ButtonAddFeedback from "@/components/button-add-feedback";
import FilterButton from "@/components/filter/filter-button";
import SentimentFilterButton from "@/components/filter/sentiment-filter-button";
import { Input } from "@/components/ui/input";

export default function TopFeedbacks() {
  return (
    <>
      {/* Small screens */}
      <div className="md:hidden flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <ButtonAddFeedback />
          <div className="flex gap-2">
            <SentimentFilterButton />
            <FilterButton />
          </div>
        </div>
        <div>
          <Input 
            type="search" 
            placeholder="Search" 
            className="rounded-md w-full" 
          />
        </div>
      </div>

      {/* Medium screens and up */}
      <div className="hidden md:flex justify-between items-center">
        <ButtonAddFeedback />
        <div className="flex gap-2 items-center">
          <SentimentFilterButton />
          <Input 
            type="search" 
            placeholder="Search" 
            className="rounded-md" 
          />
          <FilterButton />
        </div>
      </div>
    </>
  );
}