
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CircleScribble from './ui/CircleScribble';
import DoobleArrow from './ui/DoobleArrow';
import { toast } from '@/components/ui/use-toast';
import { addToWaitlist } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await addToWaitlist(email);
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "You've been added to our waitlist. We'll keep you updated!",
        });
        setEmail('');
      } else {
        toast({
          title: result.message,
          variant: result.message.includes("already") ? "default" : "destructive",
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
    <section className="py-20 md:py-32 overflow-hidden relative" id="cta">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-radial-gradient from-floopr-purple/10 to-transparent -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center">
          <div className="md:w-1/2 md:pr-12 relative mb-12 md:mb-0">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 relative inline-block">
              Start Building 
              <br />
              Things Your Users
              <br />
              <span className="relative inline-block">
                will Love
                <CircleScribble className="absolute -z-10 -right-5 -bottom-3 w-full h-full opacity-30" />
              </span>
            </h2>
          </div>
        
          <div className="md:w-1/2 md:absolute md:right-0 md:pr-8 md:pl-0 md:top-1/2 md:-translate-y-1/2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:ml-auto md:max-w-md">
              <div className="relative flex items-center">
                <DoobleArrow className="absolute -left-16 top-1/2 -translate-y-1/2 hidden md:block" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-full bg-white border-gray-200 focus:border-floopr-purple focus:ring-2 focus:ring-floopr-purple pr-36 text-base shadow-lg"
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="absolute right-1 bg-floopr-purple hover:bg-floopr-purple-dark text-white font-medium h-12 px-6 rounded-full text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Joining...
                    </>
                  ) : 'Join Waitlist'}
                </Button>
                <DoobleArrow className="absolute -right-16 top-1/2 -translate-y-1/2 hidden md:block" direction="left" />
              </div>
              <p className="mt-4 text-black font-medium">
                Join our exclusive waitlist — No credit card required
              </p>
            </form>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-floopr-purple opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-floopr-purple opacity-5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default CallToAction;
