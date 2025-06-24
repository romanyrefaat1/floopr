import { Textarea } from "@/components/ui/textarea";

interface ProductContextFieldProps {
  field: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
}

const ProductContextField = ({ field }: ProductContextFieldProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <label htmlFor="product-context" className="text-sm font-medium">
        Product Context
      </label>
      <span className="text-xs text-muted-foreground">
        (optional, for our AI to work better)
      </span>
    </div>
    <Textarea
      id="product-context"
      placeholder="Add any extra context about your product to help our AI give better results"
      className="min-h-[80px]"
      value={field.value}
      onChange={field.onChange}
    />
    <p className="text-sm text-muted-foreground">
      This context helps our AI better understand your product and provide more
      relevant responses.
    </p>
  </div>
);

export default ProductContextField;
