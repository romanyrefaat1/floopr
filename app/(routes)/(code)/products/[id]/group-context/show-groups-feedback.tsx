"use client";

import { FeedbackItemInDB } from "../../../[productId]/_components/feedback-list";
import { ProductData } from "../../../[productId]/page";
import FeedbackItem from "../_components/feedback-item";
import EditGroupModal from "./edit-group-modal";
import FilterFeedbackByGroup from "./filtered-feedback-by-group";
import { useGroupedFeedback } from "./groupt-context";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/firebase";
import makeFirstLetterUppercase from "@/lib/make-first-letter-uppercase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import {
  MessageSquare,
  Users,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const groupIcons = {
  "user-interface": <Users className="h-4 w-4" />,
  performance: <TrendingUp className="h-4 w-4" />,
  bugs: <AlertCircle className="h-4 w-4" />,
  "feature-requests": <Lightbulb className="h-4 w-4" />,
  general: <MessageSquare className="h-4 w-4" />,
};

export default function ShowGroupsFeedback({
  productData,
  isOwner,
}: {
  productData: ProductData;
  isOwner: boolean;
}) {
  const { groupedFeedback, setGroupedFeedback } = useGroupedFeedback();
  const [groupMeta, setGroupMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingGroup, setEditingGroup] = useState(null);
  const [deletingGroup, setDeletingGroup] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedGroup = searchParams.get("group");

  useEffect(() => {
    async function fetchGroupMeta() {
      setLoading(true);
      const metaState = {};

      for (const groupId of Object.keys(groupedFeedback || {})) {
        try {
          const groupRef = doc(
            db,
            "products",
            productData.docId,
            "feedback-groups",
            groupId
          );
          const groupSnap = await getDoc(groupRef);
          if (groupSnap.exists()) {
            const data = groupSnap.data();
            metaState[groupId] = {
              title: data.title || groupId,
              description: data.description || "",
              icon: groupIcons[groupId] || (
                <MessageSquare className="h-4 w-4" />
              ),
              feedbackData: data.feedbackData || [],
            };
          } else {
            metaState[groupId] = {
              title: groupId,
              description: "",
              icon: groupIcons[groupId] || (
                <MessageSquare className="h-4 w-4" />
              ),
              feedbackData: [],
            };
          }
        } catch {
          metaState[groupId] = {
            title: groupId,
            description: "",
            icon: <MessageSquare className="h-4 w-4" />,
            feedbackData: [],
          };
        }
      }

      setGroupMeta(metaState);
      setLoading(false);
    }

    if (groupedFeedback && Object.keys(groupedFeedback).length > 0) {
      fetchGroupMeta();
    }
  }, [groupedFeedback, productData.docId]);

  const handleFilterGroup = (groupId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("group", groupId);
    params.set("filter", "group");
    router.push(`?${params.toString()}`);
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (deletingGroup === groupId) return;

    setDeletingGroup(groupId);

    try {
      // Delete from Firestore
      const groupRef = doc(
        db,
        "products",
        productData.docId,
        "feedback-groups",
        groupId
      );
      await deleteDoc(groupRef);

      // Update local state
      const updatedGroupedFeedback = { ...groupedFeedback };
      delete updatedGroupedFeedback[groupId];
      setGroupedFeedback(updatedGroupedFeedback);

      // Update group meta
      const updatedGroupMeta = { ...groupMeta };
      delete updatedGroupMeta[groupId];
      setGroupMeta(updatedGroupMeta);

      toast.success("Group deleted successfully");
    } catch (error) {
      console.error("Error deleting group:", error);
      toast.error("Failed to delete group");
    } finally {
      setDeletingGroup(null);
    }
  };

  const handleEditGroup = (groupId: string) => {
    setEditingGroup({
      id: groupId,
      title: groupMeta[groupId]?.title || groupId,
      description: groupMeta[groupId]?.description || "",
    });
  };

  const handleGroupUpdated = (
    groupId: string,
    updatedData: { title: string; description: string }
  ) => {
    setGroupMeta((prev) => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        title: updatedData.title,
        description: updatedData.description,
      },
    }));
    setEditingGroup(null);
  };

  if (selectedGroup) {
    return (
      <FilterFeedbackByGroup productId={productData.docId} isOwner={isOwner} />
    );
  }

  if (!groupedFeedback || Object.keys(groupedFeedback).length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground text-lg font-medium">
            No groups to show
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Groups will appear here once feedback is categorized
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ScrollArea className="h-[700px] w-full">
        <div className="p-6">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {Object.entries(groupedFeedback).map(([groupId, feedbackIds]) => {
              const meta = groupMeta[groupId] || {
                title: groupId,
                description: "",
                icon: <MessageSquare className="h-4 w-4" />,
                feedbackData: [],
              };
              const groupName = makeFirstLetterUppercase(
                meta.title.replace(/-/g, " ")
              );
              const items = meta.feedbackData;

              return (
                <AccordionItem
                  key={groupId}
                  value={groupId}
                  className="border bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger className="flex flex-col items-start px-6 py-4 bg-background hover:bg-mutedBackground transition-colors duration-200 [&[data-state=open]]:bg-muted/80">
                    <div className="flex items-center gap-3 w-full justify-between">
                      <div className="flex items-center gap-2 text-foreground">
                        {loading ? <Skeleton className="h-4 w-4" /> : meta.icon}
                        {loading ? (
                          <Skeleton className="h-6 w-32 ml-2" />
                        ) : (
                          <span className="font-semibold text-lg">
                            {groupName}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                        >
                          {loading ? (
                            <Skeleton className="h-5 w-12" />
                          ) : (
                            `${items.length} ${
                              items.length === 1 ? "item" : "items"
                            }`
                          )}
                        </Badge>
                        {!loading && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFilterGroup(groupId);
                              }}
                              className="flex items-center gap-1 text-xs"
                            >
                              <Filter className="h-3 w-3" />
                              Filter
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => e.stopPropagation()}
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditGroup(groupId);
                                  }}
                                  className="flex items-center gap-2"
                                >
                                  <Edit className="h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteGroup(groupId);
                                  }}
                                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                                  disabled={deletingGroup === groupId}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  {deletingGroup === groupId
                                    ? "Deleting..."
                                    : "Delete"}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {loading ? (
                        <Skeleton className="h-4 w-full" />
                      ) : (
                        meta.description
                      )}
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-2 pb-6 bg-background">
                    {loading ? (
                      Array(3)
                        .fill(0)
                        .map((_, idx) => (
                          <div
                            key={idx}
                            className="mb-4 p-4 bg-muted rounded-lg"
                          >
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                          </div>
                        ))
                    ) : items.length === 0 ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <div className="text-muted-foreground">
                              {meta.icon}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            No feedback in this group yet
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {items.map((fb: FeedbackItemInDB, idx) => {
                          let content = fb.feedback?.content || `Unkown Title`;

                          if (!fb.feedback?.isRich) {
                            content = fb.feedback?.content;
                          } else if (
                            Array.isArray(fb.feedback.content?.blocks) &&
                            fb.feedback.content.blocks.length > 0
                          ) {
                            content = fb.feedback.content.blocks
                              .map((block) => block.text)
                              .join("\n");
                          } else if (
                            Array.isArray(fb.feedback?.inputs) &&
                            fb.feedback.inputs?.length > 0
                          ) {
                            content = fb.feedback.inputs
                              .map((input) => `${input.label}: ${input.value}`)
                              .join("\n");
                          }

                          return (
                            <FeedbackItem
                              key={fb.id || idx}
                              feedbackData={{
                                title:
                                  fb.feedback?.title || "Untitled Feedback",
                                content,
                                isRic: fb.feedback?.isRich,
                                username: fb.userInfo?.username,
                              }}
                              productData={productData}
                              feedbackId={fb.feedbackId}
                            />
                          );
                        })}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </ScrollArea>

      {/* Edit Group Modal */}
      {editingGroup && (
        <EditGroupModal
          group={editingGroup}
          productId={productData.docId}
          onClose={() => setEditingGroup(null)}
          onGroupUpdated={handleGroupUpdated}
        />
      )}
    </div>
  );
}
