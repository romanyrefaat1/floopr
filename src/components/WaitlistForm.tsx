
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
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
    <form onSubmit={handleSubmit} className="max-w-md w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-full border-gray-200 focus:border-floopr-purple focus:ring-1 focus:ring-floopr-purple"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className={`h-12 px-8 bg-floopr-purple hover:bg-floopr-purple-dark text-white font-medium rounded-full transition-all 
            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`
          }
        >
          {isSubmitting ? 'Joining...' : 'Join Waitlist'}
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">
        We'll keep you updated on our launch. No spam, we promise!
      </p>
    </form>
  );
};

export default WaitlistForm;
