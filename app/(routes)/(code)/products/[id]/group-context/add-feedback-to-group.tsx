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
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  Check,
  Loader2,
  Plus,
  Search,
  FileText,
  User,
  Calendar,
} from "lucide-react";
import { useState, useMemo } from "react";
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

interface AddFeedbackToGroupProps {
  groupTitle: string;
  productId: string;
  groupId: string;
  existingFeedbackIds: string[];
  onFeedbackAdded: (newFeedbackItems: any[]) => void;
}

export default function AddFeedbackToGroup({
  groupTitle,
  productId,
  groupId,
  existingFeedbackIds,
  onFeedbackAdded,
}: AddFeedbackToGroupProps) {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [allFeedback, setAllFeedback] = useState<AllFeedbackItem[]>([]);
  const [loadingAllFeedback, setLoadingAllFeedback] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFeedback, setSelectedFeedback] = useState<Set<string>>(
    new Set()
  );
  const [isAddingFeedback, setIsAddingFeedback] = useState<boolean>(false);

  const fetchAllFeedback = async () => {
    setLoadingAllFeedback(true);
    try {
      const feedbackRef = collection(db, "products", productId, "feedbacks");
      const feedbackSnap = await getDocs(feedbackRef);
      const existingFeedbackIdSet = new Set(existingFeedbackIds);
      const allFeedbackData: AllFeedbackItem[] = [];

      feedbackSnap.forEach((doc) => {
        const data = doc.data();
        if (!existingFeedbackIdSet.has(doc.id)) {
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
    if (checked) newSelected.add(feedbackId);
    else newSelected.delete(feedbackId);
    setSelectedFeedback(newSelected);
  };

  const formatContent = (feedback: any) => {
    if (!feedback.isRich) return feedback.content || "";
    if (Array.isArray(feedback.content?.blocks)) {
      return feedback.content.blocks.map((block: any) => block.text).join(" ");
    }
    if (Array.isArray(feedback.inputs)) {
      return feedback.inputs
        .map((input: any) => `${input.label}: ${input.value}`)
        .join(" ");
    }
    return feedback.content || "";
  };

  const handleAddSelectedFeedback = async () => {
    if (selectedFeedback.size === 0) return;
    setIsAddingFeedback(true);
    const toastId = toast.loading(
      `Adding ${selectedFeedback.size} feedback items to ${groupTitle}...`
    );
    try {
      const selectedItems = allFeedback.filter((item) =>
        selectedFeedback.has(item.feedbackId)
      );
      const groupRef = doc(
        db,
        "products",
        productId,
        "feedback-groups",
        groupId
      );
      const currentGroupData = await getDoc(groupRef);
      let currentFeedbackData: AllFeedbackItem[] = [];
      if (currentGroupData.exists()) {
        currentFeedbackData = currentGroupData.data().feedbackData || [];
      }

      // Combine and sanitize to avoid undefined values
      const combined = [...currentFeedbackData, ...selectedItems];
      const sanitized = combined.map((item) => ({
        id: item.id,
        feedbackId: item.feedbackId,
        feedback: {
          title: item.feedback.title,
          content: item.feedback.content,
          ...(item.feedback.isRich !== undefined
            ? { isRich: item.feedback.isRich }
            : {}),
          ...(item.feedback.createdAt
            ? { createdAt: item.feedback.createdAt }
            : {}),
        },
        ...(item.userInfo
          ? { userInfo: { username: item.userInfo.username } }
          : {}),
      }));

      await updateDoc(groupRef, {
        feedbackData: sanitized,
        updatedAt: new Date(),
      });

      onFeedbackAdded(sanitized);
      toast.success(
        `Successfully added ${selectedFeedback.size} feedback items to ${groupTitle}!`,
        { id: toastId }
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

  return (
    <div className="relative">
      <div className="fixed bottom-10 right-14 z-50">
        <Button
          size="icon"
          className="rounded-full p-4 shadow-lg hover:shadow-xl transition bg-primary hover:bg-primary-muted"
          onClick={handleAddFeedbackClick}
        >
          <Plus />
        </Button>
      </div>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" /> Add Feedback to {groupTitle}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col space-y-4 flex-1 overflow-hidden">
            <div className="sticky top-0 z-10 bg-background py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search feedback by title, content, or username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {selectedFeedback.size > 0 && (
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-sm">
                  {selectedFeedback.size} selected
                </Badge>
                <Button
                  onClick={handleAddSelectedFeedback}
                  disabled={isAddingFeedback}
                  className="flex items-center gap-2 transition-colors"
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

            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full w-full">
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
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-primary/10 border-primary"
                              : "hover:bg-muted/50"
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
