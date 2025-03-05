"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define a schema with Zod
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const [error, setError] = useState(null)
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter();
  
    const removeErrorMess = () => {
      setTimeout(() => {
        setError(null);
      }, 3000);
    };
  
    useEffect(() => {
      if (error) {
        removeErrorMess();
      }
    }, [error]);
  

  const onSubmit = async (data: SignInFormValues) => {
    console.log("Sign In Data:", data);
    setError(null);
    const response = await fetch(
      `/api/auth/signin`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      // Handle error responses (400, 500, etc.)
      setError(result.error);
      toast.error(result.error)
      console.error("Error:", result.error);
      return;
    }

    console.log("Successfully signed in:", result);
    toast.success("Successfully signed in!")
    router.push(`/home`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end w-full">
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </Form>
  );
}
