"use client";
import createNewProduct from "@/actions/createNewProduct";
import LoaderSpinner from "@/components/loader-spinner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth-context";
import { useNewProductFormContext } from "@/contexts/multistep-form-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DialogNotice() {
    const router = useRouter()
    // const { userId } = useAuth();
    const { productForm } = useNewProductFormContext();
    const [submitLoadin, setSubmitLoadin] = useState(false);
    const [error, setError] = useState(null);


    const handleNext = async () => {
        setSubmitLoadin(true);
        try {
            const formData = productForm;
            console.log("Form data before submission:", formData);
            const response = await createNewProduct(formData);

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
            }
            const responseData = await response.json()
            console.log(responseData)
            console.log("Product created, attempting to navigate");
            router.push(`../products/${responseData.productDocId}`);
        } catch (error) {
            setError(error)
            console.error(`Error saving product data, please try again:`, error);
        } finally {
            setSubmitLoadin(false);
        }
      
      setSubmitLoadin(false);
    
    }

    const handleBack = () => {
        router.push("/products/step-two")
    }
    
    return (
        <Dialog open={true} >
        <DialogContent overlayClassName="backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Components are under development</DialogTitle>
            <DialogDescription>
              Please press &apos;Next&apos; to continue your setup.
            </DialogDescription>
          </DialogHeader>
          {error && error}
          <DialogFooter>
            <Button variant="secondary" onClick={handleBack} type="button">
              Back
            </Button>
            <Button onClick={handleNext} disabled={submitLoadin} type="button">
              {submitLoadin ? <LoaderSpinner /> :  `Next`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}