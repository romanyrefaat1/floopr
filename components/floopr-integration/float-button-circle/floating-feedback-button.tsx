"use client";

import { Button } from "../../ui/button";
import { addSimpleFeedback } from "@/actions/add-feedback";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type FloatingFeedbackButtonProps = {
  productId: string;
};

export default function FloatingFeedbackButton({
  productId,
  user,
}: FloatingFeedbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !description || !selectedType) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const feedbackData = {
        feedback: {
          title,
          content: description,
          isRich: false,
        },
        type: selectedType.toLowerCase(),
        productId: productId, // Replace with actual product ID
        userInfo: {
          username: user.firstName + " " + user.lastName || `Anonymous User`,
          userId: user.id`Anonymous User`,
          profilePicture: user.imageUrl || null,
        },
      };

      const result = await addSimpleFeedback(feedbackData);
      if (result.success) {
        toast.success("Feedback submitted successfully");
        setIsOpen(false);
        setSelectedType(null);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedType(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Circular Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="h-12 w-12 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center"
      >
        <span>💭</span>
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-background rounded-lg p-4 max-w-md w-full mx-4 relative animate-in slide-in-from-bottom-10 duration-300">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Main content */}
            <div className="space-y-4">
              {!selectedType ? (
                <>
                  <h2 className="text-xl font-semibold text-center mb-6">
                    Give us feedback
                  </h2>
                  {["Feature", "Idea", "Bug", "Other"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className="w-full p-3 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                    >
                      {type}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-6">{selectedType}</h2>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 rounded-lg border bg-background"
                  />
                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 rounded-lg border bg-background min-h-[100px]"
                  />
                  <Button onClick={handleSubmit} className="w-full">
                    Send feedback
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
