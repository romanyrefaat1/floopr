"use client";

import { Product } from "../../page";
import updateProductData from "@/actions/product/updateProductData";
import LoaderSpinner from "@/components/loader-spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function SettingsPanel({
  productId,
  productData,
}: {
  productId: string;
  productData?: any;
}) {
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [context, setContext] = useState(productData?.productContext || "");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    setError("");

    try {
      // Simulate API call
      await updateProductData(productId, {
        name: name.trim(),
        description: description.trim(),
        productContext: context.trim(),
      });
      setSuccess(true);
    } catch (err) {
      setError("Failed to save changes.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">General Settings</h2>
        <p className="text-mutedForeground">
          Update your product information and context.
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              placeholder="Enter product name"
              className="max-w-md"
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productDescription">Product Description</Label>
            <Textarea
              id="productDescription"
              placeholder="Enter a brief description of your product"
              className="max-w-md"
              rows={3}
              disabled={isLoading}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productContext">Product Context</Label>
            <Textarea
              id="productContext"
              placeholder="Add additional context about your product to help the AI provide better responses"
              className="max-w-md"
              rows={4}
              disabled={isLoading}
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
            <p className="text-sm text-mutedForeground">
              This context helps our AI better understand your product and
              provide more relevant responses to queries.
            </p>
          </div>
        </div>
        <Button type="submit" className="mt-6" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderSpinner className="mr-2" />
              Saving Changes...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
        {success && <p className="text-green-600 text-sm">Saved!</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}
