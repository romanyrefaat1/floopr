"use client";

import { addSimpleFeedback, SimpleFeedbackItemDataForAction } from "@/actions/add-feedback";
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

      // Create a feedback object with the form values
      let finalContent: string | null = null;
      let finalIsRich: boolean = false;

      if (values.description && 
          typeof values.description === 'object' && 
          Object.keys(values.description).length > 0) {
        // If description is a non-empty object (from RichTextEditor)
        finalContent = values.description;
        finalIsRich = true;
      } else if (typeof values.description === 'string' && values.description.trim() !== '') {
        // If description is a non-empty string
        finalContent = values.description;
        finalIsRich = true; // Assuming string content in this context is also considered rich
      }
      // If values.description is the initial empty object {}, an empty string, null, or undefined,
      // finalContent remains null and finalIsRich remains false.

      const feedbackObject: SimpleFeedbackItemDataForAction['feedback'] = {
        title: values.title || "Untitled",
        content: finalContent,
        isRich: finalIsRich,
        type: values.type || "other",
      };

      const feedbackData: SimpleFeedbackItemDataForAction = {
        feedback: feedbackObject,
        productId: String(productId),
        // componentRefId is optional and not used in this form
      };

      // Note: userInfo is removed as it's handled by the API route and not part of SimpleFeedbackItemDataForAction

      

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
    <div className="h-full scroll-auto">
        <div className="rounded-modal scroll-auto h-full w-full min-w-[full] mx-auto p-6 text-card-foreground font-sans text-base">
          <CardTitle>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Submit Feedback
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
              <div className={`h-[`}>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="h-full">
                    <FormControl className="h-full">
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
              </div>

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
    </div>
  );
}
