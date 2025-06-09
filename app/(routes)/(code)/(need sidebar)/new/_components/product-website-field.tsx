import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ProductWebsiteField = ({ field }) => (
  <FormItem>
    <div className="flex items-center gap-2">
      <FormLabel>Website Link</FormLabel>
    </div>
    <FormControl>
      <Input placeholder="https://yourwebsite.com" {...field} />
    </FormControl>
    <FormDescription>
      Add a link to your product's website (if available)
    </FormDescription>
    <FormMessage />
  </FormItem>
);

export default ProductWebsiteField;
