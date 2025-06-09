"use client";

import ProductContextField from "./product-context-field";
import ProductDescriptionField from "./product-description-field";
import ProductNameField from "./product-name-field";
import ProductWebsiteField from "./product-website-field";
import { checkProductNameExists } from "@/actions/check-product-name-exists";
import createNewProduct from "@/actions/createNewProduct";
import { Button } from "@/components/ui/button";
import { useNewProductFormContext } from "@/contexts/multistep-form-context";
import { useAuth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

type FormData = {
  name: string;
  description: string;
  website: string;
  context: string;
};

const NewProductFormClient = () => {
  const { productForm, updateProductForm } = useNewProductFormContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const { userId } = useAuth();

  // Simple form state
  const [formData, setFormData] = useState<FormData>({
    name: productForm.name || "",
    description: productForm.description || "",
    website: productForm.website || "",
    context: productForm.context || "",
  });

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validate URL
  const isValidUrl = (url: string): boolean => {
    if (!url || url === "") return true; // Empty is valid (optional)
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage("Product name is required");
      return false;
    }
    if (formData.website && !isValidUrl(formData.website)) {
      setErrorMessage("Please enter a valid URL");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const steps = [
    {
      name: "name",
      title: "What's your product's name?",
      description: "This will be the name of your project on Floopr.",
      render: () => (
        <ProductNameField
          field={{
            value: formData.name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("name", e.target.value),
          }}
          errorMessage={step === 0 ? errorMessage : null}
        />
      ),
    },
    {
      name: "description",
      title: "Describe your product",
      description: "A brief description of what your product does.",
      render: () => (
        <ProductDescriptionField
          field={{
            value: formData.description,
            onChange: (
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleInputChange("description", e.target.value),
          }}
        />
      ),
    },
    {
      name: "website",
      title: "Product's Website",
      description: "The official website or a relevant link for your product.",
      render: () => (
        <ProductWebsiteField
          field={{
            value: formData.website,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("website", e.target.value),
          }}
          errorMessage={step === 2 ? errorMessage : null}
        />
      ),
    },
    {
      name: "context",
      title: "Provide some context",
      description:
        "Give Floopr some context on what you are building, so it can provide you with better feedback.",
      render: () => (
        <ProductContextField
          field={{
            value: formData.context,
            onChange: (
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleInputChange("context", e.target.value),
          }}
        />
      ),
    },
  ];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValidUrl(formData.website)) {
      toast.error("Please enter a valid URL for the website.");
      setStep(2);
      return;
    }

    if (!validateForm()) {
      setStep(0);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const productNameExists = await checkProductNameExists(
      formData.name,
      userId
    );
    if (productNameExists) {
      setErrorMessage(
        "Product name already exists. Please choose a different name."
      );
      setStep(0); // Go back to the name field if it exists
      setLoading(false);
      return;
    }

    // Update context with final values
    updateProductForm({
      name: formData.name,
      description: formData.description,
      website: formData.website,
      context: formData.context,
    });

    // ---- Add your product creation logic here ----
    createNewProduct(formData, userId);
    console.log("Form submitted successfully:", formData);
    // ---------------------------------------------

    setLoading(false);
  }

  function nextStep(e) {
    if (step < steps.length - 1) {
      // Only validate name field when leaving the first step
      if (step === 0 && !formData.name.trim()) {
        setErrorMessage("Product name is required");
        return;
      }

      if (step === 2 && !isValidUrl(formData.website)) {
        toast.success("Please enter a valid URL for the website.");
        setErrorMessage("Please enter a valid URL for the website.");
        return;
      }

      // Clear any previous errors
      setErrorMessage(null);

      // Sync current values to context
      updateProductForm({
        name: formData.name,
        description: formData.description,
        website: formData.website,
        context: formData.context,
      });

      setStep(step + 1);
      if (e && e.currentTarget) {
        (e.currentTarget as HTMLButtonElement).blur();
      }
    }
  }

  function prevStep() {
    if (step > 0) {
      setErrorMessage(null); // Clear any previous errors
      setStep(step - 1);
    }
  }

  const progressPercent = ((step + 1) / steps.length) * 100;
  const currentStep = steps[step];

  return (
    <div className="container mx-auto w-full max-w-xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/home">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft />
        </Button>
      </Link>
      <div className="bg-background rounded-2xl shadow- border border-border overflow-hidden">
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

          <form
            // onSubmit={onSubmit}
            className="w-full space-y-8"
            autoComplete="off"
          >
            {currentStep.render()}

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
                  onClick={(e) => nextStep(e)}
                  disabled={step === 0 && !formData.name.trim()}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={onSubmit}
                  disabled={loading || !formData.name.trim()}
                >
                  {loading ? "Creating..." : "Create Product"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProductFormClient;
