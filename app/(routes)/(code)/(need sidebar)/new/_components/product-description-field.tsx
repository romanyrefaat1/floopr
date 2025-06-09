import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const ProductDescriptionField = ({ field }) => (
  <FormItem>
    <div className="flex items-center gap-2">
      <FormLabel>Product Description</FormLabel>
    </div>
    <FormControl>
      <Textarea
        placeholder="Enter product description"
        className="min-h-[120px]"
        {...field}
      />
    </FormControl>
    <FormDescription>
      Describe your product's features and benefits
    </FormDescription>
    <FormMessage />
  </FormItem>
);

export default ProductDescriptionField;
