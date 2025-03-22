import { Product } from "../../page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  Copy,
  ExternalLink,
  Globe,
  MessageSquare,
  Timer,
} from "lucide-react";
import Link from "next/link";

export default function IntegrationsPanel({
  productData,
}: {
  productData: Product;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Integrations</h2>
        <p className="text-muted-foreground mb-6">
          Add feedback collection to your product with our pre-built components
        </p>
      </div>

      <Tabs defaultValue="components">
        <TabsList className="mb-4">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ComponentCard
              title="Modal Feedback"
              description="Collect feedback with a modal that appears after a set time"
              icon={<Timer className="h-8 w-8 text-primary" />}
              productId={productData.docId}
              componentType="modal-time"
            />

            <ComponentCard
              title="Inline Feedback"
              description="Embed feedback forms directly in your pages"
              icon={<MessageSquare className="h-8 w-8 text-primary" />}
              productId={productData.docId}
              componentType="inline"
            />

            <ComponentCard
              title="Website Widget"
              description="Add a floating feedback button to your website"
              icon={<Globe className="h-8 w-8 text-primary" />}
              productId={productData.docId}
              componentType="widget"
            />

            <ComponentCard
              title="Custom Integration"
              description="Build your own integration with our API"
              icon={<Code className="h-8 w-8 text-primary" />}
              productId={productData.docId}
              componentType="custom"
            />
          </div>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
              <CardDescription>
                Use our API to integrate feedback collection into your
                application
              </CardDescription>
            </CardHeader>
            <CardContent>
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
    productId: '${productData.docId}',
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
                  onClick={() =>
                    navigator.clipboard.writeText(`// Example code`)
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Check our documentation for more details on API endpoints and
                parameters.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="gap-2">
                <ExternalLink size={16} />
                View API Documentation
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

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
