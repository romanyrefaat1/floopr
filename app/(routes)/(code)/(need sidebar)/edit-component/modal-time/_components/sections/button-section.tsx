import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ButtonSection = ({ 
    buttonText, 
    onChange 
  }: { 
    buttonText: string; 
    onChange: (value: string) => void 
  }) => (
    <div className="border rounded-lg p-4 mt-4">
      <h3 className="text-lg font-medium mb-2">Submit Button</h3>
      <Label>Button Text</Label>
      <Input
        value={buttonText}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1"
      />
    </div>
  );
  