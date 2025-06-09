"use client";

import createNewProduct from "@/actions/createNewProduct";
import LoaderSpinner from "@/components/loader-spinner";
import { Button } from "@/components/ui/button";
import { useNewProductFormContext } from "@/contexts/multistep-form-context";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CreateProductButton = () => {
  const router = useRouter();
  const { productForm } = useNewProductFormContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  const handleCreate = async () => {
    if (!userId) {
      toast.error("User is not authenticated");
      return;
    }
    if (!productForm.name || productForm.name.length === 0) {
      toast.error("Product name is required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = { ...productForm, ownerId: userId };
      const response = await createNewProduct(formData, userId);
      const responseData = await response.json();
      if (!response.ok) {
        setError(responseData.error);
        toast.error(responseData.error || "Failed to create product");
        setLoading(false);
        return;
      }
      toast.success("Product created!");
      router.push(`/products/${responseData.productDocId}`);
    } catch (err) {
      setError("Error saving product data, please try again.");
      toast.error("Error saving product data, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      <Button onClick={handleCreate} disabled={loading} className="w-full max-w-xs text-lg font-semibold py-3">
        {loading ? <LoaderSpinner /> : "Create Product"}
      </Button>
      {error && <p className="text-destructive text-sm font-medium mt-2">{error}</p>}
    </div>
  );
};

export default CreateProductButton;
