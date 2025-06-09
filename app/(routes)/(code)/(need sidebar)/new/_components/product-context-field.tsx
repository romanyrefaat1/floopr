import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const ProductContextField = ({ field }) => (
  <FormItem>
    <div className="flex items-center gap-2">
      <FormLabel>Product Context</FormLabel>
      <span className="text-xs text-muted-foreground">
        (optional, for our AI to work better)
      </span>
    </div>
    <FormControl>
      <Textarea
        placeholder="Add any extra context about your product to help our AI give better results"
        className="min-h-[80px]"
        {...field}
      />
    </FormControl>
    <FormDescription>
      This context helps our AI better understand your product and provide more
      relevant responses.
    </FormDescription>
    <FormMessage />
  </FormItem>
);

export default ProductContextField;
