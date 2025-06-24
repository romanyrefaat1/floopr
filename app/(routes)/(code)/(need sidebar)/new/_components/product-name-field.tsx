import { Input } from "@/components/ui/input";

interface ProductNameFieldProps {
  field: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  errorMessage?: string | null;
}

const ProductNameField = ({ field, errorMessage }: ProductNameFieldProps) => (
  <div className="space-y-2">
    <label htmlFor="product-name" className="text-sm font-medium">
      Product Name
    </label>
    <Input
      id="product-name"
      placeholder="Enter product name"
      value={field.value}
      onChange={field.onChange}
    />
    <p className="text-sm text-muted-foreground">
      Give your product a clear, descriptive name
    </p>
    {errorMessage && (
      <p className="text-destructive text-sm font-medium">{errorMessage}</p>
    )}
  </div>
);

export default ProductNameField;
