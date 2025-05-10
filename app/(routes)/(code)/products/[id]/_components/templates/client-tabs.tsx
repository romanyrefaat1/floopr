"use client";

import { FilterData, Product } from "../../page";
import ResizablePanel from "../resizable-panel";
import ContentTab from "../tabs/content-tab";
import AnalyticsDashboard from "./analytics-dashboard";
import IntegrationsPanel from "./integrations-panel";
import ProjectOverview from "./project-overview";
import SettingsPanel from "./settings-panel";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Settings } from "lucide-react";
import { useState } from "react";

export default function ClientTabs({
  productData,
  filterData,
}: {
  productData: Product;
  filterData: FilterData;
}) {
  const [activeTab, setActiveTab] = useState("feedback");

  // Create the tabs content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "feedback":
        return (
          <>
            <div className="mb-4">
              <ProjectOverview productData={productData} />
            </div>
            <ContentTab
              isOwner={true}
              productData={productData}
              filterData={filterData}
              isOwnerPa={true}
            />
          </>
        );
      case "analytics":
        return <AnalyticsDashboard productData={productData} />;
      case "integrations":
        return <IntegrationsPanel productData={productData} />;
      case "feedback-settings":
        return (
          <SettingsPanel
            productId={productData.docId}
            productData={productData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Tabs Navigation */}
      <div className="px-4 py-2 border-b">
        <div className="overflow-x-auto">
          <TabsList className="flex gap-2 bg-secondaryBackground text-foreground w-fit min-w-max md:grid md:grid-cols-4 md:max-w-md scrollbar-hide hover:scrollbar-default [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40 [&::-webkit-scrollbar-track]:bg-transparent">
            <TabsTrigger
              value="feedback"
              className="flex items-center gap-2"
              onClick={() => setActiveTab("feedback")}
              data-state={activeTab === "feedback" ? "active" : ""}
            >
              <LayoutDashboard size={16} />
              Feedback
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              onClick={() => setActiveTab("analytics")}
              data-state={activeTab === "analytics" ? "active" : ""}
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              onClick={() => setActiveTab("integrations")}
              data-state={activeTab === "integrations" ? "active" : ""}
            >
              Integrations
            </TabsTrigger>
            <TabsTrigger
              value="feedback-settings"
              onClick={() => setActiveTab("feedback-settings")}
              data-state={activeTab === "feedback-settings" ? "active" : ""}
            >
              <Settings size={16} className="mr-1" />
              Settings
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      {/* Main Content with Resizable Panels */}
      <div className="flex-grow overflow-hidden">
        <ResizablePanel
          productId={productData.docId}
          activeTab={activeTab}
          tabContent={renderTabContent()}
        />
      </div>
    </>
  );
}
