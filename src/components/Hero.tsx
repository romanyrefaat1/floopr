
import { ArrowRight, Sparkles } from 'lucide-react';
import WaitlistForm from './WaitlistForm';
import ScribbleHighlight from './ui/ScribbleHighlight';
import CircleScribble from './ui/CircleScribble';
import { useEffect, useState } from 'react';
import { getWaitlistCount } from '../../firebase';

const Hero = () => {

  const [waitlistCount, setWaitlistCount] = useState(40); // Default fallback
  
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const count = await getWaitlistCount();
        console.log(`count:`, count)
        setWaitlistCount(count); 
      } catch (error) {
        console.error("Error fetching waitlist count:", error);
      }
    };
    
    fetchWaitlistCount();
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background elements */}
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
            Collect and manage feedback <span className="relative">
              <ScribbleHighlight>effortlessly</ScribbleHighlight>
              <CircleScribble className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-20 opacity-10" />
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-black max-w-3xl mb-8">
            The all-in-one platform to collect, organize, and act on user feedback
          </p>
          
          <WaitlistForm />
          
          {waitlistCount > 19 && <div className="flex items-center justify-center mt-8 text-sm text-black">
            <div className="flex -space-x-2 mr-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                  {i}
                </div>
              ))}
            </div>
            <span>Join {waitlistCount}+ early adopters</span>
          </div>}
        </div>
        
          {/* <div className="rounded-2xl overflow-hidden shadow-xl shadow-floopr-purple/5 bg-white border border-gray-100 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="aspect-[16/9] w-full bg-gray-100 relative overflow-hidden">
              <img 
                src="/lovable-uploads/05f2dc13-e727-4026-9dc8-4de6d361d6db.png" 
                alt="Floopr feedback dashboard" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div> */}
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

export default Hero;
