import { Product } from "../../page";
import AllComponents from "../tabs/feedback-integrations-tab/all-components";
import YourComponents from "../tabs/feedback-integrations-tab/your-components";
import AllComponentsTrigger from "./all-components-trigger";
import { SkeletonCard } from "@/components/skeletons/skeleton-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Code,
  Copy,
  ExternalLink,
  Globe,
  MessageSquare,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function IntegrationsPanel({
  productData,
}: {
  productData: Product;
}) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Integrations</h2>
        <p className="text-mutedForeground">
          Add feedback collection to your product with our pre-built components
        </p>
      </div>

      <Tabs defaultValue="your-components" className="space-y-4">
        <TabsList className="bg-secondaryBackground w-fit">
          <TabsTrigger
            value="your-components"
            className={cn(
              "data-[state=active]:bg-primary",
              "data-[state=active]:text-primary-foreground"
            )}
          >
            Your Components
          </TabsTrigger>
          <AllComponentsTrigger />
        </TabsList>

        <TabsContent value="your-components" className="space-y-4 h-full">
          <Suspense
            fallback={
              <div className="grid lg:grid-cols-2 gap-2">
                <h2 className="text-3xl font-bold mb-[25px]">
                  Your Components
                </h2>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            }
          >
            <YourComponents
              productId={productData.docId}
              productData={productData}
            />
          </Suspense>
        </TabsContent>

        <TabsContent value="all-components" className="space-y-4">
          <Suspense
            fallback={
              <div className="grid lg:grid-cols-2 gap-2">
                <h2 className="text-3xl font-bold mb-[25px]">All Components</h2>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            }
          >
            <AllComponents productData={productData} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const componentCards = [
  {
    title: "Modal Feedback",
    description: "Collect feedback with a modal that appears after a set time",
    icon: <Timer className="h-8 w-8 text-primary" />,
    componentType: "modal-time",
  },
  {
    title: "Inline Feedback",
    description: "Embed feedback forms directly in your pages",
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    componentType: "inline",
  },
  {
    title: "Website Widget",
    description: "Add a floating feedback button to your website",
    icon: <Globe className="h-8 w-8 text-primary" />,
    componentType: "widget",
  },
  {
    title: "Custom Integration",
    description: "Build your own integration with our API",
    icon: <Code className="h-8 w-8 text-primary" />,
    componentType: "custom",
  },
];

function ComponentCard({
  title,
  description,
  icon,
  productId,
  componentType,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  productId: string;
  componentType: string;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          {icon}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="pt-2">
        <Link
          href={`/edit-component/${componentType}/new?ref=${productId}`}
          className="w-full"
        >
          <Button variant="default" className="w-full">
            Configure
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

function ApiIntegrationCard({ productId }: { productId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Integration</CardTitle>
        <CardDescription>
          Use our API to integrate feedback collection into your application
        </CardDescription>
      </CardHeader>
      <div className="p-6">
        <div className="bg-muted p-4 rounded-md relative mb-4">
          <pre className="text-sm overflow-x-auto">
            <code>
              {`// Example API request
fetch('https://api.floopr.app/v1/feedback', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    productId: '${productId}',
    content: 'User feedback content',
    metadata: {
      userId: 'user-123',
      source: 'api'
    }
  })
})`}
            </code>
          </pre>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => navigator.clipboard.writeText(`// Example code`)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Check our documentation for more details on API endpoints and
          parameters.
        </p>
        <Button variant="outline" className="gap-2">
          <ExternalLink size={16} />
          View API Documentation
        </Button>
      </div>
    </Card>
  );
}
