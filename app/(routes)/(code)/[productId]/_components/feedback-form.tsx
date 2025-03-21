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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().optional(),
  type: z.enum(["feature", "idea", "issue", "other"]),
  image: z.instanceof(File).optional(),
});

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const productId = params.productId;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "feature",
      image: undefined,
    },
  });

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);

      const feedbackData = {
        feedback: {
          title: values.title,
          content: values.description || "",
          type: values.type,
        },
        productId,
        userInfo: {
          userId: "anonymous",
          username: "Anonymous User",
        },
      };

      const result = await addSimpleFeedback(feedbackData);
      if (result.success) {
        toast("Feedback submitted");
        form.reset();
      } else {
        toast("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-modal w-full max-w-md mx-auto p-4 text-card-foreground font-sans text-base">
      <CardTitle><h2 className="text-2xl font-bold mb-6 text-center">Add Feedback</h2>
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
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
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
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RichTextEditor
                    onChange={field.onChange}
                    placeholder="Enter your description with formatting..."
                    className="rounded-md bg-background text-foreground border border-secondary"
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
  );
}
