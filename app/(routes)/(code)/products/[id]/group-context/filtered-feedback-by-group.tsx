"use client";

import { FeedbackItemInDB } from "../../../[productId]/_components/feedback-list";
import FeedbackItem from "../_components/feedback-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/firebase";
import makeFirstLetterUppercase from "@/lib/make-first-letter-uppercase";
import {
  doc,
  getDoc,
  writeBatch,
  collection,
  where,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  Trash2,
  Loader2,
  X,
  Plus,
  Search,
  Check,
  FileText,
  User,
  Calendar,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useMemo } from "react";
import { toast } from "sonner";

interface AllFeedbackItem {
  id: string;
  feedbackId: string;
  feedback: {
    title: string;
    content: string;
    isRich?: boolean;
    createdAt?: any;
  };
  userInfo?: {
    username: string;
  };
}

export default function FilteredFeedbackByGroup({
  productId,
  isOwner,
}: {
  productId: string;
  isOwner: boolean;
}) {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group");

  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemInDB[]>([]);
  const [groupTitle, setGroupTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isClearing, setIsClearing] = useState<boolean>(false);
  const [isCommitting, setIsCommitting] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [allFeedback, setAllFeedback] = useState<AllFeedbackItem[]>([]);
  const [loadingAllFeedback, setLoadingAllFeedback] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFeedback, setSelectedFeedback] = useState<Set<string>>(
    new Set()
  );
  const [isAddingFeedback, setIsAddingFeedback] = useState<boolean>(false);
  const cancelRef = useRef<boolean>(false);

  useEffect(() => {
    const fetchGroupFeedback = async () => {
      if (!groupId) return;
      setLoading(true);
      const groupRef = doc(
        db,
        "products",
        productId,
        "feedback-groups",
        groupId
      );
      const groupSnap = await getDoc(groupRef);

      if (groupSnap.exists()) {
        const data = groupSnap.data();
        setFeedbackItems(data.feedbackData || []);
        setGroupTitle(
          makeFirstLetterUppercase((data.title || groupId).replace(/-/g, " "))
        );
      } else {
        setFeedbackItems([]);
        setGroupTitle(groupId);
      }

      setLoading(false);
    };

    fetchGroupFeedback();
  }, [groupId, productId]);

  const fetchAllFeedback = async () => {
    setLoadingAllFeedback(true);
    try {
      const feedbackRef = collection(db, "products", productId, "feedbacks");
      const feedbackSnap = await getDocs(feedbackRef);

      const existingFeedbackIds = new Set(
        feedbackItems.map((item) => item.feedbackId)
      );

      const allFeedbackData: AllFeedbackItem[] = [];
      feedbackSnap.forEach((doc) => {
        const data = doc.data();
        // Only include feedback that's not already in this group
        if (!existingFeedbackIds.has(doc.id)) {
          allFeedbackData.push({
            id: doc.id,
            feedbackId: doc.id,
            feedback: {
              title: data.feedback?.title || "Untitled",
              content: data.feedback?.content || "",
              isRich: data.feedback?.isRich,
              createdAt: data.feedback?.createdAt,
            },
            userInfo: data.userInfo,
          });
        }
      });

      setAllFeedback(allFeedbackData);
    } catch (error) {
      console.error("Error fetching all feedback:", error);
      toast.error("Failed to load available feedback");
    } finally {
      setLoadingAllFeedback(false);
    }
  };

  const filteredFeedback = useMemo(() => {
    if (!searchQuery.trim()) return allFeedback;

    const query = searchQuery.toLowerCase();
    return allFeedback.filter((item) => {
      const title = item.feedback.title.toLowerCase();
      const content =
        typeof item.feedback.content === "string"
          ? item.feedback.content.toLowerCase()
          : "";
      const username = item.userInfo?.username?.toLowerCase() || "";

      return (
        title.includes(query) ||
        content.includes(query) ||
        username.includes(query)
      );
    });
  }, [allFeedback, searchQuery]);

  const handleAddFeedbackClick = () => {
    setShowAddModal(true);
    setSelectedFeedback(new Set());
    setSearchQuery("");
    fetchAllFeedback();
  };

  const handleFeedbackSelect = (feedbackId: string, checked: boolean) => {
    const newSelected = new Set(selectedFeedback);
    if (checked) {
      newSelected.add(feedbackId);
    } else {
      newSelected.delete(feedbackId);
    }
    setSelectedFeedback(newSelected);
  };

  const handleAddSelectedFeedback = async () => {
    if (selectedFeedback.size === 0) return;

    setIsAddingFeedback(true);
    const toastId = toast.loading(
      `Adding ${selectedFeedback.size} feedback items to ${groupTitle}...`
    );

    try {
      // Get the selected feedback items
      const selectedItems = allFeedback.filter((item) =>
        selectedFeedback.has(item.feedbackId)
      );

      // Update the group document
      const groupRef = doc(
        db,
        "products",
        productId,
        "feedback-groups",
        groupId
      );
      const currentGroupData = await getDoc(groupRef);

      let currentFeedbackData = [];
      if (currentGroupData.exists()) {
        currentFeedbackData = currentGroupData.data().feedbackData || [];
      }

      // Add the new feedback items
      const updatedFeedbackData = [...currentFeedbackData, ...selectedItems];

      await updateDoc(groupRef, {
        feedbackData: updatedFeedbackData,
        updatedAt: new Date(),
      });

      // Update local state
      setFeedbackItems(updatedFeedbackData);

      toast.success(
        `Successfully added ${selectedFeedback.size} feedback items to ${groupTitle}!`,
        {
          id: toastId,
        }
      );

      setShowAddModal(false);
      setSelectedFeedback(new Set());
    } catch (error) {
      console.error("Error adding feedback to group:", error);
      toast.error("Failed to add feedback to group", { id: toastId });
    } finally {
      setIsAddingFeedback(false);
    }
  };

  const handleClearAllFeedback = async () => {
    if (!groupId || feedbackItems.length === 0) return;

    setIsClearing(true);
    setIsCommitting(false);
    cancelRef.current = false;

    const toastId = toast.loading(
      `Clearing all feedback from ${groupTitle}...`
    );

    try {
      // Simulate some preparation time where cancellation is possible
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if cancelled before committing
      if (cancelRef.current) {
        toast.dismiss(toastId);
        toast.info("Clear operation cancelled");
        return;
      }

      // Set committing state - no more cancellation after this point
      setIsCommitting(true);

      const batch = writeBatch(db);

      // Get all feedback IDs from this group
      const feedbackIds = feedbackItems.map((item) => item.feedbackId);

      // Delete from main feedbacks collection
      for (const feedbackId of feedbackIds) {
        const feedbackRef = doc(
          db,
          "products",
          productId,
          "feedbacks",
          feedbackId
        );
        batch.delete(feedbackRef);
      }

      // Clear the group document (set feedbackData to empty array)
      const groupRef = doc(
        db,
        "products",
        productId,
        "feedback-groups",
        groupId
      );
      batch.update(groupRef, {
        feedbackData: [],
        feedback: [],
        updatedAt: new Date(),
      });

      // Commit all deletions
      await batch.commit();

      // Update local state
      setFeedbackItems([]);

      toast.success(`All feedback cleared from ${groupTitle}!`, {
        id: toastId,
      });
    } catch (error: any) {
      // Don't show error if it was cancelled
      if (cancelRef.current) {
        toast.dismiss(toastId);
        toast.info("Clear operation cancelled");
        return;
      }

      console.error("Error clearing feedback:", error);
      toast.error(
        error?.message ||
          `Failed to clear feedback from ${groupTitle}. Please try again.`,
        { id: toastId }
      );
    } finally {
      setIsClearing(false);
      setIsCommitting(false);
      cancelRef.current = false;
    }
  };

  const handleCancel = () => {
    cancelRef.current = true;
  };

  const formatContent = (feedback: any) => {
    if (!feedback.isRich) {
      return feedback.content || "";
    } else if (
      Array.isArray(feedback.content?.blocks) &&
      feedback.content.blocks.length > 0
    ) {
      return feedback.content.blocks.map((block: any) => block.text).join(" ");
    } else if (Array.isArray(feedback.inputs) && feedback.inputs.length > 0) {
      return feedback.inputs
        .map((input: any) => `${input.label}: ${input.value}`)
        .join(" ");
    }
    return feedback.content || "";
  };

  if (!groupId || loading) return null;

  return (
    <>
      <div className="w-full max-w-4xl mx-auto py-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Grouped by {groupTitle}
          </h2>

          {feedbackItems.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearAllFeedback}
                disabled={isClearing}
                className="flex items-center gap-2"
              >
                {isClearing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                {isClearing ? "Clearing..." : "Clear All Feedback"}
              </Button>

              {isClearing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isCommitting}
                  className="flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              )}
            </div>
          )}
        </div>

        <ScrollArea className="h-[700px] w-full">
          <div className="space-y-4">
            {feedbackItems.length === 0 ? (
              <p className="text-muted-foreground">
                No feedback in this group.
              </p>
            ) : (
              feedbackItems.map((fb: FeedbackItemInDB, idx) => {
                let content = fb.feedback?.content || "Unknown Content";

                if (!fb.feedback?.isRich) {
                  content = fb.feedback?.content;
                } else if (
                  Array.isArray(fb.feedback?.content?.blocks) &&
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
                      title: fb.feedback?.title || "Untitled Feedback",
                      content,
                      isRic: fb.feedback?.isRich,
                      username: fb.userInfo?.username,
                    }}
                    productData={{ id: productId, isOwner }}
                    feedbackId={fb.feedbackId}
                  />
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
              onClick={handleAddFeedbackClick}
            >
              <Plus className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left" className="w-64 mb-2">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Add Feedback</h4>
              <p className="text-xs text-muted-foreground">
                Add existing feedback items to this group. You can search and
                select multiple items at once.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Add Feedback Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Feedback to {groupTitle}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback by title, content, or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Selected Count */}
            {selectedFeedback.size > 0 && (
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-sm">
                  {selectedFeedback.size} selected
                </Badge>
                <Button
                  onClick={handleAddSelectedFeedback}
                  disabled={isAddingFeedback}
                  className="flex items-center gap-2"
                >
                  {isAddingFeedback ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Add Selected
                </Button>
              </div>
            )}

            {/* Feedback List */}
            <ScrollArea className="flex-1 min-h-[400px] max-h-full">
              <div className="space-y-3 pr-4">
                {loadingAllFeedback ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">
                      Loading feedback...
                    </span>
                  </div>
                ) : filteredFeedback.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? "No feedback matches your search"
                        : "No available feedback to add"}
                    </p>
                  </div>
                ) : (
                  filteredFeedback.map((item) => {
                    const isSelected = selectedFeedback.has(item.feedbackId);
                    const content = formatContent(item.feedback);

                    return (
                      <div
                        key={item.feedbackId}
                        className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer hover:bg-muted/50 ${
                          isSelected
                            ? "bg-primary/10 border-primary"
                            : "bg-background"
                        }`}
                        onClick={() =>
                          handleFeedbackSelect(item.feedbackId, !isSelected)
                        }
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={isSelected}
                            onChange={(checked) =>
                              handleFeedbackSelect(item.feedbackId, checked)
                            }
                            className="mt-1"
                          />

                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm line-clamp-1">
                                {item.feedback.title}
                              </h4>
                              {item.feedback.isRich && (
                                <Badge variant="outline" className="text-xs">
                                  Rich
                                </Badge>
                              )}
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {content}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              {item.userInfo?.username && (
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  <span>{item.userInfo.username}</span>
                                </div>
                              )}
                              {item.feedback.createdAt && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    {new Date(
                                      item.feedback.createdAt.seconds * 1000
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
