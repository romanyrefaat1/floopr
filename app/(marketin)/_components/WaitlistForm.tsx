import { addToWaitlist } from "../lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !email.includes("@")) {
      toast("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the imported function to add the email to the waitlist
      const result = await addToWaitlist(email);

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        setEmail("");

        // Optionally scroll to features section
        // document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't add you to the waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-lg border-border focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`h-12 px-8 text-primary-foreground font-medium rounded-lg transition-all 
          ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Joining..." : "Join Waitlist"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center sm:text-center">
        We'll keep you updated on our launch. No spam, we promise!
      </p>
    </form>
  );
};

export default WaitlistForm;
