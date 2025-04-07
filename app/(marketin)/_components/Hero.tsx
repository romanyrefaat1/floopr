import { getWaitlistCount } from "../lib/firebase";
import WaitlistForm from "./WaitlistForm";
import CircleScribble from "./ui/CircleScribble";
import ScribbleHighlight from "./ui/ScribbleHighlight";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [waitlistCount, setWaitlistCount] = useState(40);

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const count = await getWaitlistCount();
        setWaitlistCount(count);
      } catch (error) {
        console.error("Error fetching waitlist count:", error);
      }
    };

    fetchWaitlistCount();
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-marketing-background">
      {/* Background elements */}
      <div className="absolute -inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[220px] md:w-[500px] h-[500px] rounded-full bg-marketing-accent opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-[220px] md:w-[400px] lg:w-[600px] h-[400px] rounded-full bg-marketing-accent opacity-20 blur-3xl"></div>
      </div>

      <div className="container">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-marketing-floopr-purple-light/20 border border-marketing-floopr-purple/20 mb-6">
            <Sparkles className="h-4 w-4 text-marketing-floopr-purple mr-2" />
            <span className="text-sm font-medium text-marketing-floopr-purple-dark">
              Early waitlist open
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl text-foreground">
            Collect and manage feedback{" "}
            <span className="relative">
              <ScribbleHighlight>effortlessly</ScribbleHighlight>
              <CircleScribble className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-20 opacity-10" />
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8">
            The all-in-one platform to collect, organize, and act on user
            feedback
          </p>

          <WaitlistForm />

          {waitlistCount > 19 && (
            <div className="flex items-center justify-center mt-8 text-sm text-muted-foreground">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-muted border-2 border-marketing-background flex items-center justify-center text-xs font-medium"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span>Join {waitlistCount}+ early adopters</span>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="#features"
            className="inline-flex items-center text-base font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <span>Discover features</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
