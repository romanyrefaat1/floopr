import { FilterData } from "../products/[id]/page";
import Feedbacks from "./_components/feedbacks/feedbacks";
import ShareButton from "./_components/pa-drop-down";
import { updatePageView } from "@/actions/basic-analytics/pageViews";
import getProductData from "@/actions/get-product-data";
import LoaderSpinner from "@/components/loader-spinner";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import getFiltersFromParams from "@/lib/get-filters-from-params";
import { auth } from "@clerk/nextjs/server";
import { ArrowUpRight, ShareIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
};

export type ProductData = {
  docId: string;
  name: string;
  updatedAt: any;
  createdAt: any;
  lastFeedbackAt: any;
  description: string;
  isOwner: boolean;
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

  // Basic analytics
  feedbackCount: number;
  pageViews: number;
  likesCount: number;
  commentsCount: number;
  analytics: {
    sentiment: {
      positive: number;
      negative: number;
      neutral: number;
      topSentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
      percent: number;
    };
    topic: {
      allTopics: string[];
      topTopic: string | null;
      topTopicPercent: number;
    };
  };
};

export default async function UsersProductPage({
  params,
  searchParams,
}: {
  params: { productId: string };
  searchParams: FilterData;
}) {
  const { productId } = params;
  const productDataFirebase = await getProductData(productId);
  if (!productDataFirebase) {
    return notFound();
  }

  const { userId } = await auth();
  const isOwner = productDataFirebase.ownerId === userId;
  console.log(`isOwner:`, isOwner, userId, productDataFirebase.ownerId);

  if (!productDataFirebase) {
    return notFound();
  }

  // Update page views
  await updatePageView(productId);

  const filterData = getFiltersFromParams(searchParams);

  const productData: ProductData = {
    docId: productId,
    name: productDataFirebase.name,
    updatedAt: productDataFirebase.updatedAt
      ? productDataFirebase.updatedAt.toDate()
      : new Date(),
    lastFeedbackAt: productDataFirebase.lastFeedbackAt
      ? productDataFirebase.lastFeedbackAt.toDate()
      : new Date(),
    feedbackCount: productDataFirebase.feedbackCount,
    description: productDataFirebase.description || "No description provided.",
    ownerId: productDataFirebase.ownerId,
    isOwner,
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
    isRange: productDataFirebase.isRange,
  };

  console.log("productData", productData);

  return (
    <main className="bg-background px-4 md:px-4 lg:px-20 min-h-screen mt-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <header className="rounded-lg border p-4 mb-6">
        <nav className="w-full flex justify-between items-center">
          <Link href={productData.link} className="h-fit">
            {productData.name}
          </Link>
          <ShareButton />
        </nav>
      </header>
      <div className={`border-secondary border rounded-lg p-4 gap-xl2`}>
        <h1 className="mb-2 text-4xl font-bold">Give us feedback</h1>
        <Suspense fallback={<LoaderSpinner />}>
          <Feedbacks
            isOwnerPa={false}
            productId={productData.productId}
            productData={productData}
            filterData={filterData}
          />
        </Suspense>
      </div>

      {isOwner && (
        <div className="fixed bottom-4 right-4 md:bottom-10 md:right-[55px]">
          <Button
            variant="secondary"
            className="rounded-full w-fit h-fit p-4 group hover:bg-mutedBackground"
            style={{ aspectRatio: 1 }}
          >
            <Link
              href={`products/${productData.docId}`}
              className="h-fit w-fit"
            >
              <ArrowUpRight className="h-5 w-5 group-hover:w-6 group-hover:h-6 transition-all" />
            </Link>
          </Button>
        </div>
      )}
    </main>
  );
}
