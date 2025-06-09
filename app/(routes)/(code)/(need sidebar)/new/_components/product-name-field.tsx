import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ProductNameField = ({ field, errorMessage }) => (
  <FormItem>
    <FormLabel>Product Name</FormLabel>
    <FormControl>
      <Input placeholder="Enter product name" {...field} />
    </FormControl>
    <FormDescription>
      Give your product a clear, descriptive name
    </FormDescription>
    <FormMessage />
    {errorMessage && (
      <p className="text-destructive text-sm font-medium">{errorMessage}</p>
    )}
  </FormItem>
);

export default ProductNameField;
