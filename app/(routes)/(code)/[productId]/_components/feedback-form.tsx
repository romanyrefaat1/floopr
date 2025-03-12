"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductData } from "../page";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import "./feedback-form.css";
import { useProductStyle } from "@/contexts/product-style-context";

const formSchema = z.object({
  mainTitle: z.string().min(3).max(100),
  titleLabel: z.string().min(3).max(100),
  descriptionLabel: z.string().min(3).max(1000),
  titlePlaceholder: z.string().min(3).max(1000),
  descriptionPlaceholder: z.string().min(3).max(1000),
  submitButtonLabel: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
  type: z.string().min(1).max(100),
  types: z.array(z.string().min(1).max(100)),
  defaultType: z.string().min(1).max(100),
  isRange: z.boolean(),
})

export default function FeedbackForm({productData}: {productData: ProductData}) {
  const productStyle = useProductStyle(); // Access the style context
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainTitle: productData.mainTitle || `Give us feedback`,
      titleLabel: productData.titleLabel || `Short, descriptive title`,
      descriptionLabel: productData.descriptionLabel || `Tell us more`,
      titlePlaceholder: productData.titlePlaceholder || `Enter title`,
      descriptionPlaceholder: productData.descriptionPlaceholder || `Enter description`,
      submitButtonLabel: productData.submitButtonLabel || `Add Feedback`,
      description: "",
      type: productData.defaultType || "",
      types: productData.types || [`bug`, `feature`, `other`],
      defaultType: productData.defaultType || "",
      isRange: productData.isRange || false,
    },
  });

  const metadata = {
    mainTitle: productData.mainTitle || `Give us feedback`,
    titleLabel: productData.titleLabel || `Short, descriptive title`,
    descriptionLabel: productData.descriptionLabel || `Tell us more`,
    titlePlaceholder: productData.titlePlaceholder || `Enter title`,
    descriptionPlaceholder: productData.descriptionPlaceholder || `Enter description`,
    submitButtonLabel: productData.submitButtonLabel || `Add Feedback`,
    typesLabel: productData.typesLabel || `Type`,
    types: productData.types || [`bug`, `feature`, `other`],
    defaultType: productData.defaultType || "",
    isRange: productData.isRange || false,
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
    
  return (
    <div className="feedback-form-container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="feedback-form">
          <h1 className="feedback-form-title">{metadata.mainTitle}</h1>
          
          <FormField
            control={form.control}
            name="mainTitle"
            render={({ field }) => (
              <FormItem className="feedback-form-item">
                <FormLabel className="feedback-form-label">{metadata.titleLabel}</FormLabel>
                <FormControl>
                  <Input className="feedback-form-input" placeholder={metadata.titlePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="feedback-form-item">
                <FormLabel className="feedback-form-label">{metadata.descriptionLabel}</FormLabel>
                <FormControl>
                  <Textarea className="feedback-form-textarea" placeholder={metadata.descriptionPlaceholder} {...field} />
                </FormControl>    
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="feedback-form-item">
                <FormLabel className="feedback-form-label">{metadata.typesLabel}</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="feedback-form-select">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="feedback-form-select-content">
                    {metadata.types.map((type) => (
                      <SelectItem key={type} value={type} className="feedback-form-select-item">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="feedback-form-submit-button">
            {metadata.submitButtonLabel}
          </Button>
        </form>
      </Form>
    </div>
  )
}