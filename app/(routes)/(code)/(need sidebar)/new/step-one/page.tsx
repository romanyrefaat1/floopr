"use client";

import { checkProductNameExists } from "@/actions/check-product-name-exists";
import LoaderSpinner from "@/components/loader-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useNewProductFormContext } from "@/contexts/multistep-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newProductFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  context: z.string().optional(),
});

type NewProductForm = z.infer<typeof newProductFormSchema>;

const Step1NewProduct = () => {
  const { productForm, updateProductForm } = useNewProductFormContext();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<NewProductForm>({
    resolver: zodResolver(newProductFormSchema),
    mode: "onChange",
    defaultValues: {
      name: productForm.name || "",
      description: productForm.description || "",
      website: productForm.website || "https://",
      context: productForm.context || "",
    },
  });

  // Watch form values for live updates
  const watchedValues = form.watch();

  // Update URL params when form values change
  useEffect(() => {
    // Only update if values have changed to avoid infinite loops
    if (
      watchedValues.name !== productForm.name ||
      watchedValues.description !== productForm.description ||
      watchedValues.website !== productForm.website ||
      watchedValues.context !== productForm.context
    ) {
      updateProductForm(
        {
          name: watchedValues.name,
          description: watchedValues.description,
          website: watchedValues.website,
          context: watchedValues.context,
        },
        true
      );
    }
  }, [
    watchedValues,
    productForm.name,
    productForm.description,
    productForm.website,
    productForm.context,
  ]);

  async function onSubmit(values: NewProductForm) {
    setLoading(true);
    const productNameExists = await checkProductNameExists(values.name);
    if (productNameExists) {
      setErrorMessage(
        "Product name already exists. Please choose a different name."
      );
      setLoading(false);
      return;
    }
    setLoading(false);

    // Ensure we're pushing to the correct path
    router.push(`/new/step-three`);
    // {currentParams.toString()}
  }

  return (
    <div className="container mx-auto w-full px-0 py-8 bg-background">
      <h1 className="mb-6">Create New Product</h1>

      {/* <Card> */}
      {/* <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent> */}
      <Form {...form} data-onboarding-target="new-product-form">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
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
                  <p className="text-destructive text-sm font-medium">
                    {errorMessage}
                  </p>
                )}
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
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe your product&apos;s features and benefits
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="website"
            control={form.control}
            render={({ field }) => (
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
            )}
          />

          <FormField
            name="context"
            control={form.control}
            render={({ field }) => (
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
                  This context helps our AI better understand your product and
                  provide more relevant responses.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading} data-onboarding-target="save-product-button">
              {loading ? <LoaderSpinner /> : `Next`}
            </Button>
          </div>
        </form>
      </Form>
      {/* </CardContent>
      </Card> */}
    </div>
  );
};

export default Step1NewProduct;
