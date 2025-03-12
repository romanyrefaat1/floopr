import getProductData from "@/actions/get-product-data";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import FeedbackForm from "./_components/feedback-form";
import { ProductStyleProvider } from "@/contexts/product-style-context";
import ShowFeedbacks from "./_components/show-feedbacks";

export type ProductStyle = {
  backgroundColor: string;
  shadowStyle: string;
  headingStyle: string;
  layout: string;
  textColor: string;
  fontSize: string;
  primaryColor: string;
  animation: string;
  spacing: string;
  borderRadius: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
}

export type ProductData = {
  docId: string;
  name: string;
  updatedAt: any;
  lastFeedbackAt: any;
  feedbackCount: number;
  description: string;
  ownerId: string;
  style: ProductStyle;
  productId: string;
  link: string;
  mainTitle?: string;
  titleLabel?: string;
  descriptionLabel?: string;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
  submitButtonLabel?: string;
  typesLabel?: string;
  types?: string[];
  defaultType?: string;
  isRange?: boolean;
}

export default async function UsersProductPage({ params }: { params: { productId: string } }) {
  const { productId } = params;
  const productDataFirebase = await getProductData(productId);
  
  if (!productDataFirebase) {
    return notFound();
  }
  
  const productData: ProductData = {
    docId: productDataFirebase.docId,
    name: productDataFirebase.name,
    updatedAt: productDataFirebase.updatedAt,
    lastFeedbackAt: productDataFirebase.lastFeedbackAt,
    feedbackCount: productDataFirebase.feedbackCount,
    description: productDataFirebase.description || "No description provided.",
    ownerId: productDataFirebase.ownerId,
    style: {
      backgroundColor: productDataFirebase.style?.backgroundColor || "#ffffff",
      shadowStyle: productDataFirebase.style?.shadowStyle || "none",
      headingStyle: productDataFirebase.style?.headingStyle || "normal",
      layout: productDataFirebase.style?.layout || "grid",
      textColor: productDataFirebase.style?.textColor || "#000000",
      fontSize: productDataFirebase.style?.fontSize || "16px",
      primaryColor: productDataFirebase.style?.primaryColor || "#0000ff",
      animation: productDataFirebase.style?.animation || "none",
      spacing: productDataFirebase.style?.spacing || "normal",
      borderRadius: productDataFirebase.style?.borderRadius || "0px",
      secondaryColor: productDataFirebase.style?.secondaryColor || "#cccccc",
      accentColor: productDataFirebase.style?.accentColor || "#ff0000",
      fontFamily: productDataFirebase.style?.fontFamily || "sans-serif"
    },
    productId: productDataFirebase.productId,
    link: productDataFirebase.link || `/${productId}`,
    mainTitle: productDataFirebase.mainTitle,
    titleLabel: productDataFirebase.titleLabel,
    descriptionLabel: productDataFirebase.descriptionLabel,
    titlePlaceholder: productDataFirebase.titlePlaceholder,
    descriptionPlaceholder: productDataFirebase.descriptionPlaceholder,
    submitButtonLabel: productDataFirebase.submitButtonLabel,
    typesLabel: productDataFirebase.typesLabel,
    types: productDataFirebase.types,
    defaultType: productDataFirebase.defaultType,
    isRange: productDataFirebase.isRange
  };
  
  console.log("productData", productData);
  
  return (
    <ProductStyleProvider productStyle={productData.style}>
      <main className="bg-[var(--product-background-color)] px-20">
        <header className="py-5">
          <nav className="w-full">
            <Link href={productData.link}>
              <Button variant="outline" className="flex gap-4 items-center justify-center">
                <span>{productData.name}</span>
                <ArrowUpRight />
              </Button>
            </Link>
          </nav>
        </header>
        <div className="flex">
        <FeedbackForm productData={productData} />
        <ShowFeedbacks productId={productData.productId} />
        </div>
      </main>
    </ProductStyleProvider>
  );
}