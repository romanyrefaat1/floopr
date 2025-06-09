"use client";

import ProductContextField from "./product-context-field";
import ProductDescriptionField from "./product-description-field";
import ProductNameField from "./product-name-field";
import ProductWebsiteField from "./product-website-field";
import { checkProductNameExists } from "@/actions/check-product-name-exists";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useNewProductFormContext } from "@/contexts/multistep-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newProductFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  context: z.string().optional(),
});

type NewProductForm = z.infer<typeof newProductFormSchema>;

const NewProductFormClient = () => {
  const { productForm, updateProductForm } = useNewProductFormContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

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

  const watchedValues = form.watch();

  useEffect(() => {
    const hasChanged =
      watchedValues.name !== productForm.name ||
      watchedValues.description !== productForm.description ||
      watchedValues.website !== productForm.website ||
      watchedValues.context !== productForm.context;

    if (hasChanged) {
      updateProductForm({
        name: watchedValues.name,
        description: watchedValues.description,
        website: watchedValues.website,
        context: watchedValues.context,
      });
    }
  }, [
    watchedValues,
    productForm.name,
    productForm.description,
    productForm.website,
    productForm.context,
    updateProductForm,
  ]);

  const steps = [
    {
      name: "name",
      title: "What's your product's name?",
      description: "This will be the name of your project on Floopr.",
      render: (form: any, errorMessage?: string | null) => (
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <ProductNameField field={field} errorMessage={errorMessage} />
          )}
        />
      ),
    },
    {
      name: "description",
      title: "Describe your product",
      description: "A brief description of what your product does.",
      render: (form: any) => (
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => <ProductDescriptionField field={field} />}
        />
      ),
    },
    {
      name: "website",
      title: "Product's Website",
      description: "The official website or a relevant link for your product.",
      render: (form: any) => (
        <FormField
          name="website"
          control={form.control}
          render={({ field }) => <ProductWebsiteField field={field} />}
        />
      ),
    },
    {
      name: "context",
      title: "Provide some context",
      description:
        "Give Floopr some context on what you are building, so it can provide you with better feedback.",
      render: (form: any) => (
        <FormField
          name="context"
          control={form.control}
          render={({ field }) => <ProductContextField field={field} />}
        />
      ),
    },
  ];

  async function onSubmit(values: NewProductForm) {
    setLoading(true);
    setErrorMessage(null);

    const productNameExists = await checkProductNameExists(values.name);
    if (productNameExists) {
      setErrorMessage(
        "Product name already exists. Please choose a different name."
      );
      setStep(0); // Go back to the name field if it exists
      setLoading(false);
      return;
    }

    // ---- Add your product creation logic here ----
    console.log("Form submitted successfully:", values);
    // ---------------------------------------------

    setLoading(false);
  }

  function nextStep() {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  }

  function prevStep() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  const progressPercent = ((step + 1) / steps.length) * 100;
  const currentStep = steps[step];

  return (
    <div className="container mx-auto w-full max-w-xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-background rounded-2xl shadow-lg border border-border overflow-hidden">
        {/* Progress Indicator */}
        <div className="w-full px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">
              Step {step + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full px-6 pb-6 flex flex-col items-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text- mb-2">
              {currentStep.title}
            </h2>
            <p className="text-muted-foreground">{currentStep.description}</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
              autoComplete="off"
            >
              {currentStep.render(form, errorMessage)}

              <div className="flex w-full justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 0}
                >
                  Back
                </Button>
                {step < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!form.watch("name")}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Product"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewProductFormClient;
