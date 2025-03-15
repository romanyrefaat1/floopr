
import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, LayoutDashboard, MessageSquare, PieChart } from 'lucide-react';
import WaitlistForm from './WaitlistForm';
import ScribbleHighlight from './ui/ScribbleHighlight';
import { getWaitlistCount } from '@/lib/firebase';

const NoImagesHero = () => {
  const [waitlistCount, setWaitlistCount] = useState(120); // Default fallback
  
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const count = await getWaitlistCount();
        setWaitlistCount(Math.max(count, 120)); // Ensure at least 120 to avoid looking empty
      } catch (error) {
        console.error("Error fetching waitlist count:", error);
      }
    };
    
    fetchWaitlistCount();
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Gradient backgrounds instead of images */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-floopr-purple-bg opacity-50 blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-floopr-purple-bg opacity-40 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-floopr-purple-bg border border-floopr-purple/20 mb-6">
            <Sparkles className="h-4 w-4 text-floopr-purple mr-2" />
            <span className="text-sm font-medium text-floopr-purple-dark">Early waitlist open</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
            Collect and manage feedback <span className="relative text-floopr-purple">effortlessly</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-black max-w-3xl mb-8">
            The all-in-one platform to collect, organize, and act on user feedback
          </p>
          
          <WaitlistForm />
          
          <div className="flex items-center justify-center mt-8 text-sm text-black">
            <div className="flex -space-x-2 mr-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                  {i}
                </div>
              ))}
            </div>
            <span>Join {waitlistCount}+ early adopters</span>
          </div>
        </div>
        
        {/* Text-based representation instead of screenshot */}
        <div className="rounded-2xl overflow-hidden shadow-xl shadow-floopr-purple/5 bg-white border border-gray-100 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="aspect-[16/9] w-full bg-gradient-to-br from-floopr-purple-bg to-white p-8 flex items-center justify-center">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <LayoutDashboard className="h-12 w-12 text-floopr-purple mb-4" />
                <h3 className="text-xl font-bold mb-2">Intuitive Dashboard</h3>
                <p>Organize and prioritize feedback in a clean, intuitive interface designed for productivity.</p>
              </div>
              
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <MessageSquare className="h-12 w-12 text-floopr-purple mb-4" />
                <h3 className="text-xl font-bold mb-2">Feedback Collection</h3>
                <p>Multiple channels to collect, categorize and respond to user feedback efficiently.</p>
              </div>
              
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <PieChart className="h-12 w-12 text-floopr-purple mb-4" />
                <h3 className="text-xl font-bold mb-2">Actionable Insights</h3>
                <p>Turn feedback into actionable insights with powerful analytics and prioritization tools.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-16">
        <a 
          href="#features" 
          className="inline-flex items-center text-base font-medium text-floopr-purple hover:text-floopr-purple-dark transition-colors"
        >
          <span>Discover features</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default NoImagesHero;
