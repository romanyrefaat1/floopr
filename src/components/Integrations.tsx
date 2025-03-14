
import { useEffect, useRef } from 'react';

const Integrations = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  const integrations = [
    { name: "Slack", color: "#4A154B" },
    { name: "Zapier", color: "#FF4A00" },
    { name: "Notion", color: "#000000" },
    { name: "GitHub", color: "#24292E" },
    { name: "Trello", color: "#0079BF" }
  ];

  return (
    <section id="how-it-works" className="section-container" ref={sectionRef}>
      <div className="text-center mb-16 animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Integrates with your <span className="highlight-text">workflow</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect Floopr with your favorite tools and automate your feedback workflow
        </p>
      </div>
      
      <div className="relative max-w-3xl mx-auto">
        <div className="glass-card p-8 md:p-10 animate-on-scroll">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6 items-center">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="flex flex-col items-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${integration.color}10` }}
                >
                  <div 
                    className="w-8 h-8 rounded-md"
                    style={{ backgroundColor: integration.color }}
                  ></div>
                </div>
                <p className="text-sm font-medium">{integration.name}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-100">
            <h3 className="text-xl font-semibold mb-4">How it works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <div className="w-10 h-10 rounded-full bg-floopr-purple-bg flex items-center justify-center mb-3">
                  <span className="font-medium text-floopr-purple">1</span>
                </div>
                <h4 className="font-medium mb-1">Collect feedback</h4>
                <p className="text-sm text-gray-600">Embed forms on your site or app</p>
              </div>
              
              <div className="flex flex-col">
                <div className="w-10 h-10 rounded-full bg-floopr-purple-bg flex items-center justify-center mb-3">
                  <span className="font-medium text-floopr-purple">2</span>
                </div>
                <h4 className="font-medium mb-1">Organize & prioritize</h4>
                <p className="text-sm text-gray-600">Group feedback by categories</p>
              </div>
              
              <div className="flex flex-col">
                <div className="w-10 h-10 rounded-full bg-floopr-purple-bg flex items-center justify-center mb-3">
                  <span className="font-medium text-floopr-purple">3</span>
                </div>
                <h4 className="font-medium mb-1">Take action</h4>
                <p className="text-sm text-gray-600">Integrate with your dev workflow</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-floopr-purple-bg opacity-70"></div>
        <div className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full bg-floopr-purple-bg opacity-70"></div>
      </div>
    </section>
  );
};

export default Integrations;
