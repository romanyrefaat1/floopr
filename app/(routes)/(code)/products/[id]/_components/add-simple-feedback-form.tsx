"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { lightenColor } from "../_utils/lighten-color";
import {addSimpleFeedback} from "@/actions/add-feedback";
import { useState } from "react";
import LoaderSpinner from "@/components/loader-spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

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
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [content, setContent] = useState("d")
    const lightendPrimaryColor = lightenColor(primaryColor, 0)
    const {user} = useUser()
    // console.log(user)
    const handleAddFeedback = async() => {
        // Add feedback logic here
        if (content.length < 10){
            toast.error(`Feedback must be at least 10 characters long.`)
            return
        }
        setLoading(true)
        const result = await addSimpleFeedback({
            content: content,
            userId: user.id,
            username: user.fullName,
            profilePicture: user.imageUrl,
            productId,
            productName
        })
        if (result.success){
        toast.success(`Your feedback was added successfully!`)
        router.push(`/products/${productId}/feedback/${result.feedbackId}`)
        return;
        }
        toast.error(`Failed to add feedback.`)
        setLoading(false)
    }
  return (
    <div
      className={cn(
        "flex md:px-[40px] gap-2 items-center justify-center",
        className
      )}
      style={{ "--primary-color": primaryColor , "--lightened-color": lightendPrimaryColor} as React.CSSProperties}
    >
      <Input
      onChange={(e) => setContent(e.target.value)}
        placeholder={`Add feedback about ${productName}`}
        className="focus:border-[var(--lightened-color)] focus:outline-none outline-none focus:outline-none"
        style={{ borderColor: "var(--primary-color)" }}
      />
      <Button onClick={handleAddFeedback} disabled={loading} style={{ backgroundColor: "var(--primary-color)" }}>
        {loading ? <LoaderSpinner text="Adding feedback..." /> : "Add Feedback"}
      </Button>
    </div>
  );
}
