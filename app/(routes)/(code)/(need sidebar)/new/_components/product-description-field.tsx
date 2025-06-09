import { Textarea } from "@/components/ui/textarea";

interface ProductDescriptionFieldProps {
  field: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
}

const ProductDescriptionField = ({ field }: ProductDescriptionFieldProps) => (
  <div className="space-y-2">
    <label htmlFor="product-description" className="text-sm font-medium">
      Product Description
    </label>
    <Textarea
      id="product-description"
      placeholder="Enter product description"
      className="min-h-[120px]"
      value={field.value}
      onChange={field.onChange}
    />
    <p className="text-sm text-muted-foreground">
      Describe your product's features and benefits
    </p>
  </div>
);

export default ProductDescriptionField;
