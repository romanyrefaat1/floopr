import { SidebarTrigger } from "@/components/ui/sidebar";
import { FilterData, Product } from "../../page";
import FeedbackTabs from "../feedback-tabs";
import ContentTab from "../tabs/content-tab";
import AnalyticsDashboard from "./analytics-dashboard";
import IntegrationsPanel from "./integrations-panel";
import ProjectOverview from "./project-overview";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default async function DashboardTemplate({
  productData,
  filterData,
}: {
  productData: Product;
  filterData: FilterData;
}) {
  return (
    <main className="container mx- px-4 py-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{productData.name}</h1>
          <p className="text-muted-foreground">{productData.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          {/* <Button variant="outline" size="sm" className="gap-2">
            <CalendarIcon size={16} />
            Last 7 Days
          </Button> */}
          <ThemeToggle />
          <Link href={`/${productData.docId}`} className="group">
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-2 border border-secondaryBackground",
                "group-hover:bg-secondaryBackground transition-colors"
              )}
              size="sm"
            >
              <span>View Page</span>
              <ArrowUpRight
                className="transition-all duration-200 group-hover:h-5 group-hover:w-[18px]"
                size={16}
              />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="feedback" className="space-y-4">
        {/* Tabs List - Scrollable on Small Screens */}
        <div className="overflow-x-auto">
          <TabsList className="flex gap-2 bg-secondaryBackground text-foreground w-fit min-w-max md:grid md:grid-cols-4 md:max-w-md scrollbar-hide hover:scrollbar-default [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40 [&::-webkit-scrollbar-track]:bg-transparent">
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <LayoutDashboard size={16} />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="feedback-settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        {/* Feedback Tab Content */}
        <TabsContent value="feedback" className="space-y-4">
          <div>
            <ProjectOverview productData={productData} />
          </div>
          {/* <FeedbackTabs
            productData={productData}
            isOwner={true}
            isOwnerPa={true}
            filter={filterData}
          /> */}
          <ContentTab
            isOwner={true}
            productData={productData}
            filterData={filterData}
            isOwnerPa={true}
          />
        </TabsContent>

        {/* Analytics Tab Content */}
        <TabsContent value="analytics">
          {/* <Card> */}
          {/* <CardContent className="p-6"> */}
          <AnalyticsDashboard productData={productData} />
          {/* </CardContent> */}
          {/* </Card> */}
        </TabsContent>

        {/* Integrations Tab Content */}
        <TabsContent value="integrations">
          <IntegrationsPanel productData={productData} />
        </TabsContent>

        {/* Settings Tab Content */}
        <TabsContent value="feedback-settings">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Feedback Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure how feedback is collected and displayed
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">Allow Anonymous Feedback</h4>
                  <p className="text-sm text-muted-foreground">
                    Let users submit feedback without an account
                  </p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">Feedback Moderation</h4>
                  <p className="text-sm text-muted-foreground">
                    Review feedback before it's published
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">Custom Fields</h4>
                  <p className="text-sm text-muted-foreground">
                    Add additional fields to your feedback form
                  </p>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
