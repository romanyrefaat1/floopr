"use client";

import React, { useEffect, useState } from "react";
import { useNewProductFormContext } from "@/contexts/multistep-form-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { checkProductNameExists } from "@/actions/check-product-name-exists";
import LoaderSpinner from "@/components/loader-spinner";

const newProductFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
});

type NewProductForm = z.infer<typeof newProductFormSchema>;

const Step1NewProduct = () => {
  const { productForm, updateProductForm } = useNewProductFormContext();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false)

  const form = useForm<NewProductForm>({
    resolver: zodResolver(newProductFormSchema),
    mode: "onChange",
    defaultValues: {
      name: productForm.name || "",
      description: productForm.description || "",
    },
  });

  // Watch form values for live updates
  const watchedValues = form.watch();

  // Update URL params when form values change
  useEffect(() => {
    // Only update if values have changed to avoid infinite loops
    if (watchedValues.name !== productForm.name || 
        watchedValues.description !== productForm.description) {
      updateProductForm({
        name: watchedValues.name,
        description: watchedValues.description
      });
    }
  }, [watchedValues, updateProductForm, productForm.name, productForm.description]);

 async function onSubmit(values: NewProductForm) {    
  setLoading(true);
  const productNameExists = await checkProductNameExists(values.name)
    if (productNameExists) {
        setErrorMessage("Product name already exists. Please choose a different name.");
        setLoading(false)
        return;
    }
    setLoading(false)
    
    // Ensure we're pushing to the correct path
    router.push(`/new/step-two?`);
    // {currentParams.toString()}
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter product name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Give your product a clear, descriptive name
                    </FormDescription>
                    <FormMessage />
                    {errorMessage && <FormMessage className={"text-destructive transition"}>{errorMessage}</FormMessage>}
                  </FormItem>
                )}
              />
              
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel>Product Description</FormLabel>
                      <span className="text-xs text-muted-foreground">(optional)</span>
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
                )}
              />
              
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={loading}>{loading ? <LoaderSpinner /> : `Next`}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step1NewProduct;