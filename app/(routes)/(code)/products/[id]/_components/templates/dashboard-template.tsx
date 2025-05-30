import { GroupedFeedbackProvider } from "../../group-context/groupt-context";
import { FilterData, Product } from "../../page";
import { ViewProvider } from "../../view-context/view-context";
import AllProductsPreviewComboBox from "../all-products-preview-combo-box";
import FeedbackTabs from "../feedback-tabs";
import ChangelogTab from "../tabs/changelog-tab/changelog";
import ContentTab from "../tabs/content-tab";
import AnalyticsDashboard from "./analytics-dashboard";
import IntegrationsPanel from "./integrations-panel";
import ProjectOverview from "./project-overview";
import SettingsPanel from "./settings-panel";
import TabsClient from "./tabs-client";
import ChatbotIndex from "@/components/chatbot/chatbot-index";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ArrowUpRight, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";

export default async function DashboardTemplate({
  productData,
  filterData,
}: {
  productData: Product;
  filterData: FilterData;
}) {
  return (
    <main className="max-w-screen flex">
      <div className="px-4 py-[3rem] w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <div>
            <div className="mb-4">
              <AllProductsPreviewComboBox productId={productData.docId} />
            </div>
            <h1 className="text-2xl font-bold">{productData.name}</h1>
            <p className="text-mutedForeground">{productData.description}</p>
          </div>
          <div className="flex items-center self-start gap-2 mt-4 md:mt-0">
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
          <TabsClient>
            <div className="sticky top-0 z-[2] shadow-md">
              <ScrollArea className="w-full">
                <TabsList className="flex gap-2 bg-mutedBackground text-foreground w-max">
                  <TabsTrigger
                    value="feedback"
                    className="flex items-center gap-2 whitespace-nowrap flex-shrink-0"
                  >
                    <LayoutDashboard size={16} />
                    Feedback
                  </TabsTrigger>
                  <TabsTrigger
                    value="changelog"
                    className="whitespace-nowrap flex-shrink-0"
                  >
                    Changelog
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="whitespace-nowrap flex-shrink-0"
                  >
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger
                    value="integrations"
                    className="whitespace-nowrap flex-shrink-0"
                  >
                    Widgets
                  </TabsTrigger>
                  <TabsTrigger
                    value="feedback-settings"
                    className="whitespace-nowrap flex-shrink-0"
                  >
                    Settings
                  </TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            {/* Feedback Tab Content */}
            <TabsContent value="feedback" className="space-y-4">
              <div className="mb-[30px]">
                <ProjectOverview productData={productData} />
              </div>
              <ViewProvider>
                <GroupedFeedbackProvider productId={productData.docId}>
                  <ContentTab
                    isOwner={true}
                    productData={productData}
                    filterData={filterData}
                    isOwnerPa={true}
                  />
                </GroupedFeedbackProvider>
              </ViewProvider>
            </TabsContent>

            {/* Changelog */}
            <TabsContent value="changelog">
              <div className="mb-[30px]">Changelog</div>
              <ChangelogTab productId={productData.docId} />
            </TabsContent>

            {/* Analytics Tab Content */}
            <TabsContent value="analytics">
              <AnalyticsDashboard productData={productData} />
            </TabsContent>

            {/* Integrations Tab Content */}
            <TabsContent value="integrations">
              <IntegrationsPanel productData={productData} />
            </TabsContent>

            {/* Settings Tab Content */}
            <TabsContent value="feedback-settings">
              <SettingsPanel
                productId={productData.docId}
                productData={productData}
              />
            </TabsContent>
          </TabsClient>
        </Tabs>
      </div>
      <ChatbotIndex productId={productData.docId} />
    </main>
  );
}
