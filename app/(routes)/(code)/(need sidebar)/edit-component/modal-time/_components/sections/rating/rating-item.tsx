import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export const RatingItem = ({ 
    rating, 
    onChange, 
    onRemove, 
    disableRemove 
  }: { 
    rating: Rating; 
    onChange: (field: string, value: string | number) => void;
    onRemove: () => void;
    disableRemove: boolean;
  }) => (
    <div className="flex items-center gap-2 mb-2 border-b pb-2">
      <div className="w-1/3">
        <Label>Emoji</Label>
        <Input 
          value={rating.emoji}
          onChange={(e) => onChange('emoji', e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="w-1/3">
        <Label>Label</Label>
        <Input 
          value={rating.label}
          onChange={(e) => onChange('label', e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="w-1/6">
        <Label>Value</Label>
        <Input 
          type="number"
          value={rating.value}
          onChange={(e) => onChange('value', e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="w-1/6 flex items-end justify-end h-full">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onRemove}
          disabled={disableRemove}
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
  