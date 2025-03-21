import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const TimeoutSection = ({ 
    timeoutDuration, 
    onChange 
  }: { 
    timeoutDuration: number; 
    onChange: (value: number) => void 
  }) => (
    <div>
      <Label>How many seconds should it take for this modal to appear?</Label>
      <Input 
        type="number"
        value={timeoutDuration}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        min={0}
        className="mt-2"
      />
      <p className="text-sm text-gray-500 mt-1">
        Set to 0 for immediate display, or enter seconds for delayed appearance
      </p>
    </div>
  );