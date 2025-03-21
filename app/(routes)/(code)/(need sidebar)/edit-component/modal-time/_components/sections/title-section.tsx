import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const TitleSection = ({ 
    title, 
    onChange 
  }: { 
    title: string; 
    onChange: (value: string) => void 
  }) => (
    <div className="border rounded-lg p-4 mt-4">
      <h3 className="text-lg font-medium mb-2">Modal Title</h3>
      <Label>Title Text</Label>
      <Input 
        value={title}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1"
      />
    </div>
  );
  