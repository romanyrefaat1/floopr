"use client";

import { addSimpleFeedback } from "@/actions/add-feedback";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/ui/rich-textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Scroll } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.any().optional(),
  type: z.enum(["feature", "idea", "issue", "other"]),
});

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const productId = params.productId;
  const { user } = useUser();
  console.log(`userinfo`, user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: {},
      type: "feature",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const userInfo = {
        username: user.firstName + " " + user.lastName,
        userId: user.id,
        profilePicture: user.imageUrl || null,
      };

      // Debug logging
      console.log("Form values:", values);

      // Create a feedback object with the form values
      const feedbackData = {
        feedback: {
          title: values.title || "Untitled",
          content: values.description || "",
          type: values.type || "other",
        },
        productId: String(productId),
        userInfo,
      };

      console.log("Submitting feedback:", feedbackData);

      const result = await addSimpleFeedback(feedbackData);
      if (result.success) {
        toast.success("Feedback submitted successfully");
        form.reset();
        router.push(`/${productId}/${result.feedbackId}`);
      } else {
        toast.error("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="h-full">
      <ScrollArea className="rounded-lg border w-full overflow-hidden">
        <div className="rounded-modal h-fit w-full min-w-[full] mx-auto p-4 text-card-foreground font-sans text-base">
          <CardTitle>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Add Feedback
            </h2>
          </CardTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Radio Button Options */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex space-x-2">
                      {["Feature", "Idea", "Issue", "Other"].map((type) => (
                        <label
                          key={type}
                          className={`
                        px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors border
                        ${
                          field.value === type.toLowerCase()
                            ? "bg-primary text-white border-primary"
                            : "bg-secondaryBackground text-foreground border-secondary"
                        }
                      `}
                        >
                          <Input
                            type="radio"
                            className="hidden"
                            value={type.toLowerCase()}
                            checked={field.value === type.toLowerCase()}
                            onChange={() => field.onChange(type.toLowerCase())}
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Short title"
                        className="rounded-full text-foreground border border-secondary focus:border-primary focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-xs" />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="h-full">
                    <FormControl>
                      <RichTextEditor
                        onChange={(content) => {
                          field.onChange(content);
                        }}
                        placeholder="Enter your description (optional)"
                        className="rounded-md bg-background h-full text-foreground border border-secondary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full rounded-lg py-2 bg-primary text-white font-sans disabled:bg-gray-400"
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </div>
  );
}
