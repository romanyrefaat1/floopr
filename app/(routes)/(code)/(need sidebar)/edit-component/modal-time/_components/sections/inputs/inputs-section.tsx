import { InputField } from "@/components/floopr-integration/modal-timout/modal-context";
import { Button } from "@/components/ui/button";
import { InputItem } from "./input-item";

export const InputsSection = ({ 
    inputs, 
    onInputChange, 
    onAddInput, 
    onRemoveInput 
  }: { 
    inputs: InputField[]; 
    onInputChange: (index: number, field: string, value: string) => void;
    onAddInput: () => void;
    onRemoveInput: (index: number) => void;
  }) => (
    <div className="border rounded-lg p-4 mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Input Fields</h3>
        <Button variant="outline" size="sm" onClick={onAddInput}>
          Add Input
        </Button>
      </div>
      {inputs.map((input, index) => (
        <InputItem 
          key={index}
          input={input}
          onChange={(field, value) => onInputChange(index, field, value)}
          onRemove={() => onRemoveInput(index)}
          disableRemove={inputs.length <= 1}
        />
      ))}
    </div>
  );