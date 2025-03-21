import { Button } from "@/components/ui/button";
import { RatingItem } from "./rating-item";

export const RatingsSection = ({ 
    ratings, 
    onRatingChange, 
    onAddRating, 
    onRemoveRating 
  }: { 
    ratings: Rating[]; 
    onRatingChange: (index: number, field: string, value: string | number) => void;
    onAddRating: () => void;
    onRemoveRating: (index: number) => void;
  }) => (
    <div className="border rounded-lg p-4 mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Rating Options</h3>
        <Button variant="outline" size="sm" onClick={onAddRating}>
          Add Rating
        </Button>
      </div>
      {ratings.map((rating, index) => (
        <RatingItem
          key={index}
          rating={rating}
          onChange={(field, value) => onRatingChange(index, field, value)}
          onRemove={() => onRemoveRating(index)}
          disableRemove={ratings.length <= 1}
        />
      ))}
    </div>
  );
  