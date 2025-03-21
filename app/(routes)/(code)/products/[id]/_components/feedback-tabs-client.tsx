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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import ContentTab from "./tabs/content-tab";
import { FilterData, Product } from "../page";
import FeedbackIntegrationsTab from "./tabs/feedback-integrations-tab/feedback-integrations-tab";

type FeedbackTabsClientProps = {
  productData: Product;
  isOwner: boolean;
  filter: FilterData;
};

export function FeedbackTabsClient({ productData, isOwner=false, filter }: FeedbackTabsClientProps) {
  // Custom styles based on product data
  const tabsStyles = {
    "--tabs-primary-color": "var(--primary-color)",
    "--tabs-text-color": "var(--text-color)",
    "--tabs-background-color": "var(--background-color)",
    "--tabs-border-radius": "var(--border-radius)",
    "--tabs-font-family": "var(--font-family)",
    "--tabs-shadow": "var(--shadow)",
  } as React.CSSProperties;

  // Custom button and card styles that inherit from CSS variables
  const cardStyles = {
    fontFamily: "var(--font-family)",
    // backgroundColor: "var(--background-color)",
    color: "var(--text-color)",
    borderRadius: "var(--border-radius)",
    boxShadow: "var(--shadow)",
  } as React.CSSProperties;

  // Custom styles for tabs list and triggers
  const tabsListStyles = {
    backgroundColor: "var(--secondary-color-light, #fafbfc)", // not configured
    gap: "var(--spacing, 0.5rem)",
    borderRadius: "var(--border-radius)",
    // padding: "var(--spacing, 0.5rem)",
    height: "fit-content",
  } as React.CSSProperties;

  const tabsTriggerStyles = {
    color: "var(--text-color)",
    backgroundColor: "var(--background-color)",
    borderRadius: "var(--border-radius)",
    fontSize: "var(--font-size)",
    "&[dataState=active]": {
      backgroundColor: "var(--primary-color)",
      color: "var(--secondary-text-color, white)",
    },
  } as React.CSSProperties;

  return (
    <Tabs
      className="w-full"
      defaultValue="feedback-content"
      style={tabsStyles}
    >
      <TabsList className="grid w-full grid-cols-3" style={tabsListStyles}>
        <TabsTrigger 
          className="" 
          value="feedback-content"
          style={tabsTriggerStyles}
        >
          Content
        </TabsTrigger>
        {isOwner && (
          <>
            <TabsTrigger 
              value="feedback-integrations"
              style={tabsTriggerStyles}
            >
              Integrations
            </TabsTrigger>
            <TabsTrigger 
              value="feedback-settings"
              style={tabsTriggerStyles}
            >
              Settings
            </TabsTrigger>
          </>
        )}
      </TabsList>
      <TabsContent value="feedback-content" className="mt-[25px]">
        <ContentTab isOwner={isOwner} productData={productData}  filterData={filter} />
      </TabsContent>
      {isOwner && (
        <>
          <TabsContent value="feedback-integrations" className="mt-[25px]">
            <FeedbackIntegrationsTab productData={productData} />
          </TabsContent>
          <TabsContent value="feedback-settings">
            <Card style={cardStyles}>
              <CardHeader>
                <CardTitle style={{ color: "var(--primary-color)" }}>Password</CardTitle>
                <CardDescription style={{ color: "var(--secondary-text-color)" }}>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current" style={{ color: "var(--text-color)" }}>Current password</Label>
                  <Input 
                    id="current" 
                    type="password"
                    style={{
                      borderColor: "var(--primary-color)",
                      borderRadius: "var(--border-radius)",
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new" style={{ color: "var(--text-color)" }}>New password</Label>
                  <Input 
                    id="new" 
                    type="password"
                    style={{
                      borderColor: "var(--primary-color)",
                      borderRadius: "var(--border-radius)",
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--secondary-text-color, white)",
                  borderRadius: "var(--border-radius)",
                }}>
                  Save password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}