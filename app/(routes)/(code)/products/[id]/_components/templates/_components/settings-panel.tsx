import LoaderSpinner from "@/components/loader-spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function SettingsPanel({
  productId,
  productData,
}: {
  productId: string;
  productData?: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [context, setContext] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (productData) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setContext(productData.context || "");
      return;
    }
    async function fetchProduct() {
      setIsLoading(true);
      setError("");
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setDescription(data.description || "");
          setContext(data.context || "");
        }
      } catch (e) {
        setError("Failed to load product data");
      }
      setIsLoading(false);
    }
    fetchProduct();
  }, [productId, productData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    setError("");
    try {
      const docRef = doc(db, "products", productId);
      await updateDoc(docRef, {
        name: name.trim(),
        description: description.trim(),
        context: context.trim(),
        updatedAt: new Date(),
      });
      setSuccess(true);
    } catch (e) {
      setError("Failed to update product");
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">General Settings</h2>
        <p className="text-mutedForeground">
          Update your product information and context.
        </p>
      </div>
      <Card className="p-6">
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
      </Card>
    </div>
  );
}
