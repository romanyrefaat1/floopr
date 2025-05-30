"use client";

import { lightenColor } from "../_utils/lighten-color";
import { addSimpleFeedback } from "@/actions/add-feedback";
import LoaderSpinner from "@/components/loader-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AddFeedbackForm({
  primaryColor,
  productName,
  className,
  productId,
}: {
  primaryColor: string;
  productName: string;
  className: string;
  productId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();
  const { user } = useUser();

  const lightenedPrimaryColor = lightenColor(primaryColor, 0);

  const handleAddFeedback = async () => {
    // Validate feedback content
    if (content.length < 10) {
      toast.error("Feedback must be at least 10 characters long.");
      return;
    }

    setLoading(true);

    try {
      const result = await addSimpleFeedback({
        content,
        userInfo: {
          username: user?.fullName,
          profilePicture: user?.imageUrl,
        },
        productId,
      });

      if (result.success) {
        toast.success("Your feedback was added successfully!");
        router.push(`/products/${productId}`);
        return;
      } else {
        throw new Error("Failed to add feedback");
      }
    } catch (error) {
      toast.error("Failed to add feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn("flex gap-2 items-center justify-center", className)}
      style={
        {
          "--primary-color": primaryColor,
          "--lightened-color": lightenedPrimaryColor,
        } as React.CSSProperties
      }
    >
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`Add feedback about ${productName}`}
        className="w-full focus:border-[var(--lightened-color)] focus:outline-none"
        style={{ borderColor: "var(--primary-color)" }}
      />
      <Button
        onClick={handleAddFeedback}
        disabled={loading}
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        {loading ? <LoaderSpinner text="Adding feedback..." /> : "Add Feedback"}
      </Button>
    </div>
  );
}
