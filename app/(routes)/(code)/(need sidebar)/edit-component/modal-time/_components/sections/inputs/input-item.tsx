import { InputField } from "@/components/floopr-integration/modal-timout/modal-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export const InputItem = ({ 
    input, 
    onChange, 
    onRemove, 
    disableRemove 
  }: { 
    input: InputField; 
    onChange: (field: string, value: string) => void;
    onRemove: () => void;
    disableRemove: boolean;
  }) => (
    <div className="flex items-center gap-2 mb-2 border-b pb-2">
      <div className="w-full">
        <Label>Label</Label>
        <Input 
          value={input.label}
          onChange={(e) => onChange('label', e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="w-full">
        <Label>Placeholder</Label>
        <Input 
          value={input.placeholder}
          onChange={(e) => onChange('placeholder', e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="w-1/5 flex items-end justify-end h-full">
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