"use client";

import { CodeBlock } from "@/components/docs/code-block";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FloatButtonDocs() {
  const installationCode = `<script
  src="http://localhost:3000/embeds/float-button-bundle_floopr_feedback_embed.js"
  data-api-key="YOUR_API_KEY"
  data-product-id="YOUR_PRODUCT_ID"
  data-component-id="YOUR_COMPONENT_ID"
  data-user-info='{"userId": "user_123", "userName": "User Name", "userImage": "https://example.com/avatar.jpg"}'
  defer
></script>`;

  const customizationCode = `// Example of customization options
{
  "buttonStyle": {
    "backgroundColor": "#ffffff",
    "borderRadius": "lg",
    "padding": "lg",
    "position": "bottom-right"
  },
  "userInfo": {
    "userId": "user_123",
    "userName": "User Name",
    "userImage": "https://example.com/avatar.jpg"
  }
}`;

  return (
    <div className="container mx-auto py-10 max-w-7xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Float Button Documentation
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn how to integrate and customize the floating feedback button in
            your application.
          </p>
        </div>

        <Tabs defaultValue="installation" className="space-y-4">
          <TabsList>
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="customization">Customization</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
          </TabsList>

          <TabsContent value="installation" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
              <p className="mb-4">
                Add the following script tag to your HTML file, preferably just
                before the closing body tag:
              </p>
              <CodeBlock code={installationCode} language="html" />

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">
                  Required Parameters
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code>data-api-key</code>: Your unique API key
                  </li>
                  <li>
                    <code>data-product-id</code>: The ID of your product
                  </li>
                  <li>
                    <code>data-component-id</code>: The specific component ID
                  </li>
                  <li>
                    <code>data-user-info</code>: JSON string containing user
                    information
                  </li>
                </ul>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="customization" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Customization Options
              </h2>
              <p className="mb-4">
                The float button can be customized using various options to
                match your application's design:
              </p>
              <CodeBlock code={customizationCode} language="json" />

              <div className="mt-6 grid gap-4">
                <h3 className="text-xl font-semibold">Style Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Background Color</h4>
                    <p className="text-sm text-muted-foreground">
                      Customize the button's background color using HEX or RGB
                      values
                    </p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Border Radius</h4>
                    <p className="text-sm text-muted-foreground">
                      Options: sm, md, lg, xl, or custom pixel values
                    </p>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Methods</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">show()</h4>
                      <p className="text-sm text-muted-foreground">
                        Programmatically show the feedback button
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">hide()</h4>
                      <p className="text-sm text-muted-foreground">
                        Programmatically hide the feedback button
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Events</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">onFeedbackSubmit</h4>
                      <p className="text-sm text-muted-foreground">
                        Triggered when user submits feedback
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">onButtonClick</h4>
                      <p className="text-sm text-muted-foreground">
                        Triggered when the float button is clicked
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Live Demo</h2>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-center text-muted-foreground">
              Try out the float button with different configurations
            </p>
            <Button>Toggle Demo Button</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
