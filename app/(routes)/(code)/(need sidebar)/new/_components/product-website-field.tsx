import { Input } from "@/components/ui/input";

interface ProductWebsiteFieldProps {
  field: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  errorMessage?: string | null;
}

const ProductWebsiteField = ({
  field,
  errorMessage,
}: ProductWebsiteFieldProps) => (
  <div className="space-y-2">
    <label htmlFor="product-website" className="text-sm font-medium">
      Website Link
    </label>
    <Input
      id="product-website"
      placeholder="https://yourwebsite.com"
      value={field.value}
      onChange={field.onChange}
    />
    <p className="text-sm text-muted-foreground">
      Add a link to your product's website (if available)
    </p>
    {errorMessage && (
      <p className="text-destructive text-sm font-medium">{errorMessage}</p>
    )}
  </div>
);

export default ProductWebsiteField;
