"use client";

import AddFeedbackForm from "../../products/[id]/_components/add-simple-feedback-form";
// Remove framer-motion import
// import { motion, AnimatePresence } from "framer-motion";
import type { FilterData } from "../../products/[id]/page";
import ChangelogList from "./changelog-list";
import FeedbackList from "./feedback-list";
import FeedbackTypeSelect from "./feedback-type-select";
import RoadmapView from "./roadmap-view";
import StatusFilter from "./status-filter";
import ButtonAddFeedback from "@/components/button-add-feedback";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import React, { useState, Suspense } from "react";
import { AllFeedbackProvider } from "@/contexts/all-feedback-context";

export default function ClientPageShell({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [selectedType, setSelectedType] =
    useState<FilterData["type"]>("feature");
  const [selectedStatus, setSelectedStatus] = useState<
    "planned" | "in-progress" | "completed" | "archived" | null
  >(null);
  const [tab, setTab] = useState("all");

  const filterData: FilterData = {
    filter: selectedType ? "type" : null,
    type: selectedType,
    sentiment: null,
    quick: null,
    specifiedDate: null,
    group: null,
  };

  return (
    <>
      {/* Hero Section (navbar is handled by parent) */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="max-w- mx- px-4 py-8 md:py-12">
          <div className="max-w- mx-">
            <h1 className="text-4xl font-bold text-center">Product Feedback</h1>
            <p className="mt-2 text-muted-foreground text-lg text-center">
              Browse and submit feedback for our product
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog
                open={feedbackDialogOpen}
                onOpenChange={setFeedbackDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Submit Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg w-full">
                  <ButtonAddFeedback
                  // productId={productId}
                  // productName={productName}
                  // primaryColor="#7c64f6"
                  // className="w-full"
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: 3-column grid */}
      <AllFeedbackProvider productId={productId} filterData={filterData}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar: Filters */}
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold mb-4">Filter Feedback</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Type</label>
                    <FeedbackTypeSelect
                      value={selectedType}
                      onChange={setSelectedType}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Status
                    </label>
                    <StatusFilter
                      value={selectedStatus}
                      onChange={setSelectedStatus}
                    />
                  </div>
                  {/* Add more filter controls here as needed */}
                </div>
              </div>
            </div>

            {/* Center: Tabs and Feedback */}
            <div className="lg:col-span-6">
              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="w-full justify-start mb-6">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    All Posts
                  </TabsTrigger>
                  <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                  <TabsTrigger value="changelog">Changelog</TabsTrigger>
                </TabsList>
                {tab === "all" && (
                  <TabsContent value="all" forceMount>
                    <div className="fade-in">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">All Feedback</h2>
                        <Dialog
                          open={feedbackDialogOpen}
                          onOpenChange={setFeedbackDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              className="flex items-center gap-2 rounded-full"
                              variant="default"
                            >
                              <MessageSquare className="h-4 w-4" /> Submit
                              Feedback
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg w-full">
                            <AddFeedbackForm
                              productId={productId}
                              productName={productName}
                              primaryColor="#7c64f6"
                              className="w-full"
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                      {/* <Suspense
                        fallback={
                          <div className="animate-pulse text-center py-8">
                            Loading feedback...
                          </div>
                        }
                      > */}
                      <FeedbackList
                        productId={productId}
                        filterData={filterData}
                        isOwner={false}
                      />
                      {/* </Suspense> */}
                    </div>
                  </TabsContent>
                )}
                {tab === "roadmap" && (
                  <TabsContent value="roadmap" forceMount>
                    <div className="fade-in">
                      <Suspense
                        fallback={
                          <div className="animate-pulse text-center py-8">
                            Loading roadmap...
                          </div>
                        }
                      >
                        <RoadmapView productId={productId} />
                      </Suspense>
                    </div>
                  </TabsContent>
                )}
                {tab === "changelog" && (
                  <TabsContent value="changelog" forceMount>
                    <div className="fade-in">
                      <Suspense
                        fallback={
                          <div className="animate-pulse text-center py-8">
                            Loading changelog...
                          </div>
                        }
                      >
                        <ChangelogList items={[]} />
                      </Suspense>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>

            {/* Right Sidebar: (empty or for future widgets) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Add widgets or keep empty for now */}
            </div>
          </div>
        </div>
      </AllFeedbackProvider>
    </>
  );
}
