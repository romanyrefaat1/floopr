"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import saveEmail from "@/services/save-email";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email")
})

export default function EmailForm() {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = async (
        values: z.infer<typeof formSchema>, 
    ) => {
        try {
            setLoading(true);
            
            // Show loading toast that will be dismissed when another toast appears
            const toastId = toast.loading('Joining the waitlist...', {
                duration: 10000, // 10 seconds maximum
            });
            
            const response = await saveEmail(values.email);
            
            // Dismiss the loading toast
            toast.dismiss(toastId);
            
            if (response.error) {
                // Handle error
                toast.error(`Please try again with a different email address.\n${response.error}`, {
                    duration: 5000,
                });
                return;
            }
            
            if (response.warning) {
                // Handle warning
                toast.warning(`Your email was saved, but there might be an issue with notifications.\n${response.warning}`, {
                    duration: 5000,
                });
                form.reset(); // Clear the form since email was saved
                return;
            }
            
            // Handle success
            toast.success('Success! Your email has been added to the waitlist.', {
                duration: 5000,
            });
            
            form.reset(); // Clear the form after successful submission
        } catch (error) {
            // Handle unexpected errors
            toast.error('Something went wrong', {
                description: 'Please try again later.',
                duration: 5000,
            });
            console.error('Form submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex flex- space-y-2 sm:space-y-0 sm:space-x-2 w-full max-w-md"
        >
            <div className="flex-1">
                <Input 
                    {...form.register('email')}
                    placeholder="Enter your email"
                    type="email"
                    disabled={loading}
                    className="w-full"
                />
                {form.formState.errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.email.message}
                    </p>
                )}
            </div>
            <Button 
                type="submit" 
                disabled={loading}
                className="w-auto"
            >
                {loading ? "Joining..." : "Join waitlist"}
            </Button>
        </form>
    );
}