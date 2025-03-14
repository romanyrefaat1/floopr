
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CircleScribble from './ui/CircleScribble';
import DoobleArrow from './ui/DoobleArrow';
import { toast } from '@/components/ui/use-toast';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll keep you updated!",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-20 md:py-32 overflow-hidden relative" id="cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
        
        <div className="max-w-md mx-auto mt-10 md:mt-14">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative flex items-center">
              <DoobleArrow className="absolute -left-16 top-1/2 -translate-y-1/2 hidden md:block" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-full bg-white border-gray-200 focus:border-floopr-purple focus:ring-2 focus:ring-floopr-purple pr-36 text-base shadow-lg"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="absolute right-1 bg-floopr-purple hover:bg-floopr-purple-dark text-white font-medium h-12 px-6 rounded-full text-base"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </Button>
              <DoobleArrow className="absolute -right-16 top-1/2 -translate-y-1/2 hidden md:block" direction="left" />
            </div>
          </form>
          
          <p className="mt-4 text-black font-medium">
            Join our exclusive waitlist — No credit card required
          </p>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-floopr-purple opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-floopr-purple opacity-5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default CallToAction;
