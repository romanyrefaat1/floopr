import { FilterData, Product } from "../../page";
import AllProductsPreviewComboBox from "../all-products-preview-combo-box";
import FeedbackTabs from "../feedback-tabs";
import ContentTab from "../tabs/content-tab";
import AnalyticsDashboard from "./analytics-dashboard";
import IntegrationsPanel from "./integrations-panel";
import ProjectOverview from "./project-overview";
import SettingsPanel from "./settings-panel";
import TabsClient from "./tabs-client";
import ChatbotIndex from "@/components/chatbot/chatbot-index";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
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
    <main className=" max-w-screen flex">
      <div className="px-4 py-[3rem] flex- w-full ">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <div>
            <div className="mb-4 ">
              <AllProductsPreviewComboBox productId={productData.docId} />
            </div>
            <h1 className="text-2xl font-bold">{productData.name}</h1>
            <p className="text-mutedForeground">{productData.description}</p>
          </div>
          <div className="flex items-center self-start gap-2 mt-4 md:mt-0">
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
          <TabsClient>
            {/* Tabs List - Scrollable on Small Screens */}
            <div className="overflow-x-auto sticky top-0 z-[2] shadow-md w-fit">
              <TabsList className="flex gap-2 bg-mutedBackground text-foreground w-fit min-w-max md:grid md:grid-cols-4 md:max-w-md scrollbar-hide hover:scrollbar-default [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40 [&::-webkit-scrollbar-track]:bg-transparent">
                <TabsTrigger
                  value="feedback"
                  className="flex items-center gap-2"
                >
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
              <div className="mb-[30px]">
                <ProjectOverview productData={productData} />
              </div>
              <ContentTab
                isOwner={true}
                productData={productData}
                filterData={filterData}
                isOwnerPa={true}
              />
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
